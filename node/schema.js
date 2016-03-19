var GraphQL = require('graphql');
var Promise = require('bluebird');
var axios = require('axios');
var _ = require('lodash');

var GraphQLObjectType = GraphQL.GraphQLObjectType;
var GraphQLSchema = GraphQL.GraphQLSchema;
var GraphQLString = GraphQL.GraphQLString;
var GraphQLList = GraphQL.GraphQLList;
var GraphQLInt = GraphQL.GraphQLInt;
var GraphQLFloat = GraphQL.GraphQLFloat;

var playerFields = {
    "assists": {
        type: GraphQLInt
    },
    "enGoals": {
        type: GraphQLInt
    },
    "evGoals": {
        type: GraphQLInt
    },
    "firstGoals": {
        type: GraphQLInt
    },
    "gameWinningGoals": {
        type: GraphQLInt
    },
    "gamesPlayed": {
        type: GraphQLInt
    },
    "goals": {
        type: GraphQLInt
    },
    "goalsPerGame": {
        type: GraphQLFloat
    },
    "otGoals": {
        type: GraphQLInt
    },
    "penaltyMinutes": {
        type: GraphQLInt
    },
    "penaltyShotAttempts": {
        type: GraphQLInt
    },
    "penaltyShotGoals": {
        type: GraphQLInt
    },
    "playerFirstName": {
        type: GraphQLString
    },
    "playerId": {
        type: GraphQLInt
    },
    "playerLastName": {
        type: GraphQLString
    },
    "playerName": {
        type: GraphQLString
    },
    "playerPositionCode": {
        type: GraphQLString
    },
    "playerTeamsPlayedFor": {
        type: GraphQLString
    },
    "plusMinus": {
        type: GraphQLInt
    },
    "points": {
        type: GraphQLInt
    },
    "ppGoals": {
        type: GraphQLInt
    },
    "seasonId": {
        type: GraphQLInt
    },
    "shGoals": {
        type: GraphQLInt
    }
};

/**
 * Objects.
 * Build up a portrait of your data universe
 * using the object type. Here, we define a
 * type of object that has a 'hello' field
 * that is of the string type.
 */
var PlayerType = new GraphQLObjectType({
    name: 'Player',
    fields: () => playerFields
});

/**
 * The schema.
 * Here we export a schema that offers one root
 * field named 'greetings', and a method to
 * resolve its data.
 *
 * To learn more about writing GraphQL schemas for Relay, visit:
 *   https://github.com/graphql/graphql-relay-js
 */
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            players: {
                type: new GraphQLList(PlayerType),
                args: playerFields,
                // Here we define a resolver that returns
                // the data defined above. Were this schema
                // executing on the server side, you could
                // write a resolve method that fetches
                // live data from a database.
                resolve: (obj, args) => {
                    return axios.get('http://www.nhl.com/stats/rest/grouped/skaters/season/goals?cayenneExp=seasonId=20152016%20and%20gameTypeId=2%20and%20playerIsActive=1')
                        .then(function(data) {
                            var res = _.get(data, "data.data");

                            var keys = _.keysIn(args);

                            return res.filter((player) => {
                                var matches = keys.map(function (key) {
                                    return args[key] === player[key];
                                })
                                .reduce(function (acc, x) {
                                    if (x) {
                                        return acc + 1;
                                    }
                                }, 0);
                                return matches === keys.length
                            })
                        });
                }
            }
        })
    })
});

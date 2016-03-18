var session = require('express-session');
var path = require('path');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var Schema = require('./schema');

var app = express();

app.use(session({ secret: '12345', cookie: { maxAge: 60000 }}));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlHTTP((request) => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true
})));


console.log(`Listening on ${process.env.IP}:${process.env.PORT}`);
app.listen(process.env.PORT, process.env.IP);

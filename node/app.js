var session = require('express-session');
var path = require('path');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var Schema = require('./schema');

var app = express();

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

app.use('/graphql', graphqlHTTP(request => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true
})));

app.use('/*', express.static(path.join(__dirname, '../client')));

console.log(`Listening on ${process.env.IP}:${process.env.PORT}`);
app.listen(process.env.PORT, process.env.IP);
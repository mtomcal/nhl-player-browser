var session = require('express-session');
var path = require('path');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var Schema = require('./schema');

var app = express();

app.use(session({ secret: '12345', cookie: { maxAge: 60000 }}));

app.use('/graphql', graphqlHTTP((request) => ({
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: true
})));

app.use('/dist/', express.static(path.join(__dirname, 'node_modules/nhl-client/dist')));

app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

console.log(`Listening on ${process.env.IP}:${process.env.PORT}`);
app.listen(process.env.PORT, process.env.IP);

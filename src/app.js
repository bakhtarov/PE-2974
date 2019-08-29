const express = require('express');
const http = require('http');
const data = require('./data');
const runGame = require('./core');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

const result = runGame(data);
console.log('result:::', result);

server.listen(port, function() {
  console.log('listening on *:' + port);
});

const express = require('express');
const http = require('http');
const data = require('./data');
const runGame = require('./core');
const resultParser = require('./resultParser');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;

const result = runGame(data);
const humanReadableData = resultParser(result);

humanReadableData.forEach(log => console.log(log));

server.listen(port);

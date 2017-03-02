import fs from 'fs';
import express from 'express';
import http from 'http';
import path from 'path';
import config from './config/config';

const app = express();
const server = http.Server(app);
const port = process.env.PORT || config.port;

app.get('/', function(req, res) {
  res.send('Hello Wrld');
});

server.listen(port, function() {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});

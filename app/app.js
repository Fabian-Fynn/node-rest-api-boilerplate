import fs from 'fs';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import config from './config/config';
import mongoose from 'mongoose';
import routes from './router';

const app = express();
const server = http.Server(app);
const port = process.env.PORT || config.port;
const db = mongoose.connect('mongodb://localhost/default');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

server.listen(port, function() {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});

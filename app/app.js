import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import mapRoutes from 'express-routes-mapper';
import mongoose from 'mongoose';
import routes from './config/routes';
import defaultPort from './config/config';

const app = express();
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));
const server = http.Server(app);
const port = process.env.PORT || defaultPort;
mongoose.connect('mongodb://localhost/default');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', mapRoutes(routes));

server.listen(port, () => {
  console.log('There we go ♕');
  console.log(`Gladly listening on http://127.0.0.1:${port}`);
});

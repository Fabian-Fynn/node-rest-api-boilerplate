import bodyParser from 'body-parser';
import express from 'express';
import mapRoutes from 'express-routes-mapper';
import mongoose from 'mongoose';
import routes from '../../app/config/routes';

mongoose.Promise = global.Promise;

const beforeAction = () => {
  const testapp = express();
  testapp.use(bodyParser.urlencoded({ extended: false }));
  mongoose.connect('mongodb://localhost/testapp');
  testapp.use(bodyParser.json());
  testapp.use('/api', mapRoutes(routes));
  return testapp;
};


const afterAction = () => {
  mongoose.connection.close();
};

export { beforeAction, afterAction };

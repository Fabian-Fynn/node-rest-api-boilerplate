import bodyParser from 'body-parser';
import express from 'express';
import mapRoutes from 'express-routes-mapper';
import { Mockgoose } from 'mockgoose';
import mongoose from 'mongoose';
import seedMongoose from 'seed-mongoose';
import routes from '../../app/config/routes';

process.env.NODE_ENV = 'test';

mongoose.Promise = global.Promise;

const beforeAction = async () => {
  const testapp = express();
  testapp.use(bodyParser.urlencoded({ extended: false }));
  testapp.use(bodyParser.json());
  testapp.use('/api', mapRoutes(routes));

  const mockgoose = new Mockgoose(mongoose);
  await mockgoose.prepareStorage()
    .then(() => (
      new Promise((resolve, reject) => {
        mongoose.connect('mongodb://api/testdb', null, () => {
          // Load seed data
          seedMongoose({
            mongoose,
          }, (err) => {
            if (err) reject(err);
            resolve();
          });
        });
      })
    ));

  return testapp;
};

const afterAction = () => {
  mongoose.connection.close();
};

export { beforeAction, afterAction };

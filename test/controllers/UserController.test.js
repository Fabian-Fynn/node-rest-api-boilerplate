import test from 'ava';
import request from 'supertest';
import { beforeAction, afterAction } from '../helpers/testSetup';

let app;

test.before(() => {
  app = beforeAction();
});

test.after(() => {
  afterAction();
});


test('Users are created correctly', (t) => {
  request(app)
    .post('/api/user')
    .set('Accept', /json/)
    .send({ name: 'Peter' })
    .end((err, res) => {
      if (err) console.error(err);
    });
});

test('Users are created correctly', (t) => {
  request(app)
    .get('/api/users')
    .end((err, res) => {
      if (err) console.error(err);
    });
});

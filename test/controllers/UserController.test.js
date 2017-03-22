import test from 'ava';
import request from 'supertest';
import { beforeAction, afterAction } from '../helpers/testSetup';

let app;

test.before(async () => {
  app = await beforeAction();
});

test.after(() => {
  afterAction();
});


test('User is created', async (t) => {
  let id;
  await request(app)
    .post('/api/user')
    .set('Accept', /json/)
    .send({ name: 'Peter' })
    .expect(201)
    .expect('Content-Type', /json/)
    .then((res) => {
      t.truthy(res.body._id);
      id = res.body._id;
    });
  // Retrieve user to check if it has been saved as specified
  await request(app)
    .get(`/api/user/${id}`)
    .set('Accept', /json/)
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      t.deepEqual(res.body, {
        __v: 0,
        _id: id,
        name: 'Peter',
      });
    });
});

test('Users are retrieved', async (t) => {
  await request(app)
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      t.truthy(res.body.length);
    });
});

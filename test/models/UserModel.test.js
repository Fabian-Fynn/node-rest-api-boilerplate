import test from 'ava';
import User from '../../app/models/UserModel';

test.beforeEach((t) => {
  t.context.user = new User({ name: 'Peter' });
});

test('Users are created correctly', (t) => {
  t.is(t.context.user.name, 'Peter');
});

import test from 'ava';
import User from './../../models/user_model';
/*
     Syntax examples
     
     
test('Passing test', t => {
  t.pass();
});

test('Failing test', t => {
  t.fail();
});

test.skip('Skipped test', t => {
  t.fail();
});

test.todo('Todo test');
*/
test.beforeEach(t => {
  t.context.user = new User({ name: 'Peter' });
})

test('Users are created correctly', t => {
  t.is(t.context.user.name, 'Peter');
});

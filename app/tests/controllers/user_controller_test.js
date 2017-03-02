import test from 'ava';
import userController from './../../controllers/user_controller';

//Current controllers don't allow tests
//upcoming router will allow this
test.beforeEach.skip(t => {
  t.context.user = userController.create({ name: 'Peter' });
})

test.skip('Users are created correctly', t => {
  t.is(t.context.user.name, 'Peter');
});

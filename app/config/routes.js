const routes = {

  'POST /user': 'UserController.create',
  'GET /users': 'UserController.getAll',
  'GET /user/:user_id': 'UserController.get',

};

export default routes;

import User from './../models/user-model';

export default function (router) {

  router.route('/users')
    .get(function(req, res) {
    User.find({}, 'name', function(err, users) {
      if (err) console.log(err);
      res.json(users);
    })
  });

  router.route('/user/:user_id')
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) console.log(err);
          res.json(user);
      });
    })

  router.post('/user/create', function(req, res) {
    const u = new User( {name: req.body.name} );

    u.save(function(err) {
      if (err) console.log(err);
    });

    res.send(u._id);
  });
}

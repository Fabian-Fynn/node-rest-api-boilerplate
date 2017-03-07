import User from './../models/UserModel';

export default class UserController {

  getAll(req, res) {

    User.find({}, 'name', function (err, users) {

      if (err) console.log(err);

      res.json(users);

    })

  }


  get(req, res) {

    User.findById(req.params.user_id, function (err, user) {

      if (err) console.log(err);

      res.json(user);

    });

  }


  create(req, res) {

    const u = new User({ name: req.body.name });

    u.save(function (err) {

      if (err) console.log(err);

    });

    res.send(u._id);

  }

}



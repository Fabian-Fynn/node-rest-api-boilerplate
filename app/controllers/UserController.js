import User from './../models/UserModel';

const UserController = () => {
  const getAll = (req, res) => {
    User.find({}, 'name', (err, users) => {
      if (err) console.log(err);

      return res.json(users);
    });
  };

  const get = (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
      if (err) console.log(err);

      return res.json(user);
    });
  };

  const create = (req, res) => {
    console.log(req);
    const u = new User({ name: req.body.name });

    u.save((err) => {
      if (err) console.log(err);

      return res.status(200).json(u._id);
    });
  };

  return {
    getAll,
    get,
    create,
  };
};

export default UserController;

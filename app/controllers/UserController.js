import User from './../models/UserModel';

const UserController = () => {
  const getAll = (req, res) => {
    User.find({})
    .then(users => res.status(200).json(users));
  };

  const get = (req, res) => {
    User.findById(req.params.user_id)
      .then(user => res.status(200).json(user));
  };

  const create = (req, res) => {
    const user = new User({ name: req.body.name });

    user.save().then((userSaved) => {
      const id = {
        _id: userSaved._id,
      };
      return res
        .status(201)
        .json(id);
    });
  };

  return {
    getAll,
    get,
    create,
  };
};

export default UserController;

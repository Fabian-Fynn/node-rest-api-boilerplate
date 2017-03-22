import User from './../models/UserModel';

const UserController = () => {
  const getAll = (req, res) => {
    User.find({})
      .then(users => res.status(200).json(users))
      .catch((err) => {
        console.error(err);
        res.status(500);
      });
  };

  const get = (req, res) => {
    if (!req.params.user_id) {
      res.status(400).send('Param user_id not found');
    }
    User.findById(req.params.user_id)
      .then(user => res.status(200).json(user))
      .catch((err) => {
        console.error(err);
        res.status(404).json({ Error: `User not found with id ${req.params.user_id}` });
      });
  };

  const create = (req, res) => {
    if (!req.body.name) {
      res.status(400).send('Param(s) not found. Required: name');
    }
    const user = new User({ name: req.body.name });

    user.save()
      .then((userSaved) => {
        const id = {
          _id: userSaved._id,
        };
        res.status(201).json(id);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ Error: 'Could not create new User' });
      });
  };

  return {
    getAll,
    get,
    create,
  };
};

export default UserController;

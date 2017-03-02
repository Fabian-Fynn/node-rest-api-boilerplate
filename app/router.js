import path from 'path';
import express from 'express';
import userController from './controllers/user-controller';
const router = express.Router();

userController(router);

router.get('/', (req, res) => {
  console.log(__dirname)
  res.status(200).sendFile(path.join(__dirname + '/public/index.html'));
});

export default router;

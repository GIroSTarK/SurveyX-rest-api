const express = require('express');
const {
  getAllUsers,
  getUsersByRole,
  getUserById,
  getUserByNickname,
  addUser,
  updateUserInfo,
  deleteUser,
} = require('../controllers/userController');
const userRouter = new express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', addUser);
userRouter.get('/nickname/:nickname', getUserByNickname);
userRouter.get('/role/:id', getUsersByRole);

userRouter
  .route('/:id')
  .get(getUserById)
  .patch(updateUserInfo)
  .delete(deleteUser);

module.exports = { userRouter };

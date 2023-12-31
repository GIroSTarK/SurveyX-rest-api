const User = require('../models/User');
const { handleRequest } = require('./requestHandler');

const getAllUsers = handleRequest(User.getAll);
const getUsersByRole = handleRequest(User.getWithTheSameRole);
const getUserById = handleRequest(User.getById);
const getUserByNickname = handleRequest(User.getByNickname);
const addUser = handleRequest(User.create);
const updateUserInfo = handleRequest(User.updateById);
const deleteUser = handleRequest(User.deleteById);

module.exports = {
  getAllUsers,
  getUsersByRole,
  getUserById,
  getUserByNickname,
  addUser,
  updateUserInfo,
  deleteUser,
};

const UserAnswer = require('../models/UserAnswer');
const { handleRequest } = require('./requestHandler');

const getAllUserAnswers = handleRequest(UserAnswer.getAll);
const getUserAnswerById = handleRequest(UserAnswer.getById);
const addUserAnswer = handleRequest(UserAnswer.add);
const deleteUserAnswerById = handleRequest(UserAnswer.deleteById);

module.exports = {
  getAllUserAnswers,
  getUserAnswerById,
  addUserAnswer,
  deleteUserAnswerById,
};

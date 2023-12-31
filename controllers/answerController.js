const Answer = require('../models/Answer');
const { handleRequest } = require('./requestHandler');

const getAllAnswers = handleRequest(Answer.getAll);
const getAnswerById = handleRequest(Answer.getById);
const getAnswerByQuestionId = handleRequest(Answer.getByQuestionId);
const addAnswer = handleRequest(Answer.add);
const changeAnswer = handleRequest(Answer.updateById);
const removeAnswer = handleRequest(Answer.deleteById);

module.exports = {
  getAllAnswers,
  getAnswerById,
  getAnswerByQuestionId,
  addAnswer,
  changeAnswer,
  removeAnswer,
};
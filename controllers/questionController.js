const Question = require('../models/Question');
const { handleRequest } = require('./requestHandler');

const getAllQuestions = handleRequest(Question.getAll);
const getQuestionById = handleRequest(Question.getById);
const getQuestionsByQuizId = handleRequest(Question.getAllInRequiredQuiz);
const addQuestion = handleRequest(Question.create);
const editQuestion = handleRequest(Question.updateById);
const deleteQuestion = handleRequest(Question.deleteById);

module.exports = {
  getAllQuestions,
  getQuestionById,
  getQuestionsByQuizId,
  addQuestion,
  editQuestion,
  deleteQuestion,
};

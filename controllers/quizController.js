const Quiz = require('../models/Quiz');
const { handleRequest } = require('./requestHandler');

const getAllQuizzes = handleRequest(Quiz.getAll);
const getQuizById = handleRequest(Quiz.getById);
const createQuiz = handleRequest(Quiz.create);
const changeQuizMetadata = handleRequest(Quiz.updateById);
const deleteQuiz = handleRequest(Quiz.deleteById);

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  changeQuizMetadata,
  deleteQuiz,
};
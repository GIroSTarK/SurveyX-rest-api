const express = require('express');
const {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  changeQuizMetadata,
  deleteQuiz
} = require('../controllers/quizController');
const quizRouter = new express.Router();

quizRouter.get('/', getAllQuizzes);
quizRouter.post('/', createQuiz);

quizRouter
  .route('/:id')
  .get(getQuizById)
  .patch(changeQuizMetadata)
  .delete(deleteQuiz);

module.exports = { quizRouter };
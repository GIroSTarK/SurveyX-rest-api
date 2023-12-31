const express = require('express');
const {
  getAllQuestions,
  getQuestionById,
  getQuestionsByQuizId,
  addQuestion,
  editQuestion,
  deleteQuestion
} = require('../controllers/questionController');
const questionRouter = new express.Router();

questionRouter.get('/', getAllQuestions);
questionRouter.get('/quiz/:id', getQuestionsByQuizId);
questionRouter.post('/', addQuestion);

questionRouter
  .route('/:id')
  .get(getQuestionById)
  .patch(editQuestion)
  .delete(deleteQuestion);

module.exports = { questionRouter };
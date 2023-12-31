const express = require('express');
const {
  getAllAnswers,
  getAnswerById,
  getAnswerByQuestionId,
  addAnswer,
  changeAnswer,
  removeAnswer
} = require('../controllers/answerController');
const answerRouter = new express.Router();

answerRouter.get('/', getAllAnswers);
answerRouter.get('/question/:id', getAnswerByQuestionId);
answerRouter.post('/', addAnswer);

answerRouter
  .route('/:id')
  .get(getAnswerById)
  .patch(changeAnswer)
  .delete(removeAnswer);

module.exports = { answerRouter };
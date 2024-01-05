const express = require('express');
const {
  getAllUserAnswers,
  getUserAnswerById,
  addUserAnswer,
} = require('../controllers/userAnswerController');
const userAnswerRouter = new express.Router();

userAnswerRouter.get('/', getAllUserAnswers);
userAnswerRouter.get('/:id', getUserAnswerById);
userAnswerRouter.post('/', addUserAnswer);

module.exports = { userAnswerRouter };

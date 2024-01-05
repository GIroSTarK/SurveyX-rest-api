const express = require('express');
const {
  getAllUserAnswers,
  getUserAnswerById,
  addUserAnswer,
  deleteUserAnswerById,
} = require('../controllers/userAnswerController');
const userAnswerRouter = new express.Router();

userAnswerRouter.get('/', getAllUserAnswers);
userAnswerRouter.get('/:id', getUserAnswerById);
userAnswerRouter.post('/', addUserAnswer);
userAnswerRouter.delete('/:id', deleteUserAnswerById);

module.exports = { userAnswerRouter };

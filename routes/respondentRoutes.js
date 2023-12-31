const express = require('express');
const {
  getAllRespondents,
  getRespondentById,
  addRespondent
} = require('../controllers/respondentController');
const respondentRouter = new express.Router();

respondentRouter.get('/', getAllRespondents);
respondentRouter.get('/:id', getRespondentById);
respondentRouter.post('/', addRespondent);

module.exports = { respondentRouter };
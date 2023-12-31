const express = require('express');
const {
  getAllSelectedOptions,
  getSelectedOptionById,
  addSelectedOption
} = require('../controllers/selectedController');
const selectedRouter = new express.Router();

selectedRouter.get('/', getAllSelectedOptions);
selectedRouter.get('/:id', getSelectedOptionById);
selectedRouter.post('/', addSelectedOption);

module.exports = { selectedRouter };
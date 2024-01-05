const express = require('express');
const {
  getAllSelectedOptions,
  getSelectedOptionById,
  addSelectedOption,
  deleteSelectedOptionById,
} = require('../controllers/selectedController');
const selectedRouter = new express.Router();

selectedRouter.get('/', getAllSelectedOptions);
selectedRouter.get('/:id', getSelectedOptionById);
selectedRouter.post('/', addSelectedOption);
selectedRouter.delete('/:id', deleteSelectedOptionById);

module.exports = { selectedRouter };

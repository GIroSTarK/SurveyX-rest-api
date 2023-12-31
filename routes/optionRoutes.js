const express = require('express');
const {
  getAllOptions,
  getOptionById,
  getOptionByQuestionId,
  addOption,
  editOption,
  deleteOption
} = require('../controllers/optionController');
const optionRouter = new express.Router();

optionRouter.get('/', getAllOptions);
optionRouter.get('/question/:id', getOptionByQuestionId);
optionRouter.post('/', addOption);

optionRouter
  .route('/:id')
  .get(getOptionById)
  .patch(editOption)
  .delete(deleteOption);

module.exports = { optionRouter };
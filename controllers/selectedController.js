const SelectedOption = require('../models/SelectedOption');
const { handleRequest } = require('./requestHandler');

const getAllSelectedOptions = handleRequest(SelectedOption.getAll);
const getSelectedOptionById = handleRequest(SelectedOption.getById);
const addSelectedOption = handleRequest(SelectedOption.add);
const deleteSelectedOptionById = handleRequest(SelectedOption.deleteById);

module.exports = {
  getAllSelectedOptions,
  getSelectedOptionById,
  addSelectedOption,
  deleteSelectedOptionById,
};

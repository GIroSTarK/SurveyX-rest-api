const Option = require('../models/Option');
const { handleRequest } = require('./requestHandler');

const getAllOptions = handleRequest(Option.getAll);
const getOptionById = handleRequest(Option.getById);
const getOptionByQuestionId = handleRequest(Option.getByQuestionId);
const addOption = handleRequest(Option.add);
const editOption = handleRequest(Option.updateById);
const deleteOption = handleRequest(Option.deleteById);

module.exports = {
  getAllOptions,
  getOptionById,
  getOptionByQuestionId,
  addOption,
  editOption,
  deleteOption,
};
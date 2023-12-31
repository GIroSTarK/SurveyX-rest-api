const Respondent = require('../models/Respondent');
const { handleRequest } = require('./requestHandler');

const getAllRespondents = handleRequest(Respondent.getAll);
const getRespondentById = handleRequest(Respondent.getById);
const addRespondent = handleRequest(Respondent.add);

module.exports = {
  getAllRespondents,
  getRespondentById,
  addRespondent,
};

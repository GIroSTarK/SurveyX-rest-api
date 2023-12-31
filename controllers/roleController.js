const Role = require('../models/Role');
const { handleRequest } = require('./requestHandler');

const getAllRoles = handleRequest(Role.getAll);
const getRoleById = handleRequest(Role.getById);
const addRole = handleRequest(Role.create);
const changeRoleInfo = handleRequest(Role.updateById);
const deleteRole = handleRequest(Role.deleteById);

module.exports = {
  getAllRoles,
  getRoleById,
  addRole,
  changeRoleInfo,
  deleteRole,
};
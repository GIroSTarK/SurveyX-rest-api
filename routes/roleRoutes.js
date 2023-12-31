const express = require('express');
const {
  getAllRoles,
  getRoleById,
  addRole,
  changeRoleInfo,
  deleteRole
} = require('../controllers/roleController');
const roleRouter = new express.Router();

roleRouter.get('/', getAllRoles);
roleRouter.post('/', addRole);

roleRouter
  .route('/:id')
  .get(getRoleById)
  .patch(changeRoleInfo)
  .delete(deleteRole);

module.exports = { roleRouter };
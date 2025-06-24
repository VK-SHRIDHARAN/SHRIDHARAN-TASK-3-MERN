const express = require('express');
const employeeRouter = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  createEmployee,
  deleteEmployee
} = require('../../controllers/empControllers');

employeeRouter.route('/')
  .get(getAllEmployees)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor) ,updateEmployee)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),createEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee);

employeeRouter.route('/:id')
  .get(getEmployee);

module.exports = employeeRouter;
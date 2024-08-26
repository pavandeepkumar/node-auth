const role=require('./role-management.controllers')
module.exports = {
    list:role.getAllRoleListController,
    create:role.createRoleController,
    update:role.updateRoleController,
    delete:role.deleteRoleController
}
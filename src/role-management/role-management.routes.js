const express = require('express')
const role = require('./index.js')
const roleManagementRouter = express.Router()
roleManagementRouter.get('/list', role.list)
roleManagementRouter.post('/create', role.create)
roleManagementRouter.put('/update/:id', role.update)
roleManagementRouter.delete('/delete/:id', role.delete)
module.exports = roleManagementRouter
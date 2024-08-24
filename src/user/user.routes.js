const express = require('express')
const ROUTE = require('../config')
const { SignupController, GetAllUsersController, LoginController, DeleteUser, UpdateUser } = require('./user.controller')

const userRouter = express.Router()
userRouter.post('/signup', SignupController)
userRouter.get('/all',GetAllUsersController)
userRouter.post('/login', LoginController)
userRouter.delete(`/delete/:id`, DeleteUser)
userRouter.put(`/update/:id`, UpdateUser)
module.exports = userRouter

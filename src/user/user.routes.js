const express = require('express')
const ROUTE = require('../config')
const { SignupController, GetAllUsersController, LoginController, DeleteUser, UpdateUser } = require('./user.controller')
const authenticateJWT = require('../middleware/Auth.middleware')

const userRouter = express.Router()
userRouter.post('/signup', SignupController)
userRouter.get('/all', authenticateJWT, GetAllUsersController)
userRouter.post('/login', LoginController)
userRouter.delete(`/delete/:id`, authenticateJWT, DeleteUser)
userRouter.put(`/update/:id`, authenticateJWT, UpdateUser)
module.exports = userRouter

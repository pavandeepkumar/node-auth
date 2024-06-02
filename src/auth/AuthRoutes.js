const express = require('express')
const ROUTE = require('../config')
const { SignupController, LoginController, DeleteUser, UpdateUser } = require('./Auth.controller')
const userRouter = express.Router()
userRouter.post(ROUTE.USER.SIGNUP, SignupController)
userRouter.post(ROUTE.USER.LOGIN, LoginController)
userRouter.delete(`${ROUTE.USER.DELETE}/:id`, DeleteUser)
userRouter.put(`${ROUTE.USER.UPDATE}/:id`, UpdateUser)
module.exports = userRouter

const express = require('express')
const ROUTE = require('../config')
const { SignupController,LoginController } = require('./Auth.controller')
const userRouter = express.Router()
userRouter.post(ROUTE.USER.SIGNUP,SignupController)
userRouter.post(ROUTE.USER.LOGIN,LoginController)
module.exports = userRouter

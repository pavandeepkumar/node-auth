const express = require('express')
const ROUTE = require('../config')
const { LoginController } = require('./Auth.controller')
const userRouter = express.Router()
userRouter.post(ROUTE.USER.LOGIN,LoginController)
module.exports = userRouter

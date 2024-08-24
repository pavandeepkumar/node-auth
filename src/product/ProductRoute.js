const express = require('express')
const ROUTE = require('../config')
const { ProductCreateController, ProductGetAllController, ProductGetByIdController, ProductDeleteController, ProductUpdateController } = require('./Product.controllers')
const { authenticateJWT } = require('../middleware/Auth.middleware')

const productRouter = express.Router()
productRouter.post(ROUTE.PRODUCT.CREATE, authenticateJWT, ProductCreateController)
productRouter.get(ROUTE.PRODUCT.LIST, authenticateJWT, ProductGetAllController)
productRouter.get(`${ROUTE.PRODUCT.ID}/:id`, authenticateJWT, ProductGetByIdController)
productRouter.delete(`${ROUTE.PRODUCT.DELETE}/:id`, authenticateJWT, ProductDeleteController)
productRouter.put(`${ROUTE.PRODUCT.UPDATE}/:id`, authenticateJWT, ProductUpdateController)
module.exports = productRouter

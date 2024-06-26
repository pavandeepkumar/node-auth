const express = require('express')
const ROUTE = require('../config')
const { ProductCreateController, ProductGetAllController, ProductGetByIdController, ProductDeleteController, ProductUpdateController } = require('./Product.controllers')
const productRouter = express.Router()
productRouter.post(ROUTE.PRODUCT.CREATE, ProductCreateController)
productRouter.get(ROUTE.PRODUCT.LIST, ProductGetAllController)
productRouter.get(`${ROUTE.PRODUCT.ID}/:id`, ProductGetByIdController)
productRouter.delete(`${ROUTE.PRODUCT.DELETE}/:id`, ProductDeleteController)
productRouter.put(`${ROUTE.PRODUCT.UPDATE}/:id`, ProductUpdateController)
module.exports = productRouter

const express = require('express')
const { ProductCreateController, ProductGetAllController, ProductGetByIdController, ProductDeleteController, ProductUpdateController } = require('./product.controllers')
const { authenticateJWT } = require('../middleware')
const productRouter = express.Router();
productRouter.post('/create', ProductCreateController);
productRouter.get('/list',  ProductGetAllController);
productRouter.get(`/list/:id`, ProductGetByIdController);
productRouter.delete(`/delete/:id`, ProductDeleteController);
productRouter.put(`/update/:id`, ProductUpdateController);
module.exports = { productRouter }

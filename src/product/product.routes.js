const express = require('express')

const { authenticateJWT } = require('../middleware');
const { ProductCreateController, ProductGetAllController, ProductGetByIdController, ProductDeleteController, ProductUpdateController } = require('./index.js');
const productRouter = express.Router();
productRouter.post('/create', ProductCreateController);
productRouter.get('/list',  ProductGetAllController);
productRouter.get(`/list/:id`, ProductGetByIdController);
productRouter.delete(`/delete/:id`, ProductDeleteController);
productRouter.put(`/update/:id`, ProductUpdateController);
module.exports = { productRouter }

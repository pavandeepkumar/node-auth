const express = require('express')
const product = require('./index.js');
const productRouter = express.Router();
productRouter.post('/create', product.create);
productRouter.get('/list', product.list);
productRouter.get(`/list/:id`, product.getById);
productRouter.delete(`/delete/:id`, product.delete);
productRouter.put(`/update/:id`, product.update);
module.exports = productRouter 

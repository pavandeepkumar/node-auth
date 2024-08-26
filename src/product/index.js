
const product = require("./product.controllers.js");
const Product = require("./product.model");
const productRouter = require("./product.routes.js");
module.exports = {
    Product,
    productRouter,
    create: product.ProductCreateController,
    delete: product.ProductDeleteController,
    list: product.ProductGetAllController,
    getById: product.ProductGetByIdController,
    update: product.ProductUpdateController
}
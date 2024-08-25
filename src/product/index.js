
const { ProductCreateController, ProductDeleteController, ProductGetAllController, ProductGetByIdController, ProductUpdateController } = require("./product.controllers.js");
const Product = require("./product.model");
const { productRouter } = require("./product.routes");

module.exports = {
    Product,
    productRouter,
    ProductCreateController,
    ProductDeleteController,
    ProductGetAllController,
    ProductGetByIdController,
    ProductUpdateController
}
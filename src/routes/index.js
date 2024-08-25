const authenticateJWT = require("../middleware/Auth.middleware");
const { productRouter } = require("../product");
const { userRouter } = require("../user");

function initialize(app) {
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/product',authenticateJWT, productRouter);
}
module.exports = {
    initialize
}

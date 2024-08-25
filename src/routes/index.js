const { corsMiddleware} = require("../middleware");
const authenticateJWT = require("../middleware/Auth.middleware");
const { productRouter } = require("../product");
const { userRouter } = require("../user");

function initialize(app) {
    // app.use(corsMiddleware);
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/product',authenticateJWT, productRouter); // Add authenticateJWT middleware to the product route
}
module.exports = {
    initialize
}

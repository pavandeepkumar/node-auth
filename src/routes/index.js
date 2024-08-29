const authenticateJWT = require("../middleware/Auth.middleware");
const userRouter = require("../user/user.routes");
const productRouter = require('../product/product.routes');
const roleManagementRouter = require("../role-management/role-management.routes");
function initialize(app) {
    app.use('/api/v1/user', userRouter);
    app.use('/api/v1/product', productRouter);
    app.use('/api/v1/role', roleManagementRouter);
}
module.exports = {
    initialize
}
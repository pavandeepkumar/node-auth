const { SignupController, LoginController, GetAllUsersController, UpdateUser, DeleteUser } = require("./user.controller");
const User = require("./user.model");
const userRouter = require("./user.routes");
module.exports={
    User,
    userRouter,
    SignupController,
    LoginController,
    GetAllUsersController,
    UpdateUser,
    DeleteUser
}
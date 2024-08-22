const { default: mongoose } = require("mongoose");
const { validateUserInput } = require("../utility/validation");
const User = require("./Auth.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'

// DEFINE SIGNUP FUNCTION 
const SignupController = async (req, res) => {
    const user = req.body;
    // Validate user input
    const errors = validateUserInput(user);
    if (errors.length > 0) {
        return res.status(400).json({ status: 400, errors });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    let userData = {
        name: user.name,
        email: user.email,
        password: hashedPassword,
    };

    try {
        // Check for duplicate email
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
            return res.status(409).json({ status: 409, error: "Email is already registered" });
        }

        // Create new user
        const response = await User.create(userData);
        if (response) {
            return res.status(201).json(response);
        }
    } catch (error) {
        console.log("User is not created");
        return res.status(500).json({ status: 500, error: error.message });
    }
};

// DEFINE LOGIN FUNCTION
const LoginController = async (req, res) => {
    const user = req.body;

    if (!user.email) {
        return res.status(403).json({ status: false, error: "Please enter a valid email" });
    }

    if (!user.password) {
        return res.status(403).json({ status: false, error: "Please enter a valid password" });
    }

    const email = user.email;

    try {
        const response = await User.findOne({ email });

        if (!response) {
            return res.status(404).json({ status: false, error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(user.password, response.password);

        if (!passwordMatch) {
            return res.status(403).json({ status: false, error: "Password mismatch" });
        }

        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
            { id: response._id, email: response.email },
            jwtSecret,
            { expiresIn: maxAge } // 3 hours in seconds
        );


        const userResponse = {
            id: response._id,
            email: response.email,
            name: response.name
        };

        return res.json({
            status: true,
            data: {
                user: userResponse,
                token: token
            }
        });
    } catch (error) {
        console.log("error", error);
        return res.status(403).json({ status: false, error: error.message });
    }
};


// DEFINE DELETE USER FUNCTIONS
const DeleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).json({ status: false, error: "Id required" });
    }
    try {
        const response = await User.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ status: false, error: "error in deleting user" });
        }
        return res.json({ status: true, msg: "User deleted successfully" });
    } catch (error) {
        return res.status(404).json({ status: false, error: error.message });
    }

}

// DEFINE UPDATE USER FUNCTION
const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name, password } = req.body;

    if (!id) {
        return res.status(404).json({ status: false, error: "ID required" });
    }

    if (!email || !name || !password) {
        return res.status(400).json({ status: false, error: "Email, name, and password are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ status: false, error: "Invalid ID format" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== id) {
            return res.status(400).json({ status: false, error: "Email already in use" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ status: false, error: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.email = email;
        user.name = name;
        user.password = hashedPassword;

        const updatedUser = await user.save();
        return res.json({ status: true, message: "user updated successfully", user: updatedUser });

    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
};

const GetAllUsersController = async (req, res, next) => {
    try {
        const result = await User.find({})
        console.log("result", result)
        if (!result) {
            return res.status(404).json({ status: false, message: "No Users found" });
        }
        return res.json({ status: true, data: result });
    } catch (error) {

        return res.status(500).json({ status: false, error: error });
    }
}
module.exports = {
    SignupController,
    LoginController,
    DeleteUser,
    UpdateUser,
    GetAllUsersController
};

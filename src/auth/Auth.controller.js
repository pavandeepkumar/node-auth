const User = require("./Auth.model");
const bcrypt = require("bcryptjs");

const validateUserInput = (user) => {
    let errors = [];

    if (!user.name) errors.push("Name is required");
    if (!user.email) {
        errors.push("Email is required");
    }
    if (!user.password) {
        errors.push("Password is required");
    } else if (user.password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    } else if (!/\d/.test(user.password)) {
        errors.push("Password must contain at least one number");
    } else if (!/[a-z]/.test(user.password)) {
        errors.push("Password must contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(user.password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    return errors;
};

const LoginController = async (req, res) => {
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
            console.log("User is created successfully");
            return res.status(201).json(response);
        }
    } catch (error) {
        console.log("User is not created");
        return res.status(500).json({ status: 500, error: error.message });
    }
};

module.exports = {
    LoginController,
};

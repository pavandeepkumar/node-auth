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

module.exports ={
    validateUserInput
}
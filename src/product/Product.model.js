const { default: mongoose } = require("mongoose");

// Define the schema for the product
const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        default: 0, 
    },
    description: {
        type: String,
        required: true,
    },
    productDetails: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Create the model from the schema
const Product = mongoose.model("Product", productSchema);

// Export the model
module.exports = Product;

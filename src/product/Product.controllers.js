const Product = require("./Product.model");

const jwt = require('jsonwebtoken')

// DEFINE PRODUCT CREATE CONTROLLER
const ProductCreateController = async (req, res) => {
    const { userId, name, price, image, description, discount, productDetails } = req.body;
    console.log("req.body", req.body)
    if (!userId && !name && !price && !image && !description && !discount) {
        return res.json({ status: false, message: "Please enter all required fields" })
    }
    try {
        const response = await Product.create({
            userId, name, price, image, description, discount, productDetails
        })
        if (response) {
            return res.json({ success: true, message: 'Create Product successfully', product: response });
        }
        else {
            return res.json({ status: false, message: "Product creation failed" });
        }
    } catch (error) {

        console.log("error in Product.create", error)
        return res.json({ status: false, message: error.message });
    }

}

// DEFINE FUNCTION TO GET ALL PRODUCT

const ProductGetAllController = async (req, res) => {
    console.log("Incoming request to fetch all products");
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const tokenValue = token.split(" ")[1]
    const tokenDecoded = jwt.verify(tokenValue, process.env.JWT_SECRET)
    console.log(
        "tokenDecoded", tokenDecoded
    )
    if (!tokenDecoded) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
    // const { userId } = req.params;
    // // Check if userId is provided
    // if (!userId) {
    //     return res.status(400).json({ success: false, message: "User ID is required" });
    // }

    try {
        const products = await Product.find({ userId: tokenDecoded?.id }).select('-image');

        // Handle the case where no products are found
        if (products && products.length === 0) {
            return res.status(404).json({ success: true, message: "No products found", products: [] });
        }

        console.log("Products fetched successfully:", products);
        return res.status(200).json({ success: true, message: 'Fetched all products successfully', products: products });

    } catch (error) {
        console.error("Error in fetching all products:", error.message);
        return res.status(500).json({ success: false, message: "Failed to fetch all products", error: error.message });
    }
}


// DEFINE FUNCTION TO GET PRODUCT BY PRODUCT ID

const ProductGetByIdController = async (req, res) => {
    const { userId } = req.body
    const { id } = req.params
    try {
        const product = await Product.find({ _id: id })
        console.log("product", product)

        if (!product) {
            return res.json({ success: false, message: 'product not found', })
        }
        if (product) {
            const productById = await product.find((product) => product._id == id)

            return res.json({ success: true, message: 'product fetch successfully', product: productById });
        }
    } catch (error) {
        return res.json({ success: false, error: error });
    }
}

// DEFINE FUNCTION TO UPDATE PRODUCT

const ProductUpdateController = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        // Find the product by id
        const product = await Product.findById(id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Update the product with new data
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        // Return the updated product
        return res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error.message);
        return res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
    }
};



// DEFINE FUNCTION TO DELETE PRODUCT

const ProductDeleteController = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the product by id
        const product = await Product.findById(id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Delete the product
        await Product.findByIdAndDelete(id);

        // Return success response
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });

    } catch (error) {
        console.error("Error deleting product:", error.message);
        return res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
    }
};


module.exports = {
    ProductCreateController,
    ProductDeleteController,
    ProductGetAllController,
    ProductUpdateController,
    ProductGetByIdController
}
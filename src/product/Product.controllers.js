const Product = require("./product.model");

// DEFINE PRODUCT CREATE CONTROLLER
const ProductCreateController = async (req, res, next) => {
    const { name, price, image, description, discount, productDetails } = req.body;
    const { id: userId } = req.user;
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

    if (!req.user || !req.user.id) {
        console.error("Invalid or missing user ID in request");
        return res.status(400).json({ success: false, message: "Invalid or missing Token" });
    }

    const { id } = req.user;
    const resultsPerPage = req.query.limit ?? 10;
    console.log("result per page", resultsPerPage)

    let page = req.query.page >= 1 ? req.query.page : 1;
    console.log("page", page)
    const query = req.query.search;
    console.log("object query", query)
    const totalCount=await Product.countDocuments({userId: id}).lean()
    try {
        const products = await Product.find({ userId: id }).select('-image').limit(resultsPerPage).skip((page - 1) * resultsPerPage).lean();

        // Handle the case where no products are found
        if (!products || products.length === 0) {
            console.log("No products found for user ID:", id);
            return res.status(404).json({ success: true, message: "No products found", products: [] });
        }

        console.log("Products fetched successfully:", products);
        const payload={
            totalCount,
            PerPage: resultsPerPage,
            currentPage: page,
            product: products
        }
        return res.status(200).json({ success: true, message: 'Fetched all products successfully', data: payload});

    } catch (error) {
        console.error("Error in fetching all products:", error.message);

        // Handle specific known errors if needed
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: "Invalid user ID format", error: error.message });
        }

        // General error handling
        return res.status(500).json({ success: false, message: "Failed to fetch all products", error: error.message });
    }
}



// DEFINE FUNCTION TO GET PRODUCT BY PRODUCT ID

const ProductGetByIdController = async (req, res) => {

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
    const { id: userId } = req.user;
    const updatedData = { ...updateData, userId };
    console.log("updated data: ", updatedData)
    try {
        // Find the product by id
        const product = await Product.findById(id);

        // Check if product exists
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Update the product with new data
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

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
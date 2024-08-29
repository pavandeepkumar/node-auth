// const redis = require("../config/RadisConnection");
const client = require("../config/RadisConnection");
const { success, customResponse, error, unAuthentication } = require("../helper/CommonResponse");
const Product = require("./product.model");
const product = require("./product.services");
const { createClient } = require('redis');



// DEFINE PRODUCT CREATE CONTROLLER
const ProductCreateController = async (req, res, next) => {
    const { name, price, image, description, discount, productDetails } = req.body;
    const { id: userId } = req.user;
    console.log("req.body", req.body)
    if (!userId && !name && !price && !image && !description && !discount) {
        error(res, "validation failed", 400)
    }
    try {
        const payload = {
            userId,
            name,
            price,
            image,
            description,
            discount,
            productDetails
        }
        const response = await product.add(payload)
        if (response) {

            success(res, "success", 201, response, "Product created successfully")
        }
        else {
            error(res, "error", 404, response, "Product")
        }
    } catch (error) {

        console.log("error in Product.create", error)
        error(res, "error", 500, error, "Product Create Failed")
    }

}

// DEFINE FUNCTION TO GET ALL PRODUCT


const ProductGetAllController = async (req, res) => {
    console.log("Incoming request to fetch all products");

    if (!req.user || !req.user.id) {
        console.error("Invalid or missing user ID in request");
        return error(res, "Invalid or missing Token", 400);
    }

    const { id } = req.user;
    const resultsPerPage = req.query.limit ?? 10;
    let page = req.query.page >= 1 ? req.query.page : 1;
    const sort = req.query.createdAt;
    const sortName = req.query.name;
    const query = req.query.search;
    const skipCount = (page - 1) * resultsPerPage;
    const sortByCreatedAt = sort == 'ASC' ? 1 : -1;
    const sortByName = sortName == 'DESC' ? -1 : 1;

    // const cacheKey = `Product:${id}-${page}-${resultsPerPage}-${query}-${sortByCreatedAt}-${sortByName}`;

    try {
        // const cachedData = await client.get(cacheKey);
        // if (cachedData) {
        //     console.log("Cache hit");
        //     const data = JSON.parse(cachedData);
        //     return success(res, "Successfully fetched all products (from cache)", 200, data);
        // }

        console.log("Cache miss");

        const products = await product.list({ id, query, resultsPerPage, skipCount, sortByCreatedAt, sortByName });
        let totalCount = await product.count({ id, query });

        if (!products || products.length === 0) {
            return customResponse(res, 404, 404, products, "No products found");
        }

        const payload = {
            totalCount,
            PerPage: resultsPerPage,
            currentPage: page,
            product: products,
        };

        // await client.set(cacheKey, JSON.stringify(payload), {
        //     EX: 3600 // 1 hour expiration
        // });

        return success(res, "Successfully fetched all products", 200, payload);

    } catch (err) {
        console.error("Error in fetching all products:", err.message);
        return error(res, "Error in fetching all products", 500);
    }
};




// DEFINE FUNCTION TO GET PRODUCT BY PRODUCT ID

const ProductGetByIdController = async (req, res) => {

    const { id } = req.params
    const { id: userId } = req.user

    try {
        const product = await Product.find({ userId, _id: id })

        console.log("product", product)

        if (!product) {
            return res.json({ success: false, message: 'product not found', })
        }
        if (product) {
            success(res, "success", 200, product)
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
        success(res, 'Product updated successfully', 200, updatedProduct)
        // return res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });

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
        success(res, 'Product deleted successfully', 200)
        // return res.status(200).json({ success: true, message: 'Product deleted successfully' });

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
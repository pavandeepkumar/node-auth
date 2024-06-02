const Product = require("./Product.model");

// DEFINE PRODUCT CREATE CONTROLLER
const ProductCreateController = async (req, res) => {
    const { userId, name, price, image, description, discount, productDetails } = req.body;
    if (!userId && !name && !price && !image && !description && !discount) {
        return res.json({ status: false, message: "Please enter all required fields" })
    }
    try {
        const response = await Product.create({
            userId, name, price, image, description, discount, productDetails
        })
        return res.json({ success: true, message: 'Create Product successfully', product: response });
    } catch (error) {
        console.log("error in Product.create")
    }

}

// DEFINE FUNCTION TO GET ALL PRODUCT

const ProductGetAllController = async (req, res) => {
    const { userId } = req.body;
   try {
    const product = await Product.find({ userId })
    return res.json({ success: true, message: 'fetch all product successfully', product: product });
   } catch (error) {
    console.log("error in fetching all products ")
return res.json({ success: false, message:"Failed to fetch all products"})
   }
}

// DEFINE FUNCTION TO GET PRODUCT BY PRODUCT ID

const ProductGetByIdController = async (req, res) => {
    const { userId } = req.body
    const { id } = req.params
    try {
        const product = await Product.find({ userId })
        
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
    const { id } = req.params
    try {
        const product = await Product.findById({ id })
        if (product) {
            return res.json({ success: true, message: 'update product', product: product });
        }
    } catch (error) {
        return res.json({ error: error });
    }
}


// DEFINE FUNCTION TO DELETE PRODUCT

const ProductDeleteController = (req, res) => {
    return res.json({ success: true, message: 'delete product' });
}

module.exports = {
    ProductCreateController,
    ProductDeleteController,
    ProductGetAllController,
    ProductUpdateController,
    ProductGetByIdController
}
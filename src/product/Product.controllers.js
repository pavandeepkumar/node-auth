// DEFINE PRODUCT CREATE CONTROLLER
const ProductCreateController = (req, res) => {
    return res.json({ success: true, message: 'Create Product successfully' });
}

// DEFINE FUNCTION TO GET ALL PRODUCT

const ProductGetAllController = (req, res) => {
    return res.json({ success: true, message: 'get all products' });
}

// DEFINE FUNCTION TO GET PRODUCT BY PRODUCT ID

const ProductGetByIdController = (req, res) => {

    return res.json({ success: true, message: 'get product by product ID' });
}

// DEFINE FUNCTION TO UPDATE PRODUCT

const ProductUpdateController = (req, res) => {

    return res.json({ success: true, message: 'update product' });
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
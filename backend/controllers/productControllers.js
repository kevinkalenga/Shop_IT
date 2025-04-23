import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js"

// Get all the products
export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({
        products
    })
};

// Create new product => /api/v1/admin/products
export const newProduct = async (req, res) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
};
// Get Single product details => /api/v1/products/:id
export const getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Produc not found", 404))
    }

    res.status(200).json({
        product,
    })
};
// update product  => /api/v1/products/:id
export const updateProduct = async (req, res) => {
    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return res.status(404).json({
            error: "Product not found",
        });
    }
    // The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true
    })

    res.status(200).json({
        product,
    })
};

// delete product  => /api/v1/products/:id
export const deleteProduct = async (req, res) => {
    // search the product in the database
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return res.status(404).json({
            error: "Product not found",
        });
    }

    await product.deleteOne()

    res.status(200).json({
        message: "Product deleted"
    })
};
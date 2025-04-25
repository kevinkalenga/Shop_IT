import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilter.js"
import qs from 'qs';

// Get all the products
export const getProducts = catchAsyncErrors(async (req, res) => {

    const resPerPage = 4
    const parsedQuery = qs.parse(req._parsedUrl.query); // on parse manuellement
    // we have to pass the query and queryStr from the constructor
    console.log("Requête reçue :", req.query);

    const apiFilters = new APIFilters(Product.find(), parsedQuery).search().filters();


    let products = await apiFilters.getQuery();
    let filteredProductsCount = products.length

    apiFilters.pagination(resPerPage)
    products = await apiFilters.query.clone()

    res.status(200).json({
        resPerPage,
        filteredProductsCount,
        products
    })
});

// Create new product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        product,
    })
});
// Get Single product details => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Produc not found", 404))
    }

    res.status(200).json({
        product,
    })
});
// update product  => /api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Produc not found", 404))
    }
    // The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.
    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true
    })

    res.status(200).json({
        product,
    })
});

// delete product  => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
    // search the product in the database
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Produc not found", 404))
    }

    await product.deleteOne()

    res.status(200).json({
        message: "Product deleted"
    })
});
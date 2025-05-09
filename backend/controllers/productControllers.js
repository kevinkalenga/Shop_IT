import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import APIFilters from "../utils/apiFilter.js"
import qs from 'qs';

// Get all the products
export const getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 4;

    // Copier les requêtes
    const normalizedQuery = qs.parse(req._parsedUrl.query);
    console.log("Requête reçue :", normalizedQuery);

    const query = { ...normalizedQuery };



    // Traitement des prix
    if (query.price?.gte) {
        query.price.gte = Number(query.price.gte);
    }

    if (query.price?.lte) {
        query.price.lte = Number(query.price.lte);
    }

    let filter = {};

    if (query.price?.gte || query.price?.lte) {
        filter.price = {};
        if (query.price.gte) filter.price.$gte = query.price.gte;
        if (query.price.lte) filter.price.$lte = query.price.lte;
    }

    if (query.keyword) {
        filter.name = { $regex: query.keyword, $options: 'i' };
    }

    const totalProducts = await Product.find(filter);

    const filteredProductsCount = totalProducts.length;

    const products = await Product.find(filter)
        .limit(resPerPage)
        .skip(resPerPage * ((query.page || 1) - 1));

    return res.status(200).json({
        resPerPage,
        filteredProductsCount,
        products,
    });
});


// Create new product => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {

    req.body.user = req.user._id

    // Explicitly cast price to Number
    if (req.body.price) {
        req.body.price = Number(req.body.price);
    }

    if (isNaN(req.body.price)) {
        return res.status(400).json({ message: "Invalid price value" });
    }

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
// Create/Update product review => /api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    }
    // search the product in the database
    const product = await Product.findById(productId)

    if (!product) {
        return next(new ErrorHandler("Produc not found", 404))
    }

    const isReviewed = product?.reviews?.find(
        (r) => r.user.toString() === req?.user?._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach((review) => {
            if (review?.user?.toString() === req?.user?.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true,
    })
});

// Get product reviews => /api/v1/reviews 
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 400))
    }

    res.status(200).json({
        reviews: product.reviews,
    })

})

// Delete product review => /api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    // find the product in the database
    let product = await Product.findById(req.query.productId)



    if (!product) {
        return next(new ErrorHandler("Produc not found", 404))
    }
    // we have a new array of reviews
    const reviews = product?.reviews?.filter(
        (review) => review._id.toString() !== req?.query?.id.toString()
    )

    // we have the number of reviews
    const numOfReviews = reviews.length


    const ratings =
        numOfReviews === 0 ? 0 :
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews


    product = await Product.findByIdAndUpdate(req.query.productId, { reviews, numOfReviews, ratings }, { new: true })

    res.status(200).json({
        success: true,
        product,
    })
});

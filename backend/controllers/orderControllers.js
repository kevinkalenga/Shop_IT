import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create new Order => /api/v1/orders/new 

export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItem,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
    } = req.body;

    const order = await Order.create({
        orderItem,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        paymentInfo,
        user: req.user._id,
    });

    res.status(200).json({
        order,
    })
});
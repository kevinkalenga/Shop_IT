import ErrorHandler from "../utils/errorHandler.js"

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    // Handle Invalid Mongoose ID Error 

    if (error.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err?.path}`
        error = new ErrorHandler(message, 404)
    }
    if (error.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => value.message)
        error = new ErrorHandler(message, 400)
    }

    // we show the stack in the development when there is an error
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stack: err?.stack,
        });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }


};
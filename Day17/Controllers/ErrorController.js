const CustomError = require("./../Utils/CustomeError");

const Deverror = (res, error) => {
    console.error("Development Error:", error);
    res.status(error.statusCode).json({
        status: error.status,
        msg: error.message,
        stackTrace: error.stack,
        error,
    });
};


const Producterr = (res, error) => {
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            msg: error.message,
        });
    } else {
        res.status(500).json({
            status: "error",
            msg: "Something went wrong! Please try again later...",
        });
    }
};

const castErrorHandler = (error) => new CustomError(`Invalid value ${error.value} for field ${error.path}`, 400);
const duplicateKeyError = (error) => new CustomError(`${Object.values(error.keyValue).join(", ")} is already in collection`, 400);
const durationError = (error) => new CustomError(`${Object.values(error.errors).join(", ")} is <= 120`, 500);
const handleExpiredJWT = (error) => new CustomError('JWT has expired.Please login Again',401);
const handleJWTError = (error) => new CustomError('Invalid Token, Please Login Again',401);
module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    if (process.env.NODE_ENV === "development") {
        Deverror(res, error);
    } else if (process.env.NODE_ENV === "production") {
        if (error.name === "CastError") error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateKeyError(error);
        if (error.name === "ValidationError") error = durationError(error);
        if (error.name === 'TokenExpiredError') {error = handleExpiredJWT(error);}
        if (error.name === 'JsonWebTokenError') {
            error = handleJWTError(error);
        }
        Producterr(res, error);
    }
};

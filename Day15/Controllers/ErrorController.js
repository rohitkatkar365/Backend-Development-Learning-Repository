const CustomError = require("./../Utils/CustomeError");

const Deverror = (res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    msg: error.message,
    stackTrace: error.stack,
    error: error,
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
      msg: "Something Went Wrong! Please try again later...",
    });
  }
};

const castErrorHandler = (error) => {
  const msg = `Invalid Value ${error.value} for field ${error.path}`;
  return new CustomError(msg, 400);
};

const duplicateKeyError = (error) => {
  const msg = `${Object.values(error.keyValue).join(
    ", "
  )} is already in collection`;
  return new CustomError(msg, 400);
};

const durationError = (error) => {
  const msg = `${Object.values(error.errors).join(", ")} is  <= 120`;
  return new CustomError(msg, 500);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    Deverror(res, error);
  } else if (process.env.NODE_ENV === "production") {
    error = { ...error };

    if (error.name === "CastError") {
      error = castErrorHandler(error);
    }

    if (error.code === 11000) {
      error = duplicateKeyError(error);
    }

    if (error.name === "ValidationError") {
      error = durationError(error);
    }

    Producterr(res, error);
  }
};

import createError from "http-errors";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return createError(400, message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return createError(400, message);
};

// development error
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(err.statusCode).json({
      ...err,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      message: err.message,
    });
  }
};

// production error
const sendErrorProd = (err, req, res) => {
  err.status = `${err.statusCode}`.startsWith("4") ? "fail" : "error";
  // A- Error handling for api
  if (req.originalUrl.startsWith("/api")) {
    if (err.statusCode === 500) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: "Something went very wrong!",
      });
    }

    return res.status(err.statusCode).json({
      status: err.status,
      ...err,
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.status || 500;
  err.status = `${err.statusCode}`.startsWith("4") ? "fail" : "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.kind === "ObjectId") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "UnauthorizedError")
      error = createError(
        401,
        "You are not logged in! Please log in to get access"
      );

    sendErrorProd(error, req, res);
  }
};

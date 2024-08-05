const globalErrHandler = (err, req, res, next) => {
  const stack = err.stack;
  const error = err.message;
  const statusCode = err.statusCode || 500;
  const errorObject = {
    error,
    stack,
    statusCode,
  };
  res.status(statusCode).json(errorObject);
};

module.exports = globalErrHandler;

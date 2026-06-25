const errorHandler = (err, req, res, next) => {
  console.error(`Error details: ${err.message}`);
  
  // Custom response status or default to 500 Server Error
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Include stack trace only in non-production mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;

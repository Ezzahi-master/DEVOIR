const errorMiddleware = (error, req, res, next) => {
  console.error(error);
  
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
};

module.exports = errorMiddleware;
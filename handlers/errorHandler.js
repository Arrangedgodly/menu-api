module.exports = function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error',
    error: err
  });
}
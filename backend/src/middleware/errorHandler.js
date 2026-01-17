// Generic error handler to return consistent shape
export const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const details = err.details || undefined;

  res.status(status).json({ message, details });
};

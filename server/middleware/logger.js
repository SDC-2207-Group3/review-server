export default (req, res, next) => {
  console.log(`Incoming request: ${req.originalUrl}
  Request type: ${req.method}`)
  next();
}
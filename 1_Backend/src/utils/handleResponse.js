const handleResponse = (res, statusCode, message) => {
  return res.status(statusCode).json(message);
};

module.exports = { handleResponse }

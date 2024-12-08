function successResponseMessage(res, message, data = null) {
  res.status(200).json({ status: "success", message, data });
}

function createdResponseMessage(res, message) {
  res.status(201).json({ status: "success", message });
}

function errorResponseMessage(res, message) {
  res.status(500).json({ status: "error", message });
}

function notFoundResponseMessage(res, message) {
  res.status(404).json({ status: "errors", message });
}

function badRequestResponseMessage(res, message) {
  res.status(400).json({ message });
}

function unauthorizedResponseMessage(res, message) {
  res.status(401).json({ message });
}

module.exports = {
  successResponseMessage,
  createdResponseMessage,
  errorResponseMessage,
  notFoundResponseMessage,
  badRequestResponseMessage,
  unauthorizedResponseMessage
};

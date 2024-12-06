export function successResponseMessage(res, message, data = null) {
  res.status(200).json({ status: "success", message, data });
}

export function createdResponseMessage(res, message) {
  res.status(201).json({ status: "success", message });
}

export function errorResponseMessage(res, message) {
  res.status(500).json({ status: "error", message });
}
export function notFoundResponseMessage(res, message) {
  res.status(404).json({ status: "errorss", message });
}

export function badRequestResponseMessage(res, message) {
  res.status(400).json({ message });
}

export function unauthorizedResponseMessage(res, message) {
  res.status(401).json({ message });
}

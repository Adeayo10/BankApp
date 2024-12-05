
export function successResponseMessage(res, message) {
    res.status(200).json({ status: 'success', message });
}

export function createdResponseMessage(res, message) {
    res.status(201).json({ status: 'success', message });
}

export function errorResponseMessage(res, message) {
    res.status(500).json({ status: 'error', message });
}
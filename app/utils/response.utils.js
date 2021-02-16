
function successResponse(res, data, code = 200) {
    return res.status(code).json({ data })
}

function errorResponse(res, message, code = 500) {
    return res.status(code).json({ code, error: message })
}

module.exports = {
    successResponse,
    errorResponse
}
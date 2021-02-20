
const successResponse = (res, data, code = 200) => {
    return res.status(code).json({ data })
}

const errorResponse = (res, message, code = 500) => {
    return res.status(code).json({ code, error: message })
}

const catchError = (res, error) => {
    const { status, message } = error
    return errorResponse(res, message, status)
}

const catchErrorElastic = (res, error) => {
    let { statusCode, message } = error
    if (statusCode === 404) {
        message = 'Registro no encontrado'
    }
    return errorResponse(res, message, statusCode)
}

module.exports = {
    successResponse,
    errorResponse,
    catchError,
    catchErrorElastic
}
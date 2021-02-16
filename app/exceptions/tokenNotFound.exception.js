class TokenNotFoundException extends Error {
    constructor(message) {
        super(message)
        this.status = 400
        this.message = message ? message : "Token de autorización no encontrado"
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = {
    TokenNotFoundException
}
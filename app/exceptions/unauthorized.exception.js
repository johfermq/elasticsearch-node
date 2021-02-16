class UnauthorizedException extends Error {
  constructor(message) {
    super(message)
    this.status = 401
    this.message = message ? message : "Acción no autorizada"
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  UnauthorizedException
}
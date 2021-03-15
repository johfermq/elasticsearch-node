class TokenInvalidException extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = message ? message : "Token de autorización no válido";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  TokenInvalidException
};
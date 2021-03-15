class InvalidCredentialsException extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.message = message ? message : "Credenciales no válidas";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  InvalidCredentialsException
};
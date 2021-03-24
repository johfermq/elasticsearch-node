class ModelNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.message = message ? message : "Modelo no encontrado";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ModelNotFoundException
};
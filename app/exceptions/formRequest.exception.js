class FormRequestException extends Error {
  constructor(message) {
    super(message);
    this.status = 422;
    this.message = message ? message : "Por favor complete los campos";
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  FormRequestException
};
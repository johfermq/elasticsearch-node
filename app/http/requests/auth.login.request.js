const { validate, validations } = require("indicative/validator");
const { sanitize } = require("indicative/sanitizer");

/** Utils */
const { catchError } = require("../../utils/response.utils");

/** Exceptions */
const { FormRequestException } = require("../../exceptions/formRequest.exception");

const authLoginRequest = (req, res, next) => {
  const rules = {
    email: [
      validations.required(),
      validations.email(),
      validations.regex([/^[^@]+@\w+(\.\w+)+\w$/])
    ],
    password: "required|string|min:6"
  };

  const schema = {
    email: "lower_case",
    password: "trim"
  };

  sanitize(req.body, schema);

  validate(req.body, rules, {}, { removeAdditional: true })
    .then(validated => {
      req.body = { ...validated };
      next();
    })
    .catch(errors => {
      catchError(res, new FormRequestException(errors));
    });
};

module.exports = {
  authLoginRequest
};
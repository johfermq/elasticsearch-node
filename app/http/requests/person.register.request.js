const { validate, validations } = require("indicative/validator");
const { sanitize } = require("indicative/sanitizer");

/** Utils */
const { catchError } = require("../../utils/response.utils");

/** Exceptions */
const { FormRequestException } = require("../../exceptions/formRequest.exception");

const personRegisterRequest = (req, res, next) => {
  const rules = {
    fistName: "required|string|min:3|max:30|alpha",
    lastName: "required|string|min:3|max:30|alpha",
    dateOfBirth: [
      validations.required(),
      validations.string(),
      validations.dateFormat(["YYYY-MM-DD"])
    ],
    gender: "required|string|in:feminine,male"
  };

  const schema = {
    fistName: "trim",
    lastName: "trim",
    dateOfBirth: "trim",
    gender: "trim"
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
  personRegisterRequest
};
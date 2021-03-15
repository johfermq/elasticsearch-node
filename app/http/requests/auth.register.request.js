const { validate, validations } = require("indicative/validator");
const { sanitize } = require("indicative/sanitizer");

/** Utils */
const { catchError } = require("../../utils/response.utils");

/** Rules */
const { uniqueRule } = require("../../rules/unique.rule");

/** Exceptions */
const { FormRequestException } = require("../../exceptions/formRequest.exception");

const authRegisterRequest = (req, res, next) => {
  uniqueRule(res);

  const rules = {
    name: "required|string|min:3|max:255",
    email: [
      validations.required(),
      validations.email(),
      validations.regex([/^[^@]+@\w+(\.\w+)+\w$/]),
      validations.max([255]),
      validations.unique(["user", "email"])
    ],
    password: "required|string|min:6|max:30|confirmed"
  };

  const schema = {
    name: "trim",
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
  authRegisterRequest
};
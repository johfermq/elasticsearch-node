const Validator = require('validatorjs')

/** Utils */
const { catchError } = require('../../utils/response.utils')

/** Rules */
const { uniqueRule } = require('../../rules/unique.rule')

/** Exceptions */
const { FormRequestException } = require('../../exceptions/formRequest.exception')

const authRegisterRequest = (req, res, next) => {
    try {
        uniqueRule(res)

        const rules = {
            name: 'required|string|min:3|max:255',
            email: 'required|email|max:255|unique:user',
            password: 'required|string|min:6|max:30|confirmed'
        }

        const validation = new Validator(req.body, rules)

        const passes = () => {
            delete req.body.password_confirmation
            next()
        }

        const fails = () => {
            throw new FormRequestException(validation.errors.all())
        }

        validation.checkAsync(passes, fails)

    } catch (error) {
        return catchError(res, error)
    }
}

module.exports = {
    authRegisterRequest
}
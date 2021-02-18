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
            name: 'required|string|min:3',
            email: 'required|email|unique:user',
            password: 'required|string|min:6|max:30'
        }

        const validation = new Validator(req.body, rules)

        const passes = () => {
            next()
        }

        const fails = () => {
            throw new FormRequestException(validation.errors)
        }

        validation.checkAsync(passes, fails)

    } catch (error) {
        return catchError(res, error)
    }
}

module.exports = {
    authRegisterRequest
}
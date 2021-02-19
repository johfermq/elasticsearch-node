const Validator = require('validatorjs')

/** Utils */
const { catchError } = require('../../utils/response.utils')

/** Exceptions */
const { FormRequestException } = require('../../exceptions/formRequest.exception')

const authLoginRequest = (req, res, next) => {
    try {
        const rules = {
            email: 'required|email',
            password: 'required|string|min:6'
        }

        const validation = new Validator(req.body, rules)

        if (validation.passes()) {
            next()
        } else {
            throw new FormRequestException(validation.errors.all())
        }
    } catch (error) {
        return catchError(res, error)
    }
}

module.exports = {
    authLoginRequest
}
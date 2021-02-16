const { verify } = require('jsonwebtoken')

/** Utils */
const { catchError } = require('../../utils/response.utils')

/** Exceptions */
const { TokenInvalidException } = require('../../exceptions/tokenInvalid.exception')
const { TokenNotFoundException } = require('../../exceptions/tokenNotFound.exception')

/** Services */
const authService = new (require('../services/mongodb/auth.service')).AuthService()

const jwt = (req, res, next) => {
    try {
        const token = req.header('token')
        if (!token) {
            throw new TokenNotFoundException()
        }
        verify(token, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
            try {
                if (err) {
                    throw new TokenInvalidException()
                } else {
                    const success = await authService.validate(token)
                    if (!success) {
                        throw new TokenInvalidException()
                    } else {
                        req.user = decoded
                        next()
                    }
                }
            } catch (error) {
                return catchError(res, error)
            }
        })
    } catch (error) {
        return catchError(res, error)
    }
}

module.exports = {
    jwt
}
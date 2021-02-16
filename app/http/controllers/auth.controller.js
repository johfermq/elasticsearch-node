/**
 * Services
 */
const authService = new (require('../services/mongodb/auth.service')).AuthService()

/**
 * Resources
 */
const { userResource } = require('../resources/user.resource')

/**
 * Exceptions
 */
const { UnauthorizedException } = require('../../exceptions/unauthorized.exception')

/**
 * Utils
 */
const { successResponse, errorResponse } = require('../../utils/response.utils')

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body)
        successResponse(res, userResource(user))
    } catch (error) {
        const { status, message } = error
        errorResponse(res, message, status)
    }
}

const login = async (req, res, next) => {
    try {
        const auth = await authService.login(req.body)
        successResponse(res, auth)
    } catch (error) {
        const { status, message } = error
        errorResponse(res, message, status)
    }
}

const logout = async (req, res, next) => {
    try {
        const auth = await authService.logout()
        successResponse(res, auth)
    } catch (error) {
        const { status, message } = error
        return errorResponse(res, message, status)
    }
}

module.exports = {
    register,
    login,
    logout
}
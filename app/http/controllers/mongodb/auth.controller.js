/** Services */
const authService = new (require('../../services/mongodb/auth.service')).AuthService()

/** Resources */
const { userResource } = require('../../resources/user.resource')

/** Utils */
const { successResponse, catchError } = require('../../../utils/response.utils')

const register = async (req, res) => {
    try {
        const data = await authService.register(req)
        return successResponse(res, userResource(data))
    } catch (error) {
        return catchError(res, error)
    }
}

const login = async (req, res) => {
    try {
        const data = await authService.login(req)
        return successResponse(res, data)
    } catch (error) {
        return catchError(res, error)
    }
}

const logout = async (req, res) => {
    try {
        const data = await authService.logout(req)
        return successResponse(res, data)
    } catch (error) {
        return catchError(res, error)
    }
}

module.exports = {
    register,
    login,
    logout
}
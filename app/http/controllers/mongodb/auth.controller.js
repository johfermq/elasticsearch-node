/** Services */
const authService = new (require('../../services/mongodb/auth.service')).AuthService()

/** Resources */
const { userResource } = require('../../resources/user.resource')

/** Utils */
const { successResponse, catchError } = require('../../../utils/response.utils')

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body)
        return successResponse(res, userResource(user))
    } catch (error) {
        return catchError(res, error)
    }
}

const login = async (req, res) => {
    try {
        const data = await authService.login(req.body)
        return successResponse(res, data)
    } catch (error) {
        return catchError(res, error)
    }
}

const logout = async (req, res) => {
    try {
        const data = await authService.logout(req.header('token'))
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
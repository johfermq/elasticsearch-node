/** Services */
const userService = new (require('../../services/mongodb/user.service')).UserService()

/** Resources */
const { userResource } = require('../../resources/user.resource')

/** Utils */
const { successResponse, catchError } = require('../../../utils/response.utils')

const index = async (req, res) => {
    try {
        const id = req.params.id
        const data = id ? await userService.show(req) : await userService.index(req)
        return successResponse(res, userResource(data))
    } catch (error) {
        return catchError(res, error)
    }
}

const store = async (req, res) => {
    try {
        const data = await userService.store(req)
        return successResponse(res, userResource(data))
    } catch (error) {
        return catchError(res, error)
    }
}

const update = async (req, res) => {
    try {
        const data = await userService.update(req)
        return successResponse(res, userResource(data))
    } catch (error) {
        return catchError(res, error)
    }
}

const destroy = async (req, res) => {
    try {
        const data = await userService.destroy(req)
        return successResponse(res, userResource(data))
    } catch (error) {
        return catchError(res, error)
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}
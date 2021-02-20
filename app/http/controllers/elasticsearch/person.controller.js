/** Services */
const personService = new (require('../../services/elasticsearch/person.service')).PersonService()

/** Resources */
const { elasticResource } = require('../../resources/elastic.resource')

/** Utils */
const { successResponse, catchErrorElastic } = require('../../../utils/response.utils')

const index = async (req, res) => {
    try {
        const data = await personService.index(req)
        return successResponse(res, elasticResource(data))
    } catch (error) {
        return catchErrorElastic(res, error)
    }
}

const store = async (req, res) => {
    try {
        const data = await personService.store(req)
        return successResponse(res, data)
    } catch (error) {
        return catchErrorElastic(res, error)
    }
}

const update = async (req, res) => {
    try {
        const data = await personService.update(req)
        return successResponse(res, data)
    } catch (error) {
        return catchErrorElastic(res, error)
    }
}

const destroy = async (req, res) => {
    try {
        const data = await personService.destroy(req)
        return successResponse(res, data)
    } catch (error) {
        return catchErrorElastic(res, error)
    }
}

module.exports = {
    index,
    store,
    update,
    destroy
}
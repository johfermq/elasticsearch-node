/** Services */
const { ElasticsearchService } = require('./elasticsearch.service')

class PersonService {

    constructor() {
        const index = process.env.ELASTICSEARCH_PERSONS_INDEX || ''
        this.elasticService = new ElasticsearchService(index)
    }

    async index(request) {
        const query = {
            query: {
                match_all: {}
            }
        }
        const { body } = await this.elasticService.search(query)

        return body.hits
    }

    async store(request) {
        const { body } = await this.elasticService.store(request.body)

        return body
    }

    async update(request) {
        const { body } = await this.elasticService.update(request.params.id, {
            doc: request.body
        })

        return body
    }

    async destroy(request) {
        const { body } = await this.elasticService.delete(request.params.id)

        return body
    }
}

module.exports = {
    PersonService
}
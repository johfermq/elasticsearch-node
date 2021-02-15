const { ElasticsearchService } = require('./../services/elasticsearch.service')

const INDEX = 'users'

class UserService {

    constructor() {
        this.elastic = new ElasticsearchService()
    }

    index(body) {
        return this.elastic.search(INDEX, body)
    }

    store(body) {
        return this.elastic.index(INDEX, body)
    }

    update(id, body) {
        return this.elastic.update(INDEX, id, body)
    }

    destroy(id) {
        return this.elastic.delete(INDEX, id)
    }
}

module.exports = {
    UserService
}
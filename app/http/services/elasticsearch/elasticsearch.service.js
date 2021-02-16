const { Client } = require('@elastic/elasticsearch')

class ElasticsearchService {

    constructor() {
        const host = process.env.ELASTICSEARCH_HOST || 'http://localhost:9200'
        this.client = new Client({ node: host })
    }

    search(index, body) {
        return this.client.search({ index, body })
    }

    index(index, body) {
        return this.client.index({ index, body })
    }

    update(index, id, body) {
        return this.client.update({ index, id, body })
    }

    delete(index, id) {
        return this.client.delete({ index, id })
    }
}

module.exports = {
    ElasticsearchService
}
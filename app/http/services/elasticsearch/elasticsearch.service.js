const { Client } = require("@elastic/elasticsearch");

class ElasticsearchService {

  constructor(index) {
    const host = process.env.ELASTICSEARCH_HOST || "http://localhost:9200";
    this.client = new Client({ node: host });
    this.index = index;
  }

  async search(body) {
    return await this.client.search({ index: this.index, body });
  }

  async store(body) {
    return await this.client.index({ index: this.index, body });
  }

  async update(id, body) {
    return await this.client.update({ index: this.index, id, body });
  }

  async delete(id) {
    return await this.client.delete({ index: this.index, id });
  }
}

module.exports = {
  ElasticsearchService
};
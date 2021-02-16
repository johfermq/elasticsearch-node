const elasticResource = (data) => {
    const { hits } = data

    return hits.map(item => {
        const { _id, _source } = item
        return {
            _id,
            ..._source
        }
    })
}

module.exports = {
    elasticResource
}
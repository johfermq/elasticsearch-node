const router = require('express').Router()

/** Services */
const { UserService } = require('../../app/http/services/elasticsearch/users.service')
const service = new UserService()

/** Utils */
const { elasticResource } = require('../../app/http/resources/elastic.resource')

router.get('/', async (req, res) => {
    try {
        const { body } = await service.index({
            query: {
                match_all: {}
            }
        })

        res.json({ data: elasticResource(body.hits) })
    } catch (error) {
        const { status = 500, message } = error
        res.status(status).json({ error: status, message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = await service.store(req.body)

        res.json({ data: body })
    } catch (error) {
        const { status = 500, message } = error
        res.status(status).json({ error: status, message })
    }
})

router.post('/', async (req, res) => {
    try {
        const { body } = await service.store(req.body)

        res.json({ data: body })
    } catch (error) {
        const { status = 500, message } = error
        res.status(status).json({ error: status, message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { body } = await service.update(req.params.id, {
            doc: req.body
        })

        res.json({ data: body })
    } catch (error) {
        const { status = 500, message } = error
        res.status(status).json({ error: status, message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { body } = await service.destroy(req.params.id)

        res.json({ data: body })
    } catch (error) {
        const { status = 500, message } = error
        res.status(status).json({ error: status, message })
    }
})

module.exports = router;

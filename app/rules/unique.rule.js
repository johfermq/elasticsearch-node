const Validator = require('validatorjs')

/** Utils */
const { catchError } = require('../utils/response.utils')

const uniqueRule = (res) => {
    Validator.registerAsync('unique', async (value, model, attribute, success) => {
        try {
            if (!model) {
                success(false, `The ${attribute} cannot be validated.`)
            } else {
                const name = model.toLocaleLowerCase()
                const Entity = require(`../models/${name}.model`)
                const founded = await Entity.exists({ [attribute]: value })
                if (founded) {
                    success(false, `The ${attribute} has already been registered.`)
                } else {
                    success()
                }
            }
        } catch (error) {
            return catchError(res, error)
        }
    })
}

module.exports = {
    uniqueRule
}
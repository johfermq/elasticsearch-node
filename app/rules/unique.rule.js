const { extend } = require('indicative/validator')
const { getValue, skippable } = require('indicative-utils')

/** Exceptions */
const { FormRequestException } = require('../exceptions/formRequest.exception')

/** Utils */
const { catchError } = require('../utils/response.utils')

const uniqueRule = (res) => {
    extend('unique', {
        async: true,
        compile(args) {
            if (args.length !== 2) {
                return catchError(res, new FormRequestException('Unique rule needs the model and column name'))
            }

            return args
        },
        async validate(data, field, args, config) {
            const fieldValue = getValue(data, field)

            if (skippable(fieldValue, field, config)) {
                return true
            }

            const [model, attribute] = args

            const Entity = require(`../models/${model.toLocaleLowerCase()}.model`)

            const founded = await Entity.findOne({ [attribute]: fieldValue })

            if (founded) {
                return false
            }

            return true
        }
    })
}

module.exports = {
    uniqueRule
}
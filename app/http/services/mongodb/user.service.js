const { genSalt, hash } = require('bcrypt')

/** Models */
const User = require('../../../models/user.model')

class UserService {

    async index(request) {
        return await User.find()
    }

    async store(request) {
        const { body } = request
        const random = Math.random().toString(36).substr(2)
        const salt = await genSalt(10)
        const password = await hash(random, salt)
        const user = new User({ ...body, password })

        return await user.save()
    }

    async show(request) {
        return await User.findById(request.params.id)
    }

    async update(request) {
        return await User.findByIdAndUpdate(request.params.id, request.body)
    }

    async destroy(request) {
        return await User.findByIdAndDelete(request.params.id)
    }
}

module.exports = {
    UserService
}
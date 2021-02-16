const { genSalt, hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken');

/** 
 * Models
 */
const { User } = require('../../../models/user.model')

/**
 * Resources
 */
const { userResource } = require('../../resources/user.resource')

/**
 * Exceptions
 */
const { UnauthorizedException } = require('../../../exceptions/unauthorized.exception')

class AuthService {

    async register(request) {
        const salt = await genSalt(10)
        const password = await hash(request.password, salt)
        const user = new User({ ...request, password })

        return await user.save()
    }

    async login({ email, password }) {
        const invalidCredentialsMessage = `El usuario ${email} no existe.`    
            
        const user = await User.findOne({ email })
        if (!user) {
            throw new UnauthorizedException(invalidCredentialsMessage)
        }

        const correctPassword = await compare(password, user.password);
        if (!correctPassword) {
            throw new UnauthorizedException(invalidCredentialsMessage)
        }

        const token = sign({ sub: user._id }, process.env.JWT_TOKEN_SECRET)

        return {
            token,
            user: userResource(user)
        }
    }

    async logout() {
        return 'logout'
    }
}

module.exports = {
    AuthService
}
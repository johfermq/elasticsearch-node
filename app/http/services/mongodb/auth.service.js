const { genSalt, hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

/** Models */
const { User } = require('../../../models/user.model')
const { Token } = require('../../../models/token.model')

/** Resources */
const { userResource } = require('../../resources/user.resource')

/** Exceptions */
const { InvalidCredentialsException } = require('../../../exceptions/invalidCredentials.exception')

class AuthService {

    async register(request) {
        const salt = await genSalt(10)
        const password = await hash(request.password, salt)
        const user = new User({ ...request, password })

        return await user.save()
    }

    async login({ email, password }) {
        const user = await User.findOne({ email })
        if (!user) {
            throw new InvalidCredentialsException()
        }

        const correctPassword = await compare(password, user.password);
        if (!correctPassword) {
            throw new InvalidCredentialsException()
        }

        const expiresIn = {
            expiresIn: Number(process.env.JWT_EXPIRES_IN) || 3600
        }
        const token = sign({ sub: user._id }, process.env.JWT_TOKEN_SECRET, expiresIn)
        const saveToken = new Token({ token, userId: user._id })
        await saveToken.save()

        return {
            token,
            ...expiresIn,
            user: userResource(user)
        }
    }

    async logout(token) {
        await Token.updateOne(
            { token },
            { $set: { deletedAt: new Date() } },
            { new: true }
        )

        return true
    }

    async validate(token) {
        const found = await Token.findOne({ token, deletedAt: null })
        return found ? true : false
    }
}

module.exports = {
    AuthService
}
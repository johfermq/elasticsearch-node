const router = require('express').Router()

/** Middlewares */
const { jwt } = require('../../app/http/middlewares/jwt.middleware')

/** Controllers */
const { register, login, logout } = require('../../app/http/controllers/mongodb/auth.controller')

router.post('/register', register)

router.post('/login', login)

router.post('/logout', jwt, logout)

module.exports = router

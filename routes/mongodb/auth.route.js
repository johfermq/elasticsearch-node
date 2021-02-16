const router = require('express').Router()

/**
 * Controllers
 */
const { register, login, logout } = require('../../app/http/controllers/auth.controller')

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

module.exports = router

const router = require("express").Router();

/** Middlewares */
const { jwt } = require("../../app/http/middlewares/jwt.middleware");

/** Request */
const { authLoginRequest } = require("../../app/http/requests/auth.login.request");
const { authRegisterRequest } = require("../../app/http/requests/auth.register.request");

/** Controllers */
const { register, login, logout } = require("../../app/http/controllers/mongodb/auth.controller");

router.post("/register", authRegisterRequest, register);

router.post("/login", authLoginRequest, login);

router.post("/logout", jwt, logout);

module.exports = router;

const router = require("express").Router();

/** Middlewares */
const { jwt } = require("../../app/http/middlewares/jwt.middleware");

/** Request */
const { personRegisterRequest } = require("../../app/http/requests/person.register.request");

/** Controllers */
const { index, store, update, destroy } = require("../../app/http/controllers/elasticsearch/person.controller");

router.get("/", jwt, index);

router.post("/", jwt, personRegisterRequest, store);

router.put("/:id", jwt, personRegisterRequest, update);

router.delete("/:id", jwt, destroy);

module.exports = router;

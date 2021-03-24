const router = require("express").Router();

/** Middlewares */
const { jwt } = require("../../app/http/middlewares/jwt.middleware");

/** Request */
const { userRequest } = require("../../app/http/requests/user.request");

/** Controllers */
const { index, show, store, update, destroy } = require("../../app/http/controllers/mongodb/user.controller");

router.get("/", jwt, index);

router.get("/:id", jwt, show);

router.post("/", jwt, userRequest, store);

router.patch("/:id", jwt, userRequest, update);

router.delete("/:id", jwt, destroy);

module.exports = router;

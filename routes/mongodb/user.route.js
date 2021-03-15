const router = require("express").Router();

/** Middlewares */
const { jwt } = require("../../app/http/middlewares/jwt.middleware");

/** Controllers */
const { index, store, update, destroy } = require("../../app/http/controllers/mongodb/user.controller");

router.get("/:id?", jwt, index);

router.post("/", jwt, store);

router.patch("/:id", jwt, update);

router.delete("/:id", jwt, destroy);

module.exports = router;

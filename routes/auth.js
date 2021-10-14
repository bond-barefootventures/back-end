const express = require("express");
const router = express.Router();

//Import controller
const { signup } = require("../controllers/auth");
const { login } = require("../controllers/auth");
const { verify } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:id", verify);

module.exports = router;

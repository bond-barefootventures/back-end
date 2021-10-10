const express = require("express");
const router = express.Router();

//Import controller
const { signup } = require("../controllers/auth");
const { verify } = require("../controllers/auth");

router.post("/signup", signup);
router.get("/verify/:id", verify);

module.exports = router;

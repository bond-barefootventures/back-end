const express = require("express");
const router = express.Router();

const { getJobs } = require("../controllers/job");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, getJobs);

module.exports = router;

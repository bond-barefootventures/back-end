const express = require("express");
const router = express.Router();

const { getJobs } = require("../controllers/job");
const { postJob } = require("../controllers/job");
const verifyToken = require("../middleware/auth");

router.get("/", getJobs);
router.post("/postJob", verifyToken, postJob);

module.exports = router;

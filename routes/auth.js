const express = require("express");
const router = express.Router();
const passport = require("passport");
//Import controller
const { signup } = require("../controllers/auth");
const { login } = require("../controllers/auth");
const { verify } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:id", verify);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

router.get("/", (req, res) => res.send("home"));
router.get("/login", (req, res) => res.send("login"));
router.get("/good", isLoggedIn, (req, res) => res.send("jobs"));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/jobs",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to jobs listing.
    res.redirect("/jobs");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;

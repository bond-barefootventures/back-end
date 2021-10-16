const User = require("../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const sendEmail = async (receiver, token) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kietmakietna@gmail.com",
      pass: process.env.SEND_EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "kietmakietna@gmail.com",
    to: receiver,
    subject: "Please verify your email",
    text: "From Bond team",
    html: `<a href=http://localhost:8000/api/auth/verify/${token}> 
    <h3 style="font-weight: 600"> Please click down below to confirm your email </h3>
    <button 
        style="background-color: "#185adb"; color: "#ffc947"; padding: 10px 5px; border-radius: 10px;">
        Click here to confirm</button> 
    </button>
    </a>`,
    amp: `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body> </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//Create user without email account activation
exports.signup = async (req, res) => {
  console.log(req.body);
  const { name, email, role, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ success: false, message: "email exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ name, email, role, password: hashedPassword });
    await newUser.save();
    //Return token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      user: newUser,
      message: "Sign Up successfully, please confirm your email",
    });
    await sendEmail(email, accessToken);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing emaiil or password" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }
    //Check if password is valid
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect email or password" });
    }
    const accessToken = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!user.verified) {
      sendEmail(email, accessToken);
      return res
        .status(400)
        .json({ success: false, message: "Please verify your email" });
    }
    return res.json({
      success: true,
      message: "Login Succesfully",
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Unknow" });
  }
};

exports.verify = async (req, res) => {
  const token = req.params.id;
  console.log(token);
  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded.name);
    let updatedUser = {
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      password: decoded.password,
      verified: true,
    };
    const updatedUserCondition = { email: decoded.email };
    updatedUser = await User.findOneAndReplace(
      updatedUserCondition,
      updatedUser,
      { new: true }
    );
    res.json({
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

//Google Login Auth Routes
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport-setup");

app.use(cors())

// parse application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieSession({
  name: "Barefootventures-BOND-session",
  keys: ["key1", "key2"]
}))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => res.send("home"))
app.get("/login", (req, res) => res.send("login"))
app.get("/good", isLoggedIn, (req, res) => res.send("jobs"))

app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/google/jobs", passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to jobs listing.
    res.redirect("/jobs");
  });

  app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
  });

app.listen(PORT, () => console.log("Example app listening on port $(PORT)!"))


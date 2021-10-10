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
    html: `<a href=http://localhost:8000/api/verify/${token}> 
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
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ success: false, message: "email exists" });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    //Return token
    const accessToken = jwt.sign(
      {
        userId: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({ success: true, user: newUser });
    await sendEmail(email, accessToken);
  } catch (error) {
    console.log(error);
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

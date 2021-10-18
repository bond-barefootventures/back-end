require("dotenv").config();
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rc11m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      (err) => {
        if (err) throw err;
        console.log("MongoDB Connected");
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("mongo err");
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use(cors());

//Middle ware

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});

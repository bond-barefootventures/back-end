//Import mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create new schema
const jobSchema = new mongoose.Schema({
  logoImageUrl: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobPublishedDate: {
    type: Date,
    default: Date.now,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  user: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
});

module.exports = mongoose.model("jobs", jobSchema);

//Import mongoose
const mongoose = require("mongoose");

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
    type: Number,
    required: true,
  },
  jobPublishedDate: {
    type: Date,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("jobs", jobSchema);

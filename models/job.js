//Import mongoose
const mongoose = require("mongoose");

//Create new schema
const jobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: [true, "Please check your data entry, no job id specified!"],
  },
  companyName: {
    type: String,
    required: [
      true,
      "Please check your data entry, no company name specified!",
    ],
  },
  jobPosition: {
    type: String,
    required: [
      true,
      "Please check your data entry, no job position specified!",
    ],
  },
  jobType: {
    type: String,
    required: [true, "Please check your data entry, no job type specified!"],
  },
  location: {
    type: String,
    required: [true, "Please check your data entry, no location specified!"],
  },
  salary: {
    type: Number,
    required: [true, "Please check your data entry, no salary specified!"],
  },
  jobPublishedDate: {
    type: Date,
    required: [
      true,
      "Please check your data entry, no job published date specified!",
    ],
  },
  jobDescription: {
    type: String,
    required: [
      true,
      "Please check your data entry, no job description specified!",
    ],
  },
});

module.exports = mongoose.model("jobs", jobSchema);

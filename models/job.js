
//Require server
const express = require("express");

//Require mongoose package
const mongoose = require("mongoose";

const app = express();

app.use(express.static("public"));

//Specify the connection pathway to get us to the Database we want to connect to
mongoose.connect("mongodb+srv://kiet:60G8xktgs2xtqVKb@cluster0.rc11m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

//Define schema

const jobsSchema = {
  jobId: String,
  companyName: String,
  jobPosition: String,
  jobType: String,
  location: String,
  salary: Number,
  jobPublishedDate: Date,
  jobDescription: String
});

//Compile new mongoose model based on the Schema
const Job = mongoose.model("Job", jobSchema);

//Create new schema
const jobSchema = new mongoose.Schema({
  jobId: {
  type: String,
  required: [true, "Please check your data entry, no job id specified!"]
},
  companyName: {
  type: String,
  required: [true, "Please check your data entry, no company name specified!"]
},
  jobPosition: {
  type: String,
  required: [true, "Please check your data entry, no job position specified!"]
},
  jobType: {
  type: String,
  required: [true, "Please check your data entry, no job type specified!"]
},
  location: {
  type: String,
  required: [true, "Please check your data entry, no location specified!"]
},
  salary: {
  type: Number,
  required:[true, "Please check your data entry, no salary specified!"]
},
  jobPublishedDate: {
  type: Date,
  required: [true, "Please check your data entry, no job published date specified!"]
},
  jobDescription: {
  type: String,
  required: [true, "Please check your data entry, no job description specified!"]
},
});


module.exports = mongoose.model("Job", JobSchema);

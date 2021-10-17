const Job = require("../models/job");

exports.postJob = async (req, res) => {
  if (req.role !== "recruiter") {
    return res.json({
      success: false,
      message: "User don't have rights to do",
    });
  }

  const {
    logoImageUrl,
    companyName,
    jobPosition,
    jobType,
    location,
    salary,
    jobDescription,
  } = req.body;

  if (
    !logoImageUrl ||
    !companyName ||
    !jobPosition ||
    !jobType ||
    !salary ||
    !jobDescription
  ) {
    return res
      .status(400)
      .json({ success: false, message: "U've missed somethings" });
  }
  try {
    const newJob = new Job({
      logoImageUrl: logoImageUrl,
      companyName: companyName,
      jobPosition: jobPosition,
      jobType: jobType,
      location: location,
      salary: salary,
      jobDescription: jobDescription,
      user: req.userId,
    });

    await newJob.save();
    return res.json({ success: true, message: "Job is created successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    return res.json({ success: true, jobs: jobs });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

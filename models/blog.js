const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please check your data entry, no blog title specified!"],
  },
  intro: {
    type: String,
    required: [true, "Please check your data entry, no blog intro specified!"],
  },
  introduce: {
    type: String,
    required: [
      true,
      "Please check your data entry, no blog introduce specified!",
    ],
  },
  img: {
    type: String,
    required: [true, "Please check your data entry, no blog image specified!"],
  },
  content: { type: [Object], default: [] },
  category: {
    type: String,
    required: [
      true,
      "Please check your data entry, no blog category specified!",
    ],
  },
  date: {
    type: Date,
    required: [
      true,
      "Please check your data entry, no blog category specified!",
    ],
  },
  views: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  readingTime: { type: Number, default: 5 },
});

module.exports = mongoose.model("Blog", blogSchema);

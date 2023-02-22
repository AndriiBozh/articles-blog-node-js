const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: [3, "Title should be at least 3 characters long"],
    trim: true, //remove spaces in front and at the end
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    enum: ["fiction", "drama", "comedy", "other"],
    required: true,
  },
  text: {
    type: String,
    required: true,
    min: [20, "Your article is too short"],
    trim: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

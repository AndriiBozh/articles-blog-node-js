const expess = require("express");
const { DateTime } = require("luxon");
const hbs = require("hbs");
const router = expess.Router();
const Article = require("../models/article");

hbs.registerHelper("formatDate", function (date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED);
});

// define the home page route
router.get("/", async (req, res, next) => {
  const articles = await Article.find();

  res.render("index", { articles });
});

module.exports = router;

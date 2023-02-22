const expess = require("express");
const router = expess.Router();
const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("../models/article");

// connect to mongo database
try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    dbName: "articles",
  });
} catch (error) {
  handleError(error);
}

mongoose.connection.on("error", (err) => {
  logError(err);
});
// end of connect to mongo database

router.get("/articles/add", (req, res, next) => {
  res.render("add-article");
});

router.post("/articles/add", (req, res, next) => {
  const { title, author, category, text } = req.body;

  const article = new Article({ title, author, category, text });

  article.save((err) => {
    if (err) {
      return console.log("error: ", err);
    }
    res.redirect("/");
  });
});

router.post("/article/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id from post delete: ", id);
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    console.log("The article has been successfully deleted");
  } catch (err) {
    res.send(err);
  }

  res.redirect("/");
});

// populate edit form with the values from the article to be edited
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  console.log("id from get, /edit/:id", id);
  try {
    const article = await Article.findById(id);
    const { title, author, text } = article;

    res.render("edit-article", { title, author, text, id });
  } catch (err) {
    res.send(err);
  }
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, text } = req.body;
  try {
    const article = await Article.findById(id);
    const editedArticle = await Article.findByIdAndUpdate(id, { title, text });
  } catch (err) {
    res.send(err);
  }

  res.redirect("/");
});

module.exports = router;

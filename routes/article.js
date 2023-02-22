const expess = require("express");
const { DateTime } = require("luxon");
const { rawListeners } = require("../models/article");

const router = expess.Router();

const Article = require("../models/article");

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  //   get data from a database
  try {
    const article = await Article.findById(id);
    const { _id, title, text, author, date, category } = article;

    const formattedDate = DateTime.fromJSDate(date).toLocaleString(
      DateTime.DATETIME_MED
    );

    //   send data to the view 'article.hbs'
    res.render("article", {
      _id,
      title,
      text,
      author,
      formattedDate,
      category,
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;

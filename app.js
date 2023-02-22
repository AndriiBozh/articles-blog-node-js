const express = require("express");
// var hbs = require("hbs");
const path = require("path");

const index = require("./routes/index");
const article = require("./routes/article");
const manage = require("./routes/manage");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/style"));
const port = 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", index);
app.use("/article", article);
app.use("/manage", manage);

app.listen(port, () => {
  console.log("listening on port ", port);
});

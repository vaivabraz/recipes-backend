const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const uri = "mongodb://localhost/recipesAPI";
const db = mongoose.connect(uri);
const port = process.env.PORT || 3001;
const Recipe = require("./models/recipeModel");

const recipesRouter = require("./routes/recipesRouter")(Recipe);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", recipesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

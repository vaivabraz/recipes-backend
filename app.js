const express = require("express");
const mongoose = require("mongoose");

const app = express();
const uri = "mongodb://localhost/recipesAPI";
const db = mongoose.connect(uri);
const recipesRouter = express.Router();
const port = process.env.PORT || 3001;
const Recipe = require("./models/recipeModel");

recipesRouter.route("/recipes")
.post((req, res)=>{
  
})
.get((req, res) => {
  //veliau galima prideti ir kitus metodus(put, post)
  //.get veikia kaip ir app.get
  // const query = {author:'VaivaBraz '}
  // const { query } = res;
  const query = {};
  if (req.query.author) {
    query.author = req.query.author;
  }

  Recipe.find(query, (err, recipes) => {
    //looks in recipesAPI database, recipes collection
    if (err) {
      return res.send(err);
    }
    return res.json(recipes);
  });
});

recipesRouter.route("/recipes/:recipeId").get((req, res) => {
  Recipe.findById(req.params.recipeId, (err, recipe) => {
    if (err) {
      return res.send(err);
    }
    return res.json(recipe);
  });
});

app.use("/api", recipesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});

/* eslint-disable no-param-reassign */
const express = require("express");

function routes(Recipe) {
  const recipesRouter = express.Router();
  recipesRouter
    .route("/recipes")
    .post((req, res) => {
      const recipe = new Recipe(req.body);
      recipe.save();
      return res.status(201).json(recipe);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.author) {
        query.author = req.query.author;
      }
      Recipe.find(query, (err, recipes) => {
        if (err) {
          return res.send(err);
        }
        return res.json(recipes);
      });
    });

  recipesRouter
    .route("/recipes/:recipeId")
    .get((req, res) => {
      Recipe.findById(req.params.recipeId, (err, recipe) => {
        if (err) {
          return res.send(err);
        }
        return res.json(recipe);
      });
    })
    .post((req, res) => {
      Recipe.findById(req.params.recipeId, (err, recipe) => {
        if (err) {
          return res.send(err);
        }

        recipe.title = req.body.title;
        recipe.save();
        return res.json(recipe);
      });
    });
  return recipesRouter;
}

module.exports = routes;

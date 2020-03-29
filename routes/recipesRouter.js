/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-parens */
const express = require("express");

function routes(Recipe) {
  const recipesRouter = express.Router();
  recipesRouter
    .route("/recipes")
    .post((req, res) => {
      req.body.slug = req.body.title.replace(/\s+/g, "-").toLowerCase();
      req.body.date = Date.now();
      req.body._id = `${req.body.author}-${req.body.slug}`.toLocaleLowerCase();
      const recipe = new Recipe(req.body);
      recipe.save();
      return res.status(201).json(recipe);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.slug) {
        query.slug = req.query.slug;
      } else if (req.query.category) {
        // http://localhost:3001/api/recipes/?category=Greiti
        query.categories = req.query.category;
      }
      Recipe.find(query, (err, recipes) => {
        if (err) {
          return res.send(err);
        }
        return res.json(recipes);
      });
    });
  recipesRouter.use("/recipes/:recipeId", (req, res, next) => {
    // http://localhost:4050/api/recipes/5dc1cf21f63e8c59f6d25aed
    Recipe.findById(req.params.recipeId, (err, recipe) => {
      if (err) {
        return res.send(err);
      }
      if (recipe) {
        req.recipe = recipe;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  recipesRouter
    .route("/recipes/:recipeId")
    .get((req, res) => res.json(req.recipe))
    .put((req, res) => {
      const { recipe } = req;
      const recipeUpdate = req.body;
      if (recipe._id) {
        delete recipe._id;
      }
      Object.entries(recipeUpdate).forEach(item => {
        const key = item[0];
        const value = item[1];
        recipe[key] = value;
      });
      recipe.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(recipe);
      });
    })
    .delete((req, res) => {
      req.recipe.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return recipesRouter;
}

module.exports = routes;

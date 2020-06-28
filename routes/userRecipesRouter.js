/* eslint-disable no-underscore-dangle */

const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const RecipeModel = require("../models/recipeModel");

function createSlug(title, id) {
  const slug = `${title.replace(/\s+/g, "-").toLowerCase()}-${id}`;
  return slug;
}

function routes() {
  const recipesRouter = express.Router();
  recipesRouter.use("/userRecipes", (req, res, next) => {
    const query = {
      username: req.body.username,
    };
    UserModel.findOne(query, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      req.user = user;
      return next();
    });
  });
  recipesRouter.route("/userRecipes").post(async (req, res) => {
    const { recipe } = req.body;
    recipe.author = req.body.username;
    recipe._id = new mongoose.Types.ObjectId();
    recipe.date = Date.now();

    const latestRecipe = await RecipeModel.findOne({}).sort({ recipeId: -1 });

    recipe.recipeId = latestRecipe.recipeId + 1;
    recipe.slug = createSlug(recipe.title, recipe.recipeId);
    const newRecipeDocument = new RecipeModel(recipe);
    newRecipeDocument.save();
    const { user } = req;
    user.recipesList.push({
      title: recipe.title,
      slug: recipe.slug,
      image: recipe.image,
    });
    user.save();

    return res.status(201).json(recipe);
  });
  recipesRouter.route("/userRecipes/list").post((req, res) => {
    const query = { author: req.body.username };
    RecipeModel.find(query, (err, recipes) => {
      if (err) {
        return res.send(err);
      }
      return res.json(recipes);
    });
  });
  recipesRouter.use("/userRecipes/:slug", (req, res, next) => {
    RecipeModel.findOne({ slug: req.params.slug }, (err, recipe) => {
      if (err) {
        return res.send(err);
      }
      if (!recipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }
      req.recipe = recipe;
      return next();
    });
  });
  recipesRouter
    .route("/userRecipes/:slug/get")
    .put((req, res) => res.json(req.recipe));
  recipesRouter
    .route("/userRecipes/:slug")
    .get((req, res) => res.json(req.recipe))
    .put((req, res) => {
      const savedRecipe = req.recipe;
      const recipeToUpdate = req.body.recipe;
      const shortRecipeUpdate = {};
      const recipeUpdate = {};

      Object.entries(recipeToUpdate).forEach((item) => {
        const key = item[0];
        const value = item[1];

        if (key === "title") {
          const slug = createSlug(value, savedRecipe.recipeId);
          shortRecipeUpdate.slug = slug;
          recipeUpdate.slug = slug;
          shortRecipeUpdate[key] = value;
        } else if (key === "image") {
          shortRecipeUpdate[key] = value;
        }
        recipeUpdate[key] = value;
      });
      RecipeModel.update(
        { slug: req.params.slug },
        { $set: recipeUpdate },
        (error) => {
          if (error) return res.send(error);
          if (Object.keys(shortRecipeUpdate).length !== 0) {
            const { user } = req;
            const index = user.recipesList.findIndex(
              (r) => r.slug === req.params.slug,
            );
            const oldShortRecipe = user.recipesList[index];
            const newShortRecipe = { ...oldShortRecipe, ...shortRecipeUpdate };
            user.recipesList[index] = newShortRecipe;
            user.markModified("recipesList");
            user.save((err) => {
              if (err) return res.send(error);
              return recipeUpdate;
            });
          }
          return res.status(200).json(recipeUpdate);
        },
      );
    })
    .delete((req, res) => {
      RecipeModel.remove({ slug: req.params.slug }, (error) => {
        if (error) return res.send(error);
        const { user } = req;
        const index = user.recipesList.findIndex(
          (r) => r.slug === req.params.slug,
        );
        user.recipesList.splice(index, 1);
        user.save();
        return res
          .status(200)
          .json({ message: `Recipe ${req.params.slug} deleted` });
      });
    });

  return recipesRouter;
}

module.exports = routes;

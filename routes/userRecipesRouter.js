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
    user.recipesList.unshift({
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
  recipesRouter
    .route("/userRecipes/list/short")
    .post((req, res) => res.json(req.user.recipesList));
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
    .post((req, res) => res.json(req.recipe));
  recipesRouter
    .route("/userRecipes/:slug")
    .get((req, res) => res.json(req.recipe))
    .put((req, res) => {
      const savedRecipe = req.recipe;
      const comingRecipe = req.body.recipe;
      Object.entries(comingRecipe).forEach((item) => {
        const key = item[0];
        const value = item[1];
        savedRecipe[key] = value;
      });
      savedRecipe.save((err) => {
        if (err) {
          return res.send(err);
        }
        const { user } = req;
        const index = user.recipesList.findIndex(
          (r) => r.slug === req.params.slug,
        );
        const oldShortRecipe = user.recipesList[index];
        const shortRecipeKeys = ["title", "image"];
        const changedKeys = shortRecipeKeys.filter(
          (key) => oldShortRecipe[key] !== savedRecipe[key],
        );

        if (changedKeys.length) {
          changedKeys.forEach((key) => {
            oldShortRecipe[key] = savedRecipe[key];
          });
          user.markModified("recipesList");
          user.save((error) => {
            if (error) return res.send(error);
            return savedRecipe;
          });
        }
        return res.json(savedRecipe);
      });
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

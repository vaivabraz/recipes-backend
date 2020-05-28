/* eslint-disable no-underscore-dangle */

const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const RecipeModel = require("../models/recipeModel");

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
        return res.sendStatus(404);
        //  return res.send("Neatpažintas autorius"); can I send 404 and custom msg?
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
    recipe.slug = `${recipe.title.replace(/\s+/g, "-").toLowerCase()}-${
      recipe.recipeId
    }`;
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

  return recipesRouter;
}

module.exports = routes;

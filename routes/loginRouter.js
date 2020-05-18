const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
const initialCategories = require("../initialCategories");

function routes() {
  const loginRouter = express.Router();
  loginRouter.route("/login").get((req, res) => {
    const query = {};
    query.username = req.body.loginData.username;
    User.findOne(query, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        return res.json(user);
      }
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.loginData.username,
        loginType: req.body.loginType,
        recipesList: [],
        userCategories: initialCategories,
      });
      newUser.save();
      return res.json(newUser);
    });
  });
  return loginRouter;
}

module.exports = routes;

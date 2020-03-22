const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema({
  _id: { type: String },
  username: { type: String },
  recipesList: { type: Array },
  userCategories: { type: Array }
});

module.exports = mongoose.model("User", userModel);

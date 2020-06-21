const mongoose = require("mongoose");

const { Schema } = mongoose;

const userModel = new Schema(
  {
    _id: mongoose.Types.ObjectId,
    username: String,
    loginType: String,
    recipesList: Array,
    userCategories: Array,
  },
  { strict: false },
);

module.exports = mongoose.model("User", userModel);

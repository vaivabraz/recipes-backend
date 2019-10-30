const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeModel = new Schema({
  slug: { type: String },
  id: { type: Number },
  title: { type: String },
  author: { type: String },
  // date: "",
  portions: { type: Number },
  // time: {type:},
  // ingredients: [],
  preparation: { type: String },
  // image: "",
  // categories: [],
  notes: { type: String },
  summary: { type: String }
});

module.exports = mongoose.model("Recipe", recipeModel);

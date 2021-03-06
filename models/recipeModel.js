const mongoose = require("mongoose");

const { Schema } = mongoose;

const recipeModel = new Schema(
  {
    title: { type: String },
    portions: { type: Number },
    time: { type: String },
    ingredients: { type: Array },
    preparation: { type: String },
    image: { type: String },
    categories: { type: Array },
    notes: { type: String },
    summary: { type: String },
    date: { type: Number },
    author: { type: String },
    slug: { type: String },
    recipeId: { type: Number },
    _id: { type: String },
  },
  { strict: false },
);

module.exports = mongoose.model("Recipe", recipeModel);

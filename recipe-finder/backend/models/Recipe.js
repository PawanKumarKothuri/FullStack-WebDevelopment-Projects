// backend/models/Recipe.js
const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  image: String,
  url: String,
});

module.exports = mongoose.model("Recipe", RecipeSchema);

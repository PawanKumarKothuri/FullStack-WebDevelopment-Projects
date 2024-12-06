// backend/routes/recipeRoutes.js
const express = require("express");
const Recipe = require("../models/Recipe");
const axios = require("axios");

const router = express.Router();
const API_URL = "https://api.spoonacular.com/recipes/complexSearch";

router.get("/search", async (req, res) => {
  const { ingredients } = req.query;

  try {
    const response = await axios.get(API_URL, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        includeIngredients: ingredients,
        number: 10,
      },
    });

    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

router.post("/favorites", async (req, res) => {
  const { title, ingredients, image, url } = req.body;

  try {
    const newRecipe = new Recipe({ title, ingredients, image, url });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error saving recipe" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites" });
  }
});

module.exports = router;

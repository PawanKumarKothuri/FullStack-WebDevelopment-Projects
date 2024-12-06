const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));



// Test MongoDB connection
app.get('/test-db', async (req, res) => {
    console.log('Hit /test-db route'); // Debugging log
    try {
      const isConnected = mongoose.connection.readyState === 1; // 1 means connected
      if (isConnected) {
        res.status(200).send('MongoDB connection is working!');
      } else {
        res.status(500).send('MongoDB connection failed.');
      }
    } catch (err) {
      console.error('Error in /test-db:', err.message);
      res.status(500).send(`Error: ${err.message}`);
    }
  });

// Recipe Schema and Model
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  cuisine: String,
  instructions: String,
  imageUrl: String,
  isFavorite: { type: Boolean, default: false },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Routes
// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe Finder API!");
});

// Fetch All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// Search Recipes by Ingredient
app.get("/recipes/search", async (req, res) => {
  const { ingredient } = req.query;
  try {
    const recipes = await Recipe.find({ ingredients: ingredient });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to search recipes" });
  }
});

// Add a New Recipe
app.post("/recipes", async (req, res) => {
  const { title, ingredients, cuisine, instructions, imageUrl } = req.body;
  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      cuisine,
      instructions,
      imageUrl,
    });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to add recipe" });
  }
});

// Mark Recipe as Favorite
app.put("/recipes/:id/favorite", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { isFavorite: true },
      { new: true }
    );
    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to update recipe" });
  }
});

// Delete a Recipe
app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete recipe" });
  }
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

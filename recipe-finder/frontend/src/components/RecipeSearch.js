// frontend/src/components/RecipeSearch.js
import React, { useState } from "react";
import axios from "axios";

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes/search", {
        params: { ingredients },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={fetchRecipes}>Search</button>

      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title} />
            <a href={recipe.sourceUrl} target="_blank" rel="noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;

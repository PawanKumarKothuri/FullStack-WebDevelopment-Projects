// frontend/src/components/RecipeFavorites.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  return (
    <div>
      <h1>Favorite Recipes</h1>
      {favorites.map((recipe) => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} />
          <a href={recipe.url} target="_blank" rel="noreferrer">
            View Recipe
          </a>
        </div>
      ))}
    </div>
  );
};

export default RecipeFavorites;

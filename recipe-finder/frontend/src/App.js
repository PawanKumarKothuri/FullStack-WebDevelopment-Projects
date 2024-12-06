import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/recipes', {
                params: { ingredients, cuisine },
            });
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error.message);
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
            <input
                type="text"
                placeholder="Enter cuisine (optional)"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
            />
            <button onClick={fetchRecipes}>Search Recipes</button>
            <div>
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.id}>
                            <h2>{recipe.title}</h2>
                            {recipe.image && <img src={recipe.image} alt={recipe.title} />}
                        </div>
                    ))
                ) : (
                    <p>No recipes found</p>
                )}
            </div>
        </div>
    );
}

export default App;

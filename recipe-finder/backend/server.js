const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch recipes from Spoonacular API
app.get('/api/recipes', async (req, res) => {
    const { ingredients, cuisine } = req.query;
    const apiKey = process.env.SPOONACULAR_API_KEY;

    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch`,
            {
                params: {
                    apiKey,
                    includeIngredients: ingredients, // Ingredients to filter
                    cuisine,                         // Cuisine type (optional)
                    number: 10                       // Number of results
                },
            }
        );
        res.json(response.data.results); // Send the results to the frontend
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

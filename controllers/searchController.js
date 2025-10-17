import 'dotenv/config';
import fetch from 'node-fetch';

export const searchRecipes = async (req, res) => {
    const { ingredients } = req.query;

    if (!ingredients) {
        return res.status(400).json({
            message: 'Ingredients query is required...'
        });
    }

    const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';
    const API_KEY = process.env.SPOONACULAR_API_KEY;

    if (!API_KEY) {
        console.error('ERROR: SPOONEACULAR_API_KEY not defined');
        return res.status(500).json({
            message: 'Configuration error...'
        });
    }

    const finalApiUrl = `${API_URL}?ingredients=${ingredients}&number=10&ranking=1&ignorePantry=true&apiKey=${API_KEY}`;

    try {
        console.log(`Calling spoonacular for ingredients:`, ingredients);

        const response = await fetch(finalApiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({
                message: 'Error searchin in api',
                details: errorData.message || 'Unknown api external error'
            });
        }

        const data = await response.json()

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error calling spoonacular api', error.message);
        return res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
}
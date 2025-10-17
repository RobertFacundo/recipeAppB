import 'dotenv/config';
import fetch from 'node-fetch';

export const getRecipeDetails = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            message: 'recipe id required'
        });
    }

    const API_URL = `https://api.spoonacular.com/recipes/${id}/information`;
    const API_KEY = process.env.SPOONACULAR_API_KEY;

    if (!API_KEY) {
        console.error('key not defined');
        return res.status(500).json({
            message: 'config error'
        });
    }

    const finalApiUrl = `${API_URL}?includeNutrition=false&apiKey=${API_KEY}`;

    try {
        console.log(`Calling spoonacular for details with id:`, { id });

        const response = await fetch(finalApiUrl);

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({
                message: `Error al obtener detalles para el ID ${id} en Spoonacular.`,
                details: errorData.message || 'Error desconocido de la API externa.'
            });
        }

        const data = await response.json();

        return res.status(200).json(data);

    } catch (error) {
        console.error(`Error al llamar a la API de Spoonacular para detalles de ID ${id}:`, error.message);
        return res.status(500).json({
            message: 'Error en el servidor proxy al obtener detalles de la receta.',
            error: error.message
        });
    }
}
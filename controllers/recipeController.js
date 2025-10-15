import Recipe from "../models/RecipeModel.js";

export const createRecipe = async (req, res) => {
    const userId = req.user._id;
    const {externalId, title, imageUrl, notes} = req.body;

    if(!externalId || !title){
        return res.status(400).json({message:'Please, add the external ID, and the recipe title...'});
    }

    try{
        const newRecipe = await Recipe.create({
            userId,
            externalId,
            title,
            imageUrl,
            notes
        });

       return res.status(201).json({
            message: 'Recipe saved successfully',
            recipe: newRecipe
        });
    }catch(error){
        console.error('Error creating recipe', error.message);
       return res.status(500).json({
            message: 'Server Error while saving recipe',
            error: error.message
        });
    }
}

export const getRecipes = async (req, res)=>{
    try{
        const recipes = await Recipe.find({userId: req.user._id}).sort({createdAt: -1});

        return res.status(200).json({
            count: recipes.length,
            recipes
        });
    }catch(error){
        console.error('Error while getting recipes:', error.message);
        return res.status(500).json({
            message:'Server error while getting recipes',
            error: error.message
        })
    }
}
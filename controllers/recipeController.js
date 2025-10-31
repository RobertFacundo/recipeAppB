import Recipe from "../models/RecipeModel.js";

// CREATE RECIPE
export const createRecipe = async (req, res) => {
  const userId = req.user._id || req.user.userId;
  const { externalId, title, imageUrl, notes } = req.body;

  if (!externalId || !title) {
    return res.status(400).json({ message: 'Please, add the external ID, and the recipe title...' });
  }

  try {
    const existingRecipe = await Recipe.findOne({ userId, externalId });

    if (existingRecipe) {
      return res.status(409).json({
        message: 'This recipe is already in favs',
        recipe: existingRecipe
      });
    }

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
  } catch (error) {
    console.error('Error creating recipe', error.message);
    return res.status(500).json({
      message: 'Server Error while saving recipe',
      error: error.message
    });
  }
};

// GET ALL RECIPES BY USER
export const getRecipes = async (req, res) => {
  const userId = req.user._id || req.user.userId;

  try {
    const recipes = await Recipe.find({ userId });

    return res.status(200).json({
      count: recipes.length,
      recipes
    });
  } catch (error) {
    console.error('Error while getting recipes:', error.message);
    return res.status(500).json({
      message: 'Server error while getting recipes',
      error: error.message
    });
  }
};

// CHECK IF RECIPE IS SAVED
export const checkIfSaved = async (req, res) => {
  const userId = req.user._id || req.user.userId;
  const { externalId } = req.params;

  try {
    const recipe = await Recipe.findOne({ userId, externalId });

    if (recipe) {
      return res.status(200).json({ isSaved: true, recipeId: recipe._id });
    } else {
      return res.status(200).json({ isSaved: false, recipeId: null });
    }
  } catch (error) {
    console.error('Error checking if recipe is saved:', error.message);
    return res.status(500).json({
      message: 'Server error while checking recipe state',
      error: error.message
    });
  }
};

// GET RECIPE BY ID
export const getRecipeById = async (req, res) => {
  const userId = req.user._id || req.user.userId;
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findOne({ _id: recipeId, userId });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(200).json(recipe);
  } catch (error) {
    console.error('Error while getting recipe by id:', error.message);
    return res.status(500).json({
      message: 'Error while getting recipe',
      error: error.message
    });
  }
};

// UPDATE RECIPE NOTES
export const updateRecipe = async (req, res) => {
  const userId = req.user._id || req.user.userId;
  const recipeId = req.params.id;
  const { notes } = req.body;

  if (notes === undefined) {
    return res.status(400).json({ message: "No valid fields to update" });
  }

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, userId },
      { notes },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(200).json({
      message: 'Success update',
      recipe: updatedRecipe
    });
  } catch (error) {
    console.error('Error while updating recipe', error.message);
    return res.status(500).json({
      message: 'Server error while updating recipe',
      error: error.message
    });
  }
};

// DELETE RECIPE
export const deleteRecipe = async (req, res) => {
  const userId = req.user._id || req.user.userId;
  const recipeId = req.params.id;

  try {
    const result = await Recipe.findOneAndDelete({ _id: recipeId, userId });

    if (!result) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Server error while deleting recipe:', error.message);
    return res.status(500).json({
      message: 'Server error while deleting recipe',
      error: error.message
    });
  }
};
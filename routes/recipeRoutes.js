import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkIfSaved, createRecipe, deleteRecipe, getRecipeById, getRecipes, updateRecipe } from '../controllers/recipeController.js';

const router = express.Router()

router.route('/')
    .post(protect, createRecipe)
    .get(protect, getRecipes)

router.route('/check/:externalId')
    .get(protect, checkIfSaved);

router.route('/:id')
    .get(protect, getRecipeById)
    .put(protect, updateRecipe)
    .delete(protect, deleteRecipe)

export default router;
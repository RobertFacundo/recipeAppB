import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createRecipe, getRecipes } from '../controllers/recipeController.js';

const router = express.Router()

router.route('/')
    .post(protect, createRecipe)
    .get(protect, getRecipes)

export default router;
import express from "express";
import { getRecipeDetails } from "../controllers/externalController.js";

const router = express.Router();

router.route('/:id')
    .get(getRecipeDetails)

export default router;
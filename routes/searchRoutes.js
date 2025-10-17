import express from "express";
import { searchRecipes } from "../controllers/searchController.js";
import e from "cors";

const router = express.Router();

router.route('/')
    .get(searchRecipes);

export default router;
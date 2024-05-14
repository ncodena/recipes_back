import express from 'express';
import { authMiddleware } from '../middlewares/user.js';
import { getRandomRecipe, getRecipes, newRecipe } from '../controllers/recipeController.js';

const recipeRouter = express.Router();
recipeRouter.get('/', authMiddleware, getRandomRecipe);
recipeRouter.get('/recipes', authMiddleware, getRecipes);
recipeRouter.post('/add', authMiddleware, newRecipe);


export default recipeRouter;
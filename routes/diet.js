import express from 'express';
import { addDietaryPreference, getDietaryPreferences } from '../controllers/dietController.js';

const dietRouter = express.Router();

dietRouter.get('/', getDietaryPreferences);
dietRouter.post('/add', addDietaryPreference);

export default dietRouter;
import express from 'express';
import { addAllergy, getAllergies } from '../controllers/allergyController.js';

const allergyRouter = express.Router();

allergyRouter.get('/', getAllergies, );
allergyRouter.post('/add', addAllergy);

export default allergyRouter;
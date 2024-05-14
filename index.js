import 'dotenv/config';
import { connectDatabase } from './db/client.js';
import express from 'express';
import userRouter from './routes/user.js';
import dietRouter from './routes/diet.js';
import allergyRouter from './routes/allergy.js';
import recipeRouter from './routes/recipe.js';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.use('/api/users', userRouter);
app.use('/api/diets', dietRouter);
app.use('/api/allergies', allergyRouter);
app.use('/api/recipes', recipeRouter);

const startServer = async () => {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Nutri app listening on port ${port}`)
    })
}
  
startServer().catch(error => {
console.log(error, 'failed to start server')
})
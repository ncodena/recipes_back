import express from 'express';
import { register, login, getUserProfile, update, getMe } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/user.js';

const userRouter = express.Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me', authMiddleware, getMe);
userRouter.put('/:id', update);
userRouter.get('/:id', getUserProfile);


export default userRouter;
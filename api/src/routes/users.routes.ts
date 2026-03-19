import { Router } from 'express';
import * as userController from '../controllers/user.controller';

export const userRoutes = Router();

userRoutes.get('/getUsers', userController.findUsers);
userRoutes.get('/getUser/:id', userController.findUser);
import { Router } from 'express';
import { tournamentsRouter } from './tournaments.routes';
import { userRoutes } from './users.routes';

export const router = Router();

router.use('/tournament', tournamentsRouter);
router.use('/user', userRoutes);
import { Router } from 'express';
import { tournamentsRouter } from './tournaments.routes';
import { userRoutes } from './users.routes';
import { teamRoutes } from './team.routes';
import { inscriptionRoutes } from './inscription.routes';

export const router = Router();

router.use('/tournament', tournamentsRouter);
router.use('/user', userRoutes);
router.use('/team', teamRoutes);
router.use('/', inscriptionRoutes);
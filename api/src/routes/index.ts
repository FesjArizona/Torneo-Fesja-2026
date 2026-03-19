import { Router } from 'express';
import { tournamentsRouter } from './tournaments.routes';

export const router = Router();

router.use('/example', tournamentsRouter);
import { Router } from 'express';
import { tournamentController } from '../controllers/tournaments.controller';

export const tournamentsRouter = Router();

tournamentsRouter.get('/', tournamentController);
import { Router } from 'express';
import * as generateController from './../controllers/generate.controller'

export const generateRoutes = Router();

generateRoutes.post('/tournaments/:tournamentId/generate', generateController.generate);

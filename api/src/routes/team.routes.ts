import { Router } from 'express';
import * as teamService from './../controllers/team.controller'

export const teamRoutes = Router();

teamRoutes.get('/', teamService.getAll);
teamRoutes.get('/:id', teamService.getById);
teamRoutes.post('/', teamService.create);
teamRoutes.put('/:id', teamService.update);
teamRoutes.delete('/:id', teamService.remove);

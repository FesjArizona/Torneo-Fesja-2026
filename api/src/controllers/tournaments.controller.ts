import { Request, Response, NextFunction } from 'express';
import * as tournamentService from '../services/tournaments.service';

export const tournamentController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await tournamentService.fetchExample();
        res.json({ status: 'ok', data });
    } catch (error) {
        next(error);
    }
};
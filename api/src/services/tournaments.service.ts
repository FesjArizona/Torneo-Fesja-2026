
import * as tournamentsModel from '../models/tournaments.model';
import { Tournament } from '../types/Tournaments.interface';

export async function findTournaments() {
    return await tournamentsModel.findTournaments();
}

export async function findTournament(id: number) {
    return await tournamentsModel.findTournament(id);
}

export async function createTournament(data: Tournament) {
    const id = await tournamentsModel.createTournament(data);
    return await tournamentsModel.findTournament(id);
}

export async function updateTournament(id: number, data: any) {
    const exists = await tournamentsModel.findTournament(id);
    if (!exists) return null;

    const allowed = ['name', 'description', 'format', 'status', 'max_teams', 'start_date', 'end_date', 'location'] as string[];
    const fields = {} as any;
    for (const key of allowed) {
        if (data[key] !== undefined) fields[key] = data[key];
    }

    if (Object.keys(fields).length === 0) return exists;

    await tournamentsModel.updateTournament(id, fields);
    return tournamentsModel.findTournament(id);
}

export async function deleteTournament(id: number) {
    const exists = await tournamentsModel.findTournament(id);
    if (!exists) return null;
    await tournamentsModel.deleteTournament(id);
    return true;
}
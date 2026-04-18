export interface Tournament {
    id: number,
    name: string,
    status: string,
    start_date: string,
    end_date: string,
    location: string,
    teams_registered: number
}

export interface CreateTournament {
    id: number
    sport_id: number,
    name: string,
    description: string,
    format: string,
    start_date: string,
    end_date: string,
    location: string
}
export interface EditTournament {
    id: number
    name: string,
}

export interface RegisteredTeam {
    team_id: number,
    seed: number,
    inscription_status: string,
    team_name: string,
}
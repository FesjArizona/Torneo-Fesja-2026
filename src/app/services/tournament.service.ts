import { URL_API } from '../environment/environment';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../interfaces/api.interface';
import { CreateTournament, RegisteredTeam, Tournament } from '../interfaces/tournament.interface';

@Injectable({
    providedIn: 'root'
})

export class TournamentService {
    private readonly httpClient = inject(HttpClient)

    public getAllTournaments(): Observable<ApiResponse<Tournament[]>> {
        return this.httpClient.get<ApiResponse<Tournament[]>>(`${URL_API}/tournament`)
    }

    public getRegisteredTeams(tournament_id: number): Observable<ApiResponse<RegisteredTeam[]>> {
        return this.httpClient.get<ApiResponse<RegisteredTeam[]>>(`${URL_API}/tournaments/${tournament_id}/teams`)
    }

    public create(body: CreateTournament): Observable<ApiResponse<any>> {
        return this.httpClient.post<ApiResponse<any>>(`${URL_API}/tournament`, body)
    }

    public update(name: string, id: number): Observable<ApiResponse<any>> {
        return this.httpClient.put<ApiResponse<any>>(`${URL_API}/tournament/${id}`, { name })
    }

    public delete(id: number): Observable<ApiResponse<any>> {
        return this.httpClient.delete<ApiResponse<any>>(`${URL_API}/tournament/${id}`)
    }
}

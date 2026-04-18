import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from 'src/app/interfaces/api.interface';
import { CreateTeam, EditTeam, Team } from 'src/app/interfaces/teams.interface';
import { CreateTournament, EditTournament, Tournament } from 'src/app/interfaces/tournament.interface';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  standalone: true,
  selector: 'app-soccer-tournaments-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './soccer-tournaments-form.component.html',
  styleUrls: ['./soccer-tournaments-form.component.scss'],
})
export class soccerTournamentsFormComponent {
  private readonly tournamentService = inject(TournamentService)
  public tournament = signal<Tournament[]>([]);
  public tournamentDetails = signal<Tournament[]>([]);
  searchQuery = '';
  registerSubmitted = false;
  registerForm: CreateTournament = {
    id: 0,
    sport_id: 0,
    name: '',
    description: '',
    format: '',
    start_date: '',
    end_date: '',
    location: ''
  };
  tournamentName: string = ''

  editForm: EditTournament = {
    id: 0,
    name: '',
  };
  editingTournament: any;
  name: string = ''
  editSubmitted = false;

  ngOnInit(): void {
    this.loadTournaments()
  }


  get filteredtournament(): any {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.tournament();
    return this.tournament().filter(
      (t) =>
        t.name.toLowerCase().includes(q),
    );
  }

  loadTournaments() {
    this.tournamentService.getAllTournaments().subscribe({
      next: (response: ApiResponse<Tournament[]>) => {
        this.tournament.set(response.data)
      },
      error: (error: HttpErrorResponse) => {

      },
      complete: () => {

      },
    })

  }

  loadRegisteredTeams(id: number) {
    this.tournamentService.getRegisteredTeams(id).subscribe({
      next: (response: ApiResponse<any>) => {
        console.log(response)
      },
      error: (error: HttpErrorResponse) => {

      },
      complete: () => {

      },
    })

  }
  // ── Edit actions ────────────────────────────────────────────────────────────
  openEditModal(tournament: Tournament): void {
    this.editingTournament = tournament;
    this.editForm = {
      id: tournament.id,
      name: tournament.name,
    };
    this.editSubmitted = false;

    const modalEl = document.getElementById('editTournamentModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  deleteTournament(id: number): void {
    this.tournamentService.delete(id).subscribe({
      next: (response: ApiResponse<any>) => {
        this.loadTournaments()
      },
      error: (error: HttpErrorResponse) => {
        alert('Algo salió mal')
      },
      complete: () => {
      },
    })
  }

  resetRegisterForm(): void {
    this.registerForm = {
      id: 0,
      name: '',
      description: '',
      end_date: '',
      start_date: '',
      format: '',
      location: '',
      sport_id: 0,
    };
    this.registerSubmitted = false;
  }

  registerTournament(): void {
    this.registerSubmitted = true;
    if (
      !this.registerForm.name
    )
      return;
    this.tournamentService.create(this.registerForm).subscribe({
      next: (response: ApiResponse<any>) => {
        this.resetRegisterForm();
        this.closeModal('registerTeamModal');
        this.loadTournaments()
      },
      error: (error: HttpErrorResponse) => {
        alert('Algo salió mal')
      },
      complete: () => {

      },
    })
  }

  resetEditForm(): void {
    this.editingTournament = null;
    this.editForm = {
      id: 0,
      name: '',
    };
    this.editSubmitted = false;
  }

  saveChanges(): void {
    this.tournamentService.update(this.editForm.name, this.editForm.id).subscribe({
      next: (response: ApiResponse<any>) => {
        this.editSubmitted = true;
        if (!this.editForm.name)
          return;

        this.resetEditForm();
        this.closeModal('editTournamentModal');
        this.loadTournaments()
      },
      error: (error: HttpErrorResponse) => {
        alert('Algo salió mal')
      },
      complete: () => {

      },
    })
  }

  openTournamentModal(id: number) {
    const modalEl = document.getElementById('tournamentDetails');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
    this.loadRegisteredTeams(id)
  }

  private closeModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

}

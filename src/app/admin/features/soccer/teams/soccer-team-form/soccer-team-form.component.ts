import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TeamStatus = 'Active' | 'Suspended' | 'Disqualified' | 'Inactive';

interface Team {
  id: number;
  name: string;
  coach: string;
  players: number;
  status: TeamStatus;
}

interface RegisterForm {
  name: string;
  coach: string;
  players: number | null;
}

interface EditForm {
  name: string;
  coach: string;
  players: number | null;
  status: TeamStatus;
}

@Component({
  standalone: true,
  selector: 'app-soccer-team-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './soccer-team-form.component.html',
  styleUrls: ['./soccer-team-form.component.scss'],
})
export class SoccerTeamFormComponent {
  searchQuery = '';

  readonly statusOptions: TeamStatus[] = [
    'Active',
    'Suspended',
    'Disqualified',
    'Inactive',
  ];

  teams: Team[] = [
    {
      id: 1,
      name: 'Eagles',
      coach: 'Mark Spencer',
      players: 18,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Tigers',
      coach: 'James Wilson',
      players: 21,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Panthers',
      coach: 'Sarah Connor',
      players: 19,
      status: 'Active',
    },
  ];

  // ── Register ────────────────────────────────────────────────────────────────
  registerForm: RegisterForm = { name: '', coach: '', players: null };
  registerSubmitted = false;

  // ── Edit ────────────────────────────────────────────────────────────────────
  editingTeam: Team | null = null;
  editForm: EditForm = { name: '', coach: '', players: null, status: 'Active' };
  editSubmitted = false;

  // ── Computed ────────────────────────────────────────────────────────────────
  get filteredTeams(): Team[] {
    const q = this.searchQuery.toLowerCase();
    if (!q) return this.teams;
    return this.teams.filter(
      (t) =>
        t.name.toLowerCase().includes(q) || t.coach.toLowerCase().includes(q),
    );
  }

  get nextId(): number {
    return this.teams.length ? Math.max(...this.teams.map((t) => t.id)) + 1 : 1;
  }

  // ── Register actions ────────────────────────────────────────────────────────
  registerTeam(): void {
    this.registerSubmitted = true;
    if (
      !this.registerForm.name ||
      !this.registerForm.coach ||
      !this.registerForm.players
    )
      return;

    this.teams.push({
      id: this.nextId,
      name: this.registerForm.name,
      coach: this.registerForm.coach,
      players: this.registerForm.players,
      status: 'Active',
    });

    this.resetRegisterForm();
    this.closeModal('registerTeamModal');
  }

  resetRegisterForm(): void {
    this.registerForm = { name: '', coach: '', players: null };
    this.registerSubmitted = false;
  }

  // ── Edit actions ────────────────────────────────────────────────────────────
  openEditModal(team: Team): void {
    this.editingTeam = team;
    this.editForm = {
      name: team.name,
      coach: team.coach,
      players: team.players,
      status: team.status,
    };
    this.editSubmitted = false;

    const modalEl = document.getElementById('editTeamModal');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  saveChanges(): void {
    this.editSubmitted = true;
    if (!this.editForm.name || !this.editForm.coach || !this.editForm.players)
      return;

    if (this.editingTeam) {
      const idx = this.teams.findIndex((t) => t.id === this.editingTeam!.id);
      if (idx !== -1) {
        this.teams[idx] = {
          ...this.teams[idx],
          name: this.editForm.name,
          coach: this.editForm.coach,
          players: this.editForm.players!,
          status: this.editForm.status,
        };
      }
    }

    this.resetEditForm();
    this.closeModal('editTeamModal');
  }

  resetEditForm(): void {
    this.editingTeam = null;
    this.editForm = { name: '', coach: '', players: null, status: 'Active' };
    this.editSubmitted = false;
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  deleteTeam(id: number): void {
    this.teams = this.teams.filter((t) => t.id !== id);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────
  private closeModal(id: string): void {
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }
}

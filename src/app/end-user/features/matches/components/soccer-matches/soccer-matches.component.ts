import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match, Team } from '../../../../../core/models/bracket.model';
import { BracketComponent } from '../../../../../shared/components/bracket/bracket/bracket.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-soccer-matches',
  imports: [RouterOutlet, CommonModule, BracketComponent],
  templateUrl: './soccer-matches.component.html',
  styleUrls: ['./soccer-matches.component.scss']
})
export class SoccerMatchesComponent {

  @Input() match!: Match;
  @Output() teamAdvanced = new EventEmitter<{matchId: string, winner: Team, loser: Team}>();

  get isTBD1() { return !this.match.team1; }
  get isTBD2() { return !this.match.team2; }

  advance(team: Team | null, isTeam1: boolean) {
    if (!team || this.match.isFinished || !this.match.team1 || !this.match.team2) return;

    const winner = team;
    const loser = isTeam1 ? this.match.team2 : this.match.team1;

    this.match.score1 = isTeam1 ? 2 : 1;
    this.match.score2 = isTeam1 ? 1 : 2;

    this.teamAdvanced.emit({ matchId: this.match.id, winner, loser });
  }

}

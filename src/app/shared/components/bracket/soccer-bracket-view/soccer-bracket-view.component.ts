import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatchCardComponent } from '../../../../end-user/features/matches/components/match-card/match-card.component';
import { Bracket } from '../../../../core/models/bracket.model';
import { TournamentService } from '../../../../core/services/tournament.service';

/* interface Bracket {
  winners: Match[][];
  losers: Match[][];
} */

@Component({
  standalone: true,
  selector: 'app-soccer-bracket-view',
  imports: [CommonModule, MatchCardComponent],
  templateUrl: './soccer-bracket-view.component.html',
  styleUrls: ['./soccer-bracket-view.component.scss']
})
export class SoccerBracketViewComponent implements OnInit {

  bracket!: Bracket;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit() {
    this.bracket = this.tournamentService.getInitialBracket();
  }

}

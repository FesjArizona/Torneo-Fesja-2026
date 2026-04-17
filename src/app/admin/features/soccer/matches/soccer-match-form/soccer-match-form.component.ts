import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Bracket, Match, Team } from '../../../../../core/models/bracket.model';
import { TournamentService } from '../../../../../core/services/tournament.service';
import * as d3 from 'd3';
import { CommonModule } from '@angular/common';
import { MatchCardComponent } from '../../../../../end-user/features/matches/components/match-card/match-card.component';

@Component({
  standalone: true,
  selector: 'app-soccer-match-form',
  imports: [CommonModule, MatchCardComponent],
  templateUrl: './soccer-match-form.component.html',
  styleUrls: ['./soccer-match-form.component.scss']
})
export class SoccerMatchFormComponent implements OnInit, AfterViewInit {

  bracket!: Bracket;
    @ViewChild('linesOverlay', { static: false }) overlayRef!: ElementRef<SVGSVGElement>;
    @ViewChild('bracketContainer', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

    constructor(private tournamentService: TournamentService) {}

    private findMatch(id: string): Match | undefined {
      return [
        ...this.bracket.winners.flat(),
        ...this.bracket.losers.flat()
      ].find(m => m.id === id);
    }

    ngOnInit() {
      this.bracket = this.tournamentService.getInitialBracket();
    }

    ngAfterViewInit() {
      setTimeout(() => this.drawLines(), 100);
    }

    @HostListener('window:resize')
    onResize() {
      this.drawLines();
    }

    onTeamAdvanced(event: {matchId: string, winner: Team, loser: Team}) {
      this.tournamentService.advanceTeam(this.bracket, event.matchId, event.winner, event.loser);
      // Redraw lines after state change
      setTimeout(() => this.drawLines(), 50);
    }

    drawLines() {
      if (!this.overlayRef || !this.containerRef) return;

      const svg = d3.select(this.overlayRef.nativeElement);
      svg.selectAll('*').remove();

      const container = this.containerRef.nativeElement;
      svg.attr('width', container.scrollWidth);
      svg.attr('height', container.scrollHeight);

      const containerRect = container.getBoundingClientRect();
      const g = svg.append('g');

      // Draw Winner's Bracket connections
      // Winners bracket connections
      for (const round of this.bracket.winners) {
        for (const match of round) {

          if (!match.winnerTo) continue;

          const target = this.findMatch(match.winnerTo);

          // 🚨 NO permitir conexión hacia losers bracket
          if (target?.bracketType === 'losers') continue;

          // 🚨 SOLO permitir conexión dentro de winners o hacia final
          if (target?.bracketType === 'winners' || target?.bracketType === 'championship') {
            this.drawConnection(g, match.id, match.winnerTo, containerRect, '#94a3b8');
          }
        }
      }

      // Draw Loser's Bracket connections (within loser's bracket only)
      for (const round of this.bracket.losers) {
        for (const match of round) {

          if (!match.winnerTo) continue;

          const target = this.findMatch(match.winnerTo);

          // 🚨 CRÍTICO: losers NO pueden volver a winners
          if (target?.bracketType === 'winners') continue;

          // Solo permitir dentro de losers o hacia final
          if (target?.bracketType === 'losers' || target?.bracketType === 'championship') {
            this.drawConnection(g, match.id, match.winnerTo, containerRect, '#f97316');
          }
        }
      }
    }

    private drawConnection(g: any, sourceId: string, targetId: string, containerRect: DOMRect, color: string) {
      const sourceEl = document.getElementById('node-' + sourceId);
      const targetEl = document.getElementById('node-' + targetId);

      if (!sourceEl || !targetEl) return;

      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const startX = sourceRect.right - containerRect.left;
      const startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;

      const endX = targetRect.left - containerRect.left;
      const endY = targetRect.top + targetRect.height / 2 - containerRect.top;

      const midX = startX + (endX - startX) / 2;
      const r = 8; // corner radius

      let pathData: string;

      if (Math.abs(startY - endY) < 1) {
        // Straight horizontal line
        pathData = `M ${startX} ${startY} L ${endX} ${endY}`;
      } else if (endY > startY) {
        // Going down: H → rounded corner → V → rounded corner → H
        pathData = `M ${startX} ${startY} `
          + `L ${midX - r} ${startY} `
          + `A ${r} ${r} 0 0 1 ${midX} ${startY + r} `
          + `L ${midX} ${endY - r} `
          + `A ${r} ${r} 0 0 0 ${midX + r} ${endY} `
          + `L ${endX} ${endY}`;
      } else {
        // Going up: H → rounded corner → V → rounded corner → H
        pathData = `M ${startX} ${startY} `
          + `L ${midX - r} ${startY} `
          + `A ${r} ${r} 0 0 0 ${midX} ${startY - r} `
          + `L ${midX} ${endY + r} `
          + `A ${r} ${r} 0 0 1 ${midX + r} ${endY} `
          + `L ${endX} ${endY}`;
      }

      g.append('path')
        .attr('d', pathData)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('stroke-linecap', 'round')
        .attr('opacity', 0.7);
    }

}

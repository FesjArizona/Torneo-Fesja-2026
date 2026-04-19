import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/api.interface';
import { Standings } from 'src/app/interfaces/tournament.interface';
import { ResultTableService } from 'src/app/services/result-table.service';

@Component({
  standalone: true,
  selector: 'app-soccer-position-table',
  imports: [CommonModule],
  templateUrl: './soccer-position-table.component.html',
  styleUrls: ['./soccer-position-table.component.scss']
})
export class SoccerPositionTableComponent {
  tournamentId: number = 1;
  standingData: Standings[] = []
  constructor(private resultTableService: ResultTableService) { }

  ngOnInit() {
    this.resultTableService.getStanding(this.tournamentId).subscribe({
      next: (response: ApiResponse<Standings[]>) => {
        this.standingData = response.data;

      },
      error: () => {
        /* alert('Algo salio mal') */
      },
    });
  }



}

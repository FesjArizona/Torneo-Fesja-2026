import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Standings } from 'src/app/interfaces/tournament.interface';
import { ResultTableService } from 'src/app/services/result-table.service'
import { ApiResponse } from 'src/app/interfaces/api.interface';

@Component({
  standalone: true,
  selector: 'app-volley-position-table',
  imports: [CommonModule],
  templateUrl: './volley-position-table.component.html',
  styleUrls: ['./volley-position-table.component.scss']
})

export class VolleyPositionTableComponent {
  tournamentId: number = 3
  standingData: Standings[] = []
  constructor(private resultTableService: ResultTableService) { }
  ngOnInit() {
    this.resultTableService.getStanding(this.tournamentId).subscribe({
      next: (response: ApiResponse<Standings[]>) => {
        this.standingData = response.data;

      },
      error: () => {
        alert('Algo salio mal')
      },
    });
  }

}

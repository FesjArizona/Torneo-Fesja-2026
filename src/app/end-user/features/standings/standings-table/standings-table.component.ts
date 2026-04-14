import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Standing } from '../../../../core/models/standing.model';

@Component({
  standalone: true,
  selector: 'app-standings-table',
  imports: [CommonModule],
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent {

  @Input() data: Standing[] | null = [];

}

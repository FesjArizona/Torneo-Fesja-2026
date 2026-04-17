import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-soccer-position-table',
  imports: [CommonModule],
  templateUrl: './soccer-position-table.component.html',
  styleUrls: ['./soccer-position-table.component.scss']
})
export class SoccerPositionTableComponent{

  standings = [
    { name: 'Mesa Hispana', pj: 28, g: 22, e: 4, p: 2, gf: 68, gc: 22, dif: 46, pts: 70 },
    { name: 'North Valley', pj: 28, g: 21, e: 5, p: 2, gf: 65, gc: 20, dif: 45, pts: 68 },
    { name: 'West Valley', pj: 28, g: 19, e: 6, p: 3, gf: 54, gc: 24, dif: 30, pts: 63 },
    { name: 'Faro del este', pj: 28, g: 17, e: 5, p: 6, gf: 48, gc: 28, dif: 20, pts: 56 },
    { name: 'Faro del este 2', pj: 28, g: 15, e: 7, p: 6, gf: 45, gc: 30, dif: 15, pts: 52 },
    { name: 'SHALOM', pj: 28, g: 14, e: 8, p: 6, gf: 42, gc: 28, dif: 14, pts: 50 },
    { name: 'Central Valley', pj: 28, g: 13, e: 9, p: 6, gf: 40, gc: 30, dif: 10, pts: 48 },
    { name: 'Peoria', pj: 28, g: 12, e: 8, p: 8, gf: 38, gc: 34, dif: 4, pts: 44 },
  ];

}

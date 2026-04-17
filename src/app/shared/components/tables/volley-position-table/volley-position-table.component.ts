import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-volley-position-table',
  imports: [CommonModule],
  templateUrl: './volley-position-table.component.html',
  styleUrls: ['./volley-position-table.component.scss']
})
export class VolleyPositionTableComponent {

  standings = [
    { name: 'Mesa Hispanic', pj: 28, g: 22, e: 4, p: 2, gf: 68, gc: 22, dif: 46, pts: 70 },
    { name: 'Tucson Northwest', pj: 28, g: 21, e: 5, p: 2, gf: 65, gc: 20, dif: 45, pts: 68 },
    { name: 'Central Valley', pj: 28, g: 19, e: 6, p: 3, gf: 54, gc: 24, dif: 30, pts: 63 },
    { name: 'North Valley', pj: 28, g: 17, e: 5, p: 6, gf: 48, gc: 28, dif: 20, pts: 56 },
  ];

}

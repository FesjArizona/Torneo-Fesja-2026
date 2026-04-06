import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BracketComponent } from '../../../../../shared/components/bracket/bracket/bracket.component';

@Component({
  standalone: true,
  selector: 'app-soccer-matches',
  imports: [RouterOutlet, CommonModule, BracketComponent],
  templateUrl: './soccer-matches.component.html',
  styleUrls: ['./soccer-matches.component.scss']
})
export class SoccerMatchesComponent {

}

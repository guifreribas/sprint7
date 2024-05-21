import { Component, Input, input } from '@angular/core';
import { StarShip } from '../models/interfaces';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss',
})
export class StarshipComponent {
  @Input() starship!: StarShip;
}

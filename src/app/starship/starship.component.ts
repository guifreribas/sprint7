import { Component, Input, input } from '@angular/core';
import { StarShip } from '../models/interfaces';
import { PilotsComponent } from '../pilots/pilots.component';
import { FilmsComponent } from '../films/films.component';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [PilotsComponent, FilmsComponent],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss',
})
export class StarshipComponent {
  @Input() starship!: StarShip;
}

import { Component, inject, Input, input } from '@angular/core';
import { StarShip } from '../models/interfaces';
import { PilotsComponent } from '../pilots/pilots.component';
import { FilmsComponent } from '../films/films.component';
import { StarshipsService } from '../service/starships.service';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [PilotsComponent, FilmsComponent],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss',
})
export class StarshipComponent {
  public starshipsService = inject(StarshipsService);
  @Input() starship!: StarShip;
}

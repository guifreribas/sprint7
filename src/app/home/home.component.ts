import { Component, OnInit, inject, signal } from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { StarShip, StarShipResponse } from '../models/interfaces';
import { StarshipComponent } from '../starship/starship.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarshipComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private starshipsService = inject(StarshipsService);
  public starshipsData: StarShip[] = [];
  public starship = signal<StarShip>(this.starshipsService.starshipInit);
  constructor() {}

  selectStarship(starship: StarShip | null) {
    this.starship.set(starship || this.starshipsService.starshipInit);
  }

  ngOnInit(): void {
    this.starshipsService.getStarships().subscribe(
      (data: StarShipResponse) => {
        this.starshipsData = data.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

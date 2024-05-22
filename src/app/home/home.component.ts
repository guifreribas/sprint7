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
  public starship = this.starshipsService.starship;
  // public starship = signal<StarShip>(this.starshipsService.starshipInit);
  constructor() {}

  onSelectStarship(starship: StarShip | null): void {
    if (!starship) return this.starship.set(this.starshipsService.starshipInit);
    const oldStarship = starship;

    if (oldStarship.name) {
      let status: number;
      const index = this.getStarshipIndex(oldStarship);
      if (!index) return;
      this.starshipsService.getStarshipImage(index).subscribe(
        (data: any) => data,
        (error: any) => {
          if (error.status === 200) {
            oldStarship.imgUrl = `https://starwars-visualguide.com/assets/img/starships/${index}.jpg`;
          } else {
            oldStarship.imgUrl =
              'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
          }
        }
      );
      oldStarship.index = index || '';
      oldStarship.imgUrl = `https://starwars-visualguide.com/assets/img/starships/${index}.jpg`;
      console.log(oldStarship.imgUrl);
    }
    this.starship.set(oldStarship);
  }

  getStarshipIndex(starship: StarShip): string | null {
    const extractIdFromUrl = new RegExp(/\d+(?=\/$)/);
    const match = starship.url.match(extractIdFromUrl);
    return match ? match[0] : null;
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

import { Injectable, inject, signal } from '@angular/core';
import { StarShip } from '../models/interfaces';
import { extractIndexFromUrl } from '../helpers/extractIndex';
import { StarshipApiService } from './starship-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly starshipApiService = inject(StarshipApiService);
  public starshipInit = {
    name: '',
    model: '',
    manufacturer: '',
    cost_in_credits: '',
    length: '',
    max_atmosphering_speed: '',
    crew: '',
    passengers: '',
    cargo_capacity: '',
    consumables: '',
    hyperdrive_rating: '',
    MGLT: '',
    starship_class: '',
    pilots: [],
    films: [],
    created: '',
    edited: '',
    url: '',
  };
  public starship = signal<StarShip>(this.starshipInit);

  constructor() {}

  onSelectStarship(starship: StarShip | null): void {
    if (!starship) {
      this.starship.set(this.starshipInit);
      return;
    }
    const oldStarship = { ...starship };

    if (oldStarship.name) {
      const index = extractIndexFromUrl(oldStarship);
      if (!index) {
        oldStarship.imgUrl =
          'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
        return;
      }

      this.starshipApiService.getStarshipImage(index).subscribe({
        next: (data: any) => data,
        error: (error: HttpErrorResponse) =>
          this.setUrlImg(oldStarship, index, error),
      });
      oldStarship.index = index;
    }
    this.starship.set(oldStarship);
  }

  setUrlImg(starship: StarShip, index: string, error: any): void {
    const imgUrl =
      error.status === 200
        ? `https://starwars-visualguide.com/assets/img/starships/${index}.jpg`
        : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
    starship.imgUrl = imgUrl;
  }
}

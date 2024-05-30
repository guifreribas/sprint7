import { Injectable, inject, signal } from '@angular/core';
import { Character, PilotsData, StarShip } from '../models/interfaces';
import {
  extractIndexFromStarship,
  extractIndexFromUrl,
} from '../helpers/extractIndex';
import { StarshipApiService } from './starship-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PilotsService } from './pilots.service';
import { ConstantsService } from './constants.service';
import { lastValueFrom } from 'rxjs';
import { FilmsService } from './films.service';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private readonly starshipApiService = inject(StarshipApiService);
  private readonly constantsService = inject(ConstantsService);
  private readonly filmsService = inject(FilmsService);
  private pilotService = inject(PilotsService);
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
    pilotsData: [],
    filmsData: [],
  };
  public starship = signal<StarShip>(this.starshipInit);

  constructor() {}

  async onSelectStarship(starship: StarShip | null): Promise<void> {
    if (!starship) {
      this.starship.set(this.starshipInit);
      return;
    }
    const oldStarship = { ...starship };

    if (oldStarship.name) {
      const index = extractIndexFromStarship(oldStarship);
      if (!index) {
        oldStarship.imgUrl = this.constantsService.IMG_FALLBACK_URL;
        return;
      }
      oldStarship.index = index;
      this.starshipApiService.getStarshipImage(index).subscribe({
        error: (error: HttpErrorResponse) =>
          this.setUrlImg(oldStarship, index, error),
      });
      if (oldStarship.pilots.length > 0) {
        const pilotData = await this.pilotService.getPilotData(oldStarship);
        oldStarship.pilotsData = pilotData;
      }
      if (oldStarship.films.length > 0) {
        const filmData = await this.filmsService.getFilmData(oldStarship);
        oldStarship.filmsData = filmData;
      }
    }

    this.starship.set(oldStarship);
  }

  setUrlImg(starship: StarShip, index: string, error: any): void {
    const imgUrl =
      error.status === 200
        ? `${this.constantsService.IMG_STARSHIPS_BASE_URL}${index}.jpg`
        : this.constantsService.IMG_FALLBACK_URL;
    starship.imgUrl = imgUrl;
  }

  // async getPilotData(starship: StarShip): Promise<PilotsData[]> {
  //   let index = '';
  //   let imgUrl = '';
  //   let pilot: Character = this.pilotService.pilotsInit;
  //   const pilotsData: PilotsData[] = [];
  //   for (const pilotUrl of starship.pilots) {
  //     index = extractIndexFromUrl(pilotUrl) || '';
  //     imgUrl = !index
  //       ? this.constantsService.IMG_FALLBACK_URL
  //       : `${this.constantsService.IMG_CHARACTERS_BASE_URL}${index}.jpg`;

  //     if (index) {
  //       try {
  //         pilot = await lastValueFrom(this.pilotService.getPilot(index));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     pilotsData.push({
  //       index,
  //       imgUrl,
  //       pilot,
  //     });
  //   }
  //   return pilotsData;
  // }
}

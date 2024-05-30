import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Character, PilotsData, StarShip } from '../models/interfaces';
import { extractIndexFromUrl } from '../helpers/extractIndex';
import { ConstantsService } from './constants.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PilotsService {
  private http = inject(HttpClient);
  private readonly constantsService = inject(ConstantsService);
  public pilotsInit = {
    name: '',
    height: '',
    mass: '',
    hair_color: '',
    skin_color: '',
    eye_color: '',
    birth_year: '',
    gender: '',
    homeworld: '',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: '',
    edited: '',
    url: '',
  };
  public pilot = signal<Character>(this.pilotsInit);
  constructor() {}

  getPilot(index: string): any {
    return this.http.get(`https://swapi.dev/api/people/${index}`);
  }

  async getPilotData(starship: StarShip): Promise<PilotsData[]> {
    let index = '';
    let imgUrl = '';
    let pilot: Character = this.pilotsInit;
    const pilotsData: PilotsData[] = [];
    for (const pilotUrl of starship.pilots) {
      index = extractIndexFromUrl(pilotUrl) || '';
      imgUrl = !index
        ? this.constantsService.IMG_FALLBACK_URL
        : `${this.constantsService.IMG_CHARACTERS_BASE_URL}${index}.jpg`;

      if (index) {
        try {
          pilot = await lastValueFrom(this.getPilot(index));
        } catch (error) {
          console.log(error);
        }
      }
      pilotsData.push({
        index,
        imgUrl,
        pilot,
      });
    }
    return pilotsData;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  public readonly API_BASE_URL = 'https://swapi.dev/api/';
  public readonly IMG_FALLBACK_URL =
    'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
  public readonly IMG_STARSHIPS_BASE_URL =
    'https://starwars-visualguide.com/assets/img/starships/';
  public readonly IMG_CHARACTERS_BASE_URL =
    'https://starwars-visualguide.com/assets/img/characters/';
}

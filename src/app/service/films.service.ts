import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Film, FilmData, StarShip } from '../models/interfaces';
import { extractIndexFromUrl } from '../helpers/extractIndex';
import { ConstantsService } from './constants.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);
  private readonly constantsService = inject(ConstantsService);
  public filmInit = {
    title: '',
    episode_id: 0,
    opening_crawl: '',
    director: '',
    producer: '',
    release_date: '',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: '',
    edited: '',
    url: '',
  };
  public film = signal<Film>(this.filmInit);

  getFilm(index: string): any {
    return this.http.get(`https://swapi.dev/api/films/${index}`);
  }

  async getFilmData(starship: StarShip): Promise<FilmData[]> {
    let index = '';
    let imgUrl = '';
    let film: Film = this.filmInit;
    const filmsData: FilmData[] = [];
    for (const filmUrl of starship.films) {
      index = extractIndexFromUrl(filmUrl) || '';
      imgUrl = !index
        ? this.constantsService.IMG_FALLBACK_URL
        : `${this.constantsService.IMG_FILMS_BASE_URL}${index}.jpg`;

      if (index) {
        try {
          film = await lastValueFrom(this.getFilm(index));
        } catch (error) {
          console.log(error);
        }
      }
      filmsData.push({
        index,
        imgUrl,
        film,
      });
    }
    return filmsData;
  }
}

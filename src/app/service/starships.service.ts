import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { StarShip } from '../models/interfaces';

// const BASE_URL = 'https://swapi.dev/api/starships';
@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private http = inject(HttpClient);
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
  getStarships(page: number = 1): any {
    return this.http.get(`https://swapi.dev/api/starships?page=${page}`);
  }

  getStarshipImage(id: string): any {
    return this.http.get(
      `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
    );
  }
}

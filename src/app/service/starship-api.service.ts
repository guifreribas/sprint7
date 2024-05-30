import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StarshipApiService {
  private http = inject(HttpClient);

  constructor() {}
  getStarships(page: number = 1): any {
    return this.http.get(`https://swapi.dev/api/starships?page=${page}`);
  }

  getStarshipImage(id: string): any {
    return this.http.get(
      `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
    );
  }

  getStarshipPilotsImages() {
    return this.http.get(`https://swapi.dev/api/starships/1/pilots/images`);
  }
}

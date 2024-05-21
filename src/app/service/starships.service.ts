import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const BASE_URL = 'https://swapi.dev/api/starships';
@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  private http = inject(HttpClient);
  constructor() {}
  getStarships(page: number = 1): any {
    return this.http.get(`${BASE_URL}?page=${page}`);
  }
}

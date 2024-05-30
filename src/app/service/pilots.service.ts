import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Character } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PilotsService {
  private http = inject(HttpClient);
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
}

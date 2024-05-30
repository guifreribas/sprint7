import { Component, Input } from '@angular/core';
import { FilmData } from '../models/interfaces';

@Component({
  selector: 'app-film',
  standalone: true,
  imports: [],
  templateUrl: './film.component.html',
  styleUrl: './film.component.scss',
})
export class FilmComponent {
  @Input() film!: FilmData;
}

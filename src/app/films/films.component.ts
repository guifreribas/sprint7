import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmComponent } from '../film/film.component';
import { StarshipsService } from '../service/starships.service';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule, FilmComponent],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent {
  public starshipsService = inject(StarshipsService);
}

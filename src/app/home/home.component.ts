import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { StarShip, StarShipResponse } from '../models/interfaces';
import { StarshipComponent } from '../starship/starship.component';
import { extractIndexFromUrl } from '../helpers/extractIndex';
import { InfinityScrollDirective } from '../directives/infinity-scroll.directive';
import { HttpErrorResponse } from '@angular/common/http';
import { StarshipApiService } from '../service/starship-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarshipComponent, InfinityScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('starshipsContainer') starshipsContainerRef!: ElementRef;
  private readonly starshipsService = inject(StarshipsService);
  // private readonly starshipsApiService = inject(StarshipApiService);
  public readonly starship = this.starshipsService.starship;

  constructor() {}

  ngOnInit(): void {}

  onSelectStarship(starship: StarShip | null): void {
    this.starshipsService.onSelectStarship(starship);
  }
}

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { StarShip } from '../models/interfaces';
import { StarshipComponent } from '../starship/starship.component';
import { InfinityScrollDirective } from '../directives/infinity-scroll.directive';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarshipComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('starshipsContainer') starshipsContainerRef!: ElementRef;
  private readonly starshipsService = inject(StarshipsService);
  public readonly starship = this.starshipsService.starship;

  constructor() {}

  ngOnInit(): void {}

  onSelectStarship(starship: StarShip | null): void {
    this.starshipsService.onSelectStarship(starship);
  }
}

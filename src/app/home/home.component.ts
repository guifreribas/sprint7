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
  public readonly starship = this.starshipsService.starship;
  public starshipsData: StarShip[] = [];
  private isLoading: boolean = false;
  private page: number = 1;
  private hasMore: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.fetchStarship();
  }

  onScroll(): void {
    if (!this.isLoading && this.hasMore) {
      this.fetchStarship(this.page);
    }
  }

  public fetchStarship(page: number = 1): void {
    this.isLoading = true;
    this.starshipsService.getStarships(page).subscribe({
      next: (data: StarShipResponse) => {
        this.starshipsData = this.starshipsData.concat(data.results);
        this.hasMore = !!data.next;
        this.page++;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching starships', error);
        this.isLoading = false;
      },
    });
  }

  onSelectStarship(starship: StarShip | null): void {
    if (!starship) {
      this.starship.set(this.starshipsService.starshipInit);
      return;
    }
    const oldStarship = { ...starship };

    if (oldStarship.name) {
      const index = extractIndexFromUrl(oldStarship);
      if (!index) {
        oldStarship.imgUrl =
          'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
        return;
      }

      this.starshipsService.getStarshipImage(index).subscribe({
        next: (data: any) => data,
        error: (error: HttpErrorResponse) =>
          this.setUrlImg(oldStarship, index, error),
      });
      oldStarship.index = index;
    }
    this.starship.set(oldStarship);
  }

  setUrlImg(starship: StarShip, index: string, error: any): void {
    const imgUrl =
      error.status === 200
        ? `https://starwars-visualguide.com/assets/img/starships/${index}.jpg`
        : 'https://www.interactive.org/images/games_developers/no_image_available_sm.jpg';
    starship.imgUrl = imgUrl;
  }
}

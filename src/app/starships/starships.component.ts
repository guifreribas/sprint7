import { Component, OnInit, inject } from '@angular/core';
import { StarShip, StarShipResponse } from '../models/interfaces';
import { StarshipsService } from '../service/starships.service';
import { StarshipApiService } from '../service/starship-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StarshipComponent } from '../starship/starship.component';
import { InfinityScrollDirective } from '../directives/infinity-scroll.directive';

@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [StarshipComponent, InfinityScrollDirective],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
})
export class StarshipsComponent implements OnInit {
  public starshipsData: StarShip[] = [];
  private readonly starshipsService = inject(StarshipsService);
  private readonly starshipsApiService = inject(StarshipApiService);
  public readonly starship = this.starshipsService.starship;
  private page: number = 1;
  private isLoading: boolean = false;
  private hasMore: boolean = true;

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
    this.starshipsApiService.getStarships(page).subscribe({
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
    this.starshipsService.onSelectStarship(starship);
  }
}

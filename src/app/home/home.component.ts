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
  // public starshipsData: StarShip[] = [];
  // private page: number = 1;
  // private isLoading: boolean = false;
  // private hasMore: boolean = true;
  constructor() {}

  ngOnInit(): void {
    // this.fetchStarship();
  }

  // onScroll(): void {
  //   if (!this.isLoading && this.hasMore) {
  //     this.fetchStarship(this.page);
  //   }
  // }

  // public fetchStarship(page: number = 1): void {
  //   this.isLoading = true;
  //   this.starshipsApiService.getStarships(page).subscribe({
  //     next: (data: StarShipResponse) => {
  //       this.starshipsData = this.starshipsData.concat(data.results);
  //       this.hasMore = !!data.next;
  //       this.page++;
  //       this.isLoading = false;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.error('Error fetching starships', error);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  onSelectStarship(starship: StarShip | null): void {
    this.starshipsService.onSelectStarship(starship);
  }
}

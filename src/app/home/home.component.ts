import { Component, OnInit, inject } from '@angular/core';
import { StarshipsService } from '../service/starships.service';
import { StarShip, StarShipResponse } from '../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private starshipsService = inject(StarshipsService);
  public starshipsData: StarShip[] = [];
  constructor() {}

  ngOnInit(): void {
    this.starshipsService.getStarships().subscribe(
      (data: StarShipResponse) => {
        this.starshipsData = data.results;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}

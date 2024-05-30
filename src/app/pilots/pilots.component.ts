import { Component, OnInit, inject, signal } from '@angular/core';
import { PilotComponent } from '../pilot/pilot.component';
import { StarshipsService } from '../service/starships.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule, PilotComponent],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss',
})
export class PilotsComponent implements OnInit {
  public starshipsService = inject(StarshipsService);
  public hasPilotData = signal(false);

  ngOnInit(): void {
    if (this.starshipsService.starship().pilotsData === undefined) {
      this.hasPilotData.set(false);
    } else {
      this.hasPilotData.set(
        this.starshipsService.starship().pilotsData.length > 0
      );
    }
  }
}

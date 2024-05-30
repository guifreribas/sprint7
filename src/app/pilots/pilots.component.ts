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
export class PilotsComponent {
  public starshipsService = inject(StarshipsService);
}

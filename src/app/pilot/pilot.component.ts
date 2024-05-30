import { Component, Input, OnInit } from '@angular/core';
import { PilotsData } from '../models/interfaces';

@Component({
  selector: 'app-pilot',
  standalone: true,
  imports: [],
  templateUrl: './pilot.component.html',
  styleUrl: './pilot.component.scss',
})
export class PilotComponent implements OnInit {
  @Input() pilot!: PilotsData;
  public imgSrc: string = '';

  ngOnInit(): void {}
}

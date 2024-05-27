import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[appInfinityScroll]',
  standalone: true,
})
export class InfinityScrollDirective {
  @Output() scrolled = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      this.scrolled.emit();
    }
  }
  constructor() {}
}

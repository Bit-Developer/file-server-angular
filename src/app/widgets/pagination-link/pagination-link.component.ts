import { Component, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'widget-pagination-link',
  templateUrl: './pagination-link.component.html',
  styleUrls: ['./pagination-link.component.scss'],
})
export class PaginationLinkComponent {
  @Input() prev: string;
  @Input() next: string;

  constructor(private router: Router) {}

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    // navigate to previous page or next page
    if (ev.key === 'ArrowLeft') {
      if (this.prev) {
        this.router.navigate([this.prev]); // eslint-disable-line @typescript-eslint/no-floating-promises
      }
    } else if (ev.key === 'ArrowRight') {
      if (this.next) {
        this.router.navigate([this.next]); // eslint-disable-line @typescript-eslint/no-floating-promises
      }
    }
  }

  getPrevLink() {
    return this.prev;
  }

  getNextLink() {
    return this.next;
  }
}

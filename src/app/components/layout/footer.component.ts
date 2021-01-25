import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  @Input() currentYear: number;
  @Input() siteTitle: string;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.siteTitle = environment.site_title;
  }
}

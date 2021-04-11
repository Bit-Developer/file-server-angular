import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  envName: string;
  siteTitle: string;

  ngOnInit() {
    this.envName = environment.env_name;
    this.siteTitle = environment.site_title;
  }
}

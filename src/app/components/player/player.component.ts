import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import { NavPath } from 'src/app/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  fileUrl = environment.fileUrl;
  playerOpts: any;

  relPath: string;
  filename: string;
  breadCrumbPaths = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.relPath = decodeURIComponent(params.url);
      this.breadCrumbPaths = this.buildBreadcrumbList(this.relPath);
      if (this.relPath) {
        this.playerOpts = {
          url: this.fileUrl + '/' + this.relPath,
          volume: 0.5,
          autoplay: true,
        };
      }
    });
  }

  buildBreadcrumbList(relPath: string) {
    const paths: NavPath[] = [];
    const names = relPath.split('/');
    let path = '';
    paths.push({ name: 'Home', path: path });
    names.forEach((name) => {
      path = path + name + '/';
      paths.push({ name, path });
    });
    if (paths.length > 1) {
      this.filename = paths.pop().name; // remove last element
    }
    return paths;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';
import { BaseFormComponent } from '../base-form.component';
import { ExplorerService } from '../explorer/explorer.service';
import { NavPath } from 'src/app/models';
import { FileUtil } from '../explorer/util';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent extends BaseFormComponent {
  fileUrl = environment.fileUrl;
  playerOpts: any;

  relPath: string;
  filename: string;
  breadCrumbPaths = [];

  currFolder: string;
  prev: string;
  next: string;

  constructor(private route: ActivatedRoute, private explorerService: ExplorerService) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.relPath = decodeURIComponent(params.url);
      this.breadCrumbPaths = this.buildBreadcrumbList(this.relPath);
      if (FileUtil.isVideo(this.relPath)) {
        this.playerOpts = {
          url: this.fileUrl + '/' + this.relPath,
          volume: 0.5,
          autoplay: true,
        };
      }
      this.explorerService.getFilesSortedByTypeAndName(this.currFolder).subscribe(
        (files) => {
          for (let i = 0; i < files.length; i++) {
            if (files[i].name === this.filename) {
              this.prev = i > 0 ? `player/${FileUtil.encodeURL(`${this.currFolder}${encodeURIComponent(files[i - 1].name)}`)}` : '';
              this.next =
                i < files.length - 1 ? `player/${FileUtil.encodeURL(`${this.currFolder}${encodeURIComponent(files[i + 1].name)}`)}` : '';
              break;
            }
          }
        },
        (error) => {
          this.handleError(error);
        },
      );
    });
  }

  buildBreadcrumbList(relPath: string) {
    const paths: NavPath[] = [];
    const names = relPath.split('/');
    let path = '';
    paths.push({ name: 'Home', path: path });
    names.forEach((name) => {
      if (name) {
        path = path + name + '/';
        paths.push({ name, path });
      }
    });
    if (paths.length > 1) {
      this.filename = paths.pop().name; // remove last element
    }

    this.currFolder = path.replace(this.filename + '/', '');
    return paths;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss'],
})
export class FileViewComponent implements OnInit {
  fileUrl = environment.fileUrl;
  filename: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.filename = decodeURIComponent(params.url);
      this.fileUrl = this.fileUrl + '/' + this.filename;
    });
  }
}

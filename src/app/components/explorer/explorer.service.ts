import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { FileItem } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {
  // api url
  apiUrl = environment.apiUrl + '/file';

  // create constructor to get Http instance
  constructor(private http: HttpClient) {}

  // fetch file and dir list
  getFiles(relPath: string): Observable<FileItem[]> {
    return this.http.get<FileItem[]>(this.apiUrl + '/list/?relPath=' + relPath);
  }

  // get files after sorted
  getFilesSortedByTypeAndName(relPath: string): Observable<FileItem[]> {
    // sort by directory first, then by name
    return this.getFiles(relPath).pipe(
      map((data: FileItem[]) =>
        data.sort((p1, p2) => {
          if (p1.isDir == p2.isDir) {
            return p1.name < p2.name ? -1 : 1;
          } else {
            return p1.isDir ? -1 : 1;
          }
        }),
      ),
    );
  }

  // create folder
  createFolder(relPath: string, folderName: string): Observable<any> {
    return this.http
      .post(this.apiUrl + '/create', { relPath, folderName }, { observe: 'response' })
      .pipe(map((res) => res.status));
  }

  // upload file
  upload(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + '/upload', formData, { observe: 'response' }).pipe(map((res) => res.status));
  }

  // download file
  /*   download(relPath: string): Observable<any[]> {
      return this.http.get<any>(this.apiUrl + '/download/?path=' + relPath);
    } */

  // rename file or directory
  rename(oldPath: string, newPath: string): Observable<any> {
    return this.http
      .post(this.apiUrl + '/rename', { oldPath, newPath }, { observe: 'response' })
      .pipe(map((res) => res.status));
  }

  // move files or directories
  move(srcPath: string, targetPath: string, fileNames: string[]): Observable<any> {
    return this.http
      .post(this.apiUrl + '/move', { srcPath, targetPath, fileNames }, { observe: 'response' })
      .pipe(map((res) => res.status));
  }

  // archive file
  archive(relPath: string, fileNames: string[], archivedFileName: string, embedDirs: boolean): Observable<any> {
    return this.http
      .post(this.apiUrl + '/archive', { relPath, fileNames, archivedFileName, embedDirs }, { observe: 'response' })
      .pipe(map((res) => res.status));
  }

  // delete file
  delete(relPath: string, fileNames: string[]): Observable<any> {
    return this.http
      .post(this.apiUrl + '/delete', { relPath, fileNames }, { observe: 'response' })
      .pipe(map((res) => res.status));
  }
}

import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../environments/environment';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BaseFormComponent } from '../base-form.component';
import { ExplorerService } from './explorer.service';
import { FileItem, NavPath } from '../../models';
import { DialogType } from './modal.enum';

import { FileUtil } from './util';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent extends BaseFormComponent {
  @ViewChild('viewFileDlg') viewFileDlgRef: TemplateRef<any>;

  // make DialogType be recognized in the html
  dialogType: typeof DialogType = DialogType;

  editable = environment.editable;
  apiUrl = environment.apiUrl;
  fileUrl = environment.fileUrl;
  downLoadUrl = this.apiUrl + '/file/download/';

  // file manaager
  curFolderPath = '/'; // current relative folder path
  breadCrumbPaths = []; // items in breadcrumb list, for each level folder
  currFiles: FileItem[] = []; // files in current folder

  // select all and select file
  selecteAll = false; // if select all files
  selection: FileItem[] = []; // selected files
  uploadFile = null; // will upload file

  // view file
  viewFileName = '';
  viewFileRelPath = '';
  viewImageUrl = '';
  viewPdfUrl = '';

  // New Folder Action
  newFolderName = '';

  // Upload File Action
  fileToUpload: File = null;
  filename = '';

  // Download Action

  // Rename Action
  newFileName = '';

  // Move Action
  moveTarget = '';

  // Archive Action
  archiveTarget = '';
  archiveEmbedDirs = true;

  // Delete Action

  // modal dialog
  modalRef: BsModalRef;

  constructor(
    private route: ActivatedRoute,
    private explorerService: ExplorerService,
    private modalService: BsModalService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const path = decodeURIComponent(params.url || '');
      this.exploreDirectory(path);

      // clean up variables when dialog is hidden
      this.modalService.onHide.subscribe(() => {
        this.cleanUp();
      });
    });
  }

  // checkbox select
  selectAll(event: Event) {
    const checkAll = event.target as HTMLInputElement;
    this.selection = [];
    this.currFiles.forEach((file) => {
      file.selected = checkAll.checked;
      this.selection.push(file);
    });
  }

  selectFile(event: Event) {
    const checkOne = event.target as HTMLInputElement;
    this.selection = [];
    this.currFiles.forEach((file) => {
      if (file.name === checkOne.value) {
        file.selected = checkOne.checked;
      }
      if (file.selected) {
        this.selection.push(file);
      }
    });
  }

  btnDisabled(btnName: string) {
    switch (btnName) {
      case 'download':
        if (this.selection.length === 0) return true;
        else {
          for (const file of this.selection) {
            if (file.isDir) return true;
          }
          return false;
        }
      case 'delete':
      case 'move':
      case 'archive':
        return this.selection.length === 0;
      case 'rename':
        return this.selection.length !== 1;
      case 'upload_file':
      case 'create_folder':
        return false;
      default:
        return true;
    }
  }

  // navigation on breadcrumb
  navigateDir(path: string) {
    this.exploreDirectory(decodeURIComponent(path));
  }

  exploreDirectory(relPath: string) {
    this.curFolderPath = relPath;
    if (!this.curFolderPath) {
      this.curFolderPath = '/';
    }
    this.breadCrumbPaths = this.buildBreadcrumbList(relPath);
    this.getCurrentFiles(relPath);
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
    return paths;
  }

  getCurrentFiles(relPath: string) {
    this.explorerService.getFilesSortedByTypeAndName(relPath).subscribe(
      (data) => {
        const files = data;
        files.forEach((file) => {
          file.relPath = relPath + encodeURIComponent(file.name);
          if (file.isDir) file.relPath += '/';
          file.selected = false;
        });
        this.currFiles = files;
      },
      (error) => {
        this.handleError(error);
      },
    );
  }

  clickFile(file: FileItem) {
    this.viewImageUrl = '';
    this.viewPdfUrl = '';

    if (file.isDir) {
      // open folder
      this.exploreDirectory(decodeURIComponent(file.relPath));
    } else {
      // open file with proper tool
      if (FileUtil.isVideo(file.name)) {
        const url = `player/${FileUtil.encodeURL(file.relPath)}`;
        this.logger.debug(url);
        this.navigateByUrl(url);
      } else if (FileUtil.isImage(file.name)) {
        this.viewFileName = file.name;
        this.viewFileRelPath = decodeURIComponent(file.relPath);
        this.viewImageUrl = this.fileUrl + '/' + decodeURIComponent(file.relPath);
        this.modalRef = this.modalService.show(this.viewFileDlgRef, { class: 'modal-lg' });
      } else if (FileUtil.isPdf(file.name)) {
        this.viewFileName = file.name;
        this.viewFileRelPath = decodeURIComponent(file.relPath);
        this.viewPdfUrl = this.fileUrl + '/' + decodeURIComponent(file.relPath);
        this.modalRef = this.modalService.show(this.viewFileDlgRef, { class: 'modal-lg' });
      } else if (FileUtil.isText(file.name)) {
        const url = `view/${FileUtil.encodeURL(file.relPath)}`;
        this.logger.debug(url);
        this.navigateByUrl(url);
      } else {
        // download file
        this.downloadFile(file);
      }
    }
  }

  // download
  downloadFile(file: FileItem) {
    const url = this.downLoadUrl + '?relPath=' + decodeURIComponent(file.relPath);
    window.open(url);
  }

  download() {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    for (const file of this.selection) {
      const url = this.downLoadUrl + '?relPath=' + decodeURIComponent(file.relPath);
      this.logger.debug(url);
      link.setAttribute('href', url);
      link.setAttribute('download', file.name);
      link.click();
    }

    document.body.removeChild(link);
  }

  downloadImage(fileRelPath: string) {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    const url = this.downLoadUrl + '?relPath=' + decodeURIComponent(fileRelPath);
    this.logger.debug(url);
    link.setAttribute('href', url);
    link.setAttribute('download', fileRelPath);
    link.click();

    document.body.removeChild(link);
  }

  // create new folder
  createFolder(folderName: string) {
    if (!folderName) {
      alert('Please input name!');
      return;
    }
    this.asyncBegin();
    this.explorerService.createFolder(this.curFolderPath, encodeURI(folderName)).subscribe(
      () => {
        this.asyncEnd();
        this.alertService.success('Folder has been created successfully.');
        this.exploreDirectory(this.curFolderPath);
        this.modalRef.hide();
      },
      (error) => {
        this.handleError(error);
        this.modalRef.hide();
      },
    );
  }

  // rename file or directory
  rename(newName: string) {
    const oldPath = this.selection[0].relPath;
    const newPath = this.curFolderPath + encodeURI(newName);
    this.asyncBegin();
    this.explorerService.rename(oldPath, newPath).subscribe(
      () => {
        this.asyncEnd();
        this.alertService.success('File has been renamed successfully.');
        this.newFileName = '';
        this.exploreDirectory(this.curFolderPath);
        this.modalRef.hide();
      },
      (error) => {
        this.handleError(error);
        this.modalRef.hide();
      },
    );
  }

  //upload file
  selectedFileChanged(event: Event) {
    const fileUpload = event.target as HTMLInputElement;
    if (fileUpload.files.length > 0) {
      this.fileToUpload = fileUpload.files[0];
      this.filename = this.fileToUpload.name;
      this.logger.debug(this.fileToUpload);
    }
  }

  clearFile() {
    const fileCtrl = <HTMLInputElement>document.getElementById('upload');
    if (fileCtrl) {
      fileCtrl.value = '';
      this.fileToUpload = null;
      this.filename = '';
    }
  }

  upload(): void {
    if (!this.fileToUpload) {
      alert('No file has been chosen for uploading!');
      return;
    }
    const formData = new FormData();
    // 'path' must be put before the file, so it is populated before the file in backend,
    // which can be used by 'multer', see https://stackoverflow.com/questions/39589022/node-js-multer-and-req-body-empty
    formData.append('relPath', this.curFolderPath);
    // 'fileitem' must match with the backen api
    formData.append('fileItem', this.fileToUpload, this.fileToUpload.name); // file
    //formData.append("name", this.collection); // collection name: users, questions.

    this.asyncBegin();
    this.explorerService.upload(formData).subscribe(
      () => {
        this.alertService.success('File have been successfully uploaded.');
        this.asyncEnd();
        this.clearFile();
        this.exploreDirectory(this.curFolderPath);
        this.modalRef.hide();
      },
      (error) => {
        this.handleError(error);
        this.clearFile();
        this.modalRef.hide();
      },
    );
  }

  // move file
  move(target: string) {
    const fileNames = [];
    for (const file of this.selection) {
      fileNames.push(file.name);
    }
    this.asyncBegin();
    this.explorerService.move(this.curFolderPath, encodeURI(target), fileNames).subscribe(
      () => {
        this.asyncEnd();
        this.alertService.success('File has been moved successfully.');
        this.exploreDirectory(this.curFolderPath);
        this.modalRef.hide();
      },
      (error) => {
        this.handleError(error);
        this.modalRef.hide();
      },
    );
  }

  // archive
  archive(archive: string) {
    if (!archive.endsWith('.zip')) {
      archive += '.zip';
    }
    const fileNames = this.selection.map(function (file) {
      return file.name;
    });

    this.asyncBegin();
    this.explorerService.archive(this.curFolderPath, fileNames, archive, this.archiveEmbedDirs).subscribe(
      () => {
        this.asyncEnd();
        this.alertService.success('File has been archived successfully.');
        this.exploreDirectory(this.curFolderPath);
        this.modalRef.hide();
      },
      (error) => {
        this.handleError(error);
        this.modalRef.hide();
      },
    );
  }

  // delete file or directory
  delete() {
    const fileNames = this.selection.map((selectItem) => {
      return selectItem.name;
    });
    this.asyncBegin();
    this.explorerService.delete(this.curFolderPath, fileNames).subscribe(
      () => {
        this.asyncEnd();
        this.alertService.success('File has been deleted successfully.');
        this.exploreDirectory(this.curFolderPath);
        this.modalRef.hide();
      },
      (error) => {
        this.handleError(error);
        this.modalRef.hide();
      },
    );
  }

  // open modal dialog
  openModal(dt: DialogType, template: TemplateRef<any>) {
    this.logger.debug(dt);
    switch (dt) {
      case DialogType.NEW:
        break;
      case DialogType.RENAME:
        this.newFileName = this.selection[0].name;
        break;
      case DialogType.ARCHIVE:
        this.archiveTarget =
          'files_' + this.curFolderPath.replace(/\//g, '_') + new Date().toISOString().replace(/:/g, '.') + '.zip';
        break;
    }

    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  // close modal dialog
  cancel(): void {
    this.modalRef.hide();
  }

  // clean up values used by modal dialogs
  cleanUp() {
    this.newFolderName = '';
    this.clearFile();
  }
}

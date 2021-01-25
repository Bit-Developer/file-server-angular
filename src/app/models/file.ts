export interface FileItem {
  isDir: boolean;
  name: string;
  size: number;
  createdAt: number;
  updatedAt: number;
  relPath: string;
  selected: boolean;
}

export interface CreateFolder {
  relPath: string;
  filenames: string[];
}

export interface MoveFile {
  srcPath: string;
  targetPath: string;
  filenames: string[];
}

export interface DeleteFile {
  relPath: string;
  filenames: string[];
}

export interface NavPath {
  name: string;
  path: string;
}

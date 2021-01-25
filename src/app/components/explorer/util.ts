export class FileUtil {
  static isVideo(filename: string): boolean {
    const videoFormats = [
      '.WEBM',
      '.MPG',
      '.MP2',
      '.MPEG',
      '.MPE',
      '.MPV',
      '.OGG',
      '.MP4',
      '.M4P',
      '.M4V',
      '.AVI',
      '.WMV',
      '.MOV',
      '.QT',
      '.FLV',
      '.SWF',
      'AVCHD',
      '.RMVB',
      '.MKV',
    ];
    const extension = this.fileExtension(filename);
    const result = videoFormats.find((ext) => ext == extension.toUpperCase());
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static isImage(filename: string): boolean {
    const imageFormats =
      '.jpg, .jpeg, .jpe .jif, .jfif, .jfi, .png, .gif, .webp, .tiff, .tif, .bmp, .dib, .heif, .heic, .ind, .indd, .indt, .jp2, .j2k, .jpf, .jpx, .jpm, .mj2, .svg, .svgz';
    const extension = this.fileExtension(filename);
    const result = imageFormats.split(',').find((ext) => ext.trim() == extension.toLowerCase());
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static isPdf(filename: string): boolean {
    const pdfFormats = '.pdf';
    const extension = this.fileExtension(filename);
    const result = pdfFormats.split(',').find((ext) => ext.trim() == extension.toLowerCase());
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static isDoc(filename: string): boolean {
    const docFormats = '.ppt, .pptx, .doc, .docx, .xls, .xlsx';
    const extension = this.fileExtension(filename);
    const result = docFormats.split(',').find((ext) => ext.trim() == extension.toLowerCase());
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static isText(filename: string): boolean {
    const textFormats = '.txt, .md';
    const extension = this.fileExtension(filename);
    const result = textFormats.split(',').find((ext) => ext.trim() == extension.toLowerCase());
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  static fileExtension(filename: string): string {
    if (!filename) {
      return '';
    }
    return '.' + filename.split('.').pop();
  }

  static encodeURL(name: string) {
    return encodeURIComponent(name).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }
}

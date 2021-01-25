import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
})
export class TruncateNamePipe implements PipeTransform {
  max_length = 60;
  // truncate the file name without hiding the extension
  transform(filename: string): string {
    if (filename.length <= this.max_length) {
      return filename;
    }
    const extension = filename.split('.').pop();
    let newName = filename.replace('.' + extension, '');
    newName = newName.substring(0, this.max_length) + (filename.length > this.max_length ? '[...]' : '');
    return newName + '.' + extension;
  }
}

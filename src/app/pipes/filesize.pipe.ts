import * as filesize from 'filesize';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanSize',
})
export class FileSizePipe implements PipeTransform {
  // human-readable size
  transform(size: number): string {
    return filesize(size);
  }
}

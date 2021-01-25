import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[my-autofocus]',
})
export class AutofocusDirective {
  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    const element = this.host.nativeElement as HTMLInputElement;
    element.focus();
  }
}

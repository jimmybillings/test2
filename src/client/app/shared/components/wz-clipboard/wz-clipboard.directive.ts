import { Directive, ElementRef } from '@angular/core';
declare var Clipboard: any;

@Directive({
  selector: '[wzClipboard]'
})

export class WzClipBoardDirective {
  constructor(public element: ElementRef) {
    new Clipboard(this.element.nativeElement);
  }
}

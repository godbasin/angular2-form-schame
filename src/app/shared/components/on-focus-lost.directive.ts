/**
 * desc：ngFocusLost
 * how to use: <div ngFocusLost (onFocusLost)="yourFunction()"></div>
 */

import {
  Directive,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Output
} from "@angular/core";

@Directive({
  selector: "[ngFocusLost]"
})
export class OnFocusLostDirective implements AfterViewInit, OnDestroy {
  @Output() onFocusLost = new EventEmitter();
  public el;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  ngAfterViewInit() {
    document.addEventListener("click", this.onClick.bind(this), true);
  }

  onClick(ev) {
    if (!this.el.contains(ev.target)) {
      this.onFocusLost.emit();
    }
  }

  ngOnDestroy() {
    document.removeEventListener("click", this.onClick.bind(this), true);
  }
}

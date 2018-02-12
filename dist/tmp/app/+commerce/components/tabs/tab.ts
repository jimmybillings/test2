import { EventEmitter, Output } from '@angular/core';

export class Tab {
  @Output() notify: EventEmitter<Object> = new EventEmitter<Object>();

  public goToPreviousTab(): void {
    this.notify.emit({ type: 'GO_TO_PREVIOUS_TAB' });
  }

  public goToNextTab(): void {
    this.notify.emit({ type: 'GO_TO_NEXT_TAB' });
  }

  public goToTab(tabIndex: number): void {
    this.notify.emit({ type: 'GO_TO_TAB', payload: tabIndex });
  }

  public disableTab(tabIndex: number): void {
    this.notify.emit({ type: 'DISABLE_TAB', payload: tabIndex });
  }
}

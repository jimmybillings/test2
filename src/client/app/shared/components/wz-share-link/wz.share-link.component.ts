import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { AppStore } from '../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'wz-share-link',
  templateUrl: 'wz.share-link.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzShareLinkComponent {
  @Input() shareLink: string;
  @Output() closeRequest: EventEmitter<void> = new EventEmitter();

  constructor(private store: AppStore) { }

  public selectInputForCopy(event: any): void {
    event.target.select();
  }

  public onCopyShareLinkButtonClick(): void {
    this.store.dispatch(factory => factory.snackbar.display('SHARING.SHARE_LINK.COPIED_CONFIRMED_MESSAGE'));
  }

  public onPreviousButtonClick(): void {
    this.requestClose();
  }

  public onCloseButtonClick(): void {
    this.requestClose();
  }

  public onOutsideClick(): void {
    this.requestClose();
  }

  private requestClose(): void {
    this.closeRequest.emit();
  }
}

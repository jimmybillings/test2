import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlayerState, PlayerRequest, ClearMarkersRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-markers-clear-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button
      [disabled]="!playerState.inMarkerFrame && !playerState.outMarkerFrame"
      title="{{ 'ASSET.ADV_PLAYER.CLEAR_IN_OUT_BTN_TITLE' | translate }}"
      (click)="onClick()">
      <mat-icon>cancel</mat-icon>
    </button>
  `
})

export class MarkersClearButtonComponent {
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<ClearMarkersRequest> = new EventEmitter<ClearMarkersRequest>();

  public onClick(): void {
    this.request.emit({ type: 'CLEAR_MARKERS' });
  }
}

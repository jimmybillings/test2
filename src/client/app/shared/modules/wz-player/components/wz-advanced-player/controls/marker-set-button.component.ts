import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Frame } from '../../../../wazee-frame-formatter/index';
import { MarkerType, PlayerState, SetMarkerToCurrentFrameRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-marker-set-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-button
      class="is-outlined set-marker"
      [disabled]="alreadyAtMarker"
      title="{{ title | translate }}"
      (click)="onClick()">
        {{ type }}
    </button>
  `
})

export class MarkerSetButtonComponent {
  @Input() type: MarkerType;
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<SetMarkerToCurrentFrameRequest> = new EventEmitter<SetMarkerToCurrentFrameRequest>();

  public get title(): string {
    return this.type === 'in' ? 'ASSET.ADV_PLAYER.SET_IN_BTN_TITLE' : 'ASSET.ADV_PLAYER.SET_OUT_BTN_TITLE';
  }

  public get alreadyAtMarker(): boolean {
    return this.frame && this.playerState.currentFrame && this.frame.frameNumber === this.playerState.currentFrame.frameNumber;
  }

  public onClick(): void {
    this.request.emit({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: this.type });
  }

  private get frame(): Frame {
    return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
  }
}

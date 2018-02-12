import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Frame } from '../../../../wazee-frame-formatter/index';
import { PlayerState, MarkerType, SeekToMarkerRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-marker-seek-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button
      [disabled]="!frame || alreadyAtMarker" 
      class="mat-icon-button {{ class }}" 
      title="{{ title | translate }}" 
      (click)="onClick()">
        <mat-icon>keyboard_tab</mat-icon>
    </button>
  `
})

export class MarkerSeekButtonComponent {
  @Input() type: MarkerType;
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<SeekToMarkerRequest> = new EventEmitter<SeekToMarkerRequest>();

  public get frame(): Frame {
    return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
  }

  public get alreadyAtMarker(): boolean {
    return this.frame && this.playerState.currentFrame && this.frame.frameNumber === this.playerState.currentFrame.frameNumber;
  }

  public get class(): string {
    return `seek-${this.type}`;
  }

  public get title(): string {
    return this.type === 'in' ? 'ASSET.ADV_PLAYER.SEEK_IN_BTN_TITLE' : 'ASSET.ADV_PLAYER.SEEK_OUT_BTN_TITLE';
  }

  public onClick(): void {
    this.request.emit({ type: 'SEEK_TO_MARKER', markerType: this.type });
  }
}

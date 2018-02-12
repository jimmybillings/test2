import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlayerState, PlayerRequest, ToggleMarkersPlaybackRequest }
  from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-markers-playback-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button
      [disabled]="!playerState.inMarkerFrame || !playerState.outMarkerFrame"
      title="{{ 'ASSET.ADV_PLAYER.PLAY_IN_OUT_BTN_TITLE' | translate }}"
      (click)="onClick()">
      <mat-icon>{{ playerState.playingMarkers && playerState.playing ? 'pause_circle_filled' : 'play_circle_filled' }}</mat-icon>
    </button>
  `
})

export class MarkersPlaybackButtonComponent {
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<ToggleMarkersPlaybackRequest> = new EventEmitter<ToggleMarkersPlaybackRequest>();

  public onClick(): void {
    this.request.emit({ type: 'TOGGLE_MARKERS_PLAYBACK' });
  }
}

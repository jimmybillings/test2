import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlayerState, PlaybackDirection, PlayAtSpeedRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-fast-playback-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button [disabled]="!canPlayFast()" title="{{ title | translate }}" (click)="onClick()">
      <mat-icon>{{ iconName }}</mat-icon>
    </button>
  `
})

export class FastPlaybackButtonComponent {
  @Input() playerState: PlayerState;
  @Input() direction: PlaybackDirection = 'forward';
  @Output() request: EventEmitter<PlayAtSpeedRequest> = new EventEmitter<PlayAtSpeedRequest>();

  public get iconName(): string {
    return this.direction === 'reverse' ? 'fast_rewind' : 'fast_forward';
  }

  public get title(): string {
    return `ASSET.ADV_PLAYER.${this.iconName.toUpperCase()}_BTN_TITLE`;
  }

  public canPlayFast(): boolean {
    const currentSpeed = this.playerState.playbackSpeed;

    return (this.direction === 'reverse' && currentSpeed >= -1) || (this.direction === 'forward' && currentSpeed <= 1);
  }

  public onClick(): void {
    this.request.emit({ type: 'PLAY_AT_SPEED', speed: 4, direction: this.direction });
  }
}

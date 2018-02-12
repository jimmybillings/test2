import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Frame } from '../../../../wazee-frame-formatter/index';
import { PlayerState, SeekToFrameRequest } from '../../../interfaces/player.interface';

export type StepSize = '-5s' | '-1s' | '-1f' | '+1f' | '+1s' | '+5s';

@Component({
  moduleId: module.id,
  selector: 'wz-step-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button 
      mat-icon-button 
      [disabled]="!canStep" 
      class="mat-icon-button {{ direction }}" 
      title="{{ title | translate }}" 
      (click)="onClick()">
      <mat-icon class="{{ iconClass }} material-icons">play_arrow</mat-icon>
    </button>
  `
})

export class StepButtonComponent {
  @Input()
  public set size(size: StepSize) {
    this.direction = undefined;
    this.title = undefined;
    this.iconClass = undefined;

    if (size.length !== 3) return;

    const [sign, magnitude, unit] = size.split('');
    if (!sign.match(/^[-+]$/) || !magnitude.match(/^[15]$/) || !unit.match(/^[fs]$/)) return;

    this.direction = sign === '-' ? 'reverse' : 'forward';
    this.vector = parseInt(magnitude);
    if (sign === '-') this.vector *= -1;
    this.unit = unit === 'f' ? 'frame' : 'second';
    this.title = `ASSET.ADV_PLAYER.SKIP_${magnitude}${unit.toUpperCase()}_${sign === '-' ? 'BACK' : 'FORWARD'}_BTN_TITLE`;
    this.iconClass = `${magnitude === '5' ? 'five' : 'one'}-${this.unit}`;

    this.calculateBoundary();
  }

  @Input()
  public set playerState(newState: PlayerState) {
    this._playerState = newState;
    if (!newState) return;

    let needToRecalculate: boolean = false;

    if (newState.framesPerSecond !== this.framesPerSecond) {
      this.framesPerSecond = newState.framesPerSecond;
      needToRecalculate = true;
    }

    if (newState.durationFrame) {
      const newDurationFrameNumber: number = newState.durationFrame.frameNumber;

      if (newDurationFrameNumber !== this.durationFrameNumber) {
        this.durationFrameNumber = newDurationFrameNumber;
        needToRecalculate = true;
      }
    }

    if (needToRecalculate) this.calculateBoundary();
  }

  @Output() request: EventEmitter<SeekToFrameRequest> = new EventEmitter<SeekToFrameRequest>();

  public direction: 'reverse' | 'forward';
  public title: string;
  public iconClass: string;

  private _playerState: PlayerState;
  private vector: number;
  private unit: 'frame' | 'second';
  private framesPerSecond: number;
  private durationFrameNumber: number;
  private boundaryFrameNumber: number;

  public get canStep(): boolean {
    if (!this._playerState) return false;

    const currentFrame: Frame = this._playerState.currentFrame;
    if (!currentFrame) return false;

    const currentFrameNumber: number = currentFrame.frameNumber;

    return this.direction === 'reverse'
      ? currentFrameNumber >= this.boundaryFrameNumber
      : currentFrameNumber <= this.boundaryFrameNumber;
  }

  public onClick(): void {
    if (this.canStep) this.request.emit({ type: 'SEEK_TO_FRAME', frame: this.seekTarget });
  }

  private calculateBoundary(): void {
    const magnitude: number = this.direction === 'reverse' ? -this.vector : this.vector;
    const frame: Frame = new Frame(this.framesPerSecond);

    if (this.unit === 'frame') {
      frame.setFromFrameNumber(magnitude);
    } else {
      frame.setFromSeconds(magnitude);
    }

    this.boundaryFrameNumber = this.direction === 'reverse'
      ? frame.frameNumber
      : this.durationFrameNumber - frame.frameNumber;
  }

  private get seekTarget(): Frame {
    const seekTarget: Frame = new Frame(this.framesPerSecond).setFromFrameNumber(this._playerState.currentFrame.frameNumber);

    if (this.unit === 'frame') {
      seekTarget.addFrames(this.vector);
    } else {
      seekTarget.setFromSeconds(seekTarget.asSeconds() + this.vector);
    }

    return seekTarget;
  }
}

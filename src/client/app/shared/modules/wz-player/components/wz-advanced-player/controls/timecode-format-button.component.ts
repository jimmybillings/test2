import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlayerState, ChangeTimecodeDisplayRequest } from '../../../interfaces/player.interface';
import { Frame, TimecodeFormat, TimecodeBase } from '../../../../wazee-frame-formatter/index';

@Component({
  moduleId: module.id,
  selector: 'wz-timecode-format-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button title="{{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_BTN_TITLE' | translate }}" [matMenuTriggerFor]="menu">
      <mat-icon>access_time</mat-icon>
      {{ currentTimecodeFormatBaseTranslationKey | translate }}
    </button>

    <mat-menu class="timecode-format-menu" #menu="matMenu">
      <button mat-menu-item (click)="selectStreamBasedTimecode()">
        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.STREAM_BASED_TIMECODE' | translate }}
        ({{ currentFrame | playerTimecode:playerState:timecode:streamBased }})
      </button>

      <button mat-menu-item [disabled]="!canSelectSourceBased" (click)="selectSourceBasedTimecode()">
        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.SOURCE_BASED_TIMECODE' | translate }}
        ({{ currentFrame | playerTimecode:playerState:timecode:sourceBased }})
      </button>

      <button mat-menu-item (click)="selectStreamBasedSeconds()">
        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.STREAM_BASED_SECONDS' | translate }}
        ({{ currentFrame | playerTimecode:playerState:seconds:streamBased }})
      </button>
    </mat-menu>
  `
})

export class TimecodeFormatButtonComponent {
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<ChangeTimecodeDisplayRequest> = new EventEmitter<ChangeTimecodeDisplayRequest>();

  public readonly timecode: TimecodeFormat = TimecodeFormat.SIMPLE_TIME_CONVERSION;
  public readonly seconds: TimecodeFormat = TimecodeFormat.SECONDS;
  public readonly streamBased: TimecodeBase = TimecodeBase.STREAM_BASED;
  public readonly sourceBased: TimecodeBase = TimecodeBase.SOURCE_BASED;

  public get currentTimecodeFormatBaseTranslationKey(): string {
    const base: string = this.playerState.timecodeBase === TimecodeBase.STREAM_BASED ? 'STREAM' : 'SOURCE';
    const format: string = this.playerState.timecodeFormat === TimecodeFormat.SIMPLE_TIME_CONVERSION ? 'TIMECODE' : 'SECONDS';
    return `ASSET.ADV_PLAYER.TIMECODE_FORMAT_BASE_DISPLAY.${base}_BASED_${format}`;
  }

  public get currentFrame(): Frame {
    return this.playerState.currentFrame;
  }

  public get canSelectSourceBased(): boolean {
    return !!this.playerState.currentFrame && this.playerState.currentFrame.sourceBasedOffsetFrames > 0;
  }

  public selectStreamBasedTimecode(): void {
    this.emitRequest(this.timecode, this.streamBased);
  }

  public selectSourceBasedTimecode(): void {
    this.emitRequest(this.timecode, this.sourceBased);
  }

  public selectStreamBasedSeconds(): void {
    this.emitRequest(this.seconds, this.streamBased);
  }

  private emitRequest(format: TimecodeFormat, base: TimecodeBase): void {
    this.request.emit({ type: 'CHANGE_TIMECODE_DISPLAY', format: format, base: base });
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Frame, TimecodeFormat, TimecodeBase } from '../../wazee-frame-formatter/index';
import { PlayerState, PlayerStateChanges } from '../interfaces/player.interface';

@Injectable()
export class PlayerStateService {
  private stateSubject: BehaviorSubject<PlayerState> = new BehaviorSubject(this.initialValue);
  private changesToApply: PlayerStateChanges = {};

  public get state(): Observable<PlayerState> {
    return this.stateSubject.asObservable();
  }

  public get snapshot(): PlayerState {
    return this.stateSubject.getValue();
  }

  public updateWith(changes: PlayerStateChanges): void {
    this.stateSubject.next(this.createNewStateWith(changes));
  }

  public reset(): void {
    this.stateSubject.next(this.initialValue);
  }

  private get initialValue(): PlayerState {
    return {
      ready: false,
      canSupportCustomControls: true,
      playing: false,
      playingMarkers: false,
      playbackSpeed: 1,
      framesPerSecond: 29.97,
      currentFrame: undefined,
      durationFrame: undefined,
      inMarkerFrame: undefined,
      outMarkerFrame: undefined,
      volume: 100,
      sourceBasedOffset: '00:00:00:00',
      timecodeFormat: TimecodeFormat.SIMPLE_TIME_CONVERSION,
      timecodeBase: TimecodeBase.STREAM_BASED,
      changeDetectionEnabler: 0
    };
  }

  private createNewStateWith(requestedChanges: PlayerStateChanges): PlayerState {
    // It's tempting to use Common.clone() here, but that doesn't preserve properties with explicit undefined values.
    // (And we need inMarker and outMarker to come in as undefined because this is how markers are cleared.)
    this.changesToApply = {};
    Object.keys(requestedChanges).forEach((key: string) => (this.changesToApply as any)[key] = (requestedChanges as any)[key]);

    this.handleChangeInterdependencies();

    return {
      ready: this.latest('ready'),
      canSupportCustomControls: this.latest('canSupportCustomControls'),
      playing: this.latest('playing'),
      playingMarkers: this.latest('playingMarkers'),
      playbackSpeed: this.latest('playbackSpeed'),
      framesPerSecond: this.latest('framesPerSecond'),
      currentFrame: this.newFrameFrom(this.latest('currentFrame')),
      durationFrame: this.newFrameFrom(this.latest('durationFrame')),
      inMarkerFrame: this.newFrameFrom(this.latest('inMarkerFrame')),
      outMarkerFrame: this.newFrameFrom(this.latest('outMarkerFrame')),
      volume: this.latest('volume'),
      sourceBasedOffset: this.latest('sourceBasedOffset') || this.initialValue.sourceBasedOffset,
      timecodeFormat: this.latest('timecodeFormat'),
      timecodeBase: this.latest('timecodeBase'),
      changeDetectionEnabler: this.snapshot.changeDetectionEnabler + 1
    };
  }

  private handleChangeInterdependencies(): void {
    this.handleInMarkerFrameUpdate();
    this.handleOutMarkerFrameUpdate();
    this.handleCurrentTimeUpdate();
    this.handleDurationUpdate();
    this.handleInMarkerUpdate();
    this.handleOutMarkerUpdate();
    this.handleMarkerOrderingIssues();
  }

  private handleInMarkerFrameUpdate(): void {
    if (!this.changesToApply.hasOwnProperty('inMarkerFrameNumber')) return;

    this.changesToApply.inMarkerFrame = this.newFrame.setFromFrameNumber(this.changesToApply.inMarkerFrameNumber);
    delete this.changesToApply.inMarkerFrameNumber;
  }

  private handleOutMarkerFrameUpdate(): void {
    if (!this.changesToApply.hasOwnProperty('outMarkerFrameNumber')) return;

    this.changesToApply.outMarkerFrame = this.newFrame.setFromFrameNumber(this.changesToApply.outMarkerFrameNumber);
    delete this.changesToApply.outMarkerFrameNumber;
  }

  private handleCurrentTimeUpdate(): void {
    if (!this.changesToApply.hasOwnProperty('currentTime')) return;

    this.changesToApply.currentFrame = this.newFrameFrom(this.changesToApply.currentTime);
    delete this.changesToApply.currentTime;
  }

  private handleDurationUpdate(): void {
    if (!this.changesToApply.hasOwnProperty('duration')) return;

    this.changesToApply.durationFrame = this.newFrameFrom(this.changesToApply.duration);
    delete this.changesToApply.duration;
  }

  private handleInMarkerUpdate(): void {
    if (!this.changesToApply.hasOwnProperty('inMarker')) return;

    this.changesToApply.inMarkerFrame = this.newFrameFrom(this.changesToApply.inMarker);
    delete this.changesToApply.inMarker;
  }

  private handleOutMarkerUpdate(): void {
    if (!this.changesToApply.hasOwnProperty('outMarker')) return;

    this.changesToApply.outMarkerFrame = this.newFrameFrom(this.changesToApply.outMarker);
    delete this.changesToApply.outMarker;
  }

  private handleMarkerOrderingIssues(): void {
    const newInMarkerFrame: Frame = this.changesToApply.inMarkerFrame;

    if (newInMarkerFrame) {
      const latestOutMarkerFrame: Frame = this.latest('outMarkerFrame');

      if (latestOutMarkerFrame && newInMarkerFrame.frameNumber > latestOutMarkerFrame.frameNumber) {
        this.changesToApply.outMarkerFrame = this.newFrameFrom(newInMarkerFrame);
      }

      return;
    }

    const newOutMarkerFrame: Frame = this.changesToApply.outMarkerFrame;

    if (newOutMarkerFrame) {
      const latestInMarkerFrame: Frame = this.latest('inMarkerFrame');

      if (latestInMarkerFrame && newOutMarkerFrame.frameNumber < latestInMarkerFrame.frameNumber) {
        this.changesToApply.inMarkerFrame = this.newFrameFrom(newOutMarkerFrame);
      }
    }
  }

  private latest(key: string): any {
    return this.changesToApply.hasOwnProperty(key) ? (this.changesToApply as any)[key] : (this.snapshot as any)[key];
  }

  private newFrameFrom(input: number | Frame): Frame {
    if (typeof input === 'number') {
      return this.newFrame.setFromSeconds(input);
    } else if (!input) {
      return undefined;
    } else {
      return this.newFrame.setFromFrameNumber(input.frameNumber);
    }
  }

  private get newFrame(): Frame {
    return new Frame(this.latest('framesPerSecond'), this.latest('sourceBasedOffset'));
  }
}

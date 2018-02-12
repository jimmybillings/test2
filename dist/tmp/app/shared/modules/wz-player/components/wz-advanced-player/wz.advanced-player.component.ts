import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter } from '@angular/core';

import { PlayerStateService } from '../../services/player-state.service';
import { WzPlayerComponent } from '../wz-player/wz.player.component';
import { SubclipMarkers } from '../../../../interfaces/subclip-markers';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Frame } from '../../../wazee-frame-formatter/index';
import { PlayerState, PlayerStateChanges, PlayerRequest } from '../../interfaces/player.interface';
import { EnhancedAsset } from '../../../../interfaces/enhanced-asset';

@Component({
  moduleId: module.id,
  selector: 'wz-advanced-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PlayerStateService],
  templateUrl: './wz.advanced-player.html'
})

export class WzAdvancedPlayerComponent implements OnInit, OnDestroy {
  @Input() window: any;
  @Input() displayAllControls: boolean = true;
  @Input()
  public set asset(newAsset: EnhancedAsset) {
    this.playerStateService.reset();
    this.playerStateService.updateWith({ sourceBasedOffset: newAsset.getMetadataValueFor('Format.TimeStart') });
    this.currentState = null;
    this.playerReady = false;
    this.currentAsset = newAsset;
  }

  @Output() markersInitialization: EventEmitter<SubclipMarkers> = new EventEmitter<SubclipMarkers>();
  @Output() markerChange: EventEmitter<SubclipMarkers> = new EventEmitter<SubclipMarkers>();

  @ViewChild(WzPlayerComponent) player: WzPlayerComponent;

  private playerStateSubscription: Subscription;
  private currentAsset: EnhancedAsset = null;
  private currentState: PlayerState = null;
  private playerReady: boolean = false;

  public get asset(): EnhancedAsset {
    return this.currentAsset;
  }

  public assetIsVideo(): boolean {
    return !!this.currentAsset && this.currentAsset.resourceClass !== 'Image';
  }

  constructor(private playerStateService: PlayerStateService) { }

  public get playerState(): Observable<any> {
    return this.playerStateService.state;
  }

  public ngOnInit(): void {
    this.playerStateSubscription = this.playerStateService.state.subscribe(this.onStateChange.bind(this));
  }

  public ngOnDestroy(): void {
    this.playerStateSubscription.unsubscribe();
  }

  public onStateChangeRequest(changes: PlayerStateChanges): void {
    this.playerStateService.updateWith(changes);
  }

  public handle(request: PlayerRequest): void {
    switch (request.type) {
      case 'CLEAR_MARKERS':
        this.player.clearMarkers();
        break;
      case 'PLAY_AT_SPEED':
        this.player.playAtSpeed(request.speed, request.direction);
        break;
      case 'PAUSE':
        this.player.pause();
        break;
      case 'SEEK_TO_FRAME':
        if (request.frame) this.player.seekTo(request.frame.asSeconds());
        break;
      case 'SEEK_TO_TIME_STRING':
        if (request.time) this.player.seekTo(this.toSeconds(request.time));
        break;
      case 'SEEK_TO_MARKER':
        request.markerType === 'in' ? this.player.seekToInMarker() : this.player.seekToOutMarker();
        break;
      case 'SET_MARKER_TO_CURRENT_FRAME':
        request.markerType === 'in' ? this.player.setInMarkerToCurrentTime() : this.player.setOutMarkerToCurrentTime();
        break;
      case 'SET_VOLUME':
        this.player.setVolumeTo(request.volume);
        break;
      case 'TOGGLE_MARKERS_PLAYBACK':
        this.player.toggleMarkersPlayback();
        break;
      case 'TOGGLE_MUTE':
        this.player.toggleMute();
        break;
      case 'TOGGLE_PLAYBACK':
        this.player.togglePlayback();
        break;
      case 'CHANGE_TIMECODE_DISPLAY':
        this.playerStateService.updateWith({ timecodeFormat: request.format, timecodeBase: request.base });
        break;
    }
  }

  private onStateChange(newState: PlayerState) {
    if (!this.playerReady && newState.ready) {
      this.markersInitialization.emit({ in: newState.inMarkerFrame, out: newState.outMarkerFrame });
      this.playerReady = true;
    } else if (this.markersChangedIn(newState)) {
      this.markerChange.emit({ in: newState.inMarkerFrame, out: newState.outMarkerFrame });
    }

    this.currentState = newState;
  }

  private markersChangedIn(newState: PlayerState): boolean {
    if (!this.currentState) return false;

    return !this.areEqual(newState.inMarkerFrame, this.currentState.inMarkerFrame) ||
      !this.areEqual(newState.outMarkerFrame, this.currentState.outMarkerFrame);
  }

  private areEqual(frame1: Frame, frame2: Frame): boolean {
    if (frame1 && !frame2) return false;
    if (!frame1 && frame2) return false;
    if (!frame1 && !frame2) return true;

    return frame1.frameNumber === frame2.frameNumber;
  }

  private toSeconds(time: string): number {
    return new Frame(this.currentState.framesPerSecond, this.currentState.sourceBasedOffset)
      .setFromString(time, this.currentState.timecodeFormat, this.currentState.timecodeBase)
      .asSeconds(3);
  }
}

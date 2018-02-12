import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { PlayerState, SeekToTimeStringRequest, PauseRequest } from '../../../interfaces/player.interface';
import { Frame, TimecodeFormat } from '../../../../wazee-frame-formatter/index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  moduleId: module.id,
  selector: 'wz-time-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="containerClass">
      <input #time
        type="text"
        class="current"
        title="{{ timeInputTitleTranslationKey | translate}}"
        [value]="currentFrame | async | playerTimecode:playerState"
        (click)="onTimeInputClick()"
        (keydown)="onKeyDown($event)"
        (keyup)="onKeyUp($event)"
      />

      <ng-container *ngIf="editing">
        <button mat-icon-button
          title="{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.APPLY_BTN_TITLE' | translate }}"
          [disabled]="!canApply"
          (click)="onApplyButtonClick()"
        >
          <mat-icon>check</mat-icon>
        </button>
        
        <button mat-icon-button
          title="{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.CLEAR_BTN_TITLE' | translate }}"
          [disabled]="isEmpty"
          (click)="onClearButtonClick()"
        >
          <mat-icon>remove</mat-icon>
        </button>
        
        <button mat-icon-button
          title="{{ 'ASSET.ADV_PLAYER.TIME_DISPLAY.CANCEL_BTN_TITLE' | translate }}"
          (click)="onCancelButtonClick()"
        >
          <mat-icon>close</mat-icon>
        </button>
      </ng-container>
    </div>

    <span class="timecode divider">/</span>
    <span class="timecode duration">{{ durationFrame | playerTimecode:playerState }}</span>
  `
})

export class TimeDisplayComponent {
  @Input() public set playerState(newState: PlayerState) {
    this._playerState = newState;
    this.updateEditMode();
    this.updateCurrentFrame();
    this.updateCurrentlyAppropriateCharacters();
  }

  @Output() request: EventEmitter<SeekToTimeStringRequest | PauseRequest> =
    new EventEmitter<SeekToTimeStringRequest | PauseRequest>();
  @ViewChild('time') timeInput: ElementRef;

  // Force current frame updates so that the display gets formatted correctly even if the player didn't need to seek.
  public currentFrame: BehaviorSubject<Frame> = new BehaviorSubject<Frame>(null);

  private _editing: boolean = false;
  private preEditValue: string;
  private _playerState: PlayerState;
  private controlKeyIsDown: boolean = false;
  private awaitingPause: boolean = false;
  private readonly numberCharacters: string = '0123456789';
  private readonly timecodeAppropriateCharacters: string = ':;' + this.numberCharacters;
  private readonly secondsAppropriateCharacters: string = '.' + this.numberCharacters;
  private currentlyAppropriateCharacters: string = this.timecodeAppropriateCharacters;

  public get playerState(): PlayerState {
    return this._playerState;
  }

  public get editing(): boolean {
    return this._editing;
  }

  public get durationFrame(): Frame {
    return this._playerState.durationFrame;
  }

  public get timeInputTitleTranslationKey(): string {
    return this._editing ? '' : 'ASSET.ADV_PLAYER.TIME_DISPLAY.MAIN_TITLE';
  }

  public get canApply(): boolean {
    return ![this.preEditValue.replace(/;/g, ':'), ''].includes(this.normalizedInputTime);
  }

  public get isEmpty(): boolean {
    return this.timeInput.nativeElement.value === '';
  }

  public get containerClass(): string {
    return this._editing ? 'editing' : '';
  }

  public onTimeInputClick(): void {
    if (this._editing) return;

    if (this._playerState.playing) {
      this.awaitingPause = true;
      this.request.emit({ type: 'PAUSE' });
    } else {
      this.awaitingPause = false;
      this.edit();
    }
  }

  public onKeyDown(event: KeyboardEvent): void {
    const lowercasedKey: string = event.key.toLowerCase();

    if (this.controlKeyIsDown) {
      switch (lowercasedKey) {
        // Allow control-C, control-V, etc. for editing.
        case 'a': // select all
        case 'c': // copy
        case 'v': // paste
        case 'x': // cut
        case 'z': // undo
          return;
      }

      event.preventDefault();
      return;
    }

    switch (lowercasedKey) {
      // Allow editing and cursor positioning keys.
      case 'backspace':
      case 'delete':
      case 'arrowleft':
      case 'arrowright':
      case 'home':
      case 'end':
        return;

      case 'control':  // Windows CONTROL key
      case 'meta':     // Mac COMMAND key
        this.controlKeyIsDown = true;
        return;

      case 'enter':
        event.preventDefault();
        if (this.canApply) this.apply();
        return;

      case 'escape':
        event.preventDefault();
        this.cancel();
        return;

      case 'c':
        event.preventDefault();
        this.clear();
        return;
    }

    if (!this.isAppropriate(lowercasedKey)) event.preventDefault();
  }

  public onKeyUp(event: KeyboardEvent): void {
    switch (event.key.toLowerCase()) {
      case 'control':  // Windows CONTROL key
      case 'meta':     // Mac COMMAND key
        this.controlKeyIsDown = false;
    }
  }

  public onApplyButtonClick(): void {
    if (this.canApply) this.apply();
  }

  public onClearButtonClick(): void {
    this.clear();
  }

  public onCancelButtonClick(): void {
    this.cancel();
  }

  private updateEditMode(): void {
    if (this.awaitingPause && !this._playerState.playing) {
      this.awaitingPause = false;
      this.edit();
      return;
    }

    if (this._editing) {
      // Any time we're editing and the player state changes, cancel the edit. (This most likely happens because the user clicks
      // some control (like play) while editing, so the current edit usually becomes meaningless.)
      this.cancel();
    }
  }

  private updateCurrentFrame(): void {
    this.currentFrame.next(this._playerState.currentFrame);
  }

  private updateCurrentlyAppropriateCharacters(): void {
    this.currentlyAppropriateCharacters = this._playerState.timecodeFormat === TimecodeFormat.SECONDS
      ? this.secondsAppropriateCharacters
      : this.timecodeAppropriateCharacters;
  }

  private get normalizedInputTime(): string {
    const value: string = this.timeInput.nativeElement.value;

    const normalizedCharacters: string[] = value
      .split('')
      .filter(character => this.isAppropriate(character))
      .map(character => character === ';' ? ':' : character);

    if (this._playerState.timecodeFormat === TimecodeFormat.SECONDS || normalizedCharacters.includes(':')) {
      // The user is entering seconds, so we don't need to add colons.
      // Or the user is entering a timecode, and has at least one colon in there, so don't override his entry.
      return normalizedCharacters.join('');
    }

    const lastIndex: number = normalizedCharacters.length - 1;

    // There are no colons in the timecode, so let's add some for the user.  ('123' -> '1:23', '12345678' -> '12:34:56:78')
    return normalizedCharacters
      .reverse()
      .map((character, index) => (index % 2 === 0 || index >= lastIndex) ? character : `:${character}`)
      .reverse()
      .join('');
  }

  private edit(): void {
    this._editing = true;
    this.preEditValue = this.timeInput.nativeElement.value;
  }

  private apply(): void {
    this._editing = false;
    this.timeInput.nativeElement.blur();
    this.request.emit({ type: 'SEEK_TO_TIME_STRING', time: this.normalizedInputTime });
  }

  private clear(): void {
    this.timeInput.nativeElement.focus();
    this.timeInput.nativeElement.value = '';
  }

  private cancel(): void {
    this._editing = false;
    this.timeInput.nativeElement.blur();
    this.timeInput.nativeElement.value = this.preEditValue;
  }

  private isAppropriate(key: string): boolean {
    return key.length === 1 && this.currentlyAppropriateCharacters.includes(key);
  }
}

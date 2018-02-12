import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { PlayerState, PlayerVolumeRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-volume-control',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-icon-button *ngIf="volumeState ==='inactive'" title="{{ buttonTitle | translate }}" (mouseover)="onMouseOver()">
      <mat-icon>{{ iconName }}</mat-icon>
    </button>
    <div class="volume-control" [@volumeState]="volumeState" (mouseleave)="onMouseLeave()">
      <mat-slider vertical min="0" max="100" value="{{ playerState.volume }}" (input)="onSliderInput($event)"></mat-slider>
      <button mat-icon-button title="{{ buttonTitle | translate }}" (click)="onButtonClick()">
        <mat-icon>{{ iconName }}</mat-icon>
      </button>
    </div>
  `,

  animations: [
    trigger('volumeState', [
      state('inactive', style({
        opacity: '0',
        zIndex: '-1'
      })),
      state('active', style({
        opacity: '1',
        zIndex: '1'
      })),
      transition('inactive => active', animate('250ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
      transition('active => inactive', animate('360ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
    ])
  ]
})


export class VolumeControlComponent {
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<PlayerVolumeRequest> = new EventEmitter<PlayerVolumeRequest>();
  public volumeState: string = 'inactive';
  public buttonTitle: string = 'ASSET.ADV_PLAYER.SOUND_BTN_TITLE';

  public get iconName(): string {
    const volume: number = this.playerState.volume;

    if (volume > 66) return 'volume_up';
    if (volume > 33) return 'volume_down';
    if (volume > 0) return 'volume_mute';
    return 'volume_off';
  }

  public onMouseOver(): void {
    this.volumeState = 'active';
  }

  public onMouseLeave(): void {
    this.volumeState = 'inactive';
  }

  public onSliderInput(event: any): void {
    this.request.emit({ type: 'SET_VOLUME', volume: event.value });
  }

  public onButtonClick(): void {
    this.request.emit({ type: 'TOGGLE_MUTE' });
  }

}

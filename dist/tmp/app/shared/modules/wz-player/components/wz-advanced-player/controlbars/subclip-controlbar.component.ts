import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlayerState, PlayerRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-subclip-controlbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subclip-controlbar.html'
})

export class SubclipControlbarComponent {
  @Input() playerState: PlayerState;
  @Input() displayAllControls: boolean = true;
  @Output() request: EventEmitter<PlayerRequest> = new EventEmitter<PlayerRequest>();

  public forward(request: PlayerRequest): void {
    this.request.emit(request);
  }

  // TODO: Move this into state class.
  // private get constrainedCurrentTime() {
  //   return Math.min(Math.max(0, this.playerState.currentFrame), this.playerState.duration);
  // }
}

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { PlayerState, PlayerRequest } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-player-controlbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './player-controlbar.html'
})

export class PlayerControlbarComponent {
  @Input() playerState: PlayerState;
  @Output() request: EventEmitter<PlayerRequest> = new EventEmitter<PlayerRequest>();

  public forward(request: PlayerRequest): void {
    this.request.emit(request);
  }
}

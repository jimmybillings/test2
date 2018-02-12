import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Frame } from '../../../../wazee-frame-formatter/index';
import { MarkerType, PlayerState } from '../../../interfaces/player.interface';

@Component({
  moduleId: module.id,
  selector: 'wz-marker-time-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="timecode">{{ frame | playerTimecode:playerState }}</span>
  `
})

export class MarkerTimeDisplayComponent {
  @Input() type: MarkerType;
  @Input() playerState: PlayerState;

  public get frame(): Frame {
    return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
  }
}

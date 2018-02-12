import { Pipe, PipeTransform } from '@angular/core';

import { PlayerState } from '../interfaces/player.interface';
import { Frame, TimecodeFormat, TimecodeBase } from '../../wazee-frame-formatter/index';
import { Common } from '../../../utilities/common.functions';

@Pipe({ name: 'playerTimecode' })
export class PlayerTimecodePipe implements PipeTransform {
  public transform(frame: Frame, state: PlayerState, format?: TimecodeFormat, base?: TimecodeBase): string {
    if (!frame) return '';

    const chosenFormat: TimecodeFormat =
      Common.isNullOrUndefined(format)
        ? (state ? state.timecodeFormat : TimecodeFormat.SIMPLE_TIME_CONVERSION)
        : format;

    const chosenBase: TimecodeBase =
      Common.isNullOrUndefined(base)
        ? (state ? state.timecodeBase : TimecodeBase.STREAM_BASED)
        : base;

    return frame.asString(chosenFormat, chosenBase);
  }
}

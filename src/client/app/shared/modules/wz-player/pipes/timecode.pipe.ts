import { Pipe, PipeTransform } from '@angular/core';

import { Frame, TimecodeFormat } from '../../wazee-frame-formatter/index';

@Pipe({ name: 'timecode' })
export class TimecodePipe implements PipeTransform {
  transform(frame: Frame): string {
    return frame ? frame.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION) : '';
  }
}

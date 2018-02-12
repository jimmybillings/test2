import { TimecodePipe } from './timecode.pipe';
import { Frame } from '../../wazee-frame-formatter/index';

export function main() {
  describe('Timecode Pipe', () => {
    let pipeUnderTest: TimecodePipe;

    beforeEach(() => {
      pipeUnderTest = new TimecodePipe();
    });

    it('transforms a Frame object to a timecode string', () => {
      expect(pipeUnderTest.transform(new Frame(29.97).setFromFrameNumber(47))).toEqual('00:00:01;17');
    });

    it('transforms undefined to an empty string', () => {
      expect(pipeUnderTest.transform(undefined)).toEqual('');
    });

    it('transforms null to an empty string', () => {
      expect(pipeUnderTest.transform(null)).toEqual('');
    });
  });
}

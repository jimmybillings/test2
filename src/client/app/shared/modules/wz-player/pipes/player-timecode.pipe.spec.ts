import { PlayerTimecodePipe } from './player-timecode.pipe';
import { Frame, TimecodeFormat, TimecodeBase } from '../../wazee-frame-formatter/index';

export function main() {
  describe('Player Timecode Pipe', () => {
    let pipeUnderTest: PlayerTimecodePipe;

    beforeEach(() => {
      pipeUnderTest = new PlayerTimecodePipe();
    });

    const frame: Frame = new Frame(30, '00:00:01:00').setFromFrameNumber(47);

    // Ensure that the state has non-zero enum values so that we don't get fooled into thinking 0, undefined, and null are
    // all equivalent!
    const state: any = { timecodeFormat: TimecodeFormat.SECONDS, timecodeBase: TimecodeBase.SOURCE_BASED };

    const tests: any = [
      { frame: undefined, state: undefined, format: undefined, base: undefined, expected: '' },
      { frame: undefined, state: undefined, format: undefined, base: null, expected: '' },
      { frame: undefined, state: undefined, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: undefined, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: undefined, format: null, base: undefined, expected: '' },
      { frame: undefined, state: undefined, format: null, base: null, expected: '' },
      { frame: undefined, state: undefined, format: null, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: undefined, format: null, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '' },
      { frame: undefined, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '' },
      {
        frame: undefined, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: ''
      },
      {
        frame: undefined, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.SOURCE_BASED,
        expected: ''
      },

      { frame: undefined, state: undefined, format: TimecodeFormat.SECONDS, base: undefined, expected: '' },
      { frame: undefined, state: undefined, format: TimecodeFormat.SECONDS, base: null, expected: '' },
      { frame: undefined, state: undefined, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: undefined, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: null, format: undefined, base: undefined, expected: '' },
      { frame: undefined, state: null, format: undefined, base: null, expected: '' },
      { frame: undefined, state: null, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: null, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: null, format: null, base: undefined, expected: '' },
      { frame: undefined, state: null, format: null, base: null, expected: '' },
      { frame: undefined, state: null, format: null, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: null, format: null, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '' },
      { frame: undefined, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '' },
      {
        frame: undefined, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: ''
      },
      {
        frame: undefined, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION,
        base: TimecodeBase.SOURCE_BASED, expected: ''
      },

      { frame: undefined, state: null, format: TimecodeFormat.SECONDS, base: undefined, expected: '' },
      { frame: undefined, state: null, format: TimecodeFormat.SECONDS, base: null, expected: '' },
      { frame: undefined, state: null, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: null, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: state, format: undefined, base: undefined, expected: '' },
      { frame: undefined, state: state, format: undefined, base: null, expected: '' },
      { frame: undefined, state: state, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: state, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: state, format: null, base: undefined, expected: '' },
      { frame: undefined, state: state, format: null, base: null, expected: '' },
      { frame: undefined, state: state, format: null, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: state, format: null, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: undefined, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '' },
      { frame: undefined, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '' },
      {
        frame: undefined, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: ''
      },
      {
        frame: undefined, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.SOURCE_BASED,
        expected: ''
      },

      { frame: undefined, state: state, format: TimecodeFormat.SECONDS, base: undefined, expected: '' },
      { frame: undefined, state: state, format: TimecodeFormat.SECONDS, base: null, expected: '' },
      { frame: undefined, state: state, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: undefined, state: state, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: undefined, format: undefined, base: undefined, expected: '' },
      { frame: null, state: undefined, format: undefined, base: null, expected: '' },
      { frame: null, state: undefined, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: undefined, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: undefined, format: null, base: undefined, expected: '' },
      { frame: null, state: undefined, format: null, base: null, expected: '' },
      { frame: null, state: undefined, format: null, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: undefined, format: null, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '' },
      { frame: null, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '' },
      {
        frame: null, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: ''
      },
      {
        frame: null, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.SOURCE_BASED,
        expected: ''
      },

      { frame: null, state: undefined, format: TimecodeFormat.SECONDS, base: undefined, expected: '' },
      { frame: null, state: undefined, format: TimecodeFormat.SECONDS, base: null, expected: '' },
      { frame: null, state: undefined, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: undefined, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: null, format: undefined, base: undefined, expected: '' },
      { frame: null, state: null, format: undefined, base: null, expected: '' },
      { frame: null, state: null, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: null, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: null, format: null, base: undefined, expected: '' },
      { frame: null, state: null, format: null, base: null, expected: '' },
      { frame: null, state: null, format: null, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: null, format: null, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '' },
      { frame: null, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '' },
      {
        frame: null, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: ''
      },
      {
        frame: null, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION,
        base: TimecodeBase.SOURCE_BASED, expected: ''
      },

      { frame: null, state: null, format: TimecodeFormat.SECONDS, base: undefined, expected: '' },
      { frame: null, state: null, format: TimecodeFormat.SECONDS, base: null, expected: '' },
      { frame: null, state: null, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: null, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: state, format: undefined, base: undefined, expected: '' },
      { frame: null, state: state, format: undefined, base: null, expected: '' },
      { frame: null, state: state, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: state, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: state, format: null, base: undefined, expected: '' },
      { frame: null, state: state, format: null, base: null, expected: '' },
      { frame: null, state: state, format: null, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: state, format: null, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: null, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '' },
      { frame: null, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '' },
      {
        frame: null, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: ''
      },
      {
        frame: null, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.SOURCE_BASED,
        expected: ''
      },

      { frame: null, state: state, format: TimecodeFormat.SECONDS, base: undefined, expected: '' },
      { frame: null, state: state, format: TimecodeFormat.SECONDS, base: null, expected: '' },
      { frame: null, state: state, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '' },
      { frame: null, state: state, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '' },

      { frame: frame, state: undefined, format: undefined, base: undefined, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: undefined, base: null, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '00:00:02;17' },

      { frame: frame, state: undefined, format: null, base: undefined, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: null, base: null, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: null, base: TimecodeBase.STREAM_BASED, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: null, base: TimecodeBase.SOURCE_BASED, expected: '00:00:02;17' },

      { frame: frame, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '00:00:01;17' },
      { frame: frame, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '00:00:01;17' },
      {
        frame: frame, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: '00:00:01;17'
      },
      {
        frame: frame, state: undefined, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.SOURCE_BASED,
        expected: '00:00:02;17'
      },

      { frame: frame, state: undefined, format: TimecodeFormat.SECONDS, base: undefined, expected: '1.567' },
      { frame: frame, state: undefined, format: TimecodeFormat.SECONDS, base: null, expected: '1.567' },
      { frame: frame, state: undefined, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '1.567' },
      { frame: frame, state: undefined, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '2.567' },

      { frame: frame, state: null, format: undefined, base: undefined, expected: '00:00:01;17' },
      { frame: frame, state: null, format: undefined, base: null, expected: '00:00:01;17' },
      { frame: frame, state: null, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '00:00:01;17' },
      { frame: frame, state: null, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '00:00:02;17' },

      { frame: frame, state: null, format: null, base: undefined, expected: '00:00:01;17' },
      { frame: frame, state: null, format: null, base: null, expected: '00:00:01;17' },
      { frame: frame, state: null, format: null, base: TimecodeBase.STREAM_BASED, expected: '00:00:01;17' },
      { frame: frame, state: null, format: null, base: TimecodeBase.SOURCE_BASED, expected: '00:00:02;17' },

      { frame: frame, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '00:00:01;17' },
      { frame: frame, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '00:00:01;17' },
      {
        frame: frame, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: '00:00:01;17'
      },
      {
        frame: frame, state: null, format: TimecodeFormat.SIMPLE_TIME_CONVERSION,
        base: TimecodeBase.SOURCE_BASED, expected: '00:00:02;17'
      },

      { frame: frame, state: null, format: TimecodeFormat.SECONDS, base: undefined, expected: '1.567' },
      { frame: frame, state: null, format: TimecodeFormat.SECONDS, base: null, expected: '1.567' },
      { frame: frame, state: null, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '1.567' },
      { frame: frame, state: null, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '2.567' },

      { frame: frame, state: state, format: undefined, base: undefined, expected: '2.567' },
      { frame: frame, state: state, format: undefined, base: null, expected: '2.567' },
      { frame: frame, state: state, format: undefined, base: TimecodeBase.STREAM_BASED, expected: '1.567' },
      { frame: frame, state: state, format: undefined, base: TimecodeBase.SOURCE_BASED, expected: '2.567' },

      { frame: frame, state: state, format: null, base: undefined, expected: '2.567' },
      { frame: frame, state: state, format: null, base: null, expected: '2.567' },
      { frame: frame, state: state, format: null, base: TimecodeBase.STREAM_BASED, expected: '1.567' },
      { frame: frame, state: state, format: null, base: TimecodeBase.SOURCE_BASED, expected: '2.567' },

      { frame: frame, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: undefined, expected: '00:00:02;17' },
      { frame: frame, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: null, expected: '00:00:02;17' },
      {
        frame: frame, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.STREAM_BASED,
        expected: '00:00:01;17'
      },
      {
        frame: frame, state: state, format: TimecodeFormat.SIMPLE_TIME_CONVERSION, base: TimecodeBase.SOURCE_BASED,
        expected: '00:00:02;17'
      },

      { frame: frame, state: state, format: TimecodeFormat.SECONDS, base: undefined, expected: '2.567' },
      { frame: frame, state: state, format: TimecodeFormat.SECONDS, base: null, expected: '2.567' },
      { frame: frame, state: state, format: TimecodeFormat.SECONDS, base: TimecodeBase.STREAM_BASED, expected: '1.567' },
      { frame: frame, state: state, format: TimecodeFormat.SECONDS, base: TimecodeBase.SOURCE_BASED, expected: '2.567' },
    ];

    tests.forEach((test: any) => {
      const frameDescription = `${test.frame === null ? 'a null' : test.frame ? 'a defined' : 'an undefined'} frame`;
      const stateDescription = `${test.state === null ? 'a null' : test.state ? 'a defined' : 'an undefined'} state`;
      const formatDescription = test.format === null ? 'null' : test.format ? TimecodeFormat[test.format] : 'undefined';
      const baseDescription = test.base === null ? 'null' : test.base ? TimecodeBase[test.base] : 'undefined';
      const description =
        `transforms ${frameDescription} with ${stateDescription}, format = ${formatDescription},`
        + ` and base = ${baseDescription} as expected`;

      it(description, () => {
        if (typeof test.format === 'undefined' && typeof test.base === 'undefined') {
          expect(pipeUnderTest.transform(test.frame, test.state)).toEqual(test.expected);
        } else if (typeof test.base === 'undefined') {
          expect(pipeUnderTest.transform(test.frame, test.state, test.format)).toEqual(test.expected);
        } else {
          expect(pipeUnderTest.transform(test.frame, test.state, test.format, test.base)).toEqual(test.expected);
        }
      });
    });
  });
}

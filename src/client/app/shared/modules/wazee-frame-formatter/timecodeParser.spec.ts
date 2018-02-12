import { TimecodeFormat } from './timecodeFormat';
import { TimecodeParser } from './timecodeParser';

export function main() {
  describe('TimecodeParser', () => {
    let parserUnderTest: TimecodeParser;

    describe('for 29.97 fps', () => {
      beforeEach(() => {
        parserUnderTest = new TimecodeParser(29.97);
      });

      describe('for frame number 0', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('0', undefined)).toEqual(0);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('0.000', TimecodeFormat.SECONDS)).toEqual(0);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.NONDROPFRAME)).toEqual(0);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00;00', TimecodeFormat.DROPFRAME)).toEqual(0);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(0);
        });

        it('can parse an s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00;00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(0);
        });

        it('can parse an m:s minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(0);
        });

        it('can parse an m:s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00;00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(0);
        });

        it('can parse an h:m:s minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(0);
        });

        it('can parse an h:m:s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00;00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(0);
        });

        it('can parse an h:m:s:f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(0);
        });
      });

      describe('for frame number 1800', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('1800', undefined)).toEqual(1800);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('60.067', TimecodeFormat.SECONDS)).toEqual(1800);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00:00', TimecodeFormat.NONDROPFRAME)).toEqual(1800);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00;02', TimecodeFormat.DROPFRAME)).toEqual(1800);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00:02', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(1800);
        });

        it('can parse an m:s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('01:00;02', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(1800);
        });

        it('can parse an h:m:s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00;02', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(1800);
        });

        it('can parse an h:m:s:f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00:02', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(1800);
        });
      });

      describe('for frame number 3596', () => {
        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:59:26', TimecodeFormat.NONDROPFRAME)).toEqual(3596);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:59;28', TimecodeFormat.DROPFRAME)).toEqual(3596);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:02:00:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(3596);
        });

        it('can parse an m;s minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('02:00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(3596);
        });

        it('can parse an m:s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('02:00;00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(3596);
        });

        it('can parse an h:m:s minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:02:00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(3596);
        });

        it('can parse an h:m:s:f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:02:00:00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(3596);
        });

        it('can parse an h:m:s;f minimal time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:02:00;00', TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual(3596);
        });
      });

      describe('for frame number 18000', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('18000', undefined)).toEqual(18000);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('600.6', TimecodeFormat.SECONDS)).toEqual(18000);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:10:00:00', TimecodeFormat.NONDROPFRAME)).toEqual(18000);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:10:00;18', TimecodeFormat.DROPFRAME)).toEqual(18000);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:10:00:18', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(18000);
        });
      });

      describe('for frame number 100000', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('100000', undefined)).toEqual(100000);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('3336.667', TimecodeFormat.SECONDS)).toEqual(100000);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:55:33:10', TimecodeFormat.NONDROPFRAME)).toEqual(100000);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:55:36;20', TimecodeFormat.DROPFRAME)).toEqual(100000);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:55:36:20', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(100000);
        });
      });

      describe('for frame number 111694', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('111694', undefined)).toEqual(111694);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('3726.867', TimecodeFormat.SECONDS)).toEqual(111694);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('01:02:03:04', TimecodeFormat.NONDROPFRAME)).toEqual(111694);
        });
      });

      describe('for frame number 123456', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('123456', undefined)).toEqual(123456);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('4119.3', TimecodeFormat.SECONDS)).toEqual(123456);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('01:08:35:06', TimecodeFormat.NONDROPFRAME)).toEqual(123456);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('01:08:39;10', TimecodeFormat.DROPFRAME)).toEqual(123456);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('01:08:39:09', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(123456);
        });
      });
    });

    describe('for 59.94 fps', () => {
      beforeEach(() => {
        parserUnderTest = new TimecodeParser(59.94);
      });

      describe('for frame number 0', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('0', undefined)).toEqual(0);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('0.000', TimecodeFormat.SECONDS)).toEqual(0);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.NONDROPFRAME)).toEqual(0);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00;00', TimecodeFormat.DROPFRAME)).toEqual(0);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(0);
        });
      });

      describe('for frame number 3600', () => {
        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00;04', TimecodeFormat.DROPFRAME)).toEqual(3600);
        });
      });

      describe('for frame number 200000', () => {
        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:55:36;40', TimecodeFormat.DROPFRAME)).toEqual(200000);
        });

      });
    });

    describe('for 23.976 fps', () => {
      beforeEach(() => {
        parserUnderTest = new TimecodeParser(23.976);
      });

      describe('for frame number 0', () => {
        it('can parse a frame number string', () => {
          expect(parserUnderTest.asFrameNumber('0', undefined)).toEqual(0);
        });

        it('can parse a seconds string', () => {
          expect(parserUnderTest.asFrameNumber('0.000', TimecodeFormat.SECONDS)).toEqual(0);
        });

        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.NONDROPFRAME)).toEqual(0);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00;00', TimecodeFormat.DROPFRAME)).toEqual(0);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:00:00:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(0);
        });
      });

      describe('for frame number 1440', () => {
        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:01:00;01', TimecodeFormat.DROPFRAME)).toEqual(1440);
        });
      });

      describe('for frame number 6498', () => {
        it('can parse a nondropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:04:30:18', TimecodeFormat.NONDROPFRAME)).toEqual(6498);
        });

        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:04:30;22', TimecodeFormat.DROPFRAME)).toEqual(6498);
        });

        it('can parse a simple time conversion timecode', () => {
          expect(parserUnderTest.asFrameNumber('00:04:31:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual(6498);
        });
      });

      describe('for frame number 100000', () => {
        it('can parse a dropframe timecode', () => {
          expect(parserUnderTest.asFrameNumber('01:09:29;17', TimecodeFormat.DROPFRAME)).toEqual(100000);
        });
      });
    });
  });
}

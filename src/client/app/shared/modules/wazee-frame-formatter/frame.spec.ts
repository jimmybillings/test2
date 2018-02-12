import { Frame } from './frame';
import { TimecodeFormat } from './timecodeFormat';
import { TimecodeBase } from './timecodeBase';
import { customMatchers } from './support/customMatchers';

export function main() {
  describe('Frame', function () {
    beforeEach(function () {
      jasmine.addMatchers(customMatchers);
    });

    describe('constructor', function () {
      it('sets 24 fps as 24 fps', function () {
        expect(new Frame(24).framesPerSecond).toEqual(24);
      });

      it('sets 23.976 fps as 23.976 fps', function () {
        expect(new Frame(23.976).framesPerSecond).toEqual(23.976);
      });

      it('saves 23.98 fps as 23.976 fps', function () {
        expect(new Frame(23.98).framesPerSecond).toEqual(23.976);
      });

      it('sets source-based frame offset from a number', function () {
        expect(new Frame(23.976, 42).sourceBasedOffsetFrames).toEqual(42);
      });

      it('sets source-based frame offset from a string', function () {
        expect(new Frame(23.976, '01:00:00:00').sourceBasedOffsetFrames).toEqual(86314);
      });

      it('sets source-based frame offset as zero when not specified', function () {
        expect(new Frame(23.976).sourceBasedOffsetFrames).toEqual(0);
      });
    });

    describe('#setFromFrameNumber', function () {
      it('returns the object', function () {
        const frame = new Frame(23.976);
        expect(frame.setFromFrameNumber(4747)).toEqual(frame);
      });

      it('sets from a frame number', function () {
        expect(new Frame(23.976).setFromFrameNumber(4747).asFrameNumber()).toEqual(4747);
      });

      it('sets from a stream-based frame number with a source-based offset', function () {
        expect(new Frame(23.976, 100).setFromFrameNumber(4747, TimecodeBase.STREAM_BASED).asFrameNumber()).toEqual(4747);
      });

      it('sets from a source-based frame number with a source-based offset', function () {
        expect(new Frame(23.976, 100).setFromFrameNumber(4847, TimecodeBase.SOURCE_BASED).asFrameNumber()).toEqual(4747);
      });
    });

    describe('#setFromSeconds', function () {
      it('returns the object', function () {
        var frame;
        frame = new Frame(23.976);
        expect(frame.setFromSeconds(47)).toEqual(frame);
      });

      it('sets from seconds', function () {
        expect(new Frame(23.976).setFromSeconds(47).asFrameNumber()).toEqual(1127);
      });

      it('sets from stream-based seconds with a source-based offset', function () {
        expect(new Frame(23.976, 100).setFromSeconds(47, TimecodeBase.STREAM_BASED).asFrameNumber()).toEqual(1127);
      });

      it('sets from source-based seconds with a source-based offset', function () {
        expect(new Frame(23.976, 100).setFromSeconds(47, TimecodeBase.SOURCE_BASED).asFrameNumber()).toEqual(1027);
      });
    });

    describe('#asSeconds', function () {
      it('can round to 3 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asSeconds(3)).toEqual(0.042);
      });

      it('can round to 4 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asSeconds(4)).toEqual(0.0417);
      });

      it('can round to 0 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asSeconds(0)).toEqual(0);
      });

      it('can be told to not round at all by specifying -1', function () {
        expect((new Frame(23.976).setFromFrameNumber(1).asSeconds(-1) + '').length).toBeGreaterThan(10);
      });

      it('defaults to not rounding at all', function () {
        expect((new Frame(23.976).setFromFrameNumber(1).asSeconds() + '').length).toBeGreaterThan(10);
      });
    });

    describe('#asMilliseconds', function () {
      it('can round to 0 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(0)).toEqual(42);
      });

      it('can round to 1 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(1)).toEqual(41.7);
      });

      it('can round to 2 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(2)).toEqual(41.71);
      });

      it('can round to 3 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(3)).toEqual(41.708);
      });

      it('can round to 4 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(4)).toEqual(41.7084);
      });

      it('can round to 5 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(5)).toEqual(41.70838);
      });

      it('can round to 6 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds(6)).toEqual(41.708375);
      });

      it('defaults to 0 digits', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asMilliseconds()).toEqual(42);
      });

      describe('with regression data from real life', function () {
        it('handles 00:00:02;00 at 29.97fps', function () {
          expect(new Frame(29.97).setFromString('00:00:02;00', TimecodeFormat.SIMPLE_TIME_CONVERSION).asMilliseconds())
            .toEqual(2002); // not 2001.9999999999998
        });

        it('handles 00:00:02;01 at 29.97fps', function () {
          expect(new Frame(29.97).setFromString('00:00:02;01', TimecodeFormat.SIMPLE_TIME_CONVERSION).asMilliseconds())
            .toEqual(2035); // not 2035.0000000000002
        });

        it('handles 00:00:08;02 at 29.97fps', function () {
          expect(new Frame(29.97).setFromString('00:00:08;02', TimecodeFormat.SIMPLE_TIME_CONVERSION).asMilliseconds())
            .toEqual(8075); // not 8074.999999999999
        });

        it('handles 00:00:08;03 at 29.97fps', function () {
          expect(new Frame(29.97).setFromString('00:00:08;03', TimecodeFormat.SIMPLE_TIME_CONVERSION).asMilliseconds())
            .toEqual(8108); // not 8108.000000000001
        });
      });
    });

    it('converts frame to seconds', function () {
      expect(new Frame(23.976).setFromFrameNumber(1).asSeconds()).toBeCloseTo(0.042, 3);
    });

    it('converts seconds to frame', function () {
      expect(new Frame(23.976).setFromSeconds(0.041).asFrameNumber()).toEqual(1);
    });

    describe('round tripping', function () {
      const maxFrameNumberToTest: number = 1000;

      describe('via integral seconds', function () {
        it('works', function () {
          Object.keys(Array(maxFrameNumberToTest)).forEach(frameNumberAsString => {
            const frameNumber = Number(frameNumberAsString);
            const frame = new Frame(23.976).setFromFrameNumber(frameNumber);
            const seconds = frame.asSeconds();

            expect(frame.setFromSeconds(seconds).asFrameNumber()).toBe(frameNumber);
          });
        });
      });

      describe('via strings', function () {
        it('works', function () {
          const frameRates = [29.97, 59.94, 23.976];
          const formats = [
            TimecodeFormat.NONDROPFRAME,
            TimecodeFormat.DROPFRAME,
            TimecodeFormat.SIMPLE_TIME_CONVERSION,
            TimecodeFormat.MINIMAL_TIME_CONVERSION,
            TimecodeFormat.SECONDS,
            TimecodeFormat.FRAMECOUNT
          ];

          frameRates.forEach(framesPerSecond => {
            const frame = new Frame(framesPerSecond);

            formats.forEach(format => {
              Object.keys(Array(maxFrameNumberToTest)).forEach(frameNumberAsString => {
                const frameNumber = Number(frameNumberAsString);

                expect(frame).toRoundTripViaStringForFrameNumber(frameNumber, format);
              });
            });
          });
        });
      });
    });

    describe('strings', function () {
      it('converts a frame to a frame string', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asString(TimecodeFormat.FRAMECOUNT)).toEqual('1');
      });

      it('converts a frame to a seconds string', function () {
        expect(new Frame(23.976).setFromFrameNumber(1).asString(TimecodeFormat.SECONDS)).toEqual('0.042');
      });

      it('converts a frame to a nondropframe string', function () {
        expect(new Frame(29.97).setFromFrameNumber(30).asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:00:01:00');
      });
    });

    describe('addFrames', function () {
      it('can add frames', function () {
        expect(new Frame(29.97).setFromFrameNumber(47).addFrames(100).asFrameNumber()).toEqual(147);
      });
    });

    describe('minimal timecode', function () {
      describe('conversion to a simple timecode:', function () {
        it('works with s format', function () {
          expect(new Frame(23.976)
            .setFromString('23', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('00:00:23;00');
        });

        it('works with s;f format', function () {
          expect(new Frame(23.976)
            .setFromString('23;17', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('00:00:23;17');
        });

        it('works with m:s format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('00:23:17;00');
        });

        it('works with m:s;f format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17;05', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('00:23:17;05');
        });

        it('works with h:m:s format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17:05', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('23:17:05;00');
        });

        it('works with h:m:s;f format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17:05;12', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('23:17:05;12');
        });

        it('works with h:m:s:f format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17:05:12', TimecodeFormat.MINIMAL_TIME_CONVERSION)
            .asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)
          ).toEqual('23:17:05;12');
        });

      });
    });

    describe('simple timecode', function () {
      describe('conversion to a minimal timecode:', function () {
        it('works with s format', function () {
          expect(new Frame(23.976)
            .setFromString('00:00:23:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)
            .asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)
          ).toEqual('23');
        });

        it('works with s;f format', function () {
          expect(new Frame(23.976)
            .setFromString('00:00:23:17', TimecodeFormat.SIMPLE_TIME_CONVERSION)
            .asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)
          ).toEqual('23;17');
        });

        it('works with m:s format', function () {
          expect(new Frame(23.976)
            .setFromString('00:23:17:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)
            .asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)
          ).toEqual('23:17');
        });

        it('works with m:s;f format', function () {
          expect(new Frame(23.976)
            .setFromString('00:23:17:05', TimecodeFormat.SIMPLE_TIME_CONVERSION)
            .asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)
          ).toEqual('23:17;05');
        });

        it('works with h:m:s format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17:05:00', TimecodeFormat.SIMPLE_TIME_CONVERSION)
            .asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)
          ).toEqual('23:17:05');
        });

        it('works with h:m:s;f format', function () {
          expect(new Frame(23.976)
            .setFromString('23:17:05:12', TimecodeFormat.SIMPLE_TIME_CONVERSION)
            .asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)
          ).toEqual('23:17:05;12');
        });
      });
    });
  });
}

import { TimecodeFormat } from './timecodeFormat';
import { TimecodeGenerator } from './timecodeGenerator';

export function main() {
  describe('TimecodeGenerator', function () {
    let generatorUnderTest: TimecodeGenerator;

    describe('for 29.97 fps', function () {
      beforeEach(function () {
        generatorUnderTest = new TimecodeGenerator(29.97);
      });

      describe('for frame number 1800', function () {
        beforeEach(function () {
          generatorUnderTest.setFromFrameNumber(1800);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:01:00:00');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:01:00;02');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:01:00;02');
        });

        it('can generate a minimal time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('01:00;02');
        });
      });

      describe('for frame number 3598', function () {
        beforeEach(function () {
          generatorUnderTest.setFromFrameNumber(3598);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:01:59:28');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:02:00;02');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:02:00;02');
        });

        it('can generate a minimal time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('02:00;02');
        });
      });

      describe('for frame number 18000', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(18000);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:10:00:00');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:10:00;18');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:10:00;18');
        });

        it('can generate a minimal time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('10:00;18');
        });
      });

      describe('for frame number 100000', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(100000);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:55:33:10');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:55:36;20');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:55:36;20');
        });
      });

      describe('for frame number 111694', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(111694);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('01:02:03:04');
        });
      });

      describe('for frame number 123456', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(123456);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('01:08:35:06');
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('01:08:39;10');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('01:08:39;09');
        });

      });
    });

    describe('for 59.94 fps', function () {
      beforeEach(function () {
        return generatorUnderTest = new TimecodeGenerator(59.94);
      });

      describe('for frame number 3600', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(3600);
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:01:00;04');
        });
      });

      describe('for frame number 200000', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(200000);
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:55:36;40');
        });

      });
    });

    describe('for 23.976 fps', function () {
      beforeEach(function () {
        return generatorUnderTest = new TimecodeGenerator(23.976);
      });

      describe('for frame number 1127', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(1127);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:00:46:23');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:00:46;23');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:00:47;00');
        });

        it('can generate a minimal time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('47');
        });
      });

      describe('for frame number 1128', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(1128);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:00:47:00');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:00:47;00');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:00:47;01');
        });

        it('can generate a minimal time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('47;01');
        });
      });

      describe('for frame number 1440', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(1440);
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:01:00;01');
        });
      });

      describe('for frame number 6498', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(6498);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:04:30:18');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:04:30;22');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:04:31;00');
        });
      });

      describe('for frame number 56991', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(56991);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('00:39:34:15');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('00:39:36;06');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('00:39:37;00');
        });

        it('can generate a minimal time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.MINIMAL_TIME_CONVERSION)).toEqual('39:37');
        });
      });

      describe('for frame number 99359', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(99359);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('01:08:59:23');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('01:09:03;00');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('01:09:04;02');
        });
      });

      describe('for frame number 100000', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(100000);
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('01:09:29;17');
        });
      });

      describe('for frame number 99359', function () {
        beforeEach(function () {
          return generatorUnderTest.setFromFrameNumber(99359);
        });

        it('can generate a nondropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.NONDROPFRAME)).toEqual('01:08:59:23');
        });

        it('can generate a dropframe timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.DROPFRAME)).toEqual('01:09:03;00');
        });

        it('can generate a simple time conversion timecode', function () {
          expect(generatorUnderTest.asString(TimecodeFormat.SIMPLE_TIME_CONVERSION)).toEqual('01:09:04;02');
        });
      });
    });
  });
}

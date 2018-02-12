import { Time } from './time';

export function main() {
  describe('Time', () => {
    let timeUnderTest: Time;

    beforeEach(() => {
      timeUnderTest = new Time(23.976);
    });

    it('stores frames', () => {
      timeUnderTest.frames = 1;

      expect(timeUnderTest.frames).toBe(1);
    });

    it('stores seconds', () => {
      timeUnderTest.seconds = 2;

      expect(timeUnderTest.seconds).toBe(2);
    });

    it('stores minutes', () => {
      timeUnderTest.minutes = 3;

      expect(timeUnderTest.minutes).toBe(3);
    });

    it('stores hours', () => {
      timeUnderTest.hours = 4;

      expect(timeUnderTest.hours).toBe(4);
    });

    it('rolls frames to seconds when it should', () => {
      timeUnderTest.frames = 24;

      expect(timeUnderTest.seconds).toBe(1);
      expect(timeUnderTest.frames).toBe(0);
    });

    it('rolls seconds to minutes when it should', () => {
      timeUnderTest.seconds = 62;

      expect(timeUnderTest.minutes).toBe(1);
      expect(timeUnderTest.seconds).toBe(2);
    });

    it('rolls minutes to hours when it should', () => {
      timeUnderTest.minutes = 127;

      expect(timeUnderTest.hours).toBe(2);
      expect(timeUnderTest.minutes).toBe(7);
    });

    describe('clear()', () => {
      it('works', () => {
        timeUnderTest.hours = 1;
        timeUnderTest.minutes = 2;
        timeUnderTest.seconds = 3;
        timeUnderTest.frames = 4;

        timeUnderTest.clear();
        expect(timeUnderTest.hours).toBe(0);
        expect(timeUnderTest.minutes).toBe(0);
        expect(timeUnderTest.seconds).toBe(0);
        expect(timeUnderTest.frames).toBe(0);
      });
    });

    describe('addFrames()', () => {
      it('adds frames', () => {
        timeUnderTest.frames = 4;
        timeUnderTest.addFrames(7);

        expect(timeUnderTest.frames).toBe(11);
      });
    });

    describe('hoursMultipleOf()', () => {
      it('works for a multiple', () => {
        timeUnderTest.hours = 14;

        expect(timeUnderTest.hoursMultipleOf(7)).toBe(true);
      });

      it('works for a non-multiple', () => {
        timeUnderTest.hours = 13;

        expect(timeUnderTest.hoursMultipleOf(7)).toBe(false);
      });
    });

    describe('minutesMultipleOf()', () => {
      it('works for a multiple', () => {
        timeUnderTest.minutes = 42;

        expect(timeUnderTest.minutesMultipleOf(7)).toBe(true);
      });

      it('works for a non-multiple', () => {
        timeUnderTest.minutes = 47;

        expect(timeUnderTest.minutesMultipleOf(7)).toBe(false);
      });
    });

    describe('minutesOneOf()', () => {
      it('works for an included minute', () => {
        timeUnderTest.minutes = 47;

        expect(timeUnderTest.minutesOneOf(1, 9, 34, 47, 55)).toBe(true);
      });

      it('works for an excluded minute', () => {
        timeUnderTest.minutes = 47;

        expect(timeUnderTest.minutesOneOf(1, 9, 34, 42, 55)).toBe(false);
      });
    });

    describe('asFrameNumber()', () => {
      it('works', () => {
        timeUnderTest.hours = 1;
        timeUnderTest.minutes = 2;
        timeUnderTest.seconds = 3;
        timeUnderTest.frames = 4;

        expect(timeUnderTest.asFrameNumber()).toBe((1 * 60 * 60 + 2 * 60 + 3) * 24 + 4);
      });
    });

    describe('totalWholeSeconds()', () => {
      it('works', () => {
        timeUnderTest.hours = 1;
        timeUnderTest.minutes = 2;
        timeUnderTest.seconds = 3;
        timeUnderTest.frames = 4;

        expect(timeUnderTest.totalWholeSeconds()).toBe(1 * 60 * 60 + 2 * 60 + 3);
      });
    });
  });
}

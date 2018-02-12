import { Frame } from '../../shared/modules/wazee-frame-formatter/index';
import * as SubclipMarkers from './subclip-markers';

export function main() {
  describe('Subclip Markers Helpers', () => {
    describe('SubclipMarkers.durationFrom()', () => {
      it('converts markers to duration', () => {
        const markers: SubclipMarkers.SubclipMarkers = {
          in: new Frame(30).setFromFrameNumber(30),
          out: new Frame(30).setFromFrameNumber(60)
        };

        expect(SubclipMarkers.durationFrom(markers)).toEqual({ timeStart: 1000, timeEnd: 2000 });
      });

      it('converts a missing in marker to -1', () => {
        const markers: SubclipMarkers.SubclipMarkers = { out: new Frame(30).setFromFrameNumber(60) };

        expect(SubclipMarkers.durationFrom(markers)).toEqual({ timeStart: -1, timeEnd: 2000 });
      });

      it('converts a missing out marker to -2', () => {
        const markers: SubclipMarkers.SubclipMarkers = { in: new Frame(30).setFromFrameNumber(30) };

        expect(SubclipMarkers.durationFrom(markers)).toEqual({ timeStart: 1000, timeEnd: -2 });
      });

      it('converts undefined markers to in of -1 and out of -2', () => {
        const markers: SubclipMarkers.SubclipMarkers = undefined;

        expect(SubclipMarkers.durationFrom(markers)).toEqual({ timeStart: -1, timeEnd: -2 });
      });
    });

    describe('bothMarkersAreSet()', () => {
      it('returns true if both are set', () => {
        expect(SubclipMarkers.bothMarkersAreSet({ in: { some: 'frame' }, out: { some: 'frame' } } as any)).toBe(true);
      });

      it('returns false if out is not set', () => {
        expect(SubclipMarkers.bothMarkersAreSet({ in: { some: 'frame' }, out: undefined } as any)).toBe(false);
      });

      it('returns false if in is not set', () => {
        expect(SubclipMarkers.bothMarkersAreSet({ out: { some: 'frame' }, in: undefined } as any)).toBe(false);
      });

      it('returns false if neither are set', () => {
        expect(SubclipMarkers.bothMarkersAreSet({ out: undefined, in: undefined } as any)).toBe(false);
      });

      it('returns false if markers are undefined', () => {
        expect(SubclipMarkers.bothMarkersAreSet(undefined as any)).toBe(false);
      });
    });

    describe('neitherMarkersAreSet()', () => {
      it('returns true if neither are set', () => {
        expect(SubclipMarkers.neitherMarkersAreSet({ in: undefined, out: undefined } as any)).toBe(true);
      });

      it('returns false if out is not set', () => {
        expect(SubclipMarkers.neitherMarkersAreSet({ in: { some: 'frame' }, out: undefined } as any)).toBe(false);
      });

      it('returns false if in is not set', () => {
        expect(SubclipMarkers.neitherMarkersAreSet({ out: { some: 'frame' }, in: undefined } as any)).toBe(false);
      });

      it('returns false if both are set', () => {
        expect(SubclipMarkers.neitherMarkersAreSet({ in: { some: 'frame' }, out: { some: 'frame' } } as any)).toBe(false);
      });
    });

    describe('matches()', () => {
      const tests: { timeStart: number, timeEnd: number, markers: any, expectedResult: boolean }[] = [
        { timeStart: undefined, timeEnd: undefined, markers: undefined, expectedResult: true },
        { timeStart: undefined, timeEnd: undefined, markers: null, expectedResult: true },

        { timeStart: undefined, timeEnd: undefined, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: undefined, timeEnd: undefined, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: undefined, timeEnd: undefined, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: undefined, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: undefined, timeEnd: undefined, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: undefined, timeEnd: undefined, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: undefined, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: undefined, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: undefined, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: null, markers: undefined, expectedResult: true },
        { timeStart: undefined, timeEnd: null, markers: null, expectedResult: true },

        { timeStart: undefined, timeEnd: null, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: undefined, timeEnd: null, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: undefined, timeEnd: null, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: null, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: undefined, timeEnd: null, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: undefined, timeEnd: null, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: null, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: null, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: null, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: -2, markers: undefined, expectedResult: true },
        { timeStart: undefined, timeEnd: -2, markers: null, expectedResult: true },

        { timeStart: undefined, timeEnd: -2, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: undefined, timeEnd: -2, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: undefined, timeEnd: -2, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: -2, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: undefined, timeEnd: -2, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: undefined, timeEnd: -2, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: -2, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: -2, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: -2, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: 2000, markers: undefined, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: null, expectedResult: false },

        { timeStart: undefined, timeEnd: 2000, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: undefined, out: 'matching' }, expectedResult: true },

        { timeStart: undefined, timeEnd: 2000, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: null, out: 'matching' }, expectedResult: true },

        { timeStart: undefined, timeEnd: 2000, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: undefined, timeEnd: 2000, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: undefined, timeEnd: 2000, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: undefined, markers: undefined, expectedResult: true },
        { timeStart: null, timeEnd: undefined, markers: null, expectedResult: true },

        { timeStart: null, timeEnd: undefined, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: null, timeEnd: undefined, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: null, timeEnd: undefined, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: undefined, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: null, timeEnd: undefined, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: null, timeEnd: undefined, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: undefined, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: undefined, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: undefined, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: null, markers: undefined, expectedResult: true },
        { timeStart: null, timeEnd: null, markers: null, expectedResult: true },

        { timeStart: null, timeEnd: null, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: null, timeEnd: null, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: null, timeEnd: null, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: null, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: null, timeEnd: null, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: null, timeEnd: null, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: null, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: null, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: null, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: -2, markers: undefined, expectedResult: true },
        { timeStart: null, timeEnd: -2, markers: null, expectedResult: true },

        { timeStart: null, timeEnd: -2, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: null, timeEnd: -2, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: null, timeEnd: -2, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: -2, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: null, timeEnd: -2, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: null, timeEnd: -2, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: -2, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: -2, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: -2, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: 2000, markers: undefined, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: null, expectedResult: false },

        { timeStart: null, timeEnd: 2000, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: undefined, out: 'matching' }, expectedResult: true },

        { timeStart: null, timeEnd: 2000, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: null, out: 'matching' }, expectedResult: true },

        { timeStart: null, timeEnd: 2000, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: null, timeEnd: 2000, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: null, timeEnd: 2000, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: undefined, markers: undefined, expectedResult: true },
        { timeStart: -1, timeEnd: undefined, markers: null, expectedResult: true },

        { timeStart: -1, timeEnd: undefined, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: -1, timeEnd: undefined, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: -1, timeEnd: undefined, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: undefined, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: -1, timeEnd: undefined, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: -1, timeEnd: undefined, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: undefined, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: undefined, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: undefined, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: null, markers: undefined, expectedResult: true },
        { timeStart: -1, timeEnd: null, markers: null, expectedResult: true },

        { timeStart: -1, timeEnd: null, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: -1, timeEnd: null, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: -1, timeEnd: null, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: null, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: -1, timeEnd: null, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: -1, timeEnd: null, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: null, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: null, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: null, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: -2, markers: undefined, expectedResult: true },
        { timeStart: -1, timeEnd: -2, markers: null, expectedResult: true },

        { timeStart: -1, timeEnd: -2, markers: { in: undefined, out: undefined }, expectedResult: true },
        { timeStart: -1, timeEnd: -2, markers: { in: undefined, out: null }, expectedResult: true },
        { timeStart: -1, timeEnd: -2, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: -2, markers: { in: null, out: undefined }, expectedResult: true },
        { timeStart: -1, timeEnd: -2, markers: { in: null, out: null }, expectedResult: true },
        { timeStart: -1, timeEnd: -2, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: -2, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: -2, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: -2, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: 2000, markers: undefined, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: null, expectedResult: false },

        { timeStart: -1, timeEnd: 2000, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: undefined, out: 'matching' }, expectedResult: true },

        { timeStart: -1, timeEnd: 2000, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: null, out: 'matching' }, expectedResult: true },

        { timeStart: -1, timeEnd: 2000, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: -1, timeEnd: 2000, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: -1, timeEnd: 2000, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: undefined, markers: undefined, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: null, expectedResult: false },

        { timeStart: 1000, timeEnd: undefined, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: undefined, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: undefined, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: undefined, markers: { in: 'matching', out: undefined }, expectedResult: true },
        { timeStart: 1000, timeEnd: undefined, markers: { in: 'matching', out: null }, expectedResult: true },
        { timeStart: 1000, timeEnd: undefined, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: undefined, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: null, markers: undefined, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: null, expectedResult: false },

        { timeStart: 1000, timeEnd: null, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: null, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: null, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: null, markers: { in: 'matching', out: undefined }, expectedResult: true },
        { timeStart: 1000, timeEnd: null, markers: { in: 'matching', out: null }, expectedResult: true },
        { timeStart: 1000, timeEnd: null, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: null, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: -2, markers: undefined, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: null, expectedResult: false },

        { timeStart: 1000, timeEnd: -2, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: -2, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: -2, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: -2, markers: { in: 'matching', out: undefined }, expectedResult: true },
        { timeStart: 1000, timeEnd: -2, markers: { in: 'matching', out: null }, expectedResult: true },
        { timeStart: 1000, timeEnd: -2, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: -2, markers: { in: 'matching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: 2000, markers: undefined, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: null, expectedResult: false },

        { timeStart: 1000, timeEnd: 2000, markers: { in: undefined, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: undefined, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: undefined, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: 2000, markers: { in: null, out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: null, out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: null, out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: null, out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: 2000, markers: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: 'nonmatching', out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { timeStart: 1000, timeEnd: 2000, markers: { in: 'matching', out: undefined }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: 'matching', out: null }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { timeStart: 1000, timeEnd: 2000, markers: { in: 'matching', out: 'matching' }, expectedResult: true },
      ];

      const matchingInFrame: Frame = new Frame(30).setFromFrameNumber(30);
      const matchingOutFrame: Frame = new Frame(30).setFromFrameNumber(60);
      const nonmatchingInFrame: Frame = new Frame(30).setFromFrameNumber(31);
      const nonmatchingOutFrame: Frame = new Frame(30).setFromFrameNumber(61);

      tests.forEach(test => {
        const markersDescription: string = test.markers
          ? `{ in: ${test.markers.in}, out: ${test.markers.out} }`
          : test.markers;

        it(`returns ${test.expectedResult}` +
          ` for timeStart = ${test.timeStart}, timeEnd = ${test.timeEnd}, and markers = ${markersDescription} `,
          () => {
            const markers: SubclipMarkers.SubclipMarkers =
              test.markers
                ? {
                  in: test.markers.in === 'matching'
                    ? matchingInFrame
                    : (test.markers.in === 'nonmatching' ? nonmatchingInFrame : test.markers.in),
                  out: test.markers.out === 'matching'
                    ? matchingOutFrame
                    : (test.markers.out === 'nonmatching' ? nonmatchingOutFrame : test.markers.out)
                }
                : test.markers;

            expect(SubclipMarkers.matches(test.timeStart, test.timeEnd, markers)).toBe(test.expectedResult);
          });
      });
    });

    describe('markersMatch()', () => {
      const inFrame: Frame = new Frame(30).setFromFrameNumber(30);
      const outFrame: Frame = new Frame(30).setFromFrameNumber(60);
      const nonmatchingInFrame: Frame = new Frame(30).setFromFrameNumber(31);
      const nonmatchingOutFrame: Frame = new Frame(30).setFromFrameNumber(61);

      const tests: { these: any, those: any, expectedResult: boolean }[] = [
        { these: undefined, those: undefined, expectedResult: true },
        { these: undefined, those: null, expectedResult: true },

        { these: undefined, those: { in: undefined, out: undefined }, expectedResult: true },
        { these: undefined, those: { in: undefined, out: null }, expectedResult: true },
        { these: undefined, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: undefined, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: undefined, those: { in: null, out: undefined }, expectedResult: true },
        { these: undefined, those: { in: null, out: null }, expectedResult: true },
        { these: undefined, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: undefined, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: undefined, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: undefined, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: undefined, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: undefined, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: undefined, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: undefined, those: { in: 'matching', out: null }, expectedResult: false },
        { these: undefined, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: undefined, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: null, those: undefined, expectedResult: true },
        { these: null, those: null, expectedResult: true },

        { these: null, those: { in: undefined, out: undefined }, expectedResult: true },
        { these: null, those: { in: undefined, out: null }, expectedResult: true },
        { these: null, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: null, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: null, those: { in: null, out: undefined }, expectedResult: true },
        { these: null, those: { in: null, out: null }, expectedResult: true },
        { these: null, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: null, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: null, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: null, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: null, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: null, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: null, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: null, those: { in: 'matching', out: null }, expectedResult: false },
        { these: null, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: null, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: undefined }, those: undefined, expectedResult: true },
        { these: { in: undefined, out: undefined }, those: null, expectedResult: true },

        { these: { in: undefined, out: undefined }, those: { in: undefined, out: undefined }, expectedResult: true },
        { these: { in: undefined, out: undefined }, those: { in: undefined, out: null }, expectedResult: true },
        { these: { in: undefined, out: undefined }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: undefined }, those: { in: null, out: undefined }, expectedResult: true },
        { these: { in: undefined, out: undefined }, those: { in: null, out: null }, expectedResult: true },
        { these: { in: undefined, out: undefined }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: undefined }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: undefined }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: undefined }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: null }, those: undefined, expectedResult: true },
        { these: { in: undefined, out: null }, those: null, expectedResult: true },

        { these: { in: undefined, out: null }, those: { in: undefined, out: undefined }, expectedResult: true },
        { these: { in: undefined, out: null }, those: { in: undefined, out: null }, expectedResult: true },
        { these: { in: undefined, out: null }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: null }, those: { in: null, out: undefined }, expectedResult: true },
        { these: { in: undefined, out: null }, those: { in: null, out: null }, expectedResult: true },
        { these: { in: undefined, out: null }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: null }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: null }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: null }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: 'set' }, those: undefined, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: null, expectedResult: false },

        { these: { in: undefined, out: 'set' }, those: { in: undefined, out: undefined }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: undefined, out: null }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: undefined, out: 'matching' }, expectedResult: true },

        { these: { in: undefined, out: 'set' }, those: { in: null, out: undefined }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: null, out: null }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: null, out: 'matching' }, expectedResult: true },

        { these: { in: undefined, out: 'set' }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: undefined, out: 'set' }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: undefined, out: 'set' }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: null, out: undefined }, those: undefined, expectedResult: true },
        { these: { in: null, out: undefined }, those: null, expectedResult: true },

        { these: { in: null, out: undefined }, those: { in: undefined, out: undefined }, expectedResult: true },
        { these: { in: null, out: undefined }, those: { in: undefined, out: null }, expectedResult: true },
        { these: { in: null, out: undefined }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: null, out: undefined }, those: { in: null, out: undefined }, expectedResult: true },
        { these: { in: null, out: undefined }, those: { in: null, out: null }, expectedResult: true },
        { these: { in: null, out: undefined }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: null, out: undefined }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: null, out: undefined }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: undefined }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: null, out: null }, those: undefined, expectedResult: true },
        { these: { in: null, out: null }, those: null, expectedResult: true },

        { these: { in: null, out: null }, those: { in: undefined, out: undefined }, expectedResult: true },
        { these: { in: null, out: null }, those: { in: undefined, out: null }, expectedResult: true },
        { these: { in: null, out: null }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: null, out: null }, those: { in: null, out: undefined }, expectedResult: true },
        { these: { in: null, out: null }, those: { in: null, out: null }, expectedResult: true },
        { these: { in: null, out: null }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: null, out: null }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: null, out: null }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: null }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: null, out: 'set' }, those: undefined, expectedResult: false },
        { these: { in: null, out: 'set' }, those: null, expectedResult: false },

        { these: { in: null, out: 'set' }, those: { in: undefined, out: undefined }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: undefined, out: null }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: undefined, out: 'matching' }, expectedResult: true },

        { these: { in: null, out: 'set' }, those: { in: null, out: undefined }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: null, out: null }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: null, out: 'matching' }, expectedResult: true },

        { these: { in: null, out: 'set' }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: null, out: 'set' }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: null, out: 'set' }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: undefined }, those: undefined, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: null, expectedResult: false },

        { these: { in: 'set', out: undefined }, those: { in: undefined, out: undefined }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: undefined, out: null }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: undefined }, those: { in: null, out: undefined }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: null, out: null }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: undefined }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: undefined }, those: { in: 'matching', out: undefined }, expectedResult: true },
        { these: { in: 'set', out: undefined }, those: { in: 'matching', out: null }, expectedResult: true },
        { these: { in: 'set', out: undefined }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: undefined }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: null }, those: undefined, expectedResult: false },
        { these: { in: 'set', out: null }, those: null, expectedResult: false },

        { these: { in: 'set', out: null }, those: { in: undefined, out: undefined }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: undefined, out: null }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: null }, those: { in: null, out: undefined }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: null, out: null }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: null }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: null }, those: { in: 'matching', out: undefined }, expectedResult: true },
        { these: { in: 'set', out: null }, those: { in: 'matching', out: null }, expectedResult: true },
        { these: { in: 'set', out: null }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: null }, those: { in: 'matching', out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: 'set' }, those: undefined, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: null, expectedResult: false },

        { these: { in: 'set', out: 'set' }, those: { in: undefined, out: undefined }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: undefined, out: null }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: undefined, out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: undefined, out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: 'set' }, those: { in: null, out: undefined }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: null, out: null }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: null, out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: null, out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: 'set' }, those: { in: 'nonmatching', out: undefined }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: 'nonmatching', out: null }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: 'nonmatching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: 'nonmatching', out: 'matching' }, expectedResult: false },

        { these: { in: 'set', out: 'set' }, those: { in: 'matching', out: undefined }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: 'matching', out: null }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: 'matching', out: 'nonmatching' }, expectedResult: false },
        { these: { in: 'set', out: 'set' }, those: { in: 'matching', out: 'matching' }, expectedResult: true },
      ];

      tests.forEach(test => {
        const theseDescription: string = test.these
          ? `{ in: ${test.these.in}, out: ${test.these.out} }`
          : test.these;

        const thoseDescription: string = test.those
          ? `{ in: ${test.those.in}, out: ${test.those.out} }`
          : test.those;

        it(`returns ${test.expectedResult} for ${theseDescription} and ${thoseDescription}`, () => {
          const these: SubclipMarkers.SubclipMarkers =
            test.these
              ? {
                in: test.these.in === 'set' ? inFrame : test.these.in,
                out: test.these.out === 'set' ? outFrame : test.these.out
              }
              : test.these;

          const those: SubclipMarkers.SubclipMarkers =
            test.those
              ? {
                in: test.those.in === 'matching'
                  ? inFrame
                  : (test.those.in === 'nonmatching' ? nonmatchingInFrame : test.those.in),
                out: test.those.out === 'matching'
                  ? outFrame
                  : (test.those.out === 'nonmatching' ? nonmatchingOutFrame : test.those.out)
              }
              : test.those;

          expect(SubclipMarkers.markersMatch(these, those)).toBe(test.expectedResult);
        });
      });
    });
  });
}

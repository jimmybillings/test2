import { DateRange } from './dateRange';

export function main() {
  describe('Date Range', () => {
    let rangeUnderTest: DateRange;

    beforeEach(() => {
      rangeUnderTest = new DateRange();
    });

    describe('get()', () => {
      it('returns the start value for "start"', () => {
        rangeUnderTest.start = '2000-01-01';

        expect(rangeUnderTest.get('start')).toEqual('2000-01-01');
      });

      it('returns the end value for "end"', () => {
        rangeUnderTest.end = '2000-12-31';

        expect(rangeUnderTest.get('end')).toEqual('2000-12-31');
      });

      it('throws an error for an unknown range key', () => {
        expect(() => rangeUnderTest.get(<any>'huh?')).toThrowError(TypeError);
      });
    });

    describe('set()', () => {
      it('sets the start value', () => {
        rangeUnderTest.set('start', '2001-02-03');

        expect(rangeUnderTest.start).toEqual('2001-02-03');
        expect(rangeUnderTest.end).toBeNull();
      });

      it('sets the start value to null for the beginning of time', () => {
        rangeUnderTest.set('start', '1000-01-01');

        expect(rangeUnderTest.start).toBeNull();
      });

      it('formats the start value', () => {
        rangeUnderTest.set('start', 'Feb 3 2001');

        expect(rangeUnderTest.start).toEqual('2001-02-03');
      });

      it('sets the end value', () => {
        rangeUnderTest.set('end', '2001-03-04');

        expect(rangeUnderTest.start).toBeNull();
        expect(rangeUnderTest.end).toEqual('2001-03-04');
      });

      it('sets the end value to null for the end of time', () => {
        rangeUnderTest.set('end', '3000-01-01');

        expect(rangeUnderTest.end).toBeNull();
      });

      it('formats the end value', () => {
        rangeUnderTest.set('end', 'Mar 4 2001');

        expect(rangeUnderTest.end).toEqual('2001-03-04');
      });

      it('sets the start value from a range string', () => {
        rangeUnderTest.set('start', '2001-05-06 - 2001-06-07');

        expect(rangeUnderTest.start).toEqual('2001-05-06');
        expect(rangeUnderTest.end).toBeNull();
      });

      it('sets the end value from a range string', () => {
        rangeUnderTest.set('end', '2001-07-08 - 2001-08-09');

        expect(rangeUnderTest.start).toBeNull();
        expect(rangeUnderTest.end).toEqual('2001-08-09');
      });

      it('throws an error for an unknown range key', () => {
        expect(() => rangeUnderTest.set(<any>'what?', '2001-03-04')).toThrowError(TypeError);
      });

      it('throws an error for an unparseable date', () => {
        expect(() => rangeUnderTest.set('start', 'not a date')).toThrowError(TypeError);
      });
    });

    describe('toString()', () => {
      it('returns the right range when start and end are set', () => {
        rangeUnderTest.start = '2002-07-07';
        rangeUnderTest.end = '2003-08-08';

        expect(rangeUnderTest.toString()).toEqual('2002-07-07 - 2003-08-08');
      });

      it('returns the right range when only start is set', () => {
        rangeUnderTest.start = '2005-12-12';

        expect(rangeUnderTest.toString()).toEqual('2005-12-12 - 3000-01-01');
      });

      it('returns the right range when only end is set', () => {
        rangeUnderTest.end = '2004-09-09';

        expect(rangeUnderTest.toString()).toEqual('1000-01-01 - 2004-09-09');
      });

      it('returns the right range when neither start nor end is set', () => {
        expect(rangeUnderTest.toString()).toEqual('1000-01-01 - 3000-01-01');
      });
    });

    describe('toHumanString()', () => {
      it('returns the right string when start and end are set', () => {
        rangeUnderTest.start = '2007-05-22';
        rangeUnderTest.end = '2007-05-22';

        expect(rangeUnderTest.toHumanString()).toEqual('5/22/2007 - 5/22/2007');
      });

      it('returns the right string when only start is set', () => {
        rangeUnderTest.start = '2009-04-23';

        expect(rangeUnderTest.toHumanString()).toEqual('On or after 4/23/2009');
      });

      it('returns the right string when only end is set', () => {
        rangeUnderTest.end = '1998-09-27';

        expect(rangeUnderTest.toHumanString()).toEqual('On or before 9/27/1998');
      });

      it('returns the right string when neither start nor end is set', () => {
        expect(rangeUnderTest.toHumanString()).toEqual('Any date');
      });
    });
  });
}

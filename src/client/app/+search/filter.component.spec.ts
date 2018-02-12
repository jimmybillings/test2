import { Common } from '../shared/utilities/common.functions';
import { FilterComponent } from './filter.component';
export function main() {
  describe('Filter Component', () => {
    let mockSearchComponent: any;
    let componentUnderTest: FilterComponent;

    beforeEach(() => {
      componentUnderTest = new FilterComponent();
      componentUnderTest.onFilterEvent = {
        emit: jasmine.createSpy('emit')
      };
    });

    describe('toggleFilter()', () => {
      it('delegates to SearchComponent', () => {
        componentUnderTest.toggleFilter({ mockFilter: 'mockFilter' });

        expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith(
          { event: 'toggleFilter', filter: { mockFilter: 'mockFilter' } });
      });

    });

    describe('applyDateRange()', () => {
      let mockEvent: any;
      let mockFilter: any;

      beforeEach(() => {
        mockEvent = { target: {}, targetElement: {} };
        mockFilter = { some: 'filter' };
      });

      it('sets dateRange start value to a formatted version of "value" property', () => {
        mockEvent.target = { value: new Date('Thu Dec 1 2016') };
        mockEvent.targetElement = { name: 'start' };
        componentUnderTest.applyDateRange(mockEvent, mockFilter);

        expect(componentUnderTest.dateRange.start).toEqual('2016-12-01');
      });

      it('sets dateRange end value to a formatted version of "value" property', () => {
        mockEvent.target = { value: new Date('Thu Dec 15 2016') };
        mockEvent.targetElement = { name: 'end' };
        componentUnderTest.applyDateRange(mockEvent, mockFilter);

        expect(componentUnderTest.dateRange.end).toEqual('2016-12-15');
      });

      it('throws an exception for an unknown "name" property', () => {
        mockEvent.targetElement = { name: 'whatever' };

        expect(() => componentUnderTest.applyDateRange(mockEvent, mockFilter)).toThrowError(TypeError);
      });

      it('throws an exception when event target\'s "value" property is not a date', () => {
        mockEvent.target = { value: new Date('blah') };

        expect(() => componentUnderTest.applyDateRange(mockEvent, mockFilter)).toThrowError(TypeError);
      });

      it('throws an exception when event target\'s "value" property is not present', () => {
        expect(() => componentUnderTest.applyDateRange(mockEvent, mockFilter)).toThrowError(TypeError);
      });

      it('applies the search filter with the end of time when only the start date is present', () => {
        mockEvent.target = { value: new Date('Sat Dec 3 2016') };
        mockEvent.targetElement = { name: 'start' };
        componentUnderTest.applyDateRange(mockEvent, mockFilter);

        expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({
          event: 'applyCustomValue',
          filter: mockFilter,
          customValue: '2016-12-03 - 3000-01-01'
        });
      });

      it('applies the search filter with the beginning of time when only the end date is present', () => {
        mockEvent.target = { value: new Date('Sun Dec 4 2016') };
        mockEvent.targetElement = { name: 'end' };
        componentUnderTest.applyDateRange(mockEvent, mockFilter);

        expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({
          event: 'applyCustomValue',
          filter: mockFilter,
          customValue: '1000-01-01 - 2016-12-04'
        });
      });

      it('applies proper search filters twice as both dates are selected', () => {
        mockEvent.target = { value: new Date('Mon Dec 5 2016') };
        mockEvent.targetElement = { name: 'start' };
        componentUnderTest.applyDateRange(mockEvent, mockFilter);

        expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({
          event: 'applyCustomValue',
          filter: mockFilter,
          customValue: '2016-12-05 - 3000-01-01'
        });

        mockEvent.target = { value: new Date('Fri Dec 23 2016') };
        mockEvent.targetElement = { name: 'end' };
        componentUnderTest.applyDateRange(mockEvent, mockFilter);

        expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({
          event: 'applyCustomValue',
          filter: mockFilter,
          customValue: '2016-12-05 - 2016-12-23'
        });
      });
    });

    describe('preselectDate()', () => {
      describe('with a filter value', () => {
        let mockFilter: any = {
          name: 'Date and Duration',
          subFilters: [{
            type: 'DateRange',
            filterValue: '2016-01-01 - 2016-12-31'
          }]
        };
        it('Sets the start date instance variables with the correct date for the date picker', () => {
          mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
          componentUnderTest.newFilters = mockFilter;

          expect(componentUnderTest.startDate.value.toString()).toEqual(Common.convertToDateInstance('2016-01-01').toString());
        });

        it('returns null if the start value from the filter is the beginning of time', () => {
          mockFilter.subFilters[0].filterValue = '1000-01-01 - 2016-12-31';
          componentUnderTest.newFilters = mockFilter;

          expect(componentUnderTest.startDate.value).toBeNull();
        });

        it('sets the dateRange start value from the filter (SIDE EFFECT!)', () => {
          mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
          componentUnderTest.newFilters = mockFilter;

          expect(componentUnderTest.dateRange.start).toEqual('2016-01-01');
        });

        it('Sets the end date instance variables with the correct date for the date picker', () => {
          mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
          componentUnderTest.newFilters = mockFilter;

          expect(componentUnderTest.endDate.value.toString()).toEqual(Common.convertToDateInstance('2016-12-31').toString());
        });

        it('returns null if the end value from the filter is the beginning of time', () => {
          mockFilter.subFilters[0].filterValue = '2016-01-01 - 3000-01-01';
          componentUnderTest.newFilters = mockFilter;

          expect(componentUnderTest.endDate.value).toBeNull();
        });

        it('sets the dateRange end value from the filter (SIDE EFFECT!)', () => {
          mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
          componentUnderTest.newFilters = mockFilter;

          expect(componentUnderTest.dateRange.end).toEqual('2016-12-31');
        });
      });

      for (const badFilter of [
        {
          name: 'Date and Duration'
        },
        {
          name: 'Date and Duration',
          subFilters: []
        },
        {
          name: 'Date and Duration',
          subFilters: [{
            type: 'DateRange',
          }]
        }]) {
        describe(`without a filter value (filter argument = ${JSON.stringify(badFilter)})`, () => {
          describe('with an existing dateRange value', () => {
            beforeEach(() => {
              componentUnderTest.dateRange.start = '2017-06-01';
              componentUnderTest.dateRange.end = '2017-06-30';
            });

            it('Produces no error if the date filter is bad and preserves the existing dateRange start value', () => {
              componentUnderTest.newFilters = badFilter;
              expect(componentUnderTest.dateRange.start).toEqual('2017-06-01');
            });

            it('Produces no error if the date filter is bad and preserves the existing dateRange end value', () => {
              componentUnderTest.newFilters = badFilter;
              expect(componentUnderTest.dateRange.end).toEqual('2017-06-30');
            });

          });
        });
      }
    });
  });
}

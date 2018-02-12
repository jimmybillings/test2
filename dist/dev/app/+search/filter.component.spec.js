"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_functions_1 = require("../shared/utilities/common.functions");
var filter_component_1 = require("./filter.component");
function main() {
    describe('Filter Component', function () {
        var mockSearchComponent;
        var componentUnderTest;
        beforeEach(function () {
            componentUnderTest = new filter_component_1.FilterComponent();
            componentUnderTest.onFilterEvent = {
                emit: jasmine.createSpy('emit')
            };
        });
        describe('toggleFilter()', function () {
            it('delegates to SearchComponent', function () {
                componentUnderTest.toggleFilter({ mockFilter: 'mockFilter' });
                expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({ event: 'toggleFilter', filter: { mockFilter: 'mockFilter' } });
            });
        });
        describe('applyDateRange()', function () {
            var mockEvent;
            var mockFilter;
            beforeEach(function () {
                mockEvent = { target: {}, targetElement: {} };
                mockFilter = { some: 'filter' };
            });
            it('sets dateRange start value to a formatted version of "value" property', function () {
                mockEvent.target = { value: new Date('Thu Dec 1 2016') };
                mockEvent.targetElement = { name: 'start' };
                componentUnderTest.applyDateRange(mockEvent, mockFilter);
                expect(componentUnderTest.dateRange.start).toEqual('2016-12-01');
            });
            it('sets dateRange end value to a formatted version of "value" property', function () {
                mockEvent.target = { value: new Date('Thu Dec 15 2016') };
                mockEvent.targetElement = { name: 'end' };
                componentUnderTest.applyDateRange(mockEvent, mockFilter);
                expect(componentUnderTest.dateRange.end).toEqual('2016-12-15');
            });
            it('throws an exception for an unknown "name" property', function () {
                mockEvent.targetElement = { name: 'whatever' };
                expect(function () { return componentUnderTest.applyDateRange(mockEvent, mockFilter); }).toThrowError(TypeError);
            });
            it('throws an exception when event target\'s "value" property is not a date', function () {
                mockEvent.target = { value: new Date('blah') };
                expect(function () { return componentUnderTest.applyDateRange(mockEvent, mockFilter); }).toThrowError(TypeError);
            });
            it('throws an exception when event target\'s "value" property is not present', function () {
                expect(function () { return componentUnderTest.applyDateRange(mockEvent, mockFilter); }).toThrowError(TypeError);
            });
            it('applies the search filter with the end of time when only the start date is present', function () {
                mockEvent.target = { value: new Date('Sat Dec 3 2016') };
                mockEvent.targetElement = { name: 'start' };
                componentUnderTest.applyDateRange(mockEvent, mockFilter);
                expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({
                    event: 'applyCustomValue',
                    filter: mockFilter,
                    customValue: '2016-12-03 - 3000-01-01'
                });
            });
            it('applies the search filter with the beginning of time when only the end date is present', function () {
                mockEvent.target = { value: new Date('Sun Dec 4 2016') };
                mockEvent.targetElement = { name: 'end' };
                componentUnderTest.applyDateRange(mockEvent, mockFilter);
                expect(componentUnderTest.onFilterEvent.emit).toHaveBeenCalledWith({
                    event: 'applyCustomValue',
                    filter: mockFilter,
                    customValue: '1000-01-01 - 2016-12-04'
                });
            });
            it('applies proper search filters twice as both dates are selected', function () {
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
        describe('preselectDate()', function () {
            describe('with a filter value', function () {
                var mockFilter = {
                    name: 'Date and Duration',
                    subFilters: [{
                            type: 'DateRange',
                            filterValue: '2016-01-01 - 2016-12-31'
                        }]
                };
                it('Sets the start date instance variables with the correct date for the date picker', function () {
                    mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
                    componentUnderTest.newFilters = mockFilter;
                    expect(componentUnderTest.startDate.value.toString()).toEqual(common_functions_1.Common.convertToDateInstance('2016-01-01').toString());
                });
                it('returns null if the start value from the filter is the beginning of time', function () {
                    mockFilter.subFilters[0].filterValue = '1000-01-01 - 2016-12-31';
                    componentUnderTest.newFilters = mockFilter;
                    expect(componentUnderTest.startDate.value).toBeNull();
                });
                it('sets the dateRange start value from the filter (SIDE EFFECT!)', function () {
                    mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
                    componentUnderTest.newFilters = mockFilter;
                    expect(componentUnderTest.dateRange.start).toEqual('2016-01-01');
                });
                it('Sets the end date instance variables with the correct date for the date picker', function () {
                    mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
                    componentUnderTest.newFilters = mockFilter;
                    expect(componentUnderTest.endDate.value.toString()).toEqual(common_functions_1.Common.convertToDateInstance('2016-12-31').toString());
                });
                it('returns null if the end value from the filter is the beginning of time', function () {
                    mockFilter.subFilters[0].filterValue = '2016-01-01 - 3000-01-01';
                    componentUnderTest.newFilters = mockFilter;
                    expect(componentUnderTest.endDate.value).toBeNull();
                });
                it('sets the dateRange end value from the filter (SIDE EFFECT!)', function () {
                    mockFilter.subFilters[0].filterValue = '2016-01-01 - 2016-12-31';
                    componentUnderTest.newFilters = mockFilter;
                    expect(componentUnderTest.dateRange.end).toEqual('2016-12-31');
                });
            });
            var _loop_1 = function (badFilter) {
                describe("without a filter value (filter argument = " + JSON.stringify(badFilter) + ")", function () {
                    describe('with an existing dateRange value', function () {
                        beforeEach(function () {
                            componentUnderTest.dateRange.start = '2017-06-01';
                            componentUnderTest.dateRange.end = '2017-06-30';
                        });
                        it('Produces no error if the date filter is bad and preserves the existing dateRange start value', function () {
                            componentUnderTest.newFilters = badFilter;
                            expect(componentUnderTest.dateRange.start).toEqual('2017-06-01');
                        });
                        it('Produces no error if the date filter is bad and preserves the existing dateRange end value', function () {
                            componentUnderTest.newFilters = badFilter;
                            expect(componentUnderTest.dateRange.end).toEqual('2017-06-30');
                        });
                    });
                });
            };
            for (var _i = 0, _a = [
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
                }
            ]; _i < _a.length; _i++) {
                var badFilter = _a[_i];
                _loop_1(badFilter);
            }
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL2ZpbHRlci5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUE4RDtBQUM5RCx1REFBcUQ7QUFDckQ7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsSUFBSSxtQkFBd0IsQ0FBQztRQUM3QixJQUFJLGtCQUFtQyxDQUFDO1FBRXhDLFVBQVUsQ0FBQztZQUNULGtCQUFrQixHQUFHLElBQUksa0NBQWUsRUFBRSxDQUFDO1lBQzNDLGtCQUFrQixDQUFDLGFBQWEsR0FBRztnQkFDakMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2hDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixFQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUU5RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUNoRSxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQzNCLElBQUksU0FBYyxDQUFDO1lBQ25CLElBQUksVUFBZSxDQUFDO1lBRXBCLFVBQVUsQ0FBQztnQkFDVCxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDOUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFF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QUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRNRCxvQkFzTUMiLCJmaWxlIjoiYXBwLytzZWFyY2gvZmlsdGVyLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vZmlsdGVyLmNvbXBvbmVudCc7XG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0ZpbHRlciBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tTZWFyY2hDb21wb25lbnQ6IGFueTtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBGaWx0ZXJDb21wb25lbnQ7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBGaWx0ZXJDb21wb25lbnQoKTtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkZpbHRlckV2ZW50ID0ge1xuICAgICAgICBlbWl0OiBqYXNtaW5lLmNyZWF0ZVNweSgnZW1pdCcpXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZUZpbHRlcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2RlbGVnYXRlcyB0byBTZWFyY2hDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC50b2dnbGVGaWx0ZXIoeyBtb2NrRmlsdGVyOiAnbW9ja0ZpbHRlcicgfSk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vbkZpbHRlckV2ZW50LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgIHsgZXZlbnQ6ICd0b2dnbGVGaWx0ZXInLCBmaWx0ZXI6IHsgbW9ja0ZpbHRlcjogJ21vY2tGaWx0ZXInIH0gfSk7XG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2FwcGx5RGF0ZVJhbmdlKCknLCAoKSA9PiB7XG4gICAgICBsZXQgbW9ja0V2ZW50OiBhbnk7XG4gICAgICBsZXQgbW9ja0ZpbHRlcjogYW55O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0V2ZW50ID0geyB0YXJnZXQ6IHt9LCB0YXJnZXRFbGVtZW50OiB7fSB9O1xuICAgICAgICBtb2NrRmlsdGVyID0geyBzb21lOiAnZmlsdGVyJyB9O1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZXRzIGRhdGVSYW5nZSBzdGFydCB2YWx1ZSB0byBhIGZvcm1hdHRlZCB2ZXJzaW9uIG9mIFwidmFsdWVcIiBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgbW9ja0V2ZW50LnRhcmdldCA9IHsgdmFsdWU6IG5ldyBEYXRlKCdUaHUgRGVjIDEgMjAxNicpIH07XG4gICAgICAgIG1vY2tFdmVudC50YXJnZXRFbGVtZW50ID0geyBuYW1lOiAnc3RhcnQnIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hcHBseURhdGVSYW5nZShtb2NrRXZlbnQsIG1vY2tGaWx0ZXIpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZGF0ZVJhbmdlLnN0YXJ0KS50b0VxdWFsKCcyMDE2LTEyLTAxJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgZGF0ZVJhbmdlIGVuZCB2YWx1ZSB0byBhIGZvcm1hdHRlZCB2ZXJzaW9uIG9mIFwidmFsdWVcIiBwcm9wZXJ0eScsICgpID0+IHtcbiAgICAgICAgbW9ja0V2ZW50LnRhcmdldCA9IHsgdmFsdWU6IG5ldyBEYXRlKCdUaHUgRGVjIDE1IDIwMTYnKSB9O1xuICAgICAgICBtb2NrRXZlbnQudGFyZ2V0RWxlbWVudCA9IHsgbmFtZTogJ2VuZCcgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFwcGx5RGF0ZVJhbmdlKG1vY2tFdmVudCwgbW9ja0ZpbHRlcik7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kYXRlUmFuZ2UuZW5kKS50b0VxdWFsKCcyMDE2LTEyLTE1Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Rocm93cyBhbiBleGNlcHRpb24gZm9yIGFuIHVua25vd24gXCJuYW1lXCIgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgIG1vY2tFdmVudC50YXJnZXRFbGVtZW50ID0geyBuYW1lOiAnd2hhdGV2ZXInIH07XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IGNvbXBvbmVudFVuZGVyVGVzdC5hcHBseURhdGVSYW5nZShtb2NrRXZlbnQsIG1vY2tGaWx0ZXIpKS50b1Rocm93RXJyb3IoVHlwZUVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGV2ZW50IHRhcmdldFxcJ3MgXCJ2YWx1ZVwiIHByb3BlcnR5IGlzIG5vdCBhIGRhdGUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tFdmVudC50YXJnZXQgPSB7IHZhbHVlOiBuZXcgRGF0ZSgnYmxhaCcpIH07XG5cbiAgICAgICAgZXhwZWN0KCgpID0+IGNvbXBvbmVudFVuZGVyVGVzdC5hcHBseURhdGVSYW5nZShtb2NrRXZlbnQsIG1vY2tGaWx0ZXIpKS50b1Rocm93RXJyb3IoVHlwZUVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndGhyb3dzIGFuIGV4Y2VwdGlvbiB3aGVuIGV2ZW50IHRhcmdldFxcJ3MgXCJ2YWx1ZVwiIHByb3BlcnR5IGlzIG5vdCBwcmVzZW50JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoKCkgPT4gY29tcG9uZW50VW5kZXJUZXN0LmFwcGx5RGF0ZVJhbmdlKG1vY2tFdmVudCwgbW9ja0ZpbHRlcikpLnRvVGhyb3dFcnJvcihUeXBlRXJyb3IpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhcHBsaWVzIHRoZSBzZWFyY2ggZmlsdGVyIHdpdGggdGhlIGVuZCBvZiB0aW1lIHdoZW4gb25seSB0aGUgc3RhcnQgZGF0ZSBpcyBwcmVzZW50JywgKCkgPT4ge1xuICAgICAgICBtb2NrRXZlbnQudGFyZ2V0ID0geyB2YWx1ZTogbmV3IERhdGUoJ1NhdCBEZWMgMyAyMDE2JykgfTtcbiAgICAgICAgbW9ja0V2ZW50LnRhcmdldEVsZW1lbnQgPSB7IG5hbWU6ICdzdGFydCcgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFwcGx5RGF0ZVJhbmdlKG1vY2tFdmVudCwgbW9ja0ZpbHRlcik7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vbkZpbHRlckV2ZW50LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICBldmVudDogJ2FwcGx5Q3VzdG9tVmFsdWUnLFxuICAgICAgICAgIGZpbHRlcjogbW9ja0ZpbHRlcixcbiAgICAgICAgICBjdXN0b21WYWx1ZTogJzIwMTYtMTItMDMgLSAzMDAwLTAxLTAxJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYXBwbGllcyB0aGUgc2VhcmNoIGZpbHRlciB3aXRoIHRoZSBiZWdpbm5pbmcgb2YgdGltZSB3aGVuIG9ubHkgdGhlIGVuZCBkYXRlIGlzIHByZXNlbnQnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tFdmVudC50YXJnZXQgPSB7IHZhbHVlOiBuZXcgRGF0ZSgnU3VuIERlYyA0IDIwMTYnKSB9O1xuICAgICAgICBtb2NrRXZlbnQudGFyZ2V0RWxlbWVudCA9IHsgbmFtZTogJ2VuZCcgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFwcGx5RGF0ZVJhbmdlKG1vY2tFdmVudCwgbW9ja0ZpbHRlcik7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5vbkZpbHRlckV2ZW50LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICBldmVudDogJ2FwcGx5Q3VzdG9tVmFsdWUnLFxuICAgICAgICAgIGZpbHRlcjogbW9ja0ZpbHRlcixcbiAgICAgICAgICBjdXN0b21WYWx1ZTogJzEwMDAtMDEtMDEgLSAyMDE2LTEyLTA0J1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYXBwbGllcyBwcm9wZXIgc2VhcmNoIGZpbHRlcnMgdHdpY2UgYXMgYm90aCBkYXRlcyBhcmUgc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tFdmVudC50YXJnZXQgPSB7IHZhbHVlOiBuZXcgRGF0ZSgnTW9uIERlYyA1IDIwMTYnKSB9O1xuICAgICAgICBtb2NrRXZlbnQudGFyZ2V0RWxlbWVudCA9IHsgbmFtZTogJ3N0YXJ0JyB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXBwbHlEYXRlUmFuZ2UobW9ja0V2ZW50LCBtb2NrRmlsdGVyKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm9uRmlsdGVyRXZlbnQuZW1pdCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIGV2ZW50OiAnYXBwbHlDdXN0b21WYWx1ZScsXG4gICAgICAgICAgZmlsdGVyOiBtb2NrRmlsdGVyLFxuICAgICAgICAgIGN1c3RvbVZhbHVlOiAnMjAxNi0xMi0wNSAtIDMwMDAtMDEtMDEnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1vY2tFdmVudC50YXJnZXQgPSB7IHZhbHVlOiBuZXcgRGF0ZSgnRnJpIERlYyAyMyAyMDE2JykgfTtcbiAgICAgICAgbW9ja0V2ZW50LnRhcmdldEVsZW1lbnQgPSB7IG5hbWU6ICdlbmQnIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hcHBseURhdGVSYW5nZShtb2NrRXZlbnQsIG1vY2tGaWx0ZXIpO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qub25GaWx0ZXJFdmVudC5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgZXZlbnQ6ICdhcHBseUN1c3RvbVZhbHVlJyxcbiAgICAgICAgICBmaWx0ZXI6IG1vY2tGaWx0ZXIsXG4gICAgICAgICAgY3VzdG9tVmFsdWU6ICcyMDE2LTEyLTA1IC0gMjAxNi0xMi0yMydcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdwcmVzZWxlY3REYXRlKCknLCAoKSA9PiB7XG4gICAgICBkZXNjcmliZSgnd2l0aCBhIGZpbHRlciB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1vY2tGaWx0ZXI6IGFueSA9IHtcbiAgICAgICAgICBuYW1lOiAnRGF0ZSBhbmQgRHVyYXRpb24nLFxuICAgICAgICAgIHN1YkZpbHRlcnM6IFt7XG4gICAgICAgICAgICB0eXBlOiAnRGF0ZVJhbmdlJyxcbiAgICAgICAgICAgIGZpbHRlclZhbHVlOiAnMjAxNi0wMS0wMSAtIDIwMTYtMTItMzEnXG4gICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgICAgaXQoJ1NldHMgdGhlIHN0YXJ0IGRhdGUgaW5zdGFuY2UgdmFyaWFibGVzIHdpdGggdGhlIGNvcnJlY3QgZGF0ZSBmb3IgdGhlIGRhdGUgcGlja2VyJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tGaWx0ZXIuc3ViRmlsdGVyc1swXS5maWx0ZXJWYWx1ZSA9ICcyMDE2LTAxLTAxIC0gMjAxNi0xMi0zMSc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5ld0ZpbHRlcnMgPSBtb2NrRmlsdGVyO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zdGFydERhdGUudmFsdWUudG9TdHJpbmcoKSkudG9FcXVhbChDb21tb24uY29udmVydFRvRGF0ZUluc3RhbmNlKCcyMDE2LTAxLTAxJykudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXR1cm5zIG51bGwgaWYgdGhlIHN0YXJ0IHZhbHVlIGZyb20gdGhlIGZpbHRlciBpcyB0aGUgYmVnaW5uaW5nIG9mIHRpbWUnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0ZpbHRlci5zdWJGaWx0ZXJzWzBdLmZpbHRlclZhbHVlID0gJzEwMDAtMDEtMDEgLSAyMDE2LTEyLTMxJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmV3RmlsdGVycyA9IG1vY2tGaWx0ZXI7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnN0YXJ0RGF0ZS52YWx1ZSkudG9CZU51bGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGRhdGVSYW5nZSBzdGFydCB2YWx1ZSBmcm9tIHRoZSBmaWx0ZXIgKFNJREUgRUZGRUNUISknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0ZpbHRlci5zdWJGaWx0ZXJzWzBdLmZpbHRlclZhbHVlID0gJzIwMTYtMDEtMDEgLSAyMDE2LTEyLTMxJztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmV3RmlsdGVycyA9IG1vY2tGaWx0ZXI7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmRhdGVSYW5nZS5zdGFydCkudG9FcXVhbCgnMjAxNi0wMS0wMScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2V0cyB0aGUgZW5kIGRhdGUgaW5zdGFuY2UgdmFyaWFibGVzIHdpdGggdGhlIGNvcnJlY3QgZGF0ZSBmb3IgdGhlIGRhdGUgcGlja2VyJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tGaWx0ZXIuc3ViRmlsdGVyc1swXS5maWx0ZXJWYWx1ZSA9ICcyMDE2LTAxLTAxIC0gMjAxNi0xMi0zMSc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5ld0ZpbHRlcnMgPSBtb2NrRmlsdGVyO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5lbmREYXRlLnZhbHVlLnRvU3RyaW5nKCkpLnRvRXF1YWwoQ29tbW9uLmNvbnZlcnRUb0RhdGVJbnN0YW5jZSgnMjAxNi0xMi0zMScpLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSBlbmQgdmFsdWUgZnJvbSB0aGUgZmlsdGVyIGlzIHRoZSBiZWdpbm5pbmcgb2YgdGltZScsICgpID0+IHtcbiAgICAgICAgICBtb2NrRmlsdGVyLnN1YkZpbHRlcnNbMF0uZmlsdGVyVmFsdWUgPSAnMjAxNi0wMS0wMSAtIDMwMDAtMDEtMDEnO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZXdGaWx0ZXJzID0gbW9ja0ZpbHRlcjtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuZW5kRGF0ZS52YWx1ZSkudG9CZU51bGwoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdGhlIGRhdGVSYW5nZSBlbmQgdmFsdWUgZnJvbSB0aGUgZmlsdGVyIChTSURFIEVGRkVDVCEpJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tGaWx0ZXIuc3ViRmlsdGVyc1swXS5maWx0ZXJWYWx1ZSA9ICcyMDE2LTAxLTAxIC0gMjAxNi0xMi0zMSc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5ld0ZpbHRlcnMgPSBtb2NrRmlsdGVyO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kYXRlUmFuZ2UuZW5kKS50b0VxdWFsKCcyMDE2LTEyLTMxJyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAoY29uc3QgYmFkRmlsdGVyIG9mIFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdEYXRlIGFuZCBEdXJhdGlvbidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdEYXRlIGFuZCBEdXJhdGlvbicsXG4gICAgICAgICAgc3ViRmlsdGVyczogW11cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdEYXRlIGFuZCBEdXJhdGlvbicsXG4gICAgICAgICAgc3ViRmlsdGVyczogW3tcbiAgICAgICAgICAgIHR5cGU6ICdEYXRlUmFuZ2UnLFxuICAgICAgICAgIH1dXG4gICAgICAgIH1dKSB7XG4gICAgICAgIGRlc2NyaWJlKGB3aXRob3V0IGEgZmlsdGVyIHZhbHVlIChmaWx0ZXIgYXJndW1lbnQgPSAke0pTT04uc3RyaW5naWZ5KGJhZEZpbHRlcil9KWAsICgpID0+IHtcbiAgICAgICAgICBkZXNjcmliZSgnd2l0aCBhbiBleGlzdGluZyBkYXRlUmFuZ2UgdmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRhdGVSYW5nZS5zdGFydCA9ICcyMDE3LTA2LTAxJztcbiAgICAgICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRhdGVSYW5nZS5lbmQgPSAnMjAxNy0wNi0zMCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXQoJ1Byb2R1Y2VzIG5vIGVycm9yIGlmIHRoZSBkYXRlIGZpbHRlciBpcyBiYWQgYW5kIHByZXNlcnZlcyB0aGUgZXhpc3RpbmcgZGF0ZVJhbmdlIHN0YXJ0IHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmV3RmlsdGVycyA9IGJhZEZpbHRlcjtcbiAgICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kYXRlUmFuZ2Uuc3RhcnQpLnRvRXF1YWwoJzIwMTctMDYtMDEnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdCgnUHJvZHVjZXMgbm8gZXJyb3IgaWYgdGhlIGRhdGUgZmlsdGVyIGlzIGJhZCBhbmQgcHJlc2VydmVzIHRoZSBleGlzdGluZyBkYXRlUmFuZ2UgZW5kIHZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmV3RmlsdGVycyA9IGJhZEZpbHRlcjtcbiAgICAgICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kYXRlUmFuZ2UuZW5kKS50b0VxdWFsKCcyMDE3LTA2LTMwJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=

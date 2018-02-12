"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var commerce_confirm_tab_1 = require("./commerce-confirm-tab");
function main() {
    describe('Confirm Tab Component', function () {
        var componentUnderTest;
        var mockCommerceService;
        var mockStore;
        var mockEmptyAddress = {
            type: null,
            name: null,
            addressEntityId: NaN,
            defaultAddress: false
        };
        var mockAddressA = {
            type: 'User',
            name: 'Ross Edfort',
            addressEntityId: 10,
            defaultAddress: false,
            address: {
                address: '123 Main Street',
                state: 'CO',
                city: 'Denver',
                country: 'USA',
                zipcode: '80202',
                phone: '5555555555'
            }
        };
        var mockAddressB = {
            type: 'Account',
            name: 'Wazee Digital',
            addressEntityId: 1,
            defaultAddress: false,
            address: {
                address: '1515 Arapahoe Street',
                address2: 'Tower 3, Suite 400',
                state: 'CO',
                city: 'Denver',
                country: 'USA',
                zipcode: '80202',
                phone: '5555555555'
            }
        };
        beforeEach(function () {
            mockCommerceService = { state: { data: { itemCount: 1, projects: [], quoteStauts: 'blah' } } };
            mockStore = new mock_app_store_1.MockAppStore();
            componentUnderTest = new commerce_confirm_tab_1.CommerceConfirmTab(null, mockCommerceService, null, null, mockStore);
        });
        describe('hasDiscount()', function () {
            it('should return false when discount does NOT exists', function () {
                expect(componentUnderTest.hasDiscount).toBe(false);
            });
            it('should return true if discount has a value', function () {
                var mockState = { data: { discount: 12.0 } };
                mockCommerceService = {
                    state: mockState,
                };
                componentUnderTest = new commerce_confirm_tab_1.CommerceConfirmTab(null, mockCommerceService, null, null, mockStore);
                expect(componentUnderTest.hasDiscount).toBe(true);
            });
        });
        describe('lineOneFor()', function () {
            it('returns the address\'s first line', function () {
                expect(componentUnderTest.lineOneFor(mockAddressA)).toBe('123 Main Street');
                expect(componentUnderTest.lineOneFor(mockAddressB)).toBe('1515 Arapahoe Street, Tower 3, Suite 400');
            });
        });
        describe('cityFor()', function () {
            it('returns the address\'s city', function () {
                expect(componentUnderTest.cityFor(mockAddressA)).toBe('Denver,');
            });
            it('returns an empty string if the address doesn\'t have a city', function () {
                expect(componentUnderTest.cityFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('stateFor()', function () {
            it('returns the address\'s state', function () {
                expect(componentUnderTest.stateFor(mockAddressA)).toBe('CO');
            });
            it('returns null if the address doesn\'t have a state', function () {
                expect(componentUnderTest.stateFor(mockEmptyAddress)).toBeNull();
            });
        });
        describe('zipcodeFor()', function () {
            it('returns the address\'s zip', function () {
                expect(componentUnderTest.zipcodeFor(mockAddressA)).toBe('80202,');
            });
            it('returns an empty string if the address doesn\'t have a zip', function () {
                expect(componentUnderTest.zipcodeFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('zipcodeFor()', function () {
            it('returns the address\'s zipcode', function () {
                expect(componentUnderTest.zipcodeFor(mockAddressA)).toBe('80202,');
            });
            it('returns an empty string if the address doesn\'t have a zipcode', function () {
                expect(componentUnderTest.zipcodeFor(mockEmptyAddress)).toBe('');
            });
        });
        describe('countryFor()', function () {
            it('returns the address\'s country', function () {
                expect(componentUnderTest.countryFor(mockAddressA)).toBe('USA');
            });
            it('returns null if the address doesn\'t have a country', function () {
                expect(componentUnderTest.countryFor(mockEmptyAddress)).toBeNull();
            });
        });
        describe('phoneFor()', function () {
            it('returns the address\'s phone number', function () {
                expect(componentUnderTest.phoneFor(mockAddressA)).toBe('5555555555');
            });
            it('returns null if the address doesn\'t have a phone number', function () {
                expect(componentUnderTest.phoneFor(mockEmptyAddress)).toBeNull();
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWNvbmZpcm0tdGFiLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBMEU7QUFDMUUsK0RBQTREO0FBRzVEO0lBQ0UsUUFBUSxDQUFDLHVCQUF1QixFQUFFO1FBQ2hDLElBQUksa0JBQXNDLENBQUM7UUFDM0MsSUFBSSxtQkFBd0IsQ0FBQztRQUM3QixJQUFJLFNBQXVCLENBQUM7UUFDNUIsSUFBSSxnQkFBZ0IsR0FBZ0I7WUFDbEMsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUsSUFBSTtZQUNWLGVBQWUsRUFBRSxHQUFHO1lBQ3BCLGNBQWMsRUFBRSxLQUFLO1NBQ3RCLENBQUM7UUFFRixJQUFJLFlBQVksR0FBZ0I7WUFDOUIsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsYUFBYTtZQUNuQixlQUFlLEVBQUUsRUFBRTtZQUNuQixjQUFjLEVBQUUsS0FBSztZQUNyQixPQUFPLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLEtBQUssRUFBRSxZQUFZO2FBQ3BCO1NBQ0YsQ0FBQztRQUVGLElBQUksWUFBWSxHQUFnQjtZQUM5QixJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxlQUFlO1lBQ3JCLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLE9BQU8sRUFBRTtnQkFDUCxPQUFPLEVBQUUsc0JBQXNCO2dCQUMvQixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsS0FBSyxFQUFFLFlBQVk7YUFDcEI7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WSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkUsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUU7Z0JBQzdELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwSUQsb0JBb0lDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvdGFicy9jb21tZXJjZS1jb25maXJtLXRhYi5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcbmltcG9ydCB7IENvbW1lcmNlQ29uZmlybVRhYiB9IGZyb20gJy4vY29tbWVyY2UtY29uZmlybS10YWInO1xuaW1wb3J0IHsgVmlld0FkZHJlc3MgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy91c2VyLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29uZmlybSBUYWIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IENvbW1lcmNlQ29uZmlybVRhYjtcbiAgICBsZXQgbW9ja0NvbW1lcmNlU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja0VtcHR5QWRkcmVzczogVmlld0FkZHJlc3MgPSB7XG4gICAgICB0eXBlOiBudWxsLFxuICAgICAgbmFtZTogbnVsbCxcbiAgICAgIGFkZHJlc3NFbnRpdHlJZDogTmFOLFxuICAgICAgZGVmYXVsdEFkZHJlc3M6IGZhbHNlXG4gICAgfTtcblxuICAgIGxldCBtb2NrQWRkcmVzc0E6IFZpZXdBZGRyZXNzID0ge1xuICAgICAgdHlwZTogJ1VzZXInLFxuICAgICAgbmFtZTogJ1Jvc3MgRWRmb3J0JyxcbiAgICAgIGFkZHJlc3NFbnRpdHlJZDogMTAsXG4gICAgICBkZWZhdWx0QWRkcmVzczogZmFsc2UsXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIGFkZHJlc3M6ICcxMjMgTWFpbiBTdHJlZXQnLFxuICAgICAgICBzdGF0ZTogJ0NPJyxcbiAgICAgICAgY2l0eTogJ0RlbnZlcicsXG4gICAgICAgIGNvdW50cnk6ICdVU0EnLFxuICAgICAgICB6aXBjb2RlOiAnODAyMDInLFxuICAgICAgICBwaG9uZTogJzU1NTU1NTU1NTUnXG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBtb2NrQWRkcmVzc0I6IFZpZXdBZGRyZXNzID0ge1xuICAgICAgdHlwZTogJ0FjY291bnQnLFxuICAgICAgbmFtZTogJ1dhemVlIERpZ2l0YWwnLFxuICAgICAgYWRkcmVzc0VudGl0eUlkOiAxLFxuICAgICAgZGVmYXVsdEFkZHJlc3M6IGZhbHNlLFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICBhZGRyZXNzOiAnMTUxNSBBcmFwYWhvZSBTdHJlZXQnLFxuICAgICAgICBhZGRyZXNzMjogJ1Rvd2VyIDMsIFN1aXRlIDQwMCcsXG4gICAgICAgIHN0YXRlOiAnQ08nLFxuICAgICAgICBjaXR5OiAnRGVudmVyJyxcbiAgICAgICAgY291bnRyeTogJ1VTQScsXG4gICAgICAgIHppcGNvZGU6ICc4MDIwMicsXG4gICAgICAgIHBob25lOiAnNTU1NTU1NTU1NSdcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQ29tbWVyY2VTZXJ2aWNlID0geyBzdGF0ZTogeyBkYXRhOiB7IGl0ZW1Db3VudDogMSwgcHJvamVjdHM6IFtdLCBxdW90ZVN0YXV0czogJ2JsYWgnIH0gfSB9O1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENvbW1lcmNlQ29uZmlybVRhYihudWxsLCBtb2NrQ29tbWVyY2VTZXJ2aWNlLCBudWxsLCBudWxsLCBtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2hhc0Rpc2NvdW50KCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSB3aGVuIGRpc2NvdW50IGRvZXMgTk9UIGV4aXN0cycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5oYXNEaXNjb3VudCkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBkaXNjb3VudCBoYXMgYSB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgbGV0IG1vY2tTdGF0ZSA9IHsgZGF0YTogeyBkaXNjb3VudDogMTIuMCB9IH07XG5cbiAgICAgICAgbW9ja0NvbW1lcmNlU2VydmljZSA9IHtcbiAgICAgICAgICBzdGF0ZTogbW9ja1N0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQ29tbWVyY2VDb25maXJtVGFiKG51bGwsIG1vY2tDb21tZXJjZVNlcnZpY2UsIG51bGwsIG51bGwsIG1vY2tTdG9yZSk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuaGFzRGlzY291bnQpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnbGluZU9uZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIGZpcnN0IGxpbmUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubGluZU9uZUZvcihtb2NrQWRkcmVzc0EpKS50b0JlKCcxMjMgTWFpbiBTdHJlZXQnKTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5saW5lT25lRm9yKG1vY2tBZGRyZXNzQikpLnRvQmUoJzE1MTUgQXJhcGFob2UgU3RyZWV0LCBUb3dlciAzLCBTdWl0ZSA0MDAnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NpdHlGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBhZGRyZXNzXFwncyBjaXR5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNpdHlGb3IobW9ja0FkZHJlc3NBKSkudG9CZSgnRGVudmVyLCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgYWRkcmVzcyBkb2VzblxcJ3QgaGF2ZSBhIGNpdHknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2l0eUZvcihtb2NrRW1wdHlBZGRyZXNzKSkudG9CZSgnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzdGF0ZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnN0YXRlRm9yKG1vY2tBZGRyZXNzQSkpLnRvQmUoJ0NPJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiB0aGUgYWRkcmVzcyBkb2VzblxcJ3QgaGF2ZSBhIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnN0YXRlRm9yKG1vY2tFbXB0eUFkZHJlc3MpKS50b0JlTnVsbCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnemlwY29kZUZvcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdGhlIGFkZHJlc3NcXCdzIHppcCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC56aXBjb2RlRm9yKG1vY2tBZGRyZXNzQSkpLnRvQmUoJzgwMjAyLCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBpZiB0aGUgYWRkcmVzcyBkb2VzblxcJ3QgaGF2ZSBhIHppcCcsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC56aXBjb2RlRm9yKG1vY2tFbXB0eUFkZHJlc3MpKS50b0JlKCcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ppcGNvZGVGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBhZGRyZXNzXFwncyB6aXBjb2RlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnppcGNvZGVGb3IobW9ja0FkZHJlc3NBKSkudG9CZSgnODAyMDIsJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYW4gZW1wdHkgc3RyaW5nIGlmIHRoZSBhZGRyZXNzIGRvZXNuXFwndCBoYXZlIGEgemlwY29kZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC56aXBjb2RlRm9yKG1vY2tFbXB0eUFkZHJlc3MpKS50b0JlKCcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvdW50cnlGb3IoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBhZGRyZXNzXFwncyBjb3VudHJ5JywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvdW50cnlGb3IobW9ja0FkZHJlc3NBKSkudG9CZSgnVVNBJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgbnVsbCBpZiB0aGUgYWRkcmVzcyBkb2VzblxcJ3QgaGF2ZSBhIGNvdW50cnknLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY291bnRyeUZvcihtb2NrRW1wdHlBZGRyZXNzKSkudG9CZU51bGwoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Bob25lRm9yKCknLCAoKSA9PiB7XG4gICAgICBpdCgncmV0dXJucyB0aGUgYWRkcmVzc1xcJ3MgcGhvbmUgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBob25lRm9yKG1vY2tBZGRyZXNzQSkpLnRvQmUoJzU1NTU1NTU1NTUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBudWxsIGlmIHRoZSBhZGRyZXNzIGRvZXNuXFwndCBoYXZlIGEgcGhvbmUgbnVtYmVyJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnBob25lRm9yKG1vY2tFbXB0eUFkZHJlc3MpKS50b0JlTnVsbCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgfSk7XG59O1xuIl19

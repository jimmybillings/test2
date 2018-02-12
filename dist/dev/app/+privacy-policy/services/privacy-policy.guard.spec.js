"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
var privacy_policy_guard_1 = require("./privacy-policy.guard");
function main() {
    describe('Privacy Policy Guard', function () {
        var guardUnderTest;
        var mockStore;
        var goToPageNotFoundSpy;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            goToPageNotFoundSpy = mockStore.createActionFactoryMethod('router', 'goToPageNotFound');
            guardUnderTest = new privacy_policy_guard_1.PrivacyPolicyGuard(mockStore);
        });
        describe('canActviate', function () {
            it('returns true if the uiConfig has a privacyPolicyId', function () {
                mockStore.createStateSection('uiConfig', { components: { footer: { config: { privacyPolicyId: '1' } } } });
                expect(guardUnderTest.canActivate()).toBe(true);
            });
            describe('when the uiConfig does not have a privacyPolicyId', function () {
                beforeEach(function () {
                    mockStore.createStateSection('uiConfig', { components: { footer: { config: {} } } });
                });
                it('returns false', function () {
                    expect(guardUnderTest.canActivate()).toBe(false);
                });
                it('dispatches the correct action', function () {
                    guardUnderTest.canActivate();
                    mockStore.expectDispatchFor(goToPageNotFoundSpy);
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvc2VydmljZXMvcHJpdmFjeS1wb2xpY3kuZ3VhcmQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBFQUF1RTtBQUN2RSwrREFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDL0IsSUFBSSxjQUFrQyxDQUFDO1FBQ3ZDLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLG1CQUFnQyxDQUFDO1FBRXJDLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixtQkFBbUIsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDeEYsY0FBYyxHQUFHLElBQUkseUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsYUFBYSxFQUFFO1lBQ3RCLEVBQUUsQ0FBQyxvREFBb0QsRUFBRTtnQkFDdkQsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUUzRyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLG1EQUFtRCxFQUFFO2dCQUM1RCxVQUFVLENBQUM7b0JBQ1QsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGVBQWUsRUFBRTtvQkFDbEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFO29CQUNsQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQzdCLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuQ0Qsb0JBbUNDIiwiZmlsZSI6ImFwcC8rcHJpdmFjeS1wb2xpY3kvc2VydmljZXMvcHJpdmFjeS1wb2xpY3kuZ3VhcmQuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5pbXBvcnQgeyBQcml2YWN5UG9saWN5R3VhcmQgfSBmcm9tICcuL3ByaXZhY3ktcG9saWN5Lmd1YXJkJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdQcml2YWN5IFBvbGljeSBHdWFyZCcsICgpID0+IHtcbiAgICBsZXQgZ3VhcmRVbmRlclRlc3Q6IFByaXZhY3lQb2xpY3lHdWFyZDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IGdvVG9QYWdlTm90Rm91bmRTcHk6IGphc21pbmUuU3B5O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBnb1RvUGFnZU5vdEZvdW5kU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3JvdXRlcicsICdnb1RvUGFnZU5vdEZvdW5kJyk7XG4gICAgICBndWFyZFVuZGVyVGVzdCA9IG5ldyBQcml2YWN5UG9saWN5R3VhcmQobW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjYW5BY3R2aWF0ZScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIHVpQ29uZmlnIGhhcyBhIHByaXZhY3lQb2xpY3lJZCcsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7IGNvbXBvbmVudHM6IHsgZm9vdGVyOiB7IGNvbmZpZzogeyBwcml2YWN5UG9saWN5SWQ6ICcxJyB9IH0gfSB9KTtcblxuICAgICAgICBleHBlY3QoZ3VhcmRVbmRlclRlc3QuY2FuQWN0aXZhdGUoKSkudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnd2hlbiB0aGUgdWlDb25maWcgZG9lcyBub3QgaGF2ZSBhIHByaXZhY3lQb2xpY3lJZCcsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7IGNvbXBvbmVudHM6IHsgZm9vdGVyOiB7IGNvbmZpZzoge30gfSB9IH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoZ3VhcmRVbmRlclRlc3QuY2FuQWN0aXZhdGUoKSkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSBjb3JyZWN0IGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgICBndWFyZFVuZGVyVGVzdC5jYW5BY3RpdmF0ZSgpO1xuICAgICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihnb1RvUGFnZU5vdEZvdW5kU3B5KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=

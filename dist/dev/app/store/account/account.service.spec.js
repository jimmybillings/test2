"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_service_1 = require("./account.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Account Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new account_service_1.AccountService(mockApiService.injector);
        });
        describe('getAccount()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.getAccount(1, true);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint("account/1");
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
            it('returns an observable', function () {
                var reponse;
                mockApiService.getResponse = { some: 'account' };
                serviceUnderTest.getAccount(1, true).subscribe(function (q) { return reponse = q; });
                expect(reponse).toEqual({ some: 'account' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBSSxnQkFBZ0MsRUFBRSxjQUE4QixDQUFDO1FBRXJFLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxnQkFBZ0IsR0FBRyxJQUFJLGdDQUFjLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN2QixFQUFFLENBQUMsaUNBQWlDLEVBQUU7Z0JBQ3BDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXJDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDckUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDMUIsSUFBSSxPQUFZLENBQUM7Z0JBQ2pCLGNBQWMsQ0FBQyxXQUFXLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQ2pELGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsT0FBTyxHQUFHLENBQUMsRUFBWCxDQUFXLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzQkQsb0JBMkJDIiwiZmlsZSI6ImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjb3VudFNlcnZpY2UgfSBmcm9tICcuL2FjY291bnQuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQWNjb3VudCBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBBY2NvdW50U2VydmljZSwgbW9ja0FwaVNlcnZpY2U6IE1vY2tBcGlTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpU2VydmljZSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBBY2NvdW50U2VydmljZShtb2NrQXBpU2VydmljZS5pbmplY3Rvcik7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0QWNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBhcGkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QuZ2V0QWNjb3VudCgxLCB0cnVlKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoYGFjY291bnQvMWApO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aExvYWRpbmcodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgYW4gb2JzZXJ2YWJsZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlcG9uc2U6IGFueTtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7IHNvbWU6ICdhY2NvdW50JyB9O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldEFjY291bnQoMSwgdHJ1ZSkuc3Vic2NyaWJlKHEgPT4gcmVwb25zZSA9IHEpO1xuICAgICAgICBleHBlY3QocmVwb25zZSkudG9FcXVhbCh7IHNvbWU6ICdhY2NvdW50JyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

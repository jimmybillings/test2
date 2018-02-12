"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authentication_data_service_1 = require("./authentication.data.service");
var mock_api_service_1 = require("../mocks/mock-api.service");
var api_interface_1 = require("../interfaces/api.interface");
function main() {
    describe('Authentication', function () {
        var serviceUnderTest;
        var mockApi;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApi = new mock_api_service_1.MockApiService();
            serviceUnderTest = new authentication_data_service_1.Authentication(mockApi.injector);
        });
        describe('create()', function () {
            it('Calls the API correctly', function () {
                serviceUnderTest.create({ userId: 'james@gmail.com', password: 'testpassword' });
                expect(mockApi.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApi.post).toHaveBeenCalledWithEndpoint('login');
                expect(mockApi.post).toHaveBeenCalledWithBody({ userId: 'james@gmail.com', password: 'testpassword' });
                expect(mockApi.post).toHaveBeenCalledWithLoading(true);
            });
        });
        describe('destroy()', function () {
            it('Calls the API correctly', function () {
                serviceUnderTest.destroy();
                expect(mockApi.put).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApi.put).toHaveBeenCalledWithEndpoint('session/invalidate');
            });
        });
        describe('validate()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.validate('some-token');
                expect(mockApi.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApi.get).toHaveBeenCalledWithEndpoint('session/validate/some-token');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXV0aGVudGljYXRpb24uZGF0YS5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBK0Q7QUFDL0QsOERBQTRFO0FBQzVFLDZEQUFrRDtBQUVsRDtJQUNFLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixJQUFJLGdCQUFnQyxDQUFDO1FBQ3JDLElBQUksT0FBWSxDQUFDO1FBRWpCLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUMvQixnQkFBZ0IsR0FBRyxJQUFJLDRDQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuQixFQUFFLENBQUMseUJBQXlCLEVBQUU7Z0JBQzVCLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFFakYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLDRCQUE0QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtnQkFDNUIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDcEMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUV4QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNsRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBeENELG9CQXdDQyIsImZpbGUiOiJhcHAvc2hhcmVkL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmRhdGEuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXV0aGVudGljYXRpb24gfSBmcm9tICcuL2F1dGhlbnRpY2F0aW9uLmRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vbW9ja3MvbW9jay1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0F1dGhlbnRpY2F0aW9uJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBBdXRoZW50aWNhdGlvbjtcbiAgICBsZXQgbW9ja0FwaTogYW55O1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpID0gbmV3IE1vY2tBcGlTZXJ2aWNlKCk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEF1dGhlbnRpY2F0aW9uKG1vY2tBcGkuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ0NhbGxzIHRoZSBBUEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmNyZWF0ZSh7IHVzZXJJZDogJ2phbWVzQGdtYWlsLmNvbScsIHBhc3N3b3JkOiAndGVzdHBhc3N3b3JkJyB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wb3N0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2xvZ2luJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpLnBvc3QpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQm9keSh7IHVzZXJJZDogJ2phbWVzQGdtYWlsLmNvbScsIHBhc3N3b3JkOiAndGVzdHBhc3N3b3JkJyB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVzdHJveSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ0NhbGxzIHRoZSBBUEkgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmRlc3Ryb3koKTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaS5wdXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5JZGVudGl0aWVzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGkucHV0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdzZXNzaW9uL2ludmFsaWRhdGUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3ZhbGlkYXRlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC52YWxpZGF0ZSgnc29tZS10b2tlbicpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ3Nlc3Npb24vdmFsaWRhdGUvc29tZS10b2tlbicpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_service_1 = require("./user.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('User Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new user_service_1.FutureUserService(mockApiService.injector);
        });
        describe('getAccount()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.getUsersByAccountId(1, true);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('user/searchFields');
                expect(mockApiService.get).toHaveBeenCalledWithParameters({ 'fields': 'accountId', 'values': "1", 'n': '500' });
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
            it('returns an observable', function () {
                mockApiService.getResponse = { items: [{ item: '1' }, { item: '2' }] };
                serviceUnderTest.getUsersByAccountId(1, true).subscribe(function (q) { return expect(q).toEqual([{ item: '1' }, { item: '2' }]); });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91c2VyL3VzZXIuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQW1EO0FBQ25ELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3ZCLElBQUksZ0JBQW1DLEVBQUUsY0FBOEIsQ0FBQztRQUV4RSxVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUNyQyxjQUFjLEdBQUcsSUFBSSxpQ0FBYyxFQUFFLENBQUM7WUFDdEMsZ0JBQWdCLEdBQUcsSUFBSSxnQ0FBaUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDcEMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUU5QyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDN0UsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDaEgsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDMUIsY0FBYyxDQUFDLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztnQkFDdkUsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztZQUNsSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBMUJELG9CQTBCQyIsImZpbGUiOiJhcHAvc3RvcmUvdXNlci91c2VyLnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZ1dHVyZVVzZXJTZXJ2aWNlIH0gZnJvbSAnLi91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0FwaVNlcnZpY2UsIG1vY2tBcGlNYXRjaGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1VzZXIgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogRnV0dXJlVXNlclNlcnZpY2UsIG1vY2tBcGlTZXJ2aWNlOiBNb2NrQXBpU2VydmljZTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaVNlcnZpY2UgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgRnV0dXJlVXNlclNlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFjY291bnQoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgYXBpIHNlcnZpY2UgY29ycmVjdGx5JywgKCkgPT4ge1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldFVzZXJzQnlBY2NvdW50SWQoMSwgdHJ1ZSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCd1c2VyL3NlYXJjaEZpZWxkcycpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aFBhcmFtZXRlcnMoeyAnZmllbGRzJzogJ2FjY291bnRJZCcsICd2YWx1ZXMnOiBgMWAsICduJzogJzUwMCcgfSk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZyh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBhbiBvYnNlcnZhYmxlJywgKCkgPT4ge1xuICAgICAgICBtb2NrQXBpU2VydmljZS5nZXRSZXNwb25zZSA9IHsgaXRlbXM6IFt7IGl0ZW06ICcxJyB9LCB7IGl0ZW06ICcyJyB9XSB9O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmdldFVzZXJzQnlBY2NvdW50SWQoMSwgdHJ1ZSkuc3Vic2NyaWJlKHEgPT4gZXhwZWN0KHEpLnRvRXF1YWwoW3sgaXRlbTogJzEnIH0sIHsgaXRlbTogJzInIH1dKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=

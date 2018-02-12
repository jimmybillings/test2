"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui_config_service_1 = require("./ui-config.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Ui Config Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new ui_config_service_1.UiConfigService(mockApiService.injector);
        });
        describe('load', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.load();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('configuration/site');
            });
            it('returns the property "loaded: true" in the response', function () {
                mockApiService.getResponse = { some: 'data' };
                var result;
                serviceUnderTest.load().subscribe(function (res) { return result = res; });
                expect(result).toEqual({ some: 'data', loaded: true });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91aS1jb25maWcvdWktY29uZmlnLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUFzRDtBQUN0RCxxRUFBbUY7QUFDbkYsdUVBQTREO0FBRTVEO0lBQ0UsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksZ0JBQWlDLEVBQUUsY0FBOEIsQ0FBQztRQUV0RSxVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUNyQyxjQUFjLEdBQUcsSUFBSSxpQ0FBYyxFQUFFLENBQUM7WUFDdEMsZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDZixFQUFFLENBQUMsaUNBQWlDLEVBQUU7Z0JBQ3BDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO2dCQUV4QixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNoRixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtnQkFDeEQsY0FBYyxDQUFDLFdBQVcsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztnQkFDN0MsSUFBSSxNQUFNLENBQUM7Z0JBQ1gsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsTUFBTSxHQUFHLEdBQUcsRUFBWixDQUFZLENBQUUsQ0FBQztnQkFDeEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFCRCxvQkEwQkMiLCJmaWxlIjoiYXBwL3N0b3JlL3VpLWNvbmZpZy91aS1jb25maWcuc2VydmljZS5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVWlDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi91aS1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnVWkgQ29uZmlnIFNlcnZpY2UnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IFVpQ29uZmlnU2VydmljZSwgbW9ja0FwaVNlcnZpY2U6IE1vY2tBcGlTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpU2VydmljZSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBVaUNvbmZpZ1NlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdjb25maWd1cmF0aW9uL3NpdGUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgcHJvcGVydHkgXCJsb2FkZWQ6IHRydWVcIiBpbiB0aGUgcmVzcG9uc2UnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tBcGlTZXJ2aWNlLmdldFJlc3BvbnNlID0geyBzb21lOiAnZGF0YSd9O1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoKS5zdWJzY3JpYmUocmVzID0+IHJlc3VsdCA9IHJlcyApO1xuICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKCB7IHNvbWU6ICdkYXRhJywgbG9hZGVkOiB0cnVlIH0gKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

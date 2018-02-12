"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fee_config_service_1 = require("./fee-config.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Fee Config Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new fee_config_service_1.FeeConfigService(mockApiService.injector);
        });
        describe('load()', function () {
            it('calls the API correctly to load a feeConfig.', function () {
                serviceUnderTest.loadFeeConfig().subscribe();
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('feeConfig/search');
                expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkRBQXdEO0FBQ3hELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBSSxnQkFBa0MsRUFBRSxjQUE4QixDQUFDO1FBRXZFLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxnQkFBZ0IsR0FBRyxJQUFJLHFDQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakIsRUFBRSxDQUFDLDhDQUE4QyxFQUFFO2dCQUNqRCxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDN0MsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzVFLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsMkJBQTJCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5CRCxvQkFtQkMiLCJmaWxlIjoiYXBwL3N0b3JlL2ZlZS1jb25maWcvZmVlLWNvbmZpZy5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGZWVDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9mZWUtY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0FwaVNlcnZpY2UsIG1vY2tBcGlNYXRjaGVycyB9IGZyb20gJy4uL3NwZWMtaGVscGVycy9tb2NrLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0ZlZSBDb25maWcgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogRmVlQ29uZmlnU2VydmljZSwgbW9ja0FwaVNlcnZpY2U6IE1vY2tBcGlTZXJ2aWNlO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBqYXNtaW5lLmFkZE1hdGNoZXJzKG1vY2tBcGlNYXRjaGVycyk7XG4gICAgICBtb2NrQXBpU2VydmljZSA9IG5ldyBNb2NrQXBpU2VydmljZSgpO1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBGZWVDb25maWdTZXJ2aWNlKG1vY2tBcGlTZXJ2aWNlLmluamVjdG9yKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdsb2FkKCknLCAoKSA9PiB7XG4gICAgICBpdCgnY2FsbHMgdGhlIEFQSSBjb3JyZWN0bHkgdG8gbG9hZCBhIGZlZUNvbmZpZy4nLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZEZlZUNvbmZpZygpLnN1YnNjcmliZSgpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuSWRlbnRpdGllcyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoJ2ZlZUNvbmZpZy9zZWFyY2gnKTtcbiAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkudG9IYXZlQmVlbkNhbGxlZFdpdGhMb2FkaW5nKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuIl19

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_show_service_1 = require("./quote-show.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Future Quote Show Service', function () {
        var serviceUnderTest, mockApiService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            serviceUnderTest = new quote_show_service_1.FutureQuoteShowService(mockApiService.injector);
        });
        describe('load', function () {
            beforeEach(function () {
                mockApiService.getResponse = { some: 'quote' };
            });
            it('calls the api service correctly', function () {
                serviceUnderTest.load(1);
                expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Orders);
                expect(mockApiService.get).toHaveBeenCalledWithEndpoint('quote/1');
                expect(mockApiService.get).toHaveBeenCalledWithLoading();
            });
            it('returns an observable of the quote', function () {
                var expectedQuote;
                serviceUnderTest.load(1).subscribe(function (q) { return expectedQuote = q; });
                expect(expectedQuote).toEqual({ some: 'quote' });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMkRBQThEO0FBQzlELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsSUFBSSxnQkFBd0MsRUFBRSxjQUE4QixDQUFDO1FBRTdFLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxnQkFBZ0IsR0FBRyxJQUFJLDJDQUFzQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDZixVQUFVLENBQUM7Z0JBQ1QsY0FBYyxDQUFDLFdBQVcsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDcEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV6QixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLG1CQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25FLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtnQkFDdkMsSUFBSSxhQUFrQixDQUFDO2dCQUN2QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsYUFBYSxHQUFHLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO2dCQUUzRCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9CRCxvQkErQkMiLCJmaWxlIjoiYXBwL3N0b3JlL3F1b3RlLXNob3cvcXVvdGUtc2hvdy5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgRnV0dXJlUXVvdGVTaG93U2VydmljZSB9IGZyb20gJy4vcXVvdGUtc2hvdy5zZXJ2aWNlJztcbmltcG9ydCB7IE1vY2tBcGlTZXJ2aWNlLCBtb2NrQXBpTWF0Y2hlcnMgfSBmcm9tICcuLi9zcGVjLWhlbHBlcnMvbW9jay1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdGdXR1cmUgUXVvdGUgU2hvdyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBGdXR1cmVRdW90ZVNob3dTZXJ2aWNlLCBtb2NrQXBpU2VydmljZTogTW9ja0FwaVNlcnZpY2U7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMobW9ja0FwaU1hdGNoZXJzKTtcbiAgICAgIG1vY2tBcGlTZXJ2aWNlID0gbmV3IE1vY2tBcGlTZXJ2aWNlKCk7XG4gICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IEZ1dHVyZVF1b3RlU2hvd1NlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbW9ja0FwaVNlcnZpY2UuZ2V0UmVzcG9uc2UgPSB7IHNvbWU6ICdxdW90ZScgfTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgdGhlIGFwaSBzZXJ2aWNlIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkKDEpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5PcmRlcnMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KCdxdW90ZS8xJyk7XG4gICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoTG9hZGluZygpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGFuIG9ic2VydmFibGUgb2YgdGhlIHF1b3RlJywgKCkgPT4ge1xuICAgICAgICBsZXQgZXhwZWN0ZWRRdW90ZTogYW55O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoMSkuc3Vic2NyaWJlKHEgPT4gZXhwZWN0ZWRRdW90ZSA9IHEpO1xuXG4gICAgICAgIGV4cGVjdChleHBlY3RlZFF1b3RlKS50b0VxdWFsKHsgc29tZTogJ3F1b3RlJyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

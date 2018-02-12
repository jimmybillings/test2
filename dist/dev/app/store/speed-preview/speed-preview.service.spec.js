"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var speed_preview_service_1 = require("./speed-preview.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Speed Preview Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var mockCurrentUserService = {};
        var mockLoginInState;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            mockCurrentUserService.loggedIn = function () { return mockLoginInState; };
            serviceUnderTest = new speed_preview_service_1.SpeedPreviewService(mockApiService.injector, mockCurrentUserService);
        });
        describe('load()', function () {
            it('calls the API correctly for a speed view for a logged in user on the search results page.', function () {
                mockLoginInState = true;
                serviceUnderTest.load({ assetId: 1234 }).subscribe(function () {
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint("assetInfo/view/SpeedView/1234");
                    expect(mockApiService.get).not.toHaveBeenCalledWithOverridingToken(jasmine.any(String));
                });
            });
            it("calls the API correctly for a speed view for an anonomous user on the search results page.", function () {
                mockLoginInState = false;
                serviceUnderTest.load({ assetId: 1234 }).subscribe(function () {
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint("assetInfo/anonymous/view/SpeedView/1234");
                    expect(mockApiService.get).not.toHaveBeenCalledWithOverridingToken(jasmine.any(String));
                });
            });
            it('calls the API correctly for a speed view for an asset the belongs to a cart, quote, collection, etc...', function () {
                mockLoginInState = true;
                serviceUnderTest.load({ assetId: 1234, type: 'collection', parentId: 123 }).subscribe(function () {
                    expect(mockApiService.get).toHaveBeenCalledWithApi(api_interface_1.Api.Assets);
                    expect(mockApiService.get).toHaveBeenCalledWithEndpoint("assetInfo/view/SpeedView/clip/1234/collection/123");
                    expect(mockApiService.get).not.toHaveBeenCalledWithOverridingToken(jasmine.any(String));
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUVBQThEO0FBQzlELHFFQUFtRjtBQUNuRix1RUFBNEQ7QUFFNUQ7SUFDRSxRQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDaEMsSUFBSSxnQkFBcUMsQ0FBQztRQUMxQyxJQUFJLGNBQThCLENBQUM7UUFDbkMsSUFBSSxzQkFBc0IsR0FBUSxFQUFFLENBQUM7UUFDckMsSUFBSSxnQkFBeUIsQ0FBQztRQUc5QixVQUFVLENBQUM7WUFDVCxPQUFPLENBQUMsV0FBVyxDQUFDLGtDQUFlLENBQUMsQ0FBQztZQUNyQyxjQUFjLEdBQUcsSUFBSSxpQ0FBYyxFQUFFLENBQUM7WUFDdEMsc0JBQXNCLENBQUMsUUFBUSxHQUFHLGNBQU0sT0FBQSxnQkFBZ0IsRUFBaEIsQ0FBZ0IsQ0FBQztZQUN6RCxnQkFBZ0IsR0FBRyxJQUFJLDJDQUFtQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUM5RixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakIsRUFBRSxDQUFDLDJGQUEyRixFQUFFO2dCQUM5RixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDeEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLCtCQUErQixDQUFDLENBQUM7b0JBQ3pGLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw0RkFBNEYsRUFBRTtnQkFDL0YsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFTLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ3hELE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO29CQUNuRyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzFGLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0dBQXdHLEVBQUU7Z0JBQzNHLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDeEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFDM0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLG1EQUFtRCxDQUFDLENBQUM7b0JBQzdHLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUYsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBNUNELG9CQTRDQyIsImZpbGUiOiJhcHAvc3RvcmUvc3BlZWQtcHJldmlldy9zcGVlZC1wcmV2aWV3LnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNwZWVkUHJldmlld1NlcnZpY2UgfSBmcm9tICcuL3NwZWVkLXByZXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnU3BlZWQgUHJldmlldyBTZXJ2aWNlJywgKCkgPT4ge1xuICAgIGxldCBzZXJ2aWNlVW5kZXJUZXN0OiBTcGVlZFByZXZpZXdTZXJ2aWNlO1xuICAgIGxldCBtb2NrQXBpU2VydmljZTogTW9ja0FwaVNlcnZpY2U7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueSA9IHt9O1xuICAgIGxldCBtb2NrTG9naW5JblN0YXRlOiBib29sZWFuO1xuXG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIGphc21pbmUuYWRkTWF0Y2hlcnMobW9ja0FwaU1hdGNoZXJzKTtcbiAgICAgIG1vY2tBcGlTZXJ2aWNlID0gbmV3IE1vY2tBcGlTZXJ2aWNlKCk7XG4gICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLmxvZ2dlZEluID0gKCkgPT4gbW9ja0xvZ2luSW5TdGF0ZTtcbiAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgU3BlZWRQcmV2aWV3U2VydmljZShtb2NrQXBpU2VydmljZS5pbmplY3RvciwgbW9ja0N1cnJlbnRVc2VyU2VydmljZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbG9hZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5IGZvciBhIHNwZWVkIHZpZXcgZm9yIGEgbG9nZ2VkIGluIHVzZXIgb24gdGhlIHNlYXJjaCByZXN1bHRzIHBhZ2UuJywgKCkgPT4ge1xuICAgICAgICBtb2NrTG9naW5JblN0YXRlID0gdHJ1ZTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdC5sb2FkKHsgYXNzZXRJZDogMTIzNCB9IGFzIGFueSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuQXNzZXRzKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KGBhc3NldEluZm8vdmlldy9TcGVlZFZpZXcvMTIzNGApO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aE92ZXJyaWRpbmdUb2tlbihqYXNtaW5lLmFueShTdHJpbmcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoYGNhbGxzIHRoZSBBUEkgY29ycmVjdGx5IGZvciBhIHNwZWVkIHZpZXcgZm9yIGFuIGFub25vbW91cyB1c2VyIG9uIHRoZSBzZWFyY2ggcmVzdWx0cyBwYWdlLmAsICgpID0+IHtcbiAgICAgICAgbW9ja0xvZ2luSW5TdGF0ZSA9IGZhbHNlO1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0LmxvYWQoeyBhc3NldElkOiAxMjM0IH0gYXMgYW55KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoQXBpKEFwaS5Bc3NldHMpO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoRW5kcG9pbnQoYGFzc2V0SW5mby9hbm9ueW1vdXMvdmlldy9TcGVlZFZpZXcvMTIzNGApO1xuICAgICAgICAgIGV4cGVjdChtb2NrQXBpU2VydmljZS5nZXQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkV2l0aE92ZXJyaWRpbmdUb2tlbihqYXNtaW5lLmFueShTdHJpbmcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIHRoZSBBUEkgY29ycmVjdGx5IGZvciBhIHNwZWVkIHZpZXcgZm9yIGFuIGFzc2V0IHRoZSBiZWxvbmdzIHRvIGEgY2FydCwgcXVvdGUsIGNvbGxlY3Rpb24sIGV0Yy4uLicsICgpID0+IHtcbiAgICAgICAgbW9ja0xvZ2luSW5TdGF0ZSA9IHRydWU7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QubG9hZCh7IGFzc2V0SWQ6IDEyMzQsIHR5cGU6ICdjb2xsZWN0aW9uJywgcGFyZW50SWQ6IDEyMyB9IGFzIGFueSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEFwaShBcGkuQXNzZXRzKTtcbiAgICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UuZ2V0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aEVuZHBvaW50KGBhc3NldEluZm8vdmlldy9TcGVlZFZpZXcvY2xpcC8xMjM0L2NvbGxlY3Rpb24vMTIzYCk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tBcGlTZXJ2aWNlLmdldCkubm90LnRvSGF2ZUJlZW5DYWxsZWRXaXRoT3ZlcnJpZGluZ1Rva2VuKGphc21pbmUuYW55KFN0cmluZykpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

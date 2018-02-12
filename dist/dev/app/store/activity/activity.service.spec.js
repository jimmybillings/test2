"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var activity_service_1 = require("./activity.service");
var mock_api_service_1 = require("../spec-helpers/mock-api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
function main() {
    describe('Activity Service', function () {
        var serviceUnderTest;
        var mockApiService;
        var mockCurrentUserService;
        beforeEach(function () {
            jasmine.addMatchers(mock_api_service_1.mockApiMatchers);
            mockApiService = new mock_api_service_1.MockApiService();
            mockCurrentUserService = { state: { id: 123 } };
            serviceUnderTest = new activity_service_1.ActivityService(mockApiService.injector, mockCurrentUserService);
        });
        describe('record()', function () {
            it('calls the api service correctly', function () {
                serviceUnderTest.record({ some: 'options' });
                expect(mockApiService.post).toHaveBeenCalledWithApi(api_interface_1.Api.Identities);
                expect(mockApiService.post).toHaveBeenCalledWithEndpoint('activityAudit');
                expect(mockApiService.post).toHaveBeenCalledWithBody({ some: 'options', userId: 123 });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3Rpdml0eS9hY3Rpdml0eS5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1REFBcUQ7QUFDckQscUVBQW1GO0FBQ25GLHVFQUE0RDtBQUU1RDtJQUNFLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUMzQixJQUFJLGdCQUFpQyxDQUFDO1FBQ3RDLElBQUksY0FBOEIsQ0FBQztRQUNuQyxJQUFJLHNCQUEyQixDQUFDO1FBRWhDLFVBQVUsQ0FBQztZQUNULE9BQU8sQ0FBQyxXQUFXLENBQUMsa0NBQWUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztZQUN0QyxzQkFBc0IsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ2hELGdCQUFnQixHQUFHLElBQUksa0NBQWUsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDMUYsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ25CLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtnQkFDcEMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBUyxDQUFDLENBQUM7Z0JBRXBELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDcEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDMUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDekYsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZCRCxvQkF1QkMiLCJmaWxlIjoiYXBwL3N0b3JlL2FjdGl2aXR5L2FjdGl2aXR5LnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGl2aXR5U2VydmljZSB9IGZyb20gJy4vYWN0aXZpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrQXBpU2VydmljZSwgbW9ja0FwaU1hdGNoZXJzIH0gZnJvbSAnLi4vc3BlYy1oZWxwZXJzL21vY2stYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQWN0aXZpdHkgU2VydmljZScsICgpID0+IHtcbiAgICBsZXQgc2VydmljZVVuZGVyVGVzdDogQWN0aXZpdHlTZXJ2aWNlO1xuICAgIGxldCBtb2NrQXBpU2VydmljZTogTW9ja0FwaVNlcnZpY2U7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgamFzbWluZS5hZGRNYXRjaGVycyhtb2NrQXBpTWF0Y2hlcnMpO1xuICAgICAgbW9ja0FwaVNlcnZpY2UgPSBuZXcgTW9ja0FwaVNlcnZpY2UoKTtcbiAgICAgIG1vY2tDdXJyZW50VXNlclNlcnZpY2UgPSB7IHN0YXRlOiB7IGlkOiAxMjMgfSB9O1xuICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBBY3Rpdml0eVNlcnZpY2UobW9ja0FwaVNlcnZpY2UuaW5qZWN0b3IsIG1vY2tDdXJyZW50VXNlclNlcnZpY2UpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JlY29yZCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ2NhbGxzIHRoZSBhcGkgc2VydmljZSBjb3JyZWN0bHknLCAoKSA9PiB7XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QucmVjb3JkKHsgc29tZTogJ29wdGlvbnMnIH0gYXMgYW55KTtcblxuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhBcGkoQXBpLklkZW50aXRpZXMpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhFbmRwb2ludCgnYWN0aXZpdHlBdWRpdCcpO1xuICAgICAgICBleHBlY3QobW9ja0FwaVNlcnZpY2UucG9zdCkudG9IYXZlQmVlbkNhbGxlZFdpdGhCb2R5KHsgc29tZTogJ29wdGlvbnMnLCB1c2VySWQ6IDEyMyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

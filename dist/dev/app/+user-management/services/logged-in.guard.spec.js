"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logged_in_guard_1 = require("./logged-in.guard");
function main() {
    describe('Logged In Guard', function () {
        var serviceUnderTest;
        var mockCurrentUserService, mockRouter;
        beforeEach(function () {
            mockRouter = { navigate: jasmine.createSpy('navigate') };
        });
        describe('canActivate()', function () {
            it('Should return true if the user is not logged in', function () {
                mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(false) };
                serviceUnderTest = new logged_in_guard_1.LoggedInGuard(mockCurrentUserService, mockRouter);
                var action = serviceUnderTest.canActivate();
                expect(action).toEqual(true);
            });
            it('Should return false and navigate to home if user is logged in', function () {
                mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(true) };
                serviceUnderTest = new logged_in_guard_1.LoggedInGuard(mockCurrentUserService, mockRouter);
                var action = serviceUnderTest.canActivate();
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
                expect(action).toEqual(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50L3NlcnZpY2VzL2xvZ2dlZC1pbi5ndWFyZC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQWtEO0FBRWxEO0lBQ0UsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLElBQUksZ0JBQStCLENBQUM7UUFDcEMsSUFBSSxzQkFBMkIsRUFBRSxVQUFlLENBQUM7UUFDakQsVUFBVSxDQUFDO1lBQ1QsVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDeEIsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO2dCQUNwRCxzQkFBc0IsR0FBRyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDNUYsZ0JBQWdCLEdBQUcsSUFBSSwrQkFBYSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRTtnQkFDbEUsc0JBQXNCLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzNGLGdCQUFnQixHQUFHLElBQUksK0JBQWEsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDekUsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF6QkQsb0JBeUJDIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50L3NlcnZpY2VzL2xvZ2dlZC1pbi5ndWFyZC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VkSW5HdWFyZCB9IGZyb20gJy4vbG9nZ2VkLWluLmd1YXJkJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdMb2dnZWQgSW4gR3VhcmQnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IExvZ2dlZEluR3VhcmQ7XG4gICAgbGV0IG1vY2tDdXJyZW50VXNlclNlcnZpY2U6IGFueSwgbW9ja1JvdXRlcjogYW55O1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1JvdXRlciA9IHsgbmF2aWdhdGU6IGphc21pbmUuY3JlYXRlU3B5KCduYXZpZ2F0ZScpIH07XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuQWN0aXZhdGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIHRydWUgaWYgdGhlIHVzZXIgaXMgbm90IGxvZ2dlZCBpbicsICgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgbG9nZ2VkSW46IGphc21pbmUuY3JlYXRlU3B5KCdsb2dnZWRJbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSkgfTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBMb2dnZWRJbkd1YXJkKG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tSb3V0ZXIpO1xuICAgICAgICBsZXQgYWN0aW9uID0gc2VydmljZVVuZGVyVGVzdC5jYW5BY3RpdmF0ZSgpO1xuICAgICAgICBleHBlY3QoYWN0aW9uKS50b0VxdWFsKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgcmV0dXJuIGZhbHNlIGFuZCBuYXZpZ2F0ZSB0byBob21lIGlmIHVzZXIgaXMgbG9nZ2VkIGluJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlID0geyBsb2dnZWRJbjogamFzbWluZS5jcmVhdGVTcHkoJ2xvZ2dlZEluJykuYW5kLnJldHVyblZhbHVlKHRydWUpIH07XG4gICAgICAgIHNlcnZpY2VVbmRlclRlc3QgPSBuZXcgTG9nZ2VkSW5HdWFyZChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrUm91dGVyKTtcbiAgICAgICAgbGV0IGFjdGlvbiA9IHNlcnZpY2VVbmRlclRlc3QuY2FuQWN0aXZhdGUoKTtcbiAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnLyddKTtcbiAgICAgICAgZXhwZWN0KGFjdGlvbikudG9FcXVhbChmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=

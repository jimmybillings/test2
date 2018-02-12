"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logged_out_guard_1 = require("./logged-out.guard");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Logged Out Guard', function () {
        var serviceUnderTest;
        var mockCurrentUserService;
        var mockStore;
        var errorSpy;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            errorSpy = mockStore.createActionFactoryMethod('error', 'handle401Unauthorized');
        });
        describe('canActivate()', function () {
            it('Should return true if the user is logged in', function () {
                mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(true) };
                serviceUnderTest = new logged_out_guard_1.LoggedOutGuard(mockCurrentUserService, mockStore);
                var action = serviceUnderTest.canActivate();
                expect(action).toEqual(true);
                expect(errorSpy).not.toHaveBeenCalled();
            });
            it('Should return false and pass a 401 to the error.handle method', function () {
                mockCurrentUserService = { loggedIn: jasmine.createSpy('loggedIn').and.returnValue(false) };
                serviceUnderTest = new logged_out_guard_1.LoggedOutGuard(mockCurrentUserService, mockStore);
                var action = serviceUnderTest.canActivate();
                mockStore.expectDispatchFor(errorSpy);
                expect(action).toEqual(false);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50L3NlcnZpY2VzL2xvZ2dlZC1vdXQuZ3VhcmQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUFvRDtBQUNwRCwwRUFBdUU7QUFFdkU7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsSUFBSSxnQkFBZ0MsQ0FBQztRQUNyQyxJQUFJLHNCQUEyQixDQUFDO1FBQ2hDLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLFFBQXFCLENBQUM7UUFFMUIsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLFFBQVEsR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDbkYsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsZUFBZSxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsc0JBQXNCLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzNGLGdCQUFnQixHQUFHLElBQUksaUNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDekUsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrREFBK0QsRUFBRTtnQkFDbEUsc0JBQXNCLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQzVGLGdCQUFnQixHQUFHLElBQUksaUNBQWMsQ0FBQyxzQkFBc0IsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDekUsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0JELG9CQStCQyIsImZpbGUiOiJhcHAvK3VzZXItbWFuYWdlbWVudC9zZXJ2aWNlcy9sb2dnZWQtb3V0Lmd1YXJkLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZWRPdXRHdWFyZCB9IGZyb20gJy4vbG9nZ2VkLW91dC5ndWFyZCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0xvZ2dlZCBPdXQgR3VhcmQnLCAoKSA9PiB7XG4gICAgbGV0IHNlcnZpY2VVbmRlclRlc3Q6IExvZ2dlZE91dEd1YXJkO1xuICAgIGxldCBtb2NrQ3VycmVudFVzZXJTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBlcnJvclNweTogamFzbWluZS5TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGVycm9yU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2Vycm9yJywgJ2hhbmRsZTQwMVVuYXV0aG9yaXplZCcpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhbkFjdGl2YXRlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSB1c2VyIGlzIGxvZ2dlZCBpbicsICgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgbG9nZ2VkSW46IGphc21pbmUuY3JlYXRlU3B5KCdsb2dnZWRJbicpLmFuZC5yZXR1cm5WYWx1ZSh0cnVlKSB9O1xuICAgICAgICBzZXJ2aWNlVW5kZXJUZXN0ID0gbmV3IExvZ2dlZE91dEd1YXJkKG1vY2tDdXJyZW50VXNlclNlcnZpY2UsIG1vY2tTdG9yZSk7XG4gICAgICAgIGxldCBhY3Rpb24gPSBzZXJ2aWNlVW5kZXJUZXN0LmNhbkFjdGl2YXRlKCk7XG4gICAgICAgIGV4cGVjdChhY3Rpb24pLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIGV4cGVjdChlcnJvclNweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBhbmQgcGFzcyBhIDQwMSB0byB0aGUgZXJyb3IuaGFuZGxlIG1ldGhvZCcsICgpID0+IHtcbiAgICAgICAgbW9ja0N1cnJlbnRVc2VyU2VydmljZSA9IHsgbG9nZ2VkSW46IGphc21pbmUuY3JlYXRlU3B5KCdsb2dnZWRJbicpLmFuZC5yZXR1cm5WYWx1ZShmYWxzZSkgfTtcbiAgICAgICAgc2VydmljZVVuZGVyVGVzdCA9IG5ldyBMb2dnZWRPdXRHdWFyZChtb2NrQ3VycmVudFVzZXJTZXJ2aWNlLCBtb2NrU3RvcmUpO1xuICAgICAgICBsZXQgYWN0aW9uID0gc2VydmljZVVuZGVyVGVzdC5jYW5BY3RpdmF0ZSgpO1xuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoZXJyb3JTcHkpO1xuICAgICAgICBleHBlY3QoYWN0aW9uKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gIH0pO1xufVxuIl19

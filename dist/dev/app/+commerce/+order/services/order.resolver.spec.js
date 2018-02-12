"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var order_resolver_1 = require("./order.resolver");
function main() {
    describe('Order Resolver', function () {
        var mockStore;
        var resolverUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new order_resolver_1.OrderResolver(mockStore);
        });
        describe('resolve()', function () {
            var mockRoute;
            var loadSpy;
            var resolved;
            beforeEach(function () {
                mockRoute = { params: { id: '1234' } };
                loadSpy = mockStore.createActionFactoryMethod('order', 'load');
                resolved = jasmine.createSpy('resolved');
                mockStore.createStateSection('order', { activeOrder: { id: 5678 }, loading: true });
            });
            it('dispatches an action', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                mockStore.expectDispatchFor(loadSpy, 1234);
            });
            it('doesn\'t return when the loading flag is true', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('returns when the loading flag is false', function () {
                mockStore.createStateSection('order', { activeOrder: { id: 5678 }, loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalledWith(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVyLnJlc29sdmVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw2RUFBMEU7QUFDMUUsbURBQWlEO0FBRWpEO0lBQ0UsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLGlCQUFnQyxDQUFDO1FBRXJDLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixpQkFBaUIsR0FBRyxJQUFJLDhCQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksU0FBYyxDQUFDO1lBQ25CLElBQUksT0FBb0IsQ0FBQztZQUN6QixJQUFJLFFBQXFCLENBQUM7WUFFMUIsVUFBVSxDQUFDO2dCQUNULFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUN2QyxPQUFPLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDL0QsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXpELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7Z0JBQ2xELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXpELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0MsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFckYsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzQ0Qsb0JBMkNDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytvcmRlci9zZXJ2aWNlcy9vcmRlci5yZXNvbHZlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5pbXBvcnQgeyBPcmRlclJlc29sdmVyIH0gZnJvbSAnLi9vcmRlci5yZXNvbHZlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnT3JkZXIgUmVzb2x2ZXInLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCByZXNvbHZlclVuZGVyVGVzdDogT3JkZXJSZXNvbHZlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgT3JkZXJSZXNvbHZlcihtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc29sdmUoKScsICgpID0+IHtcbiAgICAgIGxldCBtb2NrUm91dGU6IGFueTtcbiAgICAgIGxldCBsb2FkU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgIGxldCByZXNvbHZlZDogamFzbWluZS5TcHk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrUm91dGUgPSB7IHBhcmFtczogeyBpZDogJzEyMzQnIH0gfTtcbiAgICAgICAgbG9hZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdvcmRlcicsICdsb2FkJyk7XG4gICAgICAgIHJlc29sdmVkID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ29yZGVyJywgeyBhY3RpdmVPcmRlcjogeyBpZDogNTY3OCB9LCBsb2FkaW5nOiB0cnVlIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNwYXRjaGVzIGFuIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpLnN1YnNjcmliZShyZXNvbHZlZCk7XG5cbiAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKGxvYWRTcHksIDEyMzQpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzblxcJ3QgcmV0dXJuIHdoZW4gdGhlIGxvYWRpbmcgZmxhZyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcblxuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgd2hlbiB0aGUgbG9hZGluZyBmbGFnIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdvcmRlcicsIHsgYWN0aXZlT3JkZXI6IHsgaWQ6IDU2NzggfSwgbG9hZGluZzogZmFsc2UgfSk7XG5cbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpLnN1YnNjcmliZShyZXNvbHZlZCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=

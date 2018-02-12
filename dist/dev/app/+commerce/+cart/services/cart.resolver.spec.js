"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var cart_resolver_1 = require("./cart.resolver");
function main() {
    describe('Cart Resolver', function () {
        var mockStore;
        var resolverUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new cart_resolver_1.CartResolver(mockStore);
        });
        describe('resolve()', function () {
            var loadSpy;
            var resolved;
            beforeEach(function () {
                loadSpy = mockStore.createActionFactoryMethod('cart', 'load');
                resolved = jasmine.createSpy('resolved');
                mockStore.createStateSection('cart', { loading: true });
            });
            it('dispatches an action', function () {
                resolverUnderTest.resolve().subscribe(resolved);
                mockStore.expectDispatchFor(loadSpy);
            });
            it('doesn\'t return when the loading flag is true', function () {
                resolverUnderTest.resolve().subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('returns when the loading flag is false', function () {
                mockStore.createStateSection('cart', { loading: false });
                resolverUnderTest.resolve().subscribe(resolved);
                expect(resolved).toHaveBeenCalledWith(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvc2VydmljZXMvY2FydC5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkVBQTBFO0FBQzFFLGlEQUErQztBQUUvQztJQUNFLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksaUJBQStCLENBQUM7UUFFcEMsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLGlCQUFpQixHQUFHLElBQUksNEJBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxPQUFvQixDQUFDO1lBQ3pCLElBQUksUUFBcUIsQ0FBQztZQUUxQixVQUFVLENBQUM7Z0JBQ1QsT0FBTyxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzlELFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxTQUFTLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pCLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFO2dCQUNsRCxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0MsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RCxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckNELG9CQXFDQztBQUFBLENBQUMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9zZXJ2aWNlcy9jYXJ0LnJlc29sdmVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgQ2FydFJlc29sdmVyIH0gZnJvbSAnLi9jYXJ0LnJlc29sdmVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDYXJ0IFJlc29sdmVyJywgKCkgPT4ge1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IENhcnRSZXNvbHZlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgQ2FydFJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IGxvYWRTcHk6IGphc21pbmUuU3B5O1xuICAgICAgbGV0IHJlc29sdmVkOiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGxvYWRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnY2FydCcsICdsb2FkJyk7XG4gICAgICAgIHJlc29sdmVkID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NhcnQnLCB7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Rpc3BhdGNoZXMgYW4gYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKCkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKGxvYWRTcHkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzblxcJ3QgcmV0dXJuIHdoZW4gdGhlIGxvYWRpbmcgZmxhZyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKCkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHdoZW4gdGhlIGxvYWRpbmcgZmxhZyBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignY2FydCcsIHsgbG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUoKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==

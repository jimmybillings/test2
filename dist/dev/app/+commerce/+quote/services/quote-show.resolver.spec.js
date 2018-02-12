"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var quote_show_resolver_1 = require("./quote-show.resolver");
function main() {
    describe('Quote Show Resolver', function () {
        var mockStore;
        var resolverUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new quote_show_resolver_1.QuoteShowResolver(mockStore);
        });
        describe('resolve()', function () {
            var mockRoute;
            var loadSpy;
            var resolved;
            beforeEach(function () {
                mockRoute = { params: { id: '1234' } };
                loadSpy = mockStore.createActionFactoryMethod('quoteShow', 'load');
                resolved = jasmine.createSpy('resolved');
                mockStore.createStateSection('quoteShow', { data: { id: 5678 }, loading: true });
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
                mockStore.createStateSection('quoteShow', { data: { id: 5678 }, loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalledWith(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLXNob3cucmVzb2x2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZFQUEwRTtBQUMxRSw2REFBMEQ7QUFFMUQ7SUFDRSxRQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDOUIsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksaUJBQW9DLENBQUM7UUFFekMsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLGlCQUFpQixHQUFHLElBQUksdUNBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksU0FBYyxDQUFDO1lBQ25CLElBQUksT0FBb0IsQ0FBQztZQUN6QixJQUFJLFFBQXFCLENBQUM7WUFFMUIsVUFBVSxDQUFDO2dCQUNULFNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUN2QyxPQUFPLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkUsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDbkYsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXpELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7Z0JBQ2xELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXpELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0MsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFbEYsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEzQ0Qsb0JBMkNDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9zZXJ2aWNlcy9xdW90ZS1zaG93LnJlc29sdmVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcbmltcG9ydCB7IFF1b3RlU2hvd1Jlc29sdmVyIH0gZnJvbSAnLi9xdW90ZS1zaG93LnJlc29sdmVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdRdW90ZSBTaG93IFJlc29sdmVyJywgKCkgPT4ge1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IFF1b3RlU2hvd1Jlc29sdmVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICByZXNvbHZlclVuZGVyVGVzdCA9IG5ldyBRdW90ZVNob3dSZXNvbHZlcihtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc29sdmUoKScsICgpID0+IHtcbiAgICAgIGxldCBtb2NrUm91dGU6IGFueTtcbiAgICAgIGxldCBsb2FkU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgIGxldCByZXNvbHZlZDogamFzbWluZS5TcHk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrUm91dGUgPSB7IHBhcmFtczogeyBpZDogJzEyMzQnIH0gfTtcbiAgICAgICAgbG9hZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZVNob3cnLCAnbG9hZCcpO1xuICAgICAgICByZXNvbHZlZCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXNvbHZlZCcpO1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7IGRhdGE6IHsgaWQ6IDU2NzggfSwgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyBhbiBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuXG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihsb2FkU3B5LCAxMjM0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lc25cXCd0IHJldHVybiB3aGVuIHRoZSBsb2FkaW5nIGZsYWcgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpLnN1YnNjcmliZShyZXNvbHZlZCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHdoZW4gdGhlIGxvYWRpbmcgZmxhZyBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVTaG93JywgeyBkYXRhOiB7IGlkOiA1Njc4IH0sIGxvYWRpbmc6IGZhbHNlIH0pO1xuXG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuXG4gICAgICAgIGV4cGVjdChyZXNvbHZlZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19

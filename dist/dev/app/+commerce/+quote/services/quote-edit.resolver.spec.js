"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var quote_edit_resolver_1 = require("./quote-edit.resolver");
function main() {
    describe('Quote Edit Resolver', function () {
        var mockStore;
        var resolverUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new quote_edit_resolver_1.QuoteEditResolver(mockStore);
        });
        describe('resolve()', function () {
            var loadSpy;
            var resolved;
            beforeEach(function () {
                loadSpy = mockStore.createActionFactoryMethod('quoteEdit', 'load');
                resolved = jasmine.createSpy('resolved');
                mockStore.createStateSection('quoteEdit', { loading: true });
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
                mockStore.createStateSection('quoteEdit', { loading: false });
                resolverUnderTest.resolve().subscribe(resolved);
                expect(resolved).toHaveBeenCalledWith(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQucmVzb2x2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUEwRTtBQUMxRSw2REFBMEQ7QUFFMUQ7SUFDRSxRQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDOUIsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksaUJBQW9DLENBQUM7UUFFekMsVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLGlCQUFpQixHQUFHLElBQUksdUNBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksT0FBb0IsQ0FBQztZQUN6QixJQUFJLFFBQXFCLENBQUM7WUFFMUIsVUFBVSxDQUFDO2dCQUNULE9BQU8sR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRSxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHNCQUFzQixFQUFFO2dCQUN6QixpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtnQkFDbEQsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0NBQXdDLEVBQUU7Z0JBQzNDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDOUQsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXJDRCxvQkFxQ0M7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQucmVzb2x2ZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5pbXBvcnQgeyBRdW90ZUVkaXRSZXNvbHZlciB9IGZyb20gJy4vcXVvdGUtZWRpdC5yZXNvbHZlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgRWRpdCBSZXNvbHZlcicsICgpID0+IHtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IHJlc29sdmVyVW5kZXJUZXN0OiBRdW90ZUVkaXRSZXNvbHZlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgUXVvdGVFZGl0UmVzb2x2ZXIobW9ja1N0b3JlKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXNvbHZlKCknLCAoKSA9PiB7XG4gICAgICBsZXQgbG9hZFNweTogamFzbWluZS5TcHk7XG4gICAgICBsZXQgcmVzb2x2ZWQ6IGphc21pbmUuU3B5O1xuXG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgbG9hZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnbG9hZCcpO1xuICAgICAgICByZXNvbHZlZCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXNvbHZlZCcpO1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Rpc3BhdGNoZXMgYW4gYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKCkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKGxvYWRTcHkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzblxcJ3QgcmV0dXJuIHdoZW4gdGhlIGxvYWRpbmcgZmxhZyBpcyB0cnVlJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKCkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHdoZW4gdGhlIGxvYWRpbmcgZmxhZyBpcyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBsb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZSgpLnN1YnNjcmliZShyZXNvbHZlZCk7XG4gICAgICAgIGV4cGVjdChyZXNvbHZlZCkudG9IYXZlQmVlbkNhbGxlZFdpdGgodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19

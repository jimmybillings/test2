"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var order_asset_resolver_1 = require("./order-asset.resolver");
function main() {
    describe('Order Asset Resolver', function () {
        var mockStore;
        var resolverUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new order_asset_resolver_1.OrderAssetResolver(mockStore);
        });
        describe('resolve()', function () {
            var mockRoute;
            var loadSpy;
            var resolved;
            beforeEach(function () {
                mockRoute = { params: { id: '1234', uuid: 'ABCD' } };
                loadSpy = mockStore.createActionFactoryMethod('asset', 'loadOrderAsset');
                resolved = jasmine.createSpy('resolved');
                mockStore.createStateSection('asset', { activeAsset: { id: 5678 }, loading: true });
            });
            it('dispatches an action', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                mockStore.expectDispatchFor(loadSpy, 1234, 'ABCD');
            });
            it('doesn\'t return when the loading flag is true', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('returns when the loading flag is false', function () {
                mockStore.createStateSection('asset', { activeAsset: { id: 1234 }, loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalledWith(true);
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVyLWFzc2V0LnJlc29sdmVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2RUFBMEU7QUFDMUUsK0RBQTREO0FBRTVEO0lBQ0UsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLGlCQUFxQyxDQUFDO1FBRTFDLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixpQkFBaUIsR0FBRyxJQUFJLHlDQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLFNBQWMsQ0FBQztZQUNuQixJQUFJLE9BQW9CLENBQUM7WUFDekIsSUFBSSxRQUFxQixDQUFDO1lBRTFCLFVBQVUsQ0FBQztnQkFDVCxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2dCQUNyRCxPQUFPLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUN6RSxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0RixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxzQkFBc0IsRUFBRTtnQkFDekIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekQsU0FBUyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7Z0JBQ2xELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0MsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDckYsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2Q0Qsb0JBdUNDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytvcmRlci9zZXJ2aWNlcy9vcmRlci1hc3NldC5yZXNvbHZlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcbmltcG9ydCB7IE9yZGVyQXNzZXRSZXNvbHZlciB9IGZyb20gJy4vb3JkZXItYXNzZXQucmVzb2x2ZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ09yZGVyIEFzc2V0IFJlc29sdmVyJywgKCkgPT4ge1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IE9yZGVyQXNzZXRSZXNvbHZlcjtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgT3JkZXJBc3NldFJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IG1vY2tSb3V0ZTogYW55O1xuICAgICAgbGV0IGxvYWRTcHk6IGphc21pbmUuU3B5O1xuICAgICAgbGV0IHJlc29sdmVkOiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tSb3V0ZSA9IHsgcGFyYW1zOiB7IGlkOiAnMTIzNCcsIHV1aWQ6ICdBQkNEJyB9IH07XG4gICAgICAgIGxvYWRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnYXNzZXQnLCAnbG9hZE9yZGVyQXNzZXQnKTtcbiAgICAgICAgcmVzb2x2ZWQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVzb2x2ZWQnKTtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGFjdGl2ZUFzc2V0OiB7IGlkOiA1Njc4IH0sIGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2Rpc3BhdGNoZXMgYW4gYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKGxvYWRTcHksIDEyMzQsICdBQkNEJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2RvZXNuXFwndCByZXR1cm4gd2hlbiB0aGUgbG9hZGluZyBmbGFnIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgd2hlbiB0aGUgbG9hZGluZyBmbGFnIGlzIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdhc3NldCcsIHsgYWN0aXZlQXNzZXQ6IHsgaWQ6IDEyMzQgfSwgbG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHRydWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcbiJdfQ==

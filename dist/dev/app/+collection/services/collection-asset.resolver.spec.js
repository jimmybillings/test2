"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
var collection_asset_resolver_1 = require("./collection-asset.resolver");
function main() {
    describe('Collection Asset Resolver', function () {
        var mockStore;
        var resolverUnderTest;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            resolverUnderTest = new collection_asset_resolver_1.CollectionAssetResolver(mockStore);
        });
        describe('resolve()', function () {
            var mockRoute;
            var loadSpy;
            var resolved;
            beforeEach(function () {
                mockRoute = { params: { uuid: 'abc-123' } };
                loadSpy = mockStore.createActionFactoryMethod('asset', 'loadActiveCollectionAsset');
                resolved = jasmine.createSpy('resolved');
                mockStore.createStateSection('asset', { activeAsset: { id: 123 }, loading: true });
            });
            it('dispatches an action', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                mockStore.expectDispatchFor(loadSpy, 'abc-123');
            });
            it('doesn\'t return when the loading flag is true', function () {
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('returns when the loading flag is false', function () {
                mockStore.createStateSection('asset', { activeAsset: { id: 123 }, loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalledWith(true);
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLWFzc2V0LnJlc29sdmVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwwRUFBdUU7QUFDdkUseUVBQXNFO0FBRXRFO0lBQ0UsUUFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLGlCQUEwQyxDQUFDO1FBRS9DLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixpQkFBaUIsR0FBRyxJQUFJLG1EQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLFNBQWMsQ0FBQztZQUNuQixJQUFJLE9BQW9CLENBQUM7WUFDekIsSUFBSSxRQUFxQixDQUFDO1lBRTFCLFVBQVUsQ0FBQztnQkFDVCxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztnQkFDcEYsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUU7Z0JBQ3pCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsK0NBQStDLEVBQUU7Z0JBQ2xELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtnQkFDM0MsU0FBUyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDcEYsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF2Q0Qsb0JBdUNDIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLWFzc2V0LnJlc29sdmVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcbmltcG9ydCB7IENvbGxlY3Rpb25Bc3NldFJlc29sdmVyIH0gZnJvbSAnLi9jb2xsZWN0aW9uLWFzc2V0LnJlc29sdmVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb2xsZWN0aW9uIEFzc2V0IFJlc29sdmVyJywgKCkgPT4ge1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IENvbGxlY3Rpb25Bc3NldFJlc29sdmVyO1xuXG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICByZXNvbHZlclVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uQXNzZXRSZXNvbHZlcihtb2NrU3RvcmUpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Jlc29sdmUoKScsICgpID0+IHtcbiAgICAgIGxldCBtb2NrUm91dGU6IGFueTtcbiAgICAgIGxldCBsb2FkU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgIGxldCByZXNvbHZlZDogamFzbWluZS5TcHk7XG5cbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBtb2NrUm91dGUgPSB7IHBhcmFtczogeyB1dWlkOiAnYWJjLTEyMycgfSB9O1xuICAgICAgICBsb2FkU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2Fzc2V0JywgJ2xvYWRBY3RpdmVDb2xsZWN0aW9uQXNzZXQnKTtcbiAgICAgICAgcmVzb2x2ZWQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVzb2x2ZWQnKTtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGFjdGl2ZUFzc2V0OiB7IGlkOiAxMjMgfSwgbG9hZGluZzogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyBhbiBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IobG9hZFNweSwgJ2FiYy0xMjMnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lc25cXCd0IHJldHVybiB3aGVuIHRoZSBsb2FkaW5nIGZsYWcgaXMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpLnN1YnNjcmliZShyZXNvbHZlZCk7XG4gICAgICAgIGV4cGVjdChyZXNvbHZlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB3aGVuIHRoZSBsb2FkaW5nIGZsYWcgaXMgZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2Fzc2V0JywgeyBhY3RpdmVBc3NldDogeyBpZDogMTIzIH0sIGxvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

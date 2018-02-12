"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cart_asset_resolver_1 = require("./cart-asset.resolver");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Cart Asset Resolver', function () {
        var mockRoute = { params: { uuid: 'abc-123' } };
        var resolverUnderTest, mockStore, loadSpy, resolved;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            loadSpy = mockStore.createActionFactoryMethod('asset', 'loadCartAsset');
            resolved = jasmine.createSpy('resolved');
            resolverUnderTest = new cart_asset_resolver_1.CartAssetResolver(mockStore);
        });
        describe('resolve()', function () {
            it('should dispatch the proper action', function () {
                resolverUnderTest.resolve(mockRoute);
                expect(loadSpy).toHaveBeenCalledWith('abc-123');
            });
            it('Should not resolve if the Cart Asset store has no data from the server', function () {
                mockStore.createStateSection('asset', { loading: true });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('Should resolve if the Cart Asset store already has data from the server', function () {
                mockStore.createStateSection('asset', { loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvc2VydmljZXMvY2FydC1hc3NldC5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTBEO0FBQzFELDZFQUEwRTtBQUUxRTtJQUNFLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFNLFNBQVMsR0FBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDO1FBQ3ZELElBQUksaUJBQW9DLEVBQUUsU0FBdUIsRUFBRSxPQUFvQixFQUFFLFFBQXFCLENBQUM7UUFFL0csVUFBVSxDQUFDO1lBQ1QsU0FBUyxHQUFHLElBQUksNkJBQVksRUFBRSxDQUFDO1lBQy9CLE9BQU8sR0FBRyxTQUFTLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3hFLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLGlCQUFpQixHQUFHLElBQUksdUNBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDdEMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUU7Z0JBQzNFLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFFekQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHlFQUF5RSxFQUFFO2dCQUM1RSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTFELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXpELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwQ0Qsb0JBb0NDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytjYXJ0L3NlcnZpY2VzL2NhcnQtYXNzZXQucmVzb2x2ZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhcnRBc3NldFJlc29sdmVyIH0gZnJvbSAnLi9jYXJ0LWFzc2V0LnJlc29sdmVyJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ2FydCBBc3NldCBSZXNvbHZlcicsICgpID0+IHtcbiAgICBjb25zdCBtb2NrUm91dGU6IGFueSA9IHsgcGFyYW1zOiB7IHV1aWQ6ICdhYmMtMTIzJyB9IH07XG4gICAgbGV0IHJlc29sdmVyVW5kZXJUZXN0OiBDYXJ0QXNzZXRSZXNvbHZlciwgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmUsIGxvYWRTcHk6IGphc21pbmUuU3B5LCByZXNvbHZlZDogamFzbWluZS5TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGxvYWRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnYXNzZXQnLCAnbG9hZENhcnRBc3NldCcpO1xuICAgICAgcmVzb2x2ZWQgPSBqYXNtaW5lLmNyZWF0ZVNweSgncmVzb2x2ZWQnKTtcbiAgICAgIHJlc29sdmVyVW5kZXJUZXN0ID0gbmV3IENhcnRBc3NldFJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCB0aGUgcHJvcGVyIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWJjLTEyMycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgbm90IHJlc29sdmUgaWYgdGhlIENhcnQgQXNzZXQgc3RvcmUgaGFzIG5vIGRhdGEgZnJvbSB0aGUgc2VydmVyJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdhc3NldCcsIHsgbG9hZGluZzogdHJ1ZSB9KTtcblxuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcblxuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCByZXNvbHZlIGlmIHRoZSBDYXJ0IEFzc2V0IHN0b3JlIGFscmVhZHkgaGFzIGRhdGEgZnJvbSB0aGUgc2VydmVyJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdhc3NldCcsIHsgbG9hZGluZzogZmFsc2UgfSk7XG5cbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpLnN1YnNjcmliZShyZXNvbHZlZCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19

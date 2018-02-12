"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_edit_asset_resolver_1 = require("./quote-edit-asset.resolver");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Quote Edit Asset Resolver', function () {
        var mockRoute = { params: { uuid: 'abc-123' } };
        var resolverUnderTest, mockStore, loadSpy, resolved;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            loadSpy = mockStore.createActionFactoryMethod('asset', 'loadQuoteEditAsset');
            resolved = jasmine.createSpy('resolved');
            resolverUnderTest = new quote_edit_asset_resolver_1.QuoteEditAssetResolver(mockStore);
        });
        describe('resolve()', function () {
            it('should dispatch the proper action', function () {
                resolverUnderTest.resolve(mockRoute);
                expect(loadSpy).toHaveBeenCalledWith('abc-123');
            });
            it('Should not resolve if the Quote Asset store has no data from the server', function () {
                mockStore.createStateSection('asset', { loading: true });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('Should resolve if the Quote Asset store already has data from the server', function () {
                mockStore.createStateSection('asset', { loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQtYXNzZXQucmVzb2x2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlFQUFxRTtBQUNyRSw2RUFBMEU7QUFFMUU7SUFDRSxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsSUFBTSxTQUFTLEdBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQztRQUN2RCxJQUFJLGlCQUF5QyxFQUFFLFNBQXVCLEVBQUUsT0FBb0IsRUFBRSxRQUFxQixDQUFDO1FBRXBILFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixPQUFPLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQzdFLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLGlCQUFpQixHQUFHLElBQUksa0RBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLEVBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDdEMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMseUVBQXlFLEVBQUU7Z0JBQzVFLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFFekQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLDBFQUEwRSxFQUFFO2dCQUM3RSxTQUFTLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBRTFELGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXpELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwQ0Qsb0JBb0NDO0FBQUEsQ0FBQyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9zZXJ2aWNlcy9xdW90ZS1lZGl0LWFzc2V0LnJlc29sdmVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdW90ZUVkaXRBc3NldFJlc29sdmVyIH0gZnJvbSAnLi9xdW90ZS1lZGl0LWFzc2V0LnJlc29sdmVyJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgRWRpdCBBc3NldCBSZXNvbHZlcicsICgpID0+IHtcbiAgICBjb25zdCBtb2NrUm91dGU6IGFueSA9IHsgcGFyYW1zOiB7IHV1aWQ6ICdhYmMtMTIzJyB9IH07XG4gICAgbGV0IHJlc29sdmVyVW5kZXJUZXN0OiBRdW90ZUVkaXRBc3NldFJlc29sdmVyLCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZSwgbG9hZFNweTogamFzbWluZS5TcHksIHJlc29sdmVkOiBqYXNtaW5lLlNweTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgbG9hZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdhc3NldCcsICdsb2FkUXVvdGVFZGl0QXNzZXQnKTtcbiAgICAgIHJlc29sdmVkID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgICByZXNvbHZlclVuZGVyVGVzdCA9IG5ldyBRdW90ZUVkaXRBc3NldFJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCB0aGUgcHJvcGVyIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpO1xuXG4gICAgICAgIGV4cGVjdChsb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnYWJjLTEyMycpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgbm90IHJlc29sdmUgaWYgdGhlIFF1b3RlIEFzc2V0IHN0b3JlIGhhcyBubyBkYXRhIGZyb20gdGhlIHNlcnZlcicsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGxvYWRpbmc6IHRydWUgfSk7XG5cbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpLnN1YnNjcmliZShyZXNvbHZlZCk7XG5cbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS5ub3QudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdTaG91bGQgcmVzb2x2ZSBpZiB0aGUgUXVvdGUgQXNzZXQgc3RvcmUgYWxyZWFkeSBoYXMgZGF0YSBmcm9tIHRoZSBzZXJ2ZXInLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2Fzc2V0JywgeyBsb2FkaW5nOiBmYWxzZSB9KTtcblxuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tSb3V0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcblxuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=

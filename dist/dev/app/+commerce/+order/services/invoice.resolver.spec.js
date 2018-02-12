"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
var invoice_resolver_1 = require("./invoice.resolver");
function main() {
    describe('Invoice Resolver', function () {
        var mockRoute = { params: { id: '9001' } };
        var resolverUnderTest;
        var mockStore;
        var loadSpy;
        var resolved;
        beforeEach(function () {
            mockStore = new mock_app_store_1.MockAppStore();
            loadSpy = mockStore.createActionFactoryMethod('invoice', 'load');
            resolved = jasmine.createSpy('resolved');
            resolverUnderTest = new invoice_resolver_1.InvoiceResolver(mockStore);
        });
        describe('resolve()', function () {
            describe('dispatchs the proper action', function () {
                it('without a share key', function () {
                    resolverUnderTest.resolve(mockRoute);
                    expect(loadSpy).toHaveBeenCalledWith(9001);
                });
                it('with a share key', function () {
                    var mockRoute = { params: { id: '9001', share_key: 'abc-123' } };
                    resolverUnderTest.resolve(mockRoute);
                    expect(loadSpy).toHaveBeenCalledWith(9001, 'abc-123');
                });
            });
            it('does not resolve if the Invoice store has no data from the server', function () {
                mockStore.createStateSection('invoice', { loading: true });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
            it('resolves if the Invoice store already has data from the server', function () {
                mockStore.createStateSection('asset', { loading: false });
                resolverUnderTest.resolve(mockRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL2ludm9pY2UucmVzb2x2ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUEwRTtBQUMxRSx1REFBcUQ7QUFFckQ7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsSUFBTSxTQUFTLEdBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUNsRCxJQUFJLGlCQUFrQyxDQUFDO1FBQ3ZDLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLE9BQW9CLENBQUM7UUFDekIsSUFBSSxRQUFxQixDQUFDO1FBRTFCLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixPQUFPLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNqRSxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6QyxpQkFBaUIsR0FBRyxJQUFJLGtDQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTtnQkFDdEMsRUFBRSxDQUFDLHFCQUFxQixFQUFFO29CQUN4QixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGtCQUFrQixFQUFFO29CQUNyQixJQUFNLFNBQVMsR0FBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUM7b0JBQ3hFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxtRUFBbUUsRUFBRTtnQkFDdEUsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsZ0VBQWdFLEVBQUU7Z0JBQ25FLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFDRCxvQkEwQ0M7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL2ludm9pY2UucmVzb2x2ZXIuc3BlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5pbXBvcnQgeyBJbnZvaWNlUmVzb2x2ZXIgfSBmcm9tICcuL2ludm9pY2UucmVzb2x2ZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0ludm9pY2UgUmVzb2x2ZXInLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja1JvdXRlOiBhbnkgPSB7IHBhcmFtczogeyBpZDogJzkwMDEnIH0gfTtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IEludm9pY2VSZXNvbHZlcjtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IGxvYWRTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCByZXNvbHZlZDogamFzbWluZS5TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGxvYWRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnaW52b2ljZScsICdsb2FkJyk7XG4gICAgICByZXNvbHZlZCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXNvbHZlZCcpO1xuICAgICAgcmVzb2x2ZXJVbmRlclRlc3QgPSBuZXcgSW52b2ljZVJlc29sdmVyKG1vY2tTdG9yZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2Rpc3BhdGNocyB0aGUgcHJvcGVyIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgaXQoJ3dpdGhvdXQgYSBzaGFyZSBrZXknLCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpO1xuICAgICAgICAgIGV4cGVjdChsb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCg5MDAxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3dpdGggYSBzaGFyZSBrZXknLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW9ja1JvdXRlOiBhbnkgPSB7IHBhcmFtczogeyBpZDogJzkwMDEnLCBzaGFyZV9rZXk6ICdhYmMtMTIzJyB9IH07XG4gICAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUpO1xuICAgICAgICAgIGV4cGVjdChsb2FkU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCg5MDAxLCAnYWJjLTEyMycpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3QgcmVzb2x2ZSBpZiB0aGUgSW52b2ljZSBzdG9yZSBoYXMgbm8gZGF0YSBmcm9tIHRoZSBzZXJ2ZXInLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2ludm9pY2UnLCB7IGxvYWRpbmc6IHRydWUgfSk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Jlc29sdmVzIGlmIHRoZSBJbnZvaWNlIHN0b3JlIGFscmVhZHkgaGFzIGRhdGEgZnJvbSB0aGUgc2VydmVyJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdhc3NldCcsIHsgbG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja1JvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG4iXX0=

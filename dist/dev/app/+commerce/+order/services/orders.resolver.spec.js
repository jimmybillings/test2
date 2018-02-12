"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var orders_resolver_1 = require("./orders.resolver");
function main() {
    describe('Orders Resolver', function () {
        var mockOrdersService;
        var mockRoute;
        var mockState;
        var resolverUnderTest;
        var resolved;
        beforeEach(function () {
            mockOrdersService = {
                getOrders: jasmine.createSpy('getOrders({d:true,n:20}) spy').and.returnValue(Observable_1.Observable.of({}))
            };
            mockRoute = {
                params: Observable_1.Observable.of({ d: true, i: 0, n: 1, s: 'createdOn' }),
                snapshot: { url: [{}] }
            };
            mockState = undefined;
            resolved = jasmine.createSpy('resolved');
            resolverUnderTest = new orders_resolver_1.OrdersResolver(mockOrdersService);
        });
        describe('resolve()', function () {
            var returnedObservable;
            it('tells the orders service to get orders data', function () {
                resolverUnderTest.resolve(mockRoute, mockState).subscribe(resolved);
                expect(mockOrdersService.getOrders).toHaveBeenCalled();
            });
            it('resolves', function () {
                resolverUnderTest.resolve(mockRoute, mockState).subscribe(resolved);
                expect(resolved).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVycy5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBRTdDLHFEQUFtRDtBQUVuRDtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGlCQUFzQixDQUFDO1FBQzNCLElBQUksU0FBYyxDQUFDO1FBQ25CLElBQUksU0FBYyxDQUFDO1FBQ25CLElBQUksaUJBQWlDLENBQUM7UUFDdEMsSUFBSSxRQUFxQixDQUFDO1FBRTFCLFVBQVUsQ0FBQztZQUNULGlCQUFpQixHQUFHO2dCQUNsQixTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDaEcsQ0FBQztZQUVGLFNBQVMsR0FBRztnQkFDVixNQUFNLEVBQUUsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUM7Z0JBQzlELFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2FBQ3hCLENBQUM7WUFFRixTQUFTLEdBQUcsU0FBUyxDQUFDO1lBRXRCLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLGlCQUFpQixHQUFHLElBQUksZ0NBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLGtCQUFtQyxDQUFDO1lBRXhDLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3BFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLFVBQVUsRUFBRTtnQkFDYixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZDRCxvQkF1Q0M7QUFBQSxDQUFDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVycy5yZXNvbHZlci5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IE9yZGVyc1Jlc29sdmVyIH0gZnJvbSAnLi9vcmRlcnMucmVzb2x2ZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ09yZGVycyBSZXNvbHZlcicsICgpID0+IHtcbiAgICBsZXQgbW9ja09yZGVyc1NlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja1JvdXRlOiBhbnk7XG4gICAgbGV0IG1vY2tTdGF0ZTogYW55O1xuICAgIGxldCByZXNvbHZlclVuZGVyVGVzdDogT3JkZXJzUmVzb2x2ZXI7XG4gICAgbGV0IHJlc29sdmVkOiBqYXNtaW5lLlNweTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja09yZGVyc1NlcnZpY2UgPSB7XG4gICAgICAgIGdldE9yZGVyczogamFzbWluZS5jcmVhdGVTcHkoJ2dldE9yZGVycyh7ZDp0cnVlLG46MjB9KSBzcHknKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpXG4gICAgICB9O1xuXG4gICAgICBtb2NrUm91dGUgPSB7XG4gICAgICAgIHBhcmFtczogT2JzZXJ2YWJsZS5vZih7IGQ6IHRydWUsIGk6IDAsIG46IDEsIHM6ICdjcmVhdGVkT24nIH0pLFxuICAgICAgICBzbmFwc2hvdDogeyB1cmw6IFt7fV0gfVxuICAgICAgfTtcblxuICAgICAgbW9ja1N0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICByZXNvbHZlZCA9IGphc21pbmUuY3JlYXRlU3B5KCdyZXNvbHZlZCcpO1xuXG4gICAgICByZXNvbHZlclVuZGVyVGVzdCA9IG5ldyBPcmRlcnNSZXNvbHZlcihtb2NrT3JkZXJzU2VydmljZSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IHJldHVybmVkT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxhbnk+O1xuXG4gICAgICBpdCgndGVsbHMgdGhlIG9yZGVycyBzZXJ2aWNlIHRvIGdldCBvcmRlcnMgZGF0YScsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUsIG1vY2tTdGF0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgZXhwZWN0KG1vY2tPcmRlcnNTZXJ2aWNlLmdldE9yZGVycykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXNvbHZlcycsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZXJVbmRlclRlc3QucmVzb2x2ZShtb2NrUm91dGUsIG1vY2tTdGF0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcbiAgICAgICAgZXhwZWN0KHJlc29sdmVkKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl19

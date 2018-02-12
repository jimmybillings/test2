"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quotes_resolver_1 = require("./quotes.resolver");
var Observable_1 = require("rxjs/Observable");
function main() {
    describe('Quotes Resolver', function () {
        var resolverUnderTest, mockQuotesService, mockActivatedRoute, mockRouterState, mockCapabilities;
        function instantiator(mockQuotesState) {
            mockQuotesService = {
                data: Observable_1.Observable.of(mockQuotesState),
                getQuotes: jasmine.createSpy('getQuotes').and.returnValue(Observable_1.Observable.of([{ some: 'quote' }, { another: 'quote' }]))
            };
            mockCapabilities = { administerQuotes: function () { return false; } };
            mockActivatedRoute = { params: { s: 'createdOn' } };
            resolverUnderTest = new quotes_resolver_1.QuotesResolver(mockQuotesService, mockCapabilities);
        }
        describe('resolve()', function () {
            var resolved;
            beforeEach(function () {
                resolved = jasmine.createSpy('resolved');
            });
            it('should call \'getQuotes\' on the quotesService with the correct params', function () {
                instantiator({ items: [{}] });
                resolverUnderTest.resolve(mockActivatedRoute);
                expect(mockQuotesService.getQuotes).toHaveBeenCalledWith(false, { s: 'createdOn' });
            });
            it('should resolve if there is data in the store', function () {
                instantiator({ items: [{}] });
                resolverUnderTest.resolve(mockActivatedRoute).subscribe(resolved);
                expect(resolved).toHaveBeenCalled();
            });
            it('should not resolve if there is not data in the store', function () {
                instantiator({ items: null });
                resolverUnderTest.resolve(mockActivatedRoute).subscribe(resolved);
                expect(resolved).not.toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3Rlcy5yZXNvbHZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQW1EO0FBQ25ELDhDQUE2QztBQUU3QztJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLGlCQUFpQyxFQUFFLGlCQUFzQixFQUMzRCxrQkFBdUIsRUFBRSxlQUFvQixFQUFFLGdCQUFxQixDQUFDO1FBRXZFLHNCQUFzQixlQUFvQjtZQUN4QyxpQkFBaUIsR0FBRztnQkFDbEIsSUFBSSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDcEMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FDdkQsdUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQ3pEO2FBQ0YsQ0FBQztZQUNGLGdCQUFnQixHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsY0FBTSxPQUFBLEtBQUssRUFBTCxDQUFLLEVBQUUsQ0FBQztZQUNyRCxrQkFBa0IsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDO1lBQ3BELGlCQUFpQixHQUFHLElBQUksZ0NBQWMsQ0FBQyxpQkFBaUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksUUFBcUIsQ0FBQztZQUUxQixVQUFVLENBQUM7Z0JBQ1QsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsd0VBQXdFLEVBQUU7Z0JBQzNFLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDOUIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBRTlDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN0RixDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtnQkFDakQsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWxFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHNEQUFzRCxFQUFFO2dCQUN6RCxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDOUIsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVsRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTlDRCxvQkE4Q0MiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvc2VydmljZXMvcXVvdGVzLnJlc29sdmVyLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdW90ZXNSZXNvbHZlciB9IGZyb20gJy4vcXVvdGVzLnJlc29sdmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ1F1b3RlcyBSZXNvbHZlcicsICgpID0+IHtcbiAgICBsZXQgcmVzb2x2ZXJVbmRlclRlc3Q6IFF1b3Rlc1Jlc29sdmVyLCBtb2NrUXVvdGVzU2VydmljZTogYW55LFxuICAgICAgbW9ja0FjdGl2YXRlZFJvdXRlOiBhbnksIG1vY2tSb3V0ZXJTdGF0ZTogYW55LCBtb2NrQ2FwYWJpbGl0aWVzOiBhbnk7XG5cbiAgICBmdW5jdGlvbiBpbnN0YW50aWF0b3IobW9ja1F1b3Rlc1N0YXRlOiBhbnkpIHtcbiAgICAgIG1vY2tRdW90ZXNTZXJ2aWNlID0ge1xuICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKG1vY2tRdW90ZXNTdGF0ZSksXG4gICAgICAgIGdldFF1b3RlczogamFzbWluZS5jcmVhdGVTcHkoJ2dldFF1b3RlcycpLmFuZC5yZXR1cm5WYWx1ZShcbiAgICAgICAgICBPYnNlcnZhYmxlLm9mKFt7IHNvbWU6ICdxdW90ZScgfSwgeyBhbm90aGVyOiAncXVvdGUnIH1dKVxuICAgICAgICApXG4gICAgICB9O1xuICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHsgYWRtaW5pc3RlclF1b3RlczogKCkgPT4gZmFsc2UgfTtcbiAgICAgIG1vY2tBY3RpdmF0ZWRSb3V0ZSA9IHsgcGFyYW1zOiB7IHM6ICdjcmVhdGVkT24nIH0gfTtcbiAgICAgIHJlc29sdmVyVW5kZXJUZXN0ID0gbmV3IFF1b3Rlc1Jlc29sdmVyKG1vY2tRdW90ZXNTZXJ2aWNlLCBtb2NrQ2FwYWJpbGl0aWVzKTtcbiAgICB9XG5cbiAgICBkZXNjcmliZSgncmVzb2x2ZSgpJywgKCkgPT4ge1xuICAgICAgbGV0IHJlc29sdmVkOiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmVkID0gamFzbWluZS5jcmVhdGVTcHkoJ3Jlc29sdmVkJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBjYWxsIFxcJ2dldFF1b3Rlc1xcJyBvbiB0aGUgcXVvdGVzU2VydmljZSB3aXRoIHRoZSBjb3JyZWN0IHBhcmFtcycsICgpID0+IHtcbiAgICAgICAgaW5zdGFudGlhdG9yKHsgaXRlbXM6IFt7fV0gfSk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja0FjdGl2YXRlZFJvdXRlKTtcblxuICAgICAgICBleHBlY3QobW9ja1F1b3Rlc1NlcnZpY2UuZ2V0UXVvdGVzKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChmYWxzZSwgeyBzOiAnY3JlYXRlZE9uJyB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJlc29sdmUgaWYgdGhlcmUgaXMgZGF0YSBpbiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIGluc3RhbnRpYXRvcih7IGl0ZW1zOiBbe31dIH0pO1xuICAgICAgICByZXNvbHZlclVuZGVyVGVzdC5yZXNvbHZlKG1vY2tBY3RpdmF0ZWRSb3V0ZSkuc3Vic2NyaWJlKHJlc29sdmVkKTtcblxuICAgICAgICBleHBlY3QocmVzb2x2ZWQpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIG5vdCByZXNvbHZlIGlmIHRoZXJlIGlzIG5vdCBkYXRhIGluIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgaW5zdGFudGlhdG9yKHsgaXRlbXM6IG51bGwgfSk7XG4gICAgICAgIHJlc29sdmVyVW5kZXJUZXN0LnJlc29sdmUobW9ja0FjdGl2YXRlZFJvdXRlKS5zdWJzY3JpYmUocmVzb2x2ZWQpO1xuXG4gICAgICAgIGV4cGVjdChyZXNvbHZlZCkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

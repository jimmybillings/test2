import { QuotesResolver } from './quotes.resolver';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Quotes Resolver', () => {
    let resolverUnderTest: QuotesResolver, mockQuotesService: any,
      mockActivatedRoute: any, mockRouterState: any, mockCapabilities: any;

    function instantiator(mockQuotesState: any) {
      mockQuotesService = {
        data: Observable.of(mockQuotesState),
        getQuotes: jasmine.createSpy('getQuotes').and.returnValue(
          Observable.of([{ some: 'quote' }, { another: 'quote' }])
        )
      };
      mockCapabilities = { administerQuotes: () => false };
      mockActivatedRoute = { params: { s: 'createdOn' } };
      resolverUnderTest = new QuotesResolver(mockQuotesService, mockCapabilities);
    }

    describe('resolve()', () => {
      let resolved: jasmine.Spy;

      beforeEach(() => {
        resolved = jasmine.createSpy('resolved');
      });

      it('should call \'getQuotes\' on the quotesService with the correct params', () => {
        instantiator({ items: [{}] });
        resolverUnderTest.resolve(mockActivatedRoute);

        expect(mockQuotesService.getQuotes).toHaveBeenCalledWith(false, { s: 'createdOn' });
      });

      it('should resolve if there is data in the store', () => {
        instantiator({ items: [{}] });
        resolverUnderTest.resolve(mockActivatedRoute).subscribe(resolved);

        expect(resolved).toHaveBeenCalled();
      });

      it('should not resolve if there is not data in the store', () => {
        instantiator({ items: null });
        resolverUnderTest.resolve(mockActivatedRoute).subscribe(resolved);

        expect(resolved).not.toHaveBeenCalled();
      });
    });
  });
}

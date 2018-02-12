import { Observable } from 'rxjs/Observable';
import { CollectionsResolver } from './collections.resolver';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export function main() {
  describe('Collections Resolver', () => {
    let resolverUnderTest: CollectionsResolver;
    let mockCollectionsService: any;
    let mockState: BehaviorSubject<any>;
    let resolved: jasmine.Spy;

    function instantiator(initialState: any) {
      mockState = new BehaviorSubject<any>({ items: [] });

      mockCollectionsService = {
        data: mockState.asObservable(),
        reset: jasmine.createSpy('reset').and.callFake(() => { mockState.next({ items: [] }); }),
        load: jasmine.createSpy('load').and.returnValue(Observable.of('whatever')),
      };

      resolverUnderTest = new CollectionsResolver(mockCollectionsService);
      resolved = jasmine.createSpy('resolved');
    }

    describe('resolve()', () => {
      const tests: { description: string, initialState: any }[] = [
        { description: 'no items', initialState: { items: [] } },
        { description: 'items', initialState: { items: [{ some: 'collection' }] } }
      ];

      tests.forEach(test => {
        describe(`when there are ${test.description} in the store`, () => {
          beforeEach(() => {
            instantiator(test.initialState);
          });

          it('should call reset() and load() on the collections service', () => {
            resolverUnderTest.resolve().subscribe();

            expect(mockCollectionsService.reset).toHaveBeenCalled();
            expect(mockCollectionsService.load).toHaveBeenCalled();
          });

          it('should not resolve until the data is ready', () => {
            resolverUnderTest.resolve().subscribe(resolved);

            expect(resolved).not.toHaveBeenCalled();

            mockState.next({ items: [{ some: 'collection' }] });

            expect(resolved).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
}

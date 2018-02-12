import { Observable } from 'rxjs/Observable';

import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { QuoteShowResolver } from './quote-show.resolver';

export function main() {
  describe('Quote Show Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: QuoteShowResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new QuoteShowResolver(mockStore);
    });

    describe('resolve()', () => {
      let mockRoute: any;
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        mockRoute = { params: { id: '1234' } };
        loadSpy = mockStore.createActionFactoryMethod('quoteShow', 'load');
        resolved = jasmine.createSpy('resolved');
        mockStore.createStateSection('quoteShow', { data: { id: 5678 }, loading: true });
      });

      it('dispatches an action', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        mockStore.expectDispatchFor(loadSpy, 1234);
      });

      it('doesn\'t return when the loading flag is true', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        expect(resolved).not.toHaveBeenCalled();
      });

      it('returns when the loading flag is false', () => {
        mockStore.createStateSection('quoteShow', { data: { id: 5678 }, loading: false });

        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        expect(resolved).toHaveBeenCalledWith(true);
      });
    });
  });
};

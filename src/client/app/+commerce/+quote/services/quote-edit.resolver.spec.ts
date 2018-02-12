import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { QuoteEditResolver } from './quote-edit.resolver';

export function main() {
  describe('Quote Edit Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: QuoteEditResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new QuoteEditResolver(mockStore);
    });

    describe('resolve()', () => {
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        loadSpy = mockStore.createActionFactoryMethod('quoteEdit', 'load');
        resolved = jasmine.createSpy('resolved');
        mockStore.createStateSection('quoteEdit', { loading: true });
      });

      it('dispatches an action', () => {
        resolverUnderTest.resolve().subscribe(resolved);
        mockStore.expectDispatchFor(loadSpy);
      });

      it('doesn\'t return when the loading flag is true', () => {
        resolverUnderTest.resolve().subscribe(resolved);
        expect(resolved).not.toHaveBeenCalled();
      });

      it('returns when the loading flag is false', () => {
        mockStore.createStateSection('quoteEdit', { loading: false });
        resolverUnderTest.resolve().subscribe(resolved);
        expect(resolved).toHaveBeenCalledWith(true);
      });
    });
  });
};

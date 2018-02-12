import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { CartResolver } from './cart.resolver';

export function main() {
  describe('Cart Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: CartResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new CartResolver(mockStore);
    });

    describe('resolve()', () => {
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        loadSpy = mockStore.createActionFactoryMethod('cart', 'load');
        resolved = jasmine.createSpy('resolved');
        mockStore.createStateSection('cart', { loading: true });
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
        mockStore.createStateSection('cart', { loading: false });
        resolverUnderTest.resolve().subscribe(resolved);
        expect(resolved).toHaveBeenCalledWith(true);
      });
    });
  });
};

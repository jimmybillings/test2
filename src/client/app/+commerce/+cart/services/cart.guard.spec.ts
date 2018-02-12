import { CartGuard } from './cart.guard';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Guard', () => {
    let mockCommerceCapabilities: any;
    let mockStore: MockAppStore;

    describe('canActivate()', () => {
      let viewCarts: boolean;
      let errorSpy: jasmine.Spy;

      beforeEach(() => {
        mockCommerceCapabilities = { addToCart: () => viewCarts };
        mockStore = new MockAppStore();
        errorSpy = mockStore.createActionFactoryMethod('error', 'handle403Forbidden');
      });

      it('returns true when logged in', () => {
        viewCarts = true;

        expect(new CartGuard(mockCommerceCapabilities, mockStore).canActivate(null, null))
          .toBe(true);
        expect(errorSpy).not.toHaveBeenCalled();
      });

      it('returns false when not logged in', () => {
        viewCarts = false;

        expect(new CartGuard(mockCommerceCapabilities, mockStore).canActivate(null, null))
          .toBe(false);
        mockStore.expectDispatchFor(errorSpy);
      });
    });
  });
};

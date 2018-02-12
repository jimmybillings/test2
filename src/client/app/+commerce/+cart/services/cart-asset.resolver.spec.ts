import { CartAssetResolver } from './cart-asset.resolver';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Asset Resolver', () => {
    const mockRoute: any = { params: { uuid: 'abc-123' } };
    let resolverUnderTest: CartAssetResolver, mockStore: MockAppStore, loadSpy: jasmine.Spy, resolved: jasmine.Spy;

    beforeEach(() => {
      mockStore = new MockAppStore();
      loadSpy = mockStore.createActionFactoryMethod('asset', 'loadCartAsset');
      resolved = jasmine.createSpy('resolved');
      resolverUnderTest = new CartAssetResolver(mockStore);
    });

    describe('resolve()', () => {
      it('should dispatch the proper action', () => {
        resolverUnderTest.resolve(mockRoute);

        expect(loadSpy).toHaveBeenCalledWith('abc-123');
      });

      it('Should not resolve if the Cart Asset store has no data from the server', () => {
        mockStore.createStateSection('asset', { loading: true });

        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        expect(resolved).not.toHaveBeenCalled();
      });

      it('Should resolve if the Cart Asset store already has data from the server', () => {
        mockStore.createStateSection('asset', { loading: false });

        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        expect(resolved).toHaveBeenCalled();
      });
    });
  });
};

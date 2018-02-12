import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { OrderAssetResolver } from './order-asset.resolver';

export function main() {
  describe('Order Asset Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: OrderAssetResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new OrderAssetResolver(mockStore);
    });

    describe('resolve()', () => {
      let mockRoute: any;
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        mockRoute = { params: { id: '1234', uuid: 'ABCD' } };
        loadSpy = mockStore.createActionFactoryMethod('asset', 'loadOrderAsset');
        resolved = jasmine.createSpy('resolved');
        mockStore.createStateSection('asset', { activeAsset: { id: 5678 }, loading: true });
      });

      it('dispatches an action', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        mockStore.expectDispatchFor(loadSpy, 1234, 'ABCD');
      });

      it('doesn\'t return when the loading flag is true', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        expect(resolved).not.toHaveBeenCalled();
      });

      it('returns when the loading flag is false', () => {
        mockStore.createStateSection('asset', { activeAsset: { id: 1234 }, loading: false });
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        expect(resolved).toHaveBeenCalledWith(true);
      });
    });
  });
};

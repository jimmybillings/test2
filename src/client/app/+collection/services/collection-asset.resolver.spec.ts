import { Observable } from 'rxjs/Observable';

import { MockAppStore } from '../../store/spec-helpers/mock-app.store';
import { CollectionAssetResolver } from './collection-asset.resolver';

export function main() {
  describe('Collection Asset Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: CollectionAssetResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new CollectionAssetResolver(mockStore);
    });

    describe('resolve()', () => {
      let mockRoute: any;
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        mockRoute = { params: { uuid: 'abc-123' } };
        loadSpy = mockStore.createActionFactoryMethod('asset', 'loadActiveCollectionAsset');
        resolved = jasmine.createSpy('resolved');
        mockStore.createStateSection('asset', { activeAsset: { id: 123 }, loading: true });
      });

      it('dispatches an action', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        mockStore.expectDispatchFor(loadSpy, 'abc-123');
      });

      it('doesn\'t return when the loading flag is true', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        expect(resolved).not.toHaveBeenCalled();
      });

      it('returns when the loading flag is false', () => {
        mockStore.createStateSection('asset', { activeAsset: { id: 123 }, loading: false });
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        expect(resolved).toHaveBeenCalledWith(true);
      });
    });
  });
}

import { Observable } from 'rxjs/Observable';

import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { QuoteShowAssetResolver } from './quote-show-asset.resolver';

export function main() {
  describe('Quote Show Asset Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: QuoteShowAssetResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new QuoteShowAssetResolver(mockStore);
    });

    describe('resolve()', () => {
      let mockRoute: any;
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        mockRoute = { params: { id: '1234', uuid: 'ABCD' } };
        loadSpy = mockStore.createActionFactoryMethod('asset', 'loadQuoteShowAsset');
        resolved = jasmine.createSpy('resolver subscription function');
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

import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { SearchAssetResolver } from './search-asset.resolver';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Search Asset Resolver', () => {
    let resolverUnderTest: SearchAssetResolver;
    let mockStore: MockAppStore;

    const relevantParameters = {
      id: 'some id', share_key: 'some share_key', timeEnd: 'some timeEnd', timeStart: 'some timeStart'
    };
    const mockRoute = { params: { ...relevantParameters, other: 'useless stuff' } };

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new SearchAssetResolver(mockStore);
    });

    describe('resolve()', () => {
      it('dispatches the expected action', () => {
        mockStore.createStateElement('asset', 'loading', true);
        const spy = mockStore.createActionFactoryMethod('asset', 'loadSearchAsset');

        resolverUnderTest.resolve(mockRoute as any);

        mockStore.expectDispatchFor(spy, relevantParameters);
      });

      describe('returns an Observable that', () => {
        beforeEach(() => {
          mockStore.createActionFactoryMethod('asset', 'loadSearchAsset');
        });

        it('does not emit when the asset is still loading', () => {
          mockStore.createStateElement('asset', 'loading', true);

          expect(() => {
            resolverUnderTest.resolve(mockRoute as any).subscribe(() => {
              throw new Error('Should not get here!');
            });
          }).not.toThrow();
        });

        it('emits when the asset is done loading', () => {
          mockStore.createStateElement('asset', 'loading', false);

          expect(() => {
            resolverUnderTest.resolve(mockRoute as any).subscribe(() => {
              throw new Error('Should get here!');
            });
          }).toThrow();
        });
      });
    });
  });
};

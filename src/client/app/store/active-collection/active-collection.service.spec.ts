import { Observable } from 'rxjs/Observable';

import { ActiveCollectionService } from './active-collection.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { SubclipMarkers } from '../../shared/interfaces/subclip-markers';
import { Api } from '../../shared/interfaces/api.interface';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';

export function main() {
  describe('Active Collection Service', () => {
    let serviceUnderTest: ActiveCollectionService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new ActiveCollectionService(mockApiService.injector);
    });

    describe('load()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.load({ currentPage: 1, pageSize: 42 });

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/focused');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('also calls the API correctly to get assets for the loaded collection', () => {
        mockApiService.getResponse = { id: 10836 };

        serviceUnderTest.load({ currentPage: 1, pageSize: 42 }).take(1).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/10836');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '42' });
      });

      it('returns the expected observable', () => {
        mockApiService.getResponse = [
          { id: 10836 },
          {
            items: [
              { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
              { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
            ],
            totalCount: 2,
            currentPage: 0,
            pageSize: 42,
            hasNextPage: false,
            hasPreviousPage: false,
            numberOfPages: 1
          }
        ];

        serviceUnderTest.load({ currentPage: 1, pageSize: 42 }).take(1).subscribe(response => {
          expect(response).toEqual({
            id: 10836,
            assets: {
              items: [
                { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
              ],
              pagination: {
                totalCount: 2,
                currentPage: 1,
                pageSize: 42,
                hasNextPage: false,
                hasPreviousPage: false,
                numberOfPages: 1
              }
            }
          });
        });
      });
    });

    describe('set()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.set(999, { currentPage: 1, pageSize: 42 });

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('collectionSummary/setFocused/999');
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });

      it('also calls the API correctly to get assets for the new active collection', () => {
        mockApiService.putResponse = { id: 999 };

        serviceUnderTest.set(999, { currentPage: 1, pageSize: 42 }).take(1).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/999');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '42' });
      });

      it('returns the expected observable', () => {
        mockApiService.putResponse = { id: 999 };
        mockApiService.getResponse = {
          items: [
            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
          ],
          totalCount: 2,
          currentPage: 0,
          pageSize: 42,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1
        };

        serviceUnderTest.set(999, { currentPage: 1, pageSize: 42 }).take(1).subscribe(response => {
          expect(response).toEqual({
            id: 999,
            assets: {
              items: [
                { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
              ],
              pagination: {
                totalCount: 2,
                currentPage: 1,
                pageSize: 42,
                hasNextPage: false,
                hasPreviousPage: false,
                numberOfPages: 1
              }
            }
          });
        });
      });
    });

    describe('loadPage()', () => {
      it('calls the API correctly', () => {
        mockApiService.getResponse = { id: 10836 };

        serviceUnderTest.load({ currentPage: 3, pageSize: 10 }).take(1).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/10836');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '2', n: '10' });
      });

      it('returns the expected observable', () => {
        mockApiService.getResponse = {
          items: [
            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
          ],
          totalCount: 2,
          currentPage: 2,
          pageSize: 10,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1
        };

        serviceUnderTest.loadPage(10836, { currentPage: 3, pageSize: 10 }).take(1).subscribe(response => {
          expect(response).toEqual({
            items: [
              { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
              { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
            ],
            pagination: {
              totalCount: 2,
              currentPage: 3,
              pageSize: 10,
              hasNextPage: false,
              hasPreviousPage: false,
              numberOfPages: 1
            }
          });
        });
      });
    });

    describe('loadFocusedPage()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.loadFocusedPage({ currentPage: 3, pageSize: 10 }, null);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/focused');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '2', n: '10' });
      });

      it('returns the expected observable', () => {
        mockApiService.getResponse = {
          items: [
            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
          ],
          totalCount: 2,
          currentPage: 2,
          pageSize: 10,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1
        };

        serviceUnderTest.loadFocusedPage({ currentPage: 3, pageSize: 10 }, 10).take(1).subscribe(response => {
          expect(response).toEqual({
            totalAssetsAdded: 10,
            items: [
              { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
              { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
            ],
            pagination: {
              totalCount: 2,
              currentPage: 3,
              pageSize: 10,
              hasNextPage: false,
              hasPreviousPage: false,
              numberOfPages: 1
            }
          });
        });
      });
    });

    describe('addAssetTo()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.addAssetTo(
          { id: 17 } as any,
          { assetId: 234 } as any,
          { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) }
        );

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/addAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 234, timeStart: '1000', timeEnd: '2000' }] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API correctly with no markers', () => {
        serviceUnderTest.addAssetTo(
          { id: 17 } as any,
          { assetId: 234 } as any,
          undefined
        );

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/addAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 234, timeStart: '-1', timeEnd: '-2' }] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });

      it('also calls the API correctly to get the first page of assets for the updated active collection', () => {
        mockApiService.postResponse = { list: ['something'] };

        serviceUnderTest.addAssetTo(
          { id: 17, assets: { pagination: { pageSize: 200 } } } as any,
          { assetId: 234 } as any,
          { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) }
        ).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/17');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '200' });
      });

      it('returns the expected observable when the body has a list', () => {
        mockApiService.postResponse = { list: ['something'] };
        mockApiService.getResponse = {
          items: [
            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' },
            { id: 234, other: 'stuff', timeStart: '1000', timeEnd: '2000' }
          ],
          totalCount: 3,
          currentPage: 0,
          pageSize: 200,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1
        };

        serviceUnderTest.addAssetTo(
          { id: 17, assets: { pagination: { pageSize: 200 } } } as any,
          { assetId: 234 } as any,
          { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) }
        ).subscribe(response => {
          expect(response).toEqual({
            items: [
              { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
              { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 },
              { id: 234, other: 'stuff', timeStart: 1000, timeEnd: 2000 }
            ],
            pagination: {
              totalCount: 3,
              currentPage: 1,
              pageSize: 200,
              hasNextPage: false,
              hasPreviousPage: false,
              numberOfPages: 1
            }
          });
        });
      });

      it('returns the expected observable when the body does not have a list', () => {
        mockApiService.postResponse = {};
        serviceUnderTest.addAssetTo(
          { id: 17, assets: { pagination: { pageSize: 200 } } } as any,
          { assetId: 234 } as any,
          { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) }
        ).subscribe(response => {
          expect(response).toEqual({
            items: [], pagination: {}
          });
        });
      });
    });

    describe('removeAssetFrom()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.removeAssetFrom(
          { id: 19, assets: { pagination: {} } } as any,
          { uuid: 'ABCD' } as any
        );

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/removeAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: ['ABCD'] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API correctly when the asset to remove has no UUID', () => {
        serviceUnderTest.removeAssetFrom(
          {
            id: 19,
            assets: {
              items: [{ assetId: 1234, uuid: 'ABCD' }, { assetId: 4567, uuid: 'EFGH' }],
              pagination: { currentPage: 7, pageSize: 20 }
            }
          } as any,
          { assetId: 4567 } as any
        ).subscribe();

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/removeAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: ['EFGH'] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });

      it('also calls the API correctly to get the updated current page of assets', () => {
        mockApiService.postResponse = { some: 'response' };

        serviceUnderTest.removeAssetFrom(
          { id: 19, assets: { pagination: { currentPage: 7, pageSize: 20 } } } as any,
          { uuid: 'ABCD' } as any
        ).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/19');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '6', n: '20' });
      });

      it('returns the expected observable', () => {
        mockApiService.postResponse = { some: 'response' };
        mockApiService.getResponse = {
          items: [
            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
          ],
          totalCount: 2,
          currentPage: 6,
          pageSize: 20,
          hasNextPage: false,
          hasPreviousPage: true,
          numberOfPages: 7
        };

        serviceUnderTest.removeAssetFrom(
          { id: 19, assets: { pagination: { currentPage: 7, pageSize: 20 } } } as any,
          { uuid: 'ABCD' } as any
        ).subscribe(response => {
          expect(response).toEqual({
            items: [
              { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
              { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
            ],
            pagination: {
              totalCount: 2,
              currentPage: 7,
              pageSize: 20,
              hasNextPage: false,
              hasPreviousPage: true,
              numberOfPages: 7
            }
          });
        });
      });
    });

    describe('updateAssetMarkers()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.updateAssetMarkers(
          { id: 9876, assets: { pagination: {} } } as any,
          { assetId: 87, uuid: 'ABCD' } as any,
          { in: new Frame(30).setFromFrameNumber(90), out: new Frame(30).setFromFrameNumber(120) }
        );

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('collection/focused/updateAsset');
        expect(mockApiService.put).toHaveBeenCalledWithBody({ uuid: 'ABCD', assetId: 87, timeStart: '3000', timeEnd: '4000' });
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API correctly with no markers', () => {
        serviceUnderTest.updateAssetMarkers(
          { id: 9876, assets: { pagination: {} } } as any,
          { assetId: 87, uuid: 'ABCD' } as any,
          undefined
        );

        expect(mockApiService.put).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.put).toHaveBeenCalledWithEndpoint('collection/focused/updateAsset');
        expect(mockApiService.put).toHaveBeenCalledWithBody({ uuid: 'ABCD', assetId: 87, timeStart: '-1', timeEnd: '-2' });
        expect(mockApiService.put).toHaveBeenCalledWithLoading(true);
      });

      it('also calls the API correctly to get the updated current page of assets', () => {
        mockApiService.putResponse = { some: 'response' };

        serviceUnderTest.updateAssetMarkers(
          { id: 9876, assets: { pagination: { currentPage: 1, pageSize: 30 } } } as any,
          { assetId: 87, uuid: 'ABCD' } as any,
          { in: new Frame(30).setFromFrameNumber(90), out: new Frame(30).setFromFrameNumber(120) }
        ).subscribe();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('collectionSummary/assets/9876');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ i: '0', n: '30' });
      });

      it('returns the expected observable', () => {
        mockApiService.postResponse = { some: 'response' };
        mockApiService.getResponse = {
          items: [
            { id: 123, other: 'stuff', timeStart: '123', timeEnd: '456' },
            { id: 456, other: 'stuff', timeStart: '-1', timeEnd: '-2' }
          ],
          totalCount: 2,
          currentPage: 0,
          pageSize: 30,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1
        };

        serviceUnderTest.updateAssetMarkers(
          { id: 9876, assets: { pagination: { currentPage: 1, pageSize: 30 } } } as any,
          { assetId: 87, uuid: 'ABCD' } as any,
          { in: new Frame(30).setFromFrameNumber(90), out: new Frame(30).setFromFrameNumber(120) }
        ).subscribe(response => {
          expect(response).toEqual({
            items: [
              { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
              { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
            ],
            pagination: {
              totalCount: 2,
              currentPage: 1,
              pageSize: 30,
              hasNextPage: false,
              hasPreviousPage: false,
              numberOfPages: 1
            }
          });
        });
      });
    });

    describe('addAssetsToFocusedCollection()', () => {
      it('calls the apiService correctly', () => {
        serviceUnderTest.addAssetsToFocusedCollection([{ assetId: 1, name: 'something' }], { pageSize: 100, currentPage: 1 });

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/focused/addAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 1 }] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });
    });
  });
}

import { AssetService, LegacyAssetService } from './asset.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Asset Service', () => {
    let serviceUnderTest: AssetService;
    let mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      mockApiService.getResponse = { some: 'asset' };
      serviceUnderTest = new AssetService(mockApiService.injector);
    });

    describe('load()', () => {
      it('calls the API correctly with just an asset ID', () => {
        serviceUnderTest.load({ id: '47' }, 'search');

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('clip/47/clipDetail');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).not.toHaveBeenCalledWithOverridingToken(jasmine.any(String));
      });

      it('calls the API correctly with a share key', () => {
        serviceUnderTest.load({ id: '47', share_key: 'some_key' }, 'search');

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('clip/47/clipDetail');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithOverridingToken('some_key');
      });

      it('calls the API service correctly with a collectionAsset', () => {
        serviceUnderTest.load({ id: '123' }, 'collection', 321);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('clip/123/collection/321/clipDetail');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API service correctly with a orderAsset', () => {
        serviceUnderTest.load({ id: '123' }, 'order', 321);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('clip/123/order/321/clipDetail');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API service correctly with a quoteShow asset', () => {
        serviceUnderTest.load({ id: '123' }, 'quoteShow', 321);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('clip/123/quote/321/clipDetail');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API service correctly with a quoteEdit Asset', () => {
        serviceUnderTest.load({ id: '123' }, 'quoteEdit', 321);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('clip/123/quote/321/clipDetail');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('returns the expected Observable with just an asset ID', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47' }, 'search').subscribe(asset => {
          expect(asset).toEqual({ some: 'asset', uuid: null, timeStart: null, timeEnd: null });
        });
      });

      it('returns the expected Observable with a UUID', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', uuid: 'ABCDEFG' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: 'ABCDEFG', timeStart: null, timeEnd: null });
      });

      it('returns the expected Observable with a negative timeStart', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', timeStart: '-1' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: null, timeStart: null, timeEnd: null });
      });

      it('returns the expected Observable with a zero timeStart', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', timeStart: '0' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: null, timeStart: 0, timeEnd: null });
      });

      it('returns the expected Observable with a positive timeStart', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', timeStart: '1' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: null, timeStart: 1, timeEnd: null });
      });

      it('returns the expected Observable with a negative timeEnd', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', timeEnd: '-1' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: null, timeStart: null, timeEnd: null });
      });

      it('returns the expected Observable with a zero timeEnd', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', timeEnd: '0' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: null, timeStart: null, timeEnd: 0 });
      });

      it('returns the expected Observable with a positive timeEnd', () => {
        let returnedAsset: any;
        serviceUnderTest.load({ id: '47', timeEnd: '1' }, 'search').subscribe(asset => returnedAsset = asset);
        expect(returnedAsset).toEqual({ some: 'asset', uuid: null, timeStart: null, timeEnd: 1 });
      });
    });
  });

  describe('Legacy Asset Service', () => {
    let serviceUnderTest: LegacyAssetService;
    let mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      mockApiService.getResponse = { some: 'asset' };

      serviceUnderTest = new LegacyAssetService(mockApiService.injector);
    });

    describe('createShareLink()', () => {
      it('calls the API correctly', () => {
        // serviceUnderTest.createShareLink({ some: 'pojo' });
        // expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        // expect(mockApiService.post).toHaveBeenCalledWithEndpoint('accessInfo');
        // expect(mockApiService.post).toHaveBeenCalledWithBody({ some: 'pojo' });
      });
    });

    describe('getClipPreviewData()', () => {
      it('calls the API correctly', () => {
        // serviceUnderTest.getClipPreviewData(47);
        // expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Assets);
        // expect(mockApiService.get).toHaveBeenCalledWithEndpoint('renditionType/47');
        // expect(mockApiService.get).toHaveBeenCalledWithParameters({ useType: 'clipPreview' });
      });
    });
  });
}

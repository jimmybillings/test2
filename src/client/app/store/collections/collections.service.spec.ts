import { FutureCollectionsService } from './collections.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';

export function main() {
  describe('Collections Service', () => {
    let serviceUnderTest: FutureCollectionsService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new FutureCollectionsService(mockApiService.injector);
    });

    describe('addAssetTo()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.addAssetTo(
          { id: 17 } as any,
          { assetId: 234, subclipMarkers: { in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) } } as any,
        );

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/17/addAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 234, timeStart: '1000', timeEnd: '2000' }] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API correctly with no markers', () => {
        serviceUnderTest.addAssetTo(
          { id: 17 } as any,
          { assetId: 234, undefined } as any,
        );

        expect(mockApiService.post).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.post).toHaveBeenCalledWithEndpoint('collection/17/addAssets');
        expect(mockApiService.post).toHaveBeenCalledWithBody({ list: [{ assetId: 234, timeStart: '-1', timeEnd: '-2' }] });
        expect(mockApiService.post).toHaveBeenCalledWithLoading(true);
      });

    });
  });
}

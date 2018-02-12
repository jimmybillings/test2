import { FeeConfigService } from './fee-config.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Fee Config Service', () => {
    let serviceUnderTest: FeeConfigService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new FeeConfigService(mockApiService.injector);
    });

    describe('load()', () => {
      it('calls the API correctly to load a feeConfig.', () => {
        serviceUnderTest.loadFeeConfig().subscribe();
        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('feeConfig/search');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });
    });
  });
}

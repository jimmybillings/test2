import { UiConfigService } from './ui-config.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Ui Config Service', () => {
    let serviceUnderTest: UiConfigService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new UiConfigService(mockApiService.injector);
    });

    describe('load', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.load();

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('configuration/site');
      });

      it('returns the property "loaded: true" in the response', () => {
        mockApiService.getResponse = { some: 'data'};
        let result;
        serviceUnderTest.load().subscribe(res => result = res );
        expect(result).toEqual( { some: 'data', loaded: true } );
      });
    });
  });
}

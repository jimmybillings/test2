import { PrivacyPolicyService } from './privacy-policy.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Privacy Policy Service', () => {
    let serviceUnderTest: PrivacyPolicyService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new PrivacyPolicyService(mockApiService.injector);
    });

    describe('load', () => {
      it('calls the apiService correctly', () => {
        serviceUnderTest.load('12');

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('document/downloadDocumentFile/12');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
        expect(mockApiService.get).toHaveBeenCalledWithHeaderType('download');
      });

      it('maps the response to .text()', () => {
        let response: any;
        mockApiService.getResponse = { text: () => 'some text' };
        serviceUnderTest.load('12').take(1).subscribe(res => response = res);
        expect(response).toEqual('some text');
      });
    });
  });
}

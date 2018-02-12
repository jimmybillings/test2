import { AccountService } from './account.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Account Service', () => {
    let serviceUnderTest: AccountService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new AccountService(mockApiService.injector);
    });

    describe('getAccount()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.getAccount(1, true);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint(`account/1`);
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('returns an observable', () => {
        let reponse: any;
        mockApiService.getResponse = { some: 'account' };
        serviceUnderTest.getAccount(1, true).subscribe(q => reponse = q);
        expect(reponse).toEqual({ some: 'account' });
      });
    });
  });
}

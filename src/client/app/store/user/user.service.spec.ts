import { FutureUserService } from './user.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('User Service', () => {
    let serviceUnderTest: FutureUserService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new FutureUserService(mockApiService.injector);
    });

    describe('getAccount()', () => {
      it('calls the api service correctly', () => {
        serviceUnderTest.getUsersByAccountId(1, true);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Identities);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('user/searchFields');
        expect(mockApiService.get).toHaveBeenCalledWithParameters({ 'fields': 'accountId', 'values': `1`, 'n': '500' });
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('returns an observable', () => {
        mockApiService.getResponse = { items: [{ item: '1' }, { item: '2' }] };
        serviceUnderTest.getUsersByAccountId(1, true).subscribe(q => expect(q).toEqual([{ item: '1' }, { item: '2' }]));
      });
    });
  });
}

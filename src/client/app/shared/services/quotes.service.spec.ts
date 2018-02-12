import { Observable } from 'rxjs/Observable';

import { QuotesService } from './quotes.service';
import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';

export function main() {
  describe('Quotes Service', () => {
    let serviceUnderTest: QuotesService;
    let mockApi: MockApiService;
    let mockCartService: any;
    let mockQuotesStore: any;

    beforeEach(() => {
      mockApi = new MockApiService();

      mockCartService = {
        data: Observable.of({ cart: { projects: [] } })
      };

      mockQuotesStore = {
        data: Observable.of([{ id: 3, ownerUserId: 10 }, { id: 12, ownerUserId: 4 }]),
        state: [{ id: 3, ownerUserId: 10 }, { id: 12, ownerUserId: 4 }],
        setQuotes: jasmine.createSpy('setQuotes')
      };

      jasmine.addMatchers(mockApiMatchers);

      serviceUnderTest = new QuotesService(mockApi.injector, mockCartService, mockQuotesStore);
    });

    describe('data getter', () => {
      it('should return the right data', () => {
        serviceUnderTest.data.take(1).subscribe(d => {
          expect(d).toEqual([{ id: 3, ownerUserId: 10 }, { id: 12, ownerUserId: 4 }]);
        });
      });
    });

    describe('state getter', () => {
      it('should return the right state', () => {
        expect(serviceUnderTest.state).toEqual([{ id: 3, ownerUserId: 10 }, { id: 12, ownerUserId: 4 }]);
      });
    });

    describe('getQuotes', () => {
      it('should call the api service correctly', () => {
        serviceUnderTest.getQuotes(false, { i: 0, n: 20, s: 'createdOn', d: true }).take(1).subscribe();
        expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.get).toHaveBeenCalledWithEndpoint('quote/myQuotes');
        expect(mockApi.get).toHaveBeenCalledWithParameters({ q: '', i: 0, n: 20, s: 'createdOn', d: true });
      });

      it('should update the quotes store', () => {
        serviceUnderTest.getQuotes(false, {}).take(1).subscribe();
        expect(mockQuotesStore.setQuotes).toHaveBeenCalled();
      });
    });

    describe('createEmpty()', () => {
      it('should call the api service correctly', () => {
        serviceUnderTest.createEmpty();

        expect(mockApi.post).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApi.post).toHaveBeenCalledWithEndpoint('quote');
      });
    });
  });
}

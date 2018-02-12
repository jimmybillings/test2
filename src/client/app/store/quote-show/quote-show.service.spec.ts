import { Observable } from 'rxjs/Observable';

import { FutureQuoteShowService } from './quote-show.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Future Quote Show Service', () => {
    let serviceUnderTest: FutureQuoteShowService, mockApiService: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();
      serviceUnderTest = new FutureQuoteShowService(mockApiService.injector);
    });

    describe('load', () => {
      beforeEach(() => {
        mockApiService.getResponse = { some: 'quote' };
      });

      it('calls the api service correctly', () => {
        serviceUnderTest.load(1);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('quote/1');
        expect(mockApiService.get).toHaveBeenCalledWithLoading();
      });

      it('returns an observable of the quote', () => {
        let expectedQuote: any;
        serviceUnderTest.load(1).subscribe(q => expectedQuote = q);

        expect(expectedQuote).toEqual({ some: 'quote' });
      });
    });
  });
}

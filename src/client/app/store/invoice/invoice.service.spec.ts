import { Observable } from 'rxjs/Observable';

import { InvoiceService } from './invoice.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Invoice Service', () => {
    let serviceUnderTest: InvoiceService;
    let mockApiService: MockApiService;
    let invoice: any;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();

      invoice = {
        documents: ['doc1', 'doc2'],
        order: { some: 'order' },
        payee: { some: 'payee' }
      };

      mockApiService.getResponse = invoice;

      serviceUnderTest = new InvoiceService(mockApiService.injector);
    });

    describe('load()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.load(47);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('order/invoiceData/47');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('calls the API correctly - with a share token', () => {
        serviceUnderTest.load(47, 'abc-123');

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('order/invoiceData/47');
        expect(mockApiService.get).toHaveBeenCalledWithOverridingToken('abc-123');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('returns an observable of the back end\'s invoice', () => {
        let receivedInvoice: any;
        serviceUnderTest.load(47).subscribe(invoice => receivedInvoice = invoice);
        expect(receivedInvoice).toEqual(invoice);
      });
    });
  });
}

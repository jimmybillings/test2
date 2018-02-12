import { Observable } from 'rxjs/Observable';

import { OrderService } from './order.service';
import { MockApiService, mockApiMatchers } from '../spec-helpers/mock-api.service';
import { Api } from '../../shared/interfaces/api.interface';

export function main() {
  describe('Order Service', () => {
    let serviceUnderTest: OrderService;
    let mockApiService: MockApiService;
    let backEndOrder: any;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);
      mockApiService = new MockApiService();

      backEndOrder = {
        projects: [
          { lineItems: [{ some: 'lineItem' }, { another: 'lineItem' }] },
          { lineItems: [{ oneMore: 'lineItem' }, { yetAnother: 'lineItem' }] }
        ],
        other: 'stuff'
      };

      mockApiService.getResponse = backEndOrder;

      serviceUnderTest = new OrderService(mockApiService.injector);
    });

    describe('load()', () => {
      it('calls the API correctly', () => {
        serviceUnderTest.load(47);

        expect(mockApiService.get).toHaveBeenCalledWithApi(Api.Orders);
        expect(mockApiService.get).toHaveBeenCalledWithEndpoint('order/47');
        expect(mockApiService.get).toHaveBeenCalledWithLoading(true);
      });

      it('returns an observable of the back end\'s order', () => {
        let retrievedOrder: any;
        serviceUnderTest.load(47).subscribe(order => retrievedOrder = order);

        expect(retrievedOrder).toEqual(backEndOrder);
      });

      it('fills in missing line items with an empty array', () => {
        delete backEndOrder.projects[1].lineItems;

        const expectedRetrievedOrder: any = {
          projects: [
            { lineItems: [{ some: 'lineItem' }, { another: 'lineItem' }] },
            { lineItems: [] }
          ],
          other: 'stuff'
        };

        let retrievedOrder: any;
        serviceUnderTest.load(47).subscribe(order => retrievedOrder = order);

        expect(retrievedOrder).toEqual(expectedRetrievedOrder);
      });
    });
  });
}

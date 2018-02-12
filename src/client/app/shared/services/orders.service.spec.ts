import { Observable } from 'rxjs/Observable';

import { MockApiService, mockApiMatchers } from '../mocks/mock-api.service';
import { Api } from '../interfaces/api.interface';
import { OrdersService } from './orders.service';

export function main() {
  describe('Orders Service', () => {
    let serviceUnderTest: OrdersService;
    let mockOrdersStore: any;
    let mockApi: MockApiService;

    beforeEach(() => {
      jasmine.addMatchers(mockApiMatchers);

      mockOrdersStore = {
        replaceWith: jasmine.createSpy('replaceWith'),
        data: Observable.of({ some: 'data' }),
        state: { some: 'state' },
        storeOrders: jasmine.createSpy('storeOrders')
      };

      mockApi = new MockApiService();
      serviceUnderTest = new OrdersService(mockApi.injector, mockOrdersStore);
    });

    describe('data getter', () => {
      it('returns the data from the orders store', () => {
        serviceUnderTest.data.subscribe(data => {
          expect(data).toEqual({ some: 'data' });
        });
      });
    });

    describe('getOrders()', () => {
      let params: any;
      let paramsMinusOne: any;

      beforeEach(() => {
        params = { i: 5, n: 20 };
        paramsMinusOne = { i: '0', n: '20' };
      });


      it('calls the API service correctly with page number', () => {
        serviceUnderTest.getOrders(params).subscribe((res) => {
          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApi.get).toHaveBeenCalledWithEndpoint('order/myOrders');
          expect(mockApi.get).toHaveBeenCalledWithLoading(true);
          expect(mockApi.get).toHaveBeenCalledWithParameters({ q: '', s: '', d: '', i: 4, n: 20 });
          expect(mockOrdersStore.storeOrders).toHaveBeenCalledWith(res);
        });
      });

      it('calls the API service correctly without page number', () => {
        params = { n: 20 };
        serviceUnderTest.getOrders(params).subscribe((res) => {
          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApi.get).toHaveBeenCalledWithEndpoint('order/myOrders');
          expect(mockApi.get).toHaveBeenCalledWithLoading(true);
          expect(mockApi.get).toHaveBeenCalledWithParameters({ q: '', s: '', d: '', i: 0, n: 20 });
          expect(mockOrdersStore.storeOrders).toHaveBeenCalledWith(res);
        });
      });

      it('calls the API service correctly with an invalid page number', () => {
        serviceUnderTest.getOrders({ i: -2, n: 20 }).subscribe((res) => {
          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApi.get).toHaveBeenCalledWithEndpoint('order/myOrders');
          expect(mockApi.get).toHaveBeenCalledWithLoading(true);
          expect(mockApi.get).toHaveBeenCalledWithParameters({ q: '', s: '', d: '', i: 0, n: 20 });
          expect(mockOrdersStore.storeOrders).toHaveBeenCalledWith(res);
        });
      });

      it('calls the API service correctly with an alternative invalid page number', () => {
        serviceUnderTest.getOrders({ i: 0, n: 20 }).subscribe((res) => {
          expect(mockApi.get).toHaveBeenCalledWithApi(Api.Orders);
          expect(mockApi.get).toHaveBeenCalledWithEndpoint('order/myOrders');
          expect(mockApi.get).toHaveBeenCalledWithLoading(true);
          expect(mockApi.get).toHaveBeenCalledWithParameters({ q: '', s: '', d: '', i: 0, n: 20 });
          expect(mockOrdersStore.storeOrders).toHaveBeenCalledWith(res);
        });
      });
    });

  });
}

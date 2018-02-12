import { Observable } from 'rxjs/Observable';
import { orders, OrdersStore } from './orders.store';

export function main() {
  describe('orders reducer', () => {
    it('returns the payload for ORDERS.GET_ORDERS', () => {
      expect(orders({ current: 'State' } as any, { type: 'ORDERS.GET_ORDERS', payload: { someKey: 'someValue' } }))
        .toEqual({ someKey: 'someValue' });
    });

    it('returns the current state for an unexpected action type', () => {
      expect(orders({ current: 'State' } as any, { type: 'BLAH', payload: { someKey: 'someValue' } }))
        .toEqual({ current: 'State' });
    });

    it('returns the default state for no current state and an unexpected action type', () => {
      expect(orders(undefined, { type: 'BLAH', payload: { someKey: 'someValue' } }))
        .toEqual({
          items: [],
          pagination: {
            totalCount: 0,
            currentPage: 1,
            pageSize: 100,
            hasNextPage: false,
            hasPreviousPage: false,
            numberOfPages: 0
          }
        });
    });
  });

  describe('Orders Store', () => {
    let mockStore: any;
    let storeUnderTest: OrdersStore;

    beforeEach(() => {
      mockStore = {
        select: jasmine.createSpy('select').and.returnValue(Observable.of({ someKey: 'someValue' })),
        dispatch: jasmine.createSpy('dispatch')
      };
      storeUnderTest = new OrdersStore(mockStore);
    });

    describe('data getter', () => {
      it('accesses the right part of the global store', () => {
        storeUnderTest.data.subscribe();
        expect(mockStore.select).toHaveBeenCalledWith('orders');
      });

      it('returns the expected data', () => {
        storeUnderTest.data.subscribe(data => {
          expect(data).toEqual({ someKey: 'someValue' });
        });
      });
    });


    describe('storeOrders()', () => {
      it('dispatches ORDERS.GET_ORDERS with the passed-in orders', () => {
        storeUnderTest.storeOrders({
          items: [],
          currentPage: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1,
          pageSize: 20,
          totalCount: 4
        });

        expect(mockStore.dispatch)
          .toHaveBeenCalledWith({
            type: 'ORDERS.GET_ORDERS', payload: {
              items: [],
              pagination: {
                currentPage: 1,
                hasNextPage: false,
                hasPreviousPage: false,
                numberOfPages: 1,
                pageSize: 20,
                totalCount: 4
              }
            }
          });
      });

      it('dispatches ORDERS.GET_ORDERS with the passed-in orders, sets items to [] if items is undefined', () => {
        storeUnderTest.storeOrders({
          currentPage: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          numberOfPages: 1,
          pageSize: 20,
          totalCount: 4
        });

        expect(mockStore.dispatch)
          .toHaveBeenCalledWith({
            type: 'ORDERS.GET_ORDERS', payload: {
              items: [],
              pagination: {
                currentPage: 1,
                hasNextPage: false,
                hasPreviousPage: false,
                numberOfPages: 1,
                pageSize: 20,
                totalCount: 4
              }
            }
          });
      });
    });
  });
}

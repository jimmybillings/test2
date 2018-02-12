import { Observable } from 'rxjs/Observable';

import { OrdersResolver } from './orders.resolver';

export function main() {
  describe('Orders Resolver', () => {
    let mockOrdersService: any;
    let mockRoute: any;
    let mockState: any;
    let resolverUnderTest: OrdersResolver;
    let resolved: jasmine.Spy;

    beforeEach(() => {
      mockOrdersService = {
        getOrders: jasmine.createSpy('getOrders({d:true,n:20}) spy').and.returnValue(Observable.of({}))
      };

      mockRoute = {
        params: Observable.of({ d: true, i: 0, n: 1, s: 'createdOn' }),
        snapshot: { url: [{}] }
      };

      mockState = undefined;

      resolved = jasmine.createSpy('resolved');

      resolverUnderTest = new OrdersResolver(mockOrdersService);
    });

    describe('resolve()', () => {
      let returnedObservable: Observable<any>;

      it('tells the orders service to get orders data', () => {
        resolverUnderTest.resolve(mockRoute, mockState).subscribe(resolved);
        expect(mockOrdersService.getOrders).toHaveBeenCalled();
      });

      it('resolves', () => {
        resolverUnderTest.resolve(mockRoute, mockState).subscribe(resolved);
        expect(resolved).toHaveBeenCalled();
      });
    });
  });
};

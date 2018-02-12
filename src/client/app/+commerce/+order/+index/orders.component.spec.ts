import { OrdersComponent } from './orders.component';
import { Observable } from 'rxjs/Observable';

export function main() {
  describe('Orders Component', () => {
    let componentUnderTest: OrdersComponent;
    let mockRouter: any, mockRoute: any, mockOrdersService: any;

    beforeEach(() => {
      mockRoute = { params: Observable.of({ i: '1', n: '4' }) };
      mockRouter = { navigate: jasmine.createSpy('navigate') };
      mockOrdersService = { getOrders: jasmine.createSpy('getOrders').and.returnValue(Observable.of({})) };
      componentUnderTest = new OrdersComponent(mockOrdersService, mockRoute, mockRouter);
    });

    describe('Initialization', () => {
      it('Should subscribe to the activated route setting page and number per page from params', () => {
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.ordersPerPage).toEqual('4');
      });

      it('Should subscribe to the activated route without params per page default is 20', () => {
        mockRoute = { params: Observable.of({}) };
        componentUnderTest = new OrdersComponent(null, mockRoute, mockRouter);
        componentUnderTest.ngOnInit();
        expect(componentUnderTest.ordersPerPage).toEqual('20');
      });
    });

    describe('changePage()', () => {
      it('Should accept a page number and navigate to the correct page url', () => {
        componentUnderTest.changePage(99);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/orders', { n: '20', i: 99 }]);
      });
    });

    describe('search()', () => {
      it('Should accept a search query and navigate to a url that include the search query', () => {
        componentUnderTest.onSearch({ q: 'dogs' });
        expect(mockOrdersService.getOrders).toHaveBeenCalledWith({ q: 'dogs' });
      });
    });
  });
}

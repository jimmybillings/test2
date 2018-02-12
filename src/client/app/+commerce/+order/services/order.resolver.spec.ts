import { Observable } from 'rxjs/Observable';

import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { OrderResolver } from './order.resolver';

export function main() {
  describe('Order Resolver', () => {
    let mockStore: MockAppStore;
    let resolverUnderTest: OrderResolver;

    beforeEach(() => {
      mockStore = new MockAppStore();
      resolverUnderTest = new OrderResolver(mockStore);
    });

    describe('resolve()', () => {
      let mockRoute: any;
      let loadSpy: jasmine.Spy;
      let resolved: jasmine.Spy;

      beforeEach(() => {
        mockRoute = { params: { id: '1234' } };
        loadSpy = mockStore.createActionFactoryMethod('order', 'load');
        resolved = jasmine.createSpy('resolved');
        mockStore.createStateSection('order', { activeOrder: { id: 5678 }, loading: true });
      });

      it('dispatches an action', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        mockStore.expectDispatchFor(loadSpy, 1234);
      });

      it('doesn\'t return when the loading flag is true', () => {
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        expect(resolved).not.toHaveBeenCalled();
      });

      it('returns when the loading flag is false', () => {
        mockStore.createStateSection('order', { activeOrder: { id: 5678 }, loading: false });

        resolverUnderTest.resolve(mockRoute).subscribe(resolved);

        expect(resolved).toHaveBeenCalledWith(true);
      });
    });
  });
};

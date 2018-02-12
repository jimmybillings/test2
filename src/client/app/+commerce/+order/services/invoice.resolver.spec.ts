import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';
import { InvoiceResolver } from './invoice.resolver';

export function main() {
  describe('Invoice Resolver', () => {
    const mockRoute: any = { params: { id: '9001' } };
    let resolverUnderTest: InvoiceResolver;
    let mockStore: MockAppStore;
    let loadSpy: jasmine.Spy;
    let resolved: jasmine.Spy;

    beforeEach(() => {
      mockStore = new MockAppStore();
      loadSpy = mockStore.createActionFactoryMethod('invoice', 'load');
      resolved = jasmine.createSpy('resolved');
      resolverUnderTest = new InvoiceResolver(mockStore);
    });

    describe('resolve()', () => {
      describe('dispatchs the proper action', () => {
        it('without a share key', () => {
          resolverUnderTest.resolve(mockRoute);
          expect(loadSpy).toHaveBeenCalledWith(9001);
        });

        it('with a share key', () => {
          const mockRoute: any = { params: { id: '9001', share_key: 'abc-123' } };
          resolverUnderTest.resolve(mockRoute);
          expect(loadSpy).toHaveBeenCalledWith(9001, 'abc-123');
        });
      });

      it('does not resolve if the Invoice store has no data from the server', () => {
        mockStore.createStateSection('invoice', { loading: true });
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        expect(resolved).not.toHaveBeenCalled();
      });

      it('resolves if the Invoice store already has data from the server', () => {
        mockStore.createStateSection('asset', { loading: false });
        resolverUnderTest.resolve(mockRoute).subscribe(resolved);
        expect(resolved).toHaveBeenCalled();
      });
    });
  });
};

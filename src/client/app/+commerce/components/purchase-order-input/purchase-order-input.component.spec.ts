import { Observable } from 'rxjs/Observable';
import { PurchaseOrderInputComponent } from './purchase-order-input.component';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Purchase Order Input Component', () => {
    let componentUnderTest: PurchaseOrderInputComponent;
    let setPurchaseOrderIdDispatchSpy: jasmine.Spy;
    let mockAppStore: MockAppStore;

    beforeEach(() => {
      mockAppStore = new MockAppStore();

      mockAppStore.createStateSection('uiConfig', {
        components: { cart: { config: { addPurchaseOrderId: { items: [{ some: 'field' }] } } } }
      });

      setPurchaseOrderIdDispatchSpy = mockAppStore.createActionFactoryMethod(
        'checkout',
        'setPurchaseOrderId'
      );

      componentUnderTest = new PurchaseOrderInputComponent(mockAppStore);
    });
    describe('ngOnInit()', () => {
      it('gets the form input from the ui config', () => {
        componentUnderTest.ngOnInit();

        expect(componentUnderTest.PurchaseOrderFormConfig).toEqual([{ some: 'field' }]);
      });
    });

    describe('onBlur()', () => {
      it('dispatchs updateSalesManagerFormOnQuote with the sales manager form', () => {
        componentUnderTest.onBlur({ purchaseOrderId: '123456-789' } as any);

        expect(setPurchaseOrderIdDispatchSpy).toHaveBeenCalledWith('123456-789');
      });
    });
  });
}

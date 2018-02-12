import { FeeLineItemsComponent } from './fee-line-items.component';
import { FeeLineItem } from '../../../shared/interfaces/commerce.interface';

export function main() {
  describe('Fee Line Items Component', () => {
    let componentUnderTest: FeeLineItemsComponent;

    beforeEach(() => {
      componentUnderTest = new FeeLineItemsComponent();
      componentUnderTest.feeLineItemsNotify.emit = jasmine.createSpy('feeLineItemsNotify emitter');
    });

    describe('readOnly input', () => {
      it('defaults to false', () => {
        expect(componentUnderTest.readOnly).toBe(false);
      });
    });

    describe('onRemove()', () => {
      it('emits the expected event', () => {
        componentUnderTest.onRemove({ some: 'fee' } as FeeLineItem);

        expect(componentUnderTest.feeLineItemsNotify.emit)
          .toHaveBeenCalledWith({ type: 'REMOVE_QUOTE_FEE', payload: { some: 'fee' } });
      });
    });
  });
}

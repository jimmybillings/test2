import { QuotePurchaseTypeComponent } from './quote-purchase-type.component';

export function main() {
  describe('Quote Purchase Type Component', () => {
    let componentUnderTest: QuotePurchaseTypeComponent;

    beforeEach(() => {
      componentUnderTest = new QuotePurchaseTypeComponent();
    });

    describe('quoteTypes setter', () => {
      beforeEach(() => {
        componentUnderTest.quoteTypes = [{ viewValue: 'Value', value: 'value' }];
      });
      it('sets the \'types\' public instance variable on the component', () => {
        expect(componentUnderTest.types).toEqual([{ viewValue: 'Value', value: 'value' }]);
      });

      it('sets the \'selectedType\' instance variable on the component', () => {
        expect(componentUnderTest.selectedType).toEqual('value');
      });
    });

    describe('onSelectChange()', () => {
      it('emits the selectQuoteType variable', () => {
        spyOn(componentUnderTest.selectQuoteType, 'emit');
        componentUnderTest.onSelectChange({ value: 'someValue' } as any);

        expect(componentUnderTest.selectQuoteType.emit).toHaveBeenCalledWith({ purchaseType: 'someValue' });
      });
    });
  });
}

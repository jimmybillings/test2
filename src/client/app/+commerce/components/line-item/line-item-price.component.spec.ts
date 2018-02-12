import { LineItemPriceComponent } from './line-item-price.component';

export function main() {
  describe('Line Item Price Component', () => {
    let componentUnderTest: LineItemPriceComponent;

    beforeEach(() => {
      componentUnderTest = new LineItemPriceComponent();
    });

    describe('needsAttributes getter', () => {
      describe('returns true ', () => {
        it('when the lineItem is \'Rights Managed\' and doesn\'t have price attributes', () => {
          componentUnderTest.rightsManaged = 'Rights Managed';
          componentUnderTest.hasAttributes = false;

          expect(componentUnderTest.needsAttributes).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the lineItem is not \'Rights Managed\'', () => {
          componentUnderTest.rightsManaged = 'Royalty Free';

          expect(componentUnderTest.needsAttributes).toBe(false);
        });

        it('when the lineItem is \'Rights Managed\', but it does have attributes', () => {
          componentUnderTest.rightsManaged = 'Rights Managed';
          componentUnderTest.hasAttributes = true;

          expect(componentUnderTest.needsAttributes).toBe(false);
        });
      });
    });

    describe('shouldShowMultiplier getter', () => {
      describe('returns true', () => {
        it('when the user can administer quotes and the multiplier is greater than 1', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.multiplier = 2;

          expect(componentUnderTest.shouldShowMultiplier).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the user cannot administer quotes', () => {
          componentUnderTest.userCanAdministerQuotes = false;

          expect(componentUnderTest.shouldShowMultiplier).toBe(false);
        });

        it('when the user can administer quotes, but the multiplier is less than 1', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.multiplier = 0;

          expect(componentUnderTest.shouldShowMultiplier).toBe(false);
        });
      });
    });

    describe('formattedMultiplier getter', () => {
      describe('returns the multiplier truncated (NOT ROUNDED) at 2 decimal places', () => {
        it('for a small number', () => {
          componentUnderTest.multiplier = 8.8796543;

          expect(componentUnderTest.formattedMultiplier).toEqual('8.87');
        });

        it('for a large number', () => {
          componentUnderTest.multiplier = 1758.19241;

          expect(componentUnderTest.formattedMultiplier).toEqual('1758.19');
        });

        it('for a number with only 1 decimal point', () => {
          componentUnderTest.multiplier = 4.1;

          expect(componentUnderTest.formattedMultiplier).toEqual('4.1');
        });

        it('for a number with no decimal points', () => {
          componentUnderTest.multiplier = 4;

          expect(componentUnderTest.formattedMultiplier).toEqual('4');
        });
      });
    });

    describe('showAdminPrice getter', () => {
      describe('returns true', () => {
        it('when the user can administer quotes, and the lineItem doesnt need attributes', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.rightsManaged = 'Royalty Free';

          expect(componentUnderTest.showAdminPrice).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the user can\'t administer quotes', () => {
          componentUnderTest.userCanAdministerQuotes = false;

          expect(componentUnderTest.showAdminPrice).toBe(false);
        });
        it('when the user can administer quotes, but the lineItem does need attributes', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.rightsManaged = 'Rights Managed';
          componentUnderTest.hasAttributes = false;

          expect(componentUnderTest.showAdminPrice).toBe(false);
        });
      });
    });

    describe('onClickPrice()', () => {
      it('emits the addCustomPrice event', () => {
        spyOn(componentUnderTest.addCustomPrice, 'emit');
        componentUnderTest.onClickPrice();
        expect(componentUnderTest.addCustomPrice.emit).toHaveBeenCalled();
      });
    });

    describe('showPreDiscountPrice getter', () => {
      describe('returns true', () => {
        it('when the user can administer quotes and the grossAssetPrice is different from the price', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.itemPrice = 200.89;
          componentUnderTest.price = 200.99;
          componentUnderTest.overrideGrossAssetPrice = null;
          expect(componentUnderTest.showPreDiscountPrice).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the user cannot administer quotes', () => {
          componentUnderTest.userCanAdministerQuotes = false;

          expect(componentUnderTest.showPreDiscountPrice).toBe(false);
        });

        it('when the user can administer quotes and the grossAssetPrice is the same as the price', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.itemPrice = 200.89;
          componentUnderTest.price = 200.89;
          componentUnderTest.overrideGrossAssetPrice = 1000;
          expect(componentUnderTest.showPreDiscountPrice).toBe(false);
        });
      });
    });

    describe('showAdminOveridePrice getter', () => {
      describe('returns true', () => {
        it('when user can administer quotes, its not readonly and the lineItem has an overrideGrossAsset price', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.readonly = false;
          componentUnderTest.overrideGrossAssetPrice = 200;
          expect(componentUnderTest.showAdminOveridePrice).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the user cannot administer quotes', () => {
          componentUnderTest.userCanAdministerQuotes = false;
          expect(componentUnderTest.showAdminOveridePrice).toBe(false);
        });

        it('when its not readonly', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.readonly = true;
          componentUnderTest.overrideGrossAssetPrice = 200;
          expect(componentUnderTest.showAdminOveridePrice).toBe(false);
        });

        it('when there is no override price', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.readonly = false;
          componentUnderTest.overrideGrossAssetPrice = null;
          expect(componentUnderTest.showAdminOveridePrice).toBe(false);
        });
      });
    });

    describe('shouldShowBasePrice getter', () => {
      describe('returns true', () => {
        it('when user can administer quotes and it has a override price and the base price does not equal the price property', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.price = 200;
          componentUnderTest.itemPrice = 100;
          componentUnderTest.overrideGrossAssetPrice = 200;
          expect(componentUnderTest.shouldShowBasePrice).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the user cannot administer quotes', () => {
          componentUnderTest.userCanAdministerQuotes = false;
          componentUnderTest.price = 200;
          componentUnderTest.itemPrice = 100;
          componentUnderTest.overrideGrossAssetPrice = 200;
          expect(componentUnderTest.shouldShowBasePrice).toBe(false);
        });

        it('when there is no override price', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.price = 200;
          componentUnderTest.itemPrice = 100;
          componentUnderTest.overrideGrossAssetPrice = null;
          expect(componentUnderTest.shouldShowBasePrice).toBe(false);
        });

        it('when the base price equals the price property', () => {
          componentUnderTest.userCanAdministerQuotes = true;
          componentUnderTest.price = 200;
          componentUnderTest.itemPrice = 200;
          componentUnderTest.overrideGrossAssetPrice = 300;
          expect(componentUnderTest.shouldShowBasePrice).toBe(false);
        });
      });
    });

  });
}

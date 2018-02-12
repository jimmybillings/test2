import { LineItemRightsComponent } from './line-item-rights.component';

export function main() {
  describe('Line Item Rights Component', () => {
    let componentUnderTest: LineItemRightsComponent;

    beforeEach(() => {
      componentUnderTest = new LineItemRightsComponent();
    });

    describe('attributeName', () => {
      it('returns priceAttributeDisplayName over priceAttributeName', () => {
        expect(componentUnderTest.attributeName({
          priceAttributeDisplayName: 'A',
          priceAttributeName: 'a'
        } as any)).toEqual('A');
        expect(componentUnderTest.attributeName({ priceAttributeName: 'a' } as any)).toEqual('a');
      });
    });

    describe('attributeValue', () => {
      it('returns priceAttributeDisplayName over priceAttributeName', () => {
        expect(componentUnderTest.attributeValue({
          selectedAttributeValue: 'a',
          selectedAttributeName: 'A'
        } as any)).toEqual('A');
        expect(componentUnderTest.attributeValue({ selectedAttributeValue: 'a' } as any)).toEqual('a');
      });
    });

    describe('rightsManagedDisplayUsage()', () => {
      it('returns true when asset is rights managed and display rights attributes is true', () => {
        componentUnderTest.rightsManaged = 'Rights Managed';
        componentUnderTest.displayRmAttributes = true;
        expect(componentUnderTest.rightsManagedDisplayUsage)
          .toBe(true);
      });

      it('returns false when asset is rights managed and display rights attributes is false', () => {
        componentUnderTest.rightsManaged = 'Rights Managed';
        componentUnderTest.displayRmAttributes = false;
        expect(componentUnderTest.rightsManagedDisplayUsage)
          .toBe(false);
      });

      it('returns false when asset is royalty free', () => {
        componentUnderTest.rightsManaged = 'Royalty Free';
        componentUnderTest.displayRmAttributes = true;
        expect(componentUnderTest.rightsManagedDisplayUsage)
          .toBe(false);
      });
    });

    describe('rightsManagedWithoutUsage()', () => {
      it('returns true when asset is rights managed and display rights attributes is false', () => {
        componentUnderTest.rightsManaged = 'Rights Managed';
        componentUnderTest.displayRmAttributes = false;
        expect(componentUnderTest.rightsManagedWithoutUsage)
          .toBe(true);
      });

      it('returns false when asset is rights managed and display rights attributes is true', () => {
        componentUnderTest.rightsManaged = 'Rights Managed';
        componentUnderTest.displayRmAttributes = true;
        expect(componentUnderTest.rightsManagedWithoutUsage)
          .toBe(false);
      });

      it('returns false when asset is royalty free', () => {
        componentUnderTest.rightsManaged = 'Royalty Free';
        componentUnderTest.displayRmAttributes = true;
        expect(componentUnderTest.rightsManagedWithoutUsage)
          .toBe(false);
      });
    });

    describe('rightsRoyaltyFree()', () => {
      it('returns true when asset rights is royalty free', () => {
        componentUnderTest.rightsManaged = 'Royalty Free';
        expect(componentUnderTest.rightsRoyaltyFree)
          .toBe(true);
      });

      it('returns false when asset rights is NOT royalty free', () => {
        componentUnderTest.rightsManaged = 'Not Royalty Free';
        expect(componentUnderTest.rightsRoyaltyFree)
          .toBe(false);
      });
    });
  });
}

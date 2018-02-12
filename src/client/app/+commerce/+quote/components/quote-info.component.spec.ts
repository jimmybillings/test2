import { QuoteInfoComponent } from './quote-info.component';

export function main() {
  describe('Quote Info Component', () => {
    let componentUnderTest: QuoteInfoComponent;

    beforeEach(() => {
      componentUnderTest = new QuoteInfoComponent();
    });

    describe('isExpired()', () => {
      it('is true when quote status is expired', () => {
        componentUnderTest.salesManager = { expirationDate: '2017-12-28T05:00:00Z' };
        expect(componentUnderTest.isExpired).toBe(true);
      });

      it('is false when quote status is not expired', () => {
        let d: string = new Date(3000, 1, 1).toISOString();
        componentUnderTest.salesManager = { expirationDate: d };
        expect(componentUnderTest.isExpired).toBe(false);
      });
    });
  });
}

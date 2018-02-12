import { QuoteEditGuard } from './quote-edit.guard';

export function main() {
  describe('Quote Edit Guard', () => {
    let guardUnderTest: QuoteEditGuard;

    beforeEach(() => {
      guardUnderTest = new QuoteEditGuard(null, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
}

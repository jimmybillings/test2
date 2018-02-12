import { SearchAssetGuard } from './search-asset.guard';

export function main() {
  describe('Search Asset Guard', () => {
    let guardUnderTest: SearchAssetGuard;

    beforeEach(() => {
      guardUnderTest = new SearchAssetGuard(null, null, null, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
};


import { CollectionGuard } from './collection-guard';

export function main() {
  describe('Collection Guard', () => {
    let guardUnderTest: CollectionGuard;

    beforeEach(() => {
      guardUnderTest = new CollectionGuard(null, null, null, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
};


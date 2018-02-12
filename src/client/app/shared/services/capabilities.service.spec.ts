import { Capabilities } from './capabilities.service';

export function main() {
  describe('Capabilities', () => {
    let serviceUnderTest: Capabilities;

    beforeEach(() => {
      serviceUnderTest = new Capabilities(null, null, null, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
};


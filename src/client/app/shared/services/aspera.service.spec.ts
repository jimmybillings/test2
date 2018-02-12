import { AsperaService } from './aspera.service';

export function main() {
  describe('Aspera Service', () => {
    let serviceUnderTest: AsperaService;

    beforeEach(() => {
      serviceUnderTest = new AsperaService(null, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
}

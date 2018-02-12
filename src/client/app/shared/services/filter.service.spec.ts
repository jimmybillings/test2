import { FilterService } from './filter.service';

export function main() {
  describe('Filter Service', () => {
    let serviceUnderTest: FilterService;
    let mockStore: any;

    beforeEach(() => {
      // TODO: This is a minimal mock that exists solely to stop
      // the constructor from failing.  Enhance as needed.
      mockStore = { select: () => { return {}; } };
      serviceUnderTest = new FilterService(null, mockStore, null);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
}

import { WzItemSearchFormComponent } from './wz.item-search-form.component';

export function main() {
  describe('Collections Search Form Component', () => {
    let componentUnderTest: WzItemSearchFormComponent;
    let mockFormBuilder: any;

    beforeEach(() => {
      // TODO: This is a minimal mock that exists solely to stop
      // the constructor from failing.  Enhance as needed.
      mockFormBuilder = { group: () => { return; } };

      componentUnderTest = new WzItemSearchFormComponent(mockFormBuilder);
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      expect(true).toBe(true);
    });
  });
};


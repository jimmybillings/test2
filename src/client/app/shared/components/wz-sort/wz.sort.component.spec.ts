import { WzSortComponent } from './wz.sort.component';

export function main() {
  describe('Wz Sort Component', () => {
    let componentUnderTest: WzSortComponent;

    beforeEach(() => {
      componentUnderTest = new WzSortComponent();
    });

    it('***** HASN\'T BEEN TESTED YET! *****', () => {
      spyOn(componentUnderTest.sort, 'emit');
      componentUnderTest.applySort('newSortDef');
      expect(componentUnderTest.sort.emit).toHaveBeenCalledWith('newSortDef');
    });
  });
};


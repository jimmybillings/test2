import { CommerceHeaderComponent } from './commerce-header.component';

export function main() {
  describe('Commerce Header Component', () => {
    let componentUnderTest: CommerceHeaderComponent;

    beforeEach(() => {
      componentUnderTest = new CommerceHeaderComponent();
    });

    describe('toggleSearchButton()', () => {
      it('should toggle the itemSearchIsShowingBoolean', () => {
        expect(componentUnderTest.itemSearchIsShowing).toBe(false);
        componentUnderTest.toggleSearch();
        expect(componentUnderTest.itemSearchIsShowing).toBe(true);
        componentUnderTest.toggleSearch();
        expect(componentUnderTest.itemSearchIsShowing).toBe(false);
      });
    });
  });
}

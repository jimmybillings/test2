import { AdministerQuoteComponent } from './administer-quote.component';

export function main() {
  describe('Administer Quote Component', () => {
    let componentUnderTest: AdministerQuoteComponent;

    beforeEach(() => {
      componentUnderTest = new AdministerQuoteComponent();
      spyOn(componentUnderTest.notify, 'emit');
    });

    describe('onSaveAndNew()', () => {
      it('Should emit the onSaveAndNew event', () => {
        componentUnderTest.onSaveAndNew();
        expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'SAVE_AND_NEW' });
      });
    });

    describe('onOpenDeleteDialog()', () => {
      it('Should emit the openDeleteDialog event', () => {
        componentUnderTest.onOpenDeleteDialog();
        expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'OPEN_DELETE_DIALOG' });
      });
    });

    describe('onCloneQuote()', () => {
      it('Should emit the saveAsDraft event', () => {
        componentUnderTest.onClickCloneQuoteButton();
        expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'CLONE_QUOTE' });
      });
    });

    describe('goToNextTab()', () => {
      it('Should emit the saveAsDraft event', () => {
        componentUnderTest.goToNextTab();
        expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'GO_TO_NEXT_TAB' });
      });
    });
  });
}

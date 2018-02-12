import { WzConfirmationDialogComponent } from './wz.confirmation-dialog.component';

export function main() {
  describe('Wz Confirmation Dialog Component', () => {
    let componentUnderTest: WzConfirmationDialogComponent;

    beforeEach(() => {
      componentUnderTest = new WzConfirmationDialogComponent();
    });

    describe('onClickAccept', () => {
      it('should emit the accept event', () => {
        spyOn(componentUnderTest.accept, 'emit');
        componentUnderTest.onClickAccept();
        expect(componentUnderTest.accept.emit).toHaveBeenCalled();
      });
    });

    describe('onClickDecline', () => {
      it('should emit the decline event', () => {
        spyOn(componentUnderTest.decline, 'emit');
        componentUnderTest.onClickDecline();
        expect(componentUnderTest.decline.emit).toHaveBeenCalled();
      });
    });

    describe('get title()', () => {
      describe('returns the Translation object', () => {
        it('when the input string is just a translation key', () => {
          componentUnderTest.strings = { title: 'SOME.KEY' };
          expect(componentUnderTest.title).toEqual({ key: 'SOME.KEY', values: {} });
        });

        it('when the input string is a TranslationKeyValuesObject', () => {
          componentUnderTest.strings = { title: { key: 'SOME.KEY', values: { collectionName: 'Some Collection' } } };
          expect(componentUnderTest.title).toEqual({ key: 'SOME.KEY', values: { collectionName: 'Some Collection' } });
        });
      });
    });

    describe('get message()', () => {
      describe('returns the Translation object', () => {
        it('when the input string is just a translation key', () => {
          componentUnderTest.strings = { message: 'SOME.KEY' };
          expect(componentUnderTest.message).toEqual({ key: 'SOME.KEY', values: {} });
        });

        it('when the input string is a TranslationKeyAndValues Object', () => {
          componentUnderTest.strings = { message: { key: 'SOME.KEY', values: { collectionName: 'Some Collection' } } };
          expect(componentUnderTest.message).toEqual({ key: 'SOME.KEY', values: { collectionName: 'Some Collection' } });
        });
      });
    });
  });
}

import { ProjectActionsComponent } from './project-actions.component';
export function main() {
  describe('Project Actions Component', () => {

    let componentUnderTest: ProjectActionsComponent;

    beforeEach(() => {
      componentUnderTest = new ProjectActionsComponent();
      componentUnderTest.edit.emit = jasmine.createSpy('edit emitter');
      componentUnderTest.remove.emit = jasmine.createSpy('remove emitter');
      componentUnderTest.addFee.emit = jasmine.createSpy('addFee emitter');
    });

    describe('onEditButtonClick()', () => {
      it('emits an edit request', () => {
        componentUnderTest.onEditButtonClick();
        expect(componentUnderTest.edit.emit).toHaveBeenCalled();
      });
    });

    describe('onRemoveButtonClick()', () => {
      it('emits an remove request', () => {
        componentUnderTest.onRemoveButtonClick();
        expect(componentUnderTest.remove.emit).toHaveBeenCalled();
      });
    });

    describe('onAddFeeButtonClick()', () => {
      it('emits an addFee request', () => {
        componentUnderTest.onAddFeeButtonClick();
        expect(componentUnderTest.addFee.emit).toHaveBeenCalled();
      });
    });

    describe('showRightsPricingBtn()', () => {
      describe('returns false', () => {
        it('when the quote type is Trial', () => {
          componentUnderTest.quoteType = 'Trial';
          componentUnderTest.projectHasRmAssets = true;
          expect(componentUnderTest.showRightsPricingBtn).toBe(false);
        });

        it('project does not have any rights managed assets', () => {
          componentUnderTest.quoteType = null;
          componentUnderTest.projectHasRmAssets = false;
          expect(componentUnderTest.showRightsPricingBtn).toBe(false);
        });
      });

      describe('returns true', () => {
        it('when the quote type is OfflineLicense and project has rights managed assets', () => {
          componentUnderTest.quoteType = 'OfflineLicense';
          componentUnderTest.projectHasRmAssets = true;
          expect(componentUnderTest.showRightsPricingBtn).toBe(true);
        });

        it('when the quote type is null and project has rights managed assets', () => {
          componentUnderTest.quoteType = null;
          componentUnderTest.projectHasRmAssets = true;
          expect(componentUnderTest.showRightsPricingBtn).toBe(true);
        });
      });
    });

    describe('onBulkImportClick', () => {
      it('emits the \'bulkImport\' event', () => {
        spyOn(componentUnderTest.bulkImport, 'emit');
        componentUnderTest.onBulkImportClick();

        expect(componentUnderTest.bulkImport.emit).toHaveBeenCalled();
      });
    });
  });
}

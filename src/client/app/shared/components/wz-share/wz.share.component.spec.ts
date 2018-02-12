import { WzShareComponent } from './wz.share.component';
import { mockCommerceAssetLineItem } from '../../mocks/mock-asset';
import * as EnhancedMock from '../../interfaces/enhanced-asset';


export function main() {
  describe('Wz Share Component', () => {
    let componentUnderTest: WzShareComponent;
    let mockWzForm: any;

    beforeEach(() => {
      mockWzForm = { resetForm: jasmine.createSpy('resetForm') };

      componentUnderTest = new WzShareComponent(null);
      componentUnderTest.closeRequest.emit = jasmine.createSpy('closeRequest emit');
      componentUnderTest.wzForm = mockWzForm;
    });

    describe('ngOnDestroy', () => {
      it('resets the form', () => {
        componentUnderTest.ngOnDestroy();

        expect(mockWzForm.resetForm).toHaveBeenCalled();
      });

      it('emits a close request', () => {
        componentUnderTest.ngOnDestroy();

        expect(componentUnderTest.closeRequest.emit).toHaveBeenCalled();
      });
    });
  });
};


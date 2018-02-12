import { Observable } from 'rxjs/Observable';
import { CartConfirmTabComponent } from './cart-confirm-tab.component';
import { MockAppStore } from '../../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Confirm Tab Component', () => {
    let componentUnderTest: CartConfirmTabComponent;
    let mockCartService: any;
    let mockDialogService: any;
    let mockCapabilities: any;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockCartService = {
        state: { data: { id: 1 } },
        data: Observable.of(this.state),
        retrieveLicenseAgreements: jasmine.createSpy('retriveLicenseAgreements')
          .and.returnValue(Observable.of({ some: 'licenses' })),
        hasAssetLineItems: true
      };

      mockCapabilities = {
        viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(true)
      };

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.callFake((options: any) => {
          mockDialogService.onCloseCallback = options.outputOptions[0].callback;
        })
      };

      mockStore = new MockAppStore();

      componentUnderTest = new CartConfirmTabComponent(null, mockCartService, mockDialogService, mockCapabilities, mockStore);
    });

    describe('showLicenseAgreements()', () => {
      it('calls retrieveLicenseAgreements() on the cart service', () => {
        componentUnderTest.showLicenseAgreements();

        expect(mockCartService.retrieveLicenseAgreements).toHaveBeenCalled();
      });

      it('calls openComponentInDialog() on the dialog service (with the right config)', () => {
        componentUnderTest.showLicenseAgreements();

        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: jasmine.any(Function),
          dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
          inputOptions: {
            assetType: 'cart',
            licenses: { some: 'licenses' }
          },
          outputOptions: [
            {
              event: 'close',
              callback: jasmine.any(Function),
              closeOnEvent: true
            }
          ]
        });
      });
    });

    describe('showPricing() getter', () => {
      it('always returns Observable of true - because we\'re in the cart', () => {
        let showPricing: boolean;
        componentUnderTest.showPricing.take(1).subscribe(result => showPricing = result);
        expect(showPricing).toBe(true);
      });
    });

    describe('quoteIsTrial() getter', () => {
      it('always returns Observable of false - because we\'re in the cart', () => {
        let quoteIsTrial: boolean;
        componentUnderTest.quoteIsTrial.take(1).subscribe(result => quoteIsTrial = result);
        expect(quoteIsTrial).toBe(false);
      });
    });

    describe('canPurchase getter', () => {
      describe('returns true', () => {
        it('when the licenseAgreement checkbox has been checked, the cart has lineItems, and the capability returns true', () => {
          componentUnderTest.licensesAreAgreedTo = true;
          expect(componentUnderTest.canPurchase).toBe(true);
        });
      });

      describe('returns false', () => {
        it('when the licenseAgreement checkbox has not been checked', () => {
          componentUnderTest.licensesAreAgreedTo = false;
          expect(componentUnderTest.canPurchase).toBe(false);
        });

        it('when the checkbox has been checked, the cart has lineItems, but the capability returns false', () => {
          mockCartService = { hasAssetLineItems: true };
          mockCapabilities = {
            viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(false)
          };

          componentUnderTest = new CartConfirmTabComponent(null, mockCartService, null, mockCapabilities, mockStore);
          componentUnderTest.licensesAreAgreedTo = true;

          expect(componentUnderTest.canPurchase).toBe(false);
        });

        it('when the checkbox has not been checked, the cart does not have lineItems, and the capability returns false', () => {
          mockCartService = { hasAssetLineItems: false };
          mockCapabilities = {
            viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton').and.returnValue(false)
          };

          componentUnderTest = new CartConfirmTabComponent(null, mockCartService, null, mockCapabilities, mockStore);
          componentUnderTest.licensesAreAgreedTo = false;

          expect(componentUnderTest.canPurchase).toBe(false);
        });
      });
    });
  });
}

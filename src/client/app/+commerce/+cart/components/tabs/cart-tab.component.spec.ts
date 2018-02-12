import { Observable } from 'rxjs/Observable';
import { CartTabComponent } from './cart-tab.component';
import { MockAppStore } from '../../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Cart Tab Component', () => {
    let componentUnderTest: CartTabComponent;
    let mockUserCan: any;
    let mockCartService: any;
    let mockDialogService: any;
    let mockAssetService: any;
    let mockUserPreference: any;
    let mockDocument: any;
    let mockWindow: any;
    let mockState: any;
    let mockQuoteService: any;
    let mockCurrentUserService: any;
    let mockCapabilities: any;
    let mockChangeDetectorRef: any;
    let mockAppStore: MockAppStore;
    let initPricingSpy: jasmine.Spy;
    let setPriceSpy: jasmine.Spy;

    beforeEach(() => {
      mockState = {
        data: {
          itemCount: 2,
          projects: [{
            lineItems: [
              { id: '1', price: 100, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
              { id: '2', price: 100, rightsManaged: 'Rights Managed' }
            ]
          }]
        }
      };

      mockCartService = {
        data: Observable.of({ data: { someData: 'SOME_VALUE' } }),
        addProject: jasmine.createSpy('addProject'),
        removeProject: jasmine.createSpy('removeProject'),
        updateProject: jasmine.createSpy('updateProject'),
        moveLineItemTo: jasmine.createSpy('moveLineItemTo'),
        cloneLineItem: jasmine.createSpy('cloneLineItem'),
        removeLineItem: jasmine.createSpy('removeLineItem'),
        editLineItem: jasmine.createSpy('editLineItem'),
        getPaymentOptions: jasmine.createSpy('createPaymentOptions'),
        retrieveLicenseAgreements: jasmine.createSpy('retrieveLicenseAgreements').and.returnValue(Observable.of({})),
        projects: Observable.of([]),
        state: mockState
      };

      mockDocument = {
        body: {
          classList: {
            add: jasmine.createSpy('add'),
            remove: jasmine.createSpy('remove')
          }
        }
      };

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable.of({ data: 'Test data' })),
        openFormDialog: jasmine.createSpy('openFormDialog').and.returnValue(Observable.of({ data: 'Test data' })),
        openConfirmationDialog: jasmine.createSpy('openConfirmationDialog')
      };

      mockWindow = { nativeWindow: { location: { href: {} } } };

      mockUserPreference = {
        data: Observable.of({ pricingPreferences: { some: 'attribute' } })
      };

      mockAppStore = new MockAppStore();
      initPricingSpy = mockAppStore.createActionFactoryMethod('pricing', 'initializePricing');
      setPriceSpy = mockAppStore.createActionFactoryMethod('pricing', 'setPriceForDialog');
      mockAppStore.createStateSection('uiConfig', {
        components: { cart: { config: { form: 'SOME_CONFIG', createQuote: { items: [] } } } }
      });

      mockUserCan = {
        viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton'),
        administerQuotes: () => false
      };

      mockChangeDetectorRef = { markForCheck: () => true };

      componentUnderTest = new CartTabComponent(
        mockUserCan, mockCartService, mockDialogService, mockWindow,
        mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
      );
    });

    describe('Initialization', () => {
      it('caches the cart UI config', () => {
        componentUnderTest.ngOnInit();

        expect(componentUnderTest.config).toEqual({ form: 'SOME_CONFIG', createQuote: { items: [] } });
      });
    });

    describe('rmAssetsHaveAttributes()', () => {
      it('should return false if there is an RM asset without attributes', () => {
        expect(componentUnderTest.rmAssetsHaveAttributes).toBe(false);
      });

      it('should return true if all assets are valid', () => {
        mockState = {
          data: {
            itemCount: 1,
            projects: [{
              lineItems: [
                { id: '1', price: 100, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
                { id: '2', price: 100, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
                { id: '3', price: 59, rightsManaged: 'Royalty Free' }
              ]
            }]
          }
        };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.rmAssetsHaveAttributes).toBe(true);
      });

      it('should return true if the cart is empty', () => {
        mockState = { data: { itemCount: 0 } };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.rmAssetsHaveAttributes).toBe(true);
      });
    });

    describe('cartContainsNoAssets()', () => {
      it('should return true if the cart is empty', () => {
        mockState = { data: { itemCount: 0 } };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.cartContainsNoAssets).toBe(true);
      });

      it('should return false if the cart is has 1 or more assets', () => {
        mockState = { data: { itemCount: 1 } };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.cartContainsNoAssets).toBe(false);
      });
    });

    describe('showTotal()', () => {
      it('should return true the cart total is above 0', () => {
        mockAppStore.createStateSection('cart', {
          data: { total: 100 }
        });
        expect(componentUnderTest.showTotal).toBe(true);
      });

      it('should return false if the cart total is 0', () => {
        mockAppStore.createStateSection('cart', {
          data: { total: 0 }
        });
        expect(componentUnderTest.showTotal).toBe(false);
      });
    });


    describe('showUsageWarning()', () => {
      it('should return false if the cart is empty', () => {
        mockState = { data: { itemCount: 0 } };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.showUsageWarning).toBe(false);
      });

      it('should return true if cart has assets and 1 or more RM assets are missing attributes ', () => {
        mockState = {
          data: {
            itemCount: 3,
            projects: [{
              lineItems: [
                { id: '1', price: 100, rightsManaged: 'Rights Managed' },
                { id: '2', price: 100, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
                { id: '3', price: 59, rightsManaged: 'Royalty Free' }
              ]
            }]
          }
        };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.showUsageWarning).toBe(true);
      });

      it('should return false if cart has assets and all RM assets have attributes ', () => {
        mockState = {
          data: {
            itemCount: 3,
            projects: [{
              lineItems: [
                { id: '1', price: 189, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
                { id: '2', price: 100, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
                { id: '3', price: 59, rightsManaged: 'Royalty Free' }
              ]
            }]
          }
        };

        mockCartService = {
          state: mockState
        };

        componentUnderTest = new CartTabComponent(
          mockUserCan, mockCartService, mockDialogService, mockWindow,
          mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef
        );

        expect(componentUnderTest.showUsageWarning).toBe(false);
      });
    });

    describe('onNotification()', () => {
      it('adds a project when notified with ADD_PROJECT', () => {
        componentUnderTest.onNotification({ type: 'ADD_PROJECT' });

        expect(mockCartService.addProject).toHaveBeenCalled();
      });

      it('removes a project when notified with REMOVE_PROJECT', () => {
        let mockProject = {};
        componentUnderTest.onNotification({ type: 'REMOVE_PROJECT', payload: mockProject });

        expect(mockCartService.removeProject).toHaveBeenCalledWith(mockProject);
      });

      it('updates a project when notified with UPDATE_PROJECT', () => {
        let mockProject = {};
        componentUnderTest.onNotification({ type: 'UPDATE_PROJECT', payload: mockProject });

        expect(mockDialogService.openFormDialog).toHaveBeenCalled();
      });

      it('moves a line item when notified with MOVE_LINE_ITEM', () => {
        let mockProject = {};
        let mockLineItem = {};
        componentUnderTest.onNotification({
          type: 'MOVE_LINE_ITEM',
          payload: { lineItem: mockLineItem, otherProject: mockProject }
        });

        expect(mockCartService.moveLineItemTo).toHaveBeenCalledWith(mockProject, mockLineItem);
      });

      it('clones a line item when notified with CLONE_LINE_ITEM', () => {
        let mockLineItem = {};
        componentUnderTest.onNotification({ type: 'CLONE_LINE_ITEM', payload: mockLineItem });

        expect(mockCartService.cloneLineItem).toHaveBeenCalledWith(mockLineItem);
      });

      it('removes a line item when notified with REMOVE_LINE_ITEM', () => {
        const spy = mockAppStore.createActionFactoryMethod('cart', 'removeAsset');
        const mockLineItem = { asset: { id: 123, type: 'cart' } };
        componentUnderTest.onNotification({ type: 'REMOVE_LINE_ITEM', payload: mockLineItem });
        mockAppStore.expectDispatchFor(spy, { id: 123, type: 'cart' });
      });

      it('edits a line item when notified with EDIT_LINE_ITEM', () => {
        let mockLineItem = {};
        componentUnderTest.onNotification(
          {
            type: 'EDIT_LINE_ITEM',
            payload: {
              lineItem: mockLineItem, fieldToEdit: { selectedTranscodeTarget: '1080i' }
            }
          });

        expect(mockCartService.editLineItem).toHaveBeenCalledWith(mockLineItem, { selectedTranscodeTarget: '1080i' });
      });

      it('edits the assets in and out markers with EDIT_LINE_ITEM_MARKERS', () => {
        let mockAsset = { assetId: 1234 };
        let mockMethod = mockAppStore.createLegacyServiceMethod('asset', 'getClipPreviewData', Observable.of({ url: 'fake url' }));

        componentUnderTest.onNotification({ type: 'EDIT_LINE_ITEM_MARKERS', payload: { asset: mockAsset } });

        mockAppStore.expectCallFor(mockMethod, 1234);
      });

      it('edits the project pricing with EDIT_PROJECT_PRICING', () => {
        let mockAsset = { assetId: 1234 };
        componentUnderTest.ngOnInit();
        componentUnderTest.onNotification({ type: 'EDIT_PROJECT_PRICING', payload: { asset: mockAsset } });

        mockAppStore.expectDispatchFor(setPriceSpy, null);
        mockAppStore.expectDispatchFor(initPricingSpy, 'Rights Managed', {
          componentType: jasmine.any(Function),
          inputOptions: {
            pricingPreferences: { some: 'attribute' },
            userCanCustomizeRights: false
          },
          outputOptions: [
            {
              event: 'pricingEvent',
              callback: jasmine.any(Function)
            }
          ]
        });
      });

      it('calls openPricingDialog with SHOW_PRICING_DIALOG', () => {
        let mockLineItem = { asset: { assetId: 123456 } };
        componentUnderTest.ngOnInit();
        componentUnderTest.onNotification({ type: 'SHOW_PRICING_DIALOG', payload: mockLineItem });

        mockAppStore.expectDispatchFor(initPricingSpy, 'Rights Managed', {
          componentType: jasmine.any(Function),
          inputOptions: {
            pricingPreferences: { some: 'attribute' },
            userCanCustomizeRights: false
          },
          outputOptions: [
            {
              event: 'pricingEvent',
              callback: jasmine.any(Function)
            }
          ]
        });
      });

      describe('ADD_NOTE', () => {
        it('opens a dialog with the correct config for a lineItem that has a note', () => {
          componentUnderTest.onNotification({ type: 'ADD_NOTE', payload: { notes: [{ notes: ['some note'] }] } });

          expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
            [{ name: 'note', type: 'textarea', validation: 'REQUIRED', label: 'QUOTE.EDIT_NOTE', value: 'some note' }],
            { title: 'QUOTE.EDIT_NOTE' },
            jasmine.any(Function)
          );
        });

        it('opens a dialog with the correct config for a lineItem that doesn\'t have a note', () => {
          componentUnderTest.onNotification({ type: 'ADD_NOTE', payload: { some: 'lineItem' } });

          expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
            [{ name: 'note', type: 'textarea', validation: 'REQUIRED', label: 'QUOTE.ADD_NOTE', value: '' }],
            { title: 'QUOTE.ADD_NOTE' },
            jasmine.any(Function)
          );
        });
      });

      it('calls openConfirmationDialog with REMOVE_NOTE', () => {
        componentUnderTest.onNotification({ type: 'REMOVE_NOTE', payload: { some: 'lineItem' } });

        expect(mockDialogService.openConfirmationDialog).toHaveBeenCalledWith({
          title: 'CART.DELETE_NOTES.TITLE',
          message: 'CART.DELETE_NOTES.MESSAGE',
          accept: 'CART.DELETE_NOTES.ACCEPT',
          decline: 'CART.DELETE_NOTES.DECLINE'
        }, jasmine.any(Function));
      });
    });

    describe('checkout()', () => {
      it('should go to the next tab', () => {
        spyOn(componentUnderTest, 'goToNextTab');
        componentUnderTest.checkout();

        expect(componentUnderTest.goToNextTab).toHaveBeenCalled();
      });

      it('should retrieve the payment options', () => {
        componentUnderTest.checkout();

        expect(mockCartService.getPaymentOptions).toHaveBeenCalled();
      });
    });

    describe('shouldShowLicenseDetailsBtn()', () => {
      it('should cal viewLicenseAgreementsButton on the commerce capabilities', () => {
        componentUnderTest.shouldShowLicenseDetailsBtn();

        expect(mockUserCan.viewLicenseAgreementsButton).toHaveBeenCalled();
      });
    });

    describe('showLicenseAgreements()', () => {
      it('should call retrieveLicenseAgreements() on the cart service', () => {
        componentUnderTest.showLicenseAgreements();

        expect(mockCartService.retrieveLicenseAgreements).toHaveBeenCalled();
      });
    });
  });
}

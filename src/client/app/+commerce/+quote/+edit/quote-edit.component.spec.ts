import { QuoteEditComponent } from './quote-edit.component';
import { Observable } from 'rxjs/Observable';
import { MockAppStore } from '../../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Quote Edit Component', () => {
    let componentUnderTest: QuoteEditComponent;
    let deleteQuoteDispatchSpy: jasmine.Spy;
    let addCustomPriceDispatchSpy: jasmine.Spy;
    let snackbarSpy: jasmine.Spy;
    let quoteSendSpy: jasmine.Spy;
    let mockStore: MockAppStore;
    let mockCapabilities: any;
    let mockDialogService: any;
    let mockWindow: any;
    let mockUserPreference: any;
    let mockRouter: any;
    let mockDocument: any;
    let mockChangeDetectorRef: any;

    beforeEach(() => {
      mockCapabilities = {
        cloneQuote: jasmine.createSpy('cloneQuote')
      };

      mockChangeDetectorRef = { markForCheck: () => { } };

      mockDialogService = {
        openFormDialog: jasmine.createSpy('openFormDialog').and.callFake((_: any, __: any, onSubmitCallback: Function) => {
          mockDialogService.onSubmitCallback = onSubmitCallback;
        }),
        openConfirmationDialog: jasmine.createSpy('openConfirmationDialog').and.callFake((_: any, onAcceptCallback: Function) => {
          mockDialogService.onAcceptCallback = onAcceptCallback;
        })
      };

      mockUserPreference = { data: Observable.of({ pricingPreferences: { some: 'preference' } }) };

      mockRouter = { navigate: jasmine.createSpy('navigate') };

      mockStore = new MockAppStore();

      mockStore.createStateSection('uiConfig', {
        components: {
          quoteComment: { config: { form: { items: [{ some: 'config' }] } } },
          cart: {
            config: {
              form: { items: ['comment', 'stuff'] },
              createQuote: { items: [{ name: 'purchaseType', value: '' }] },
              addBulkOrderId: { items: [{ some: 'bulk' }] },
              addDiscount: { items: [{ some: 'discount' }] },
              addCostMultiplier: { items: [{ some: 'multiplier' }] },
              bulkImport: { items: [{ some: 'import' }] },
              quotePurchaseType: { items: [{ value: 'SystemLicense', viewValue: 'System License' }] }
            }
          }
        }
      });

      mockStore.createStateSection('quoteEdit', {
        data: {
          id: 1,
          itemCount: 2,
          projects: []
        }
      });
      deleteQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'delete');
      addCustomPriceDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addCustomPriceToLineItem');
      snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
      quoteSendSpy = mockStore.createActionFactoryMethod('quoteEdit', 'sendQuote');

      componentUnderTest =
        new QuoteEditComponent(
          mockCapabilities, mockDialogService, mockStore, mockChangeDetectorRef
        );
    });

    // This gets used down below for some tedious setup in the editBulkId and editDiscount blocks
    let setupFor = (propertyInQuestion: any) => {
      componentUnderTest = new QuoteEditComponent(
        mockCapabilities, mockDialogService, mockStore, mockChangeDetectorRef
      );
      return componentUnderTest;
    };

    describe('Constructor', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      it('sets up the config instance variable', () => {
        expect(componentUnderTest.config).toEqual({
          form: { items: ['comment', 'stuff'] },
          createQuote: { items: [{ name: 'purchaseType', value: '' }] },
          addBulkOrderId: { items: [{ some: 'bulk' }] },
          addDiscount: { items: [{ some: 'discount' }] },
          addCostMultiplier: { items: [{ some: 'multiplier' }] },
          bulkImport: { items: [{ some: 'import' }] },
          quotePurchaseType: { items: [{ value: 'SystemLicense', viewValue: 'System License' }] }
        });
      });

      it('sets up the commentParentObject instance variable', () => {
        expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'quote', objectId: 1 });
      });

      it('gets the UI config specifically for the comments', () => {
        expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'config' }]);
      });
    });

    describe('Initialization', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      it('defines the expected tabs', () => {
        expect(componentUnderTest.tabLabelKeys).toEqual(['quote', 'recipient', 'confirm']);
      });

      it('disables all but the first tab', () => {
        expect(componentUnderTest.tabEnabled).toEqual([true, false, false]);
      });

      it('selects the first tab', () => {
        expect(componentUnderTest.selectedTabIndex).toBe(0);
      });
    });

    describe('onNotification()', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
      });

      describe('OPEN_DELETE_DIALOG', () => {
        beforeEach(() => componentUnderTest.onNotification({ type: 'OPEN_DELETE_DIALOG' }));
        it('calls openConfirmationDialog() on the dialog service', () => {

          expect(mockDialogService.openConfirmationDialog).toHaveBeenCalledWith({
            title: 'QUOTE.DELETE.TITLE',
            message: 'QUOTE.DELETE.MESSAGE',
            accept: 'QUOTE.DELETE.ACCEPT',
            decline: 'QUOTE.DELETE.DECLINE'
          }, jasmine.any(Function));
        });

        describe('onAccept callback', () => {
          beforeEach(() => {
            mockDialogService.onAcceptCallback();
          });

          it('dispatches the correct action', () => {
            mockStore.expectDispatchFor(deleteQuoteDispatchSpy);
          });
        });
      });

      describe('SAVE_AND_NEW', () => {
        let createQuoteSpy: jasmine.Spy;
        beforeEach(() => {
          createQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'createQuote');
          componentUnderTest.onNotification({ type: 'SAVE_AND_NEW' });
        });

        it('Calls the quote service createQuote method', () => {
          expect(createQuoteSpy).toHaveBeenCalled();
        });
      });

      describe('CLONE_QUOTE', () => {
        let cloneQuoteSpy: jasmine.Spy;
        beforeEach(() => {
          cloneQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'cloneQuote');
          mockStore.createStateSection('quoteEdit', { data: { id: 1 } });
          componentUnderTest.onNotification({ type: 'CLONE_QUOTE' });
        });
        it('Dispatch the cloneQuote action with current quote', () => {
          expect(cloneQuoteSpy).toHaveBeenCalledWith({ id: 1 });
        });
      });

      describe('GO_TO_NEXT_TAB', () => {
        it('enables the next tab, but no others', () => {
          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          expect(componentUnderTest.tabEnabled).toEqual([true, true, false]);
        });

        it('selects the next tab', (done) => {
          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          setTimeout(_ => {
            expect(componentUnderTest.selectedTabIndex).toBe(1);
            done();
          }, 100);
        });

        it('does not advance beyond the last tab', (done) => {
          componentUnderTest.selectedTabIndex = 2;
          componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });

          setTimeout(_ => {
            expect(componentUnderTest.selectedTabIndex).toBe(2);
            done();
          }, 100);
        });
      });

      describe('GO_TO_PREVIOUS_TAB', () => {
        it('selects the previous tab', () => {
          componentUnderTest.selectedTabIndex = 1;

          componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });

          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });

        it('does not go back beyond the first tab', () => {
          componentUnderTest.selectedTabIndex = 0;

          componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });

          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });
      });

      describe('GO_TO_TAB', () => {
        it('selects the tab by index', () => {
          componentUnderTest.selectedTabIndex = 1;

          componentUnderTest.onNotification({ type: 'GO_TO_TAB', payload: 0 });
          expect(componentUnderTest.selectedTabIndex).toBe(0);
        });
      });

      describe('DISABLE_TAB', () => {
        it('disables a tab based on index', () => {
          componentUnderTest.selectedTabIndex = 1;

          componentUnderTest.onNotification({ type: 'DISABLE_TAB', payload: 0 });
          expect(componentUnderTest.tabEnabled).toEqual([false, false, false]);
        });
      });
    });

    describe('toggleCommentVisibility', () => {
      it('should toggle the showComments flag', () => {
        expect(componentUnderTest.showComments).toBe(null);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(true);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(false);
      });
    });

    describe('get bulkOrderIdActionLabel', () => {
      it('returns the right string for a known property (EDIT)', () => {
        mockStore.createStateSection('quoteEdit', { data: { bulkOrderId: 1 } });
        expect(componentUnderTest.bulkOrderIdActionLabel).toBe('QUOTE.EDIT_BULK_ORDER_ID_TITLE');
      });

      it('returns the right string for an unknown property (ADD)', () => {
        mockStore.createStateSection('quoteEdit', { data: {} });
        expect(componentUnderTest.bulkOrderIdActionLabel).toBe('QUOTE.ADD_BULK_ORDER_ID_TITLE');
      });
    });

    describe('get discountActionLabel', () => {
      it('returns the right string for a known property (EDIT)', () => {
        mockStore.createStateSection('quoteEdit', { data: { discount: 1 } });
        expect(componentUnderTest.discountActionLabel).toBe('QUOTE.EDIT_DISCOUNT_TITLE');
      });

      it('returns the right string for an unknown property (ADD)', () => {
        mockStore.createStateSection('quoteEdit', { data: {} });
        expect(componentUnderTest.discountActionLabel).toBe('QUOTE.ADD_DISCOUNT_TITLE');
      });
    });

    describe('shouldShowCloneButton()', () => {
      it('Should call the cloneQuote capability with the quote edit store', () => {
        mockStore.createStateSection('quoteEdit', { data: { id: 1 } });
        const shouldShowCloneButton = componentUnderTest.shouldShowCloneButton;
        expect(mockCapabilities.cloneQuote).toHaveBeenCalledWith(Observable.of({ data: { id: 1 } }));
      });
    });

    describe('commentCount', () => {
      it('should get the count from the correct part of the store', () => {
        mockStore.createStateSection('comment', { quote: { pagination: { totalCount: 10 } } });

        componentUnderTest.commentCount.take(1).subscribe(count => expect(count).toBe(10));
      });
    });

    describe('addBulkOrderId()', () => {
      describe('calls openFormDialog() on the dialog service with the correct arguments', () => {
        it('for a known property', () => {
          mockStore.createStateSection('quoteEdit', { data: { bulkOrderId: 1 } });
          componentUnderTest.ngOnInit();
          componentUnderTest.addBulkOrderId();

          expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
            [{ some: 'bulk', value: 1 }],
            {
              title: 'QUOTE.EDIT_BULK_ORDER_ID_TITLE',
              submitLabel: 'QUOTE.EDIT_BULK_ORDER_FORM_SUBMIT',
              autocomplete: 'off'
            },
            jasmine.any(Function)
          );
        });

        it('for an unknown property', () => {
          mockStore.createStateSection('quoteEdit', { data: {} });
          componentUnderTest.ngOnInit();
          componentUnderTest.addBulkOrderId();

          expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
            [{ some: 'bulk', value: '' }],
            {
              title: 'QUOTE.ADD_BULK_ORDER_ID_TITLE',
              submitLabel: 'QUOTE.ADD_BULK_ORDER_FORM_SUBMIT',
              autocomplete: 'off'
            },
            jasmine.any(Function)
          );
        });
      });

      describe('the callback', () => {
        let updateQuoteFieldSpy: jasmine.Spy;
        it('gets called', () => {
          mockStore.createStateSection('quoteEdit', { data: { bulkOrderId: 1 } });
          let updateQuoteFieldSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateQuoteField');
          componentUnderTest.ngOnInit();
          componentUnderTest.addBulkOrderId();
          mockDialogService.onSubmitCallback({ some: 'options' });

          expect(updateQuoteFieldSpy).toHaveBeenCalledWith({ some: 'options' });
        });
      });
    });

    describe('editDiscount()', () => {
      describe('calls openFormDialog() on the dialog service with the correct arguments', () => {
        it('for a known property', () => {
          mockStore.createStateSection('quoteEdit', { data: { discount: 1 } });
          componentUnderTest.ngOnInit();
          componentUnderTest.editDiscount();

          expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
            [{ some: 'discount', value: 1 }],
            {
              title: 'QUOTE.EDIT_DISCOUNT_TITLE',
              submitLabel: 'QUOTE.EDIT_DISCOUNT_FORM_SUBMIT',
              autocomplete: 'off'
            },
            jasmine.any(Function)
          );
        });

        it('for an unknown property', () => {
          mockStore.createStateSection('quoteEdit', { data: {} });
          componentUnderTest.ngOnInit();
          componentUnderTest.editDiscount();

          expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(
            [{ some: 'discount', value: '' }],
            {
              title: 'QUOTE.ADD_DISCOUNT_TITLE',
              submitLabel: 'QUOTE.ADD_DISCOUNT_FORM_SUBMIT',
              autocomplete: 'off'
            },
            jasmine.any(Function)
          );
        });
      });
    });
  });
}

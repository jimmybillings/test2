"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quote_edit_component_1 = require("./quote-edit.component");
var Observable_1 = require("rxjs/Observable");
var mock_app_store_1 = require("../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Quote Edit Component', function () {
        var componentUnderTest;
        var deleteQuoteDispatchSpy;
        var addCustomPriceDispatchSpy;
        var snackbarSpy;
        var quoteSendSpy;
        var mockStore;
        var mockCapabilities;
        var mockDialogService;
        var mockWindow;
        var mockUserPreference;
        var mockRouter;
        var mockDocument;
        var mockChangeDetectorRef;
        beforeEach(function () {
            mockCapabilities = {
                cloneQuote: jasmine.createSpy('cloneQuote')
            };
            mockChangeDetectorRef = { markForCheck: function () { } };
            mockDialogService = {
                openFormDialog: jasmine.createSpy('openFormDialog').and.callFake(function (_, __, onSubmitCallback) {
                    mockDialogService.onSubmitCallback = onSubmitCallback;
                }),
                openConfirmationDialog: jasmine.createSpy('openConfirmationDialog').and.callFake(function (_, onAcceptCallback) {
                    mockDialogService.onAcceptCallback = onAcceptCallback;
                })
            };
            mockUserPreference = { data: Observable_1.Observable.of({ pricingPreferences: { some: 'preference' } }) };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockStore = new mock_app_store_1.MockAppStore();
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
                new quote_edit_component_1.QuoteEditComponent(mockCapabilities, mockDialogService, mockStore, mockChangeDetectorRef);
        });
        var setupFor = function (propertyInQuestion) {
            componentUnderTest = new quote_edit_component_1.QuoteEditComponent(mockCapabilities, mockDialogService, mockStore, mockChangeDetectorRef);
            return componentUnderTest;
        };
        describe('Constructor', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            it('sets up the config instance variable', function () {
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
            it('sets up the commentParentObject instance variable', function () {
                expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'quote', objectId: 1 });
            });
            it('gets the UI config specifically for the comments', function () {
                expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'config' }]);
            });
        });
        describe('Initialization', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            it('defines the expected tabs', function () {
                expect(componentUnderTest.tabLabelKeys).toEqual(['quote', 'recipient', 'confirm']);
            });
            it('disables all but the first tab', function () {
                expect(componentUnderTest.tabEnabled).toEqual([true, false, false]);
            });
            it('selects the first tab', function () {
                expect(componentUnderTest.selectedTabIndex).toBe(0);
            });
        });
        describe('onNotification()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            describe('OPEN_DELETE_DIALOG', function () {
                beforeEach(function () { return componentUnderTest.onNotification({ type: 'OPEN_DELETE_DIALOG' }); });
                it('calls openConfirmationDialog() on the dialog service', function () {
                    expect(mockDialogService.openConfirmationDialog).toHaveBeenCalledWith({
                        title: 'QUOTE.DELETE.TITLE',
                        message: 'QUOTE.DELETE.MESSAGE',
                        accept: 'QUOTE.DELETE.ACCEPT',
                        decline: 'QUOTE.DELETE.DECLINE'
                    }, jasmine.any(Function));
                });
                describe('onAccept callback', function () {
                    beforeEach(function () {
                        mockDialogService.onAcceptCallback();
                    });
                    it('dispatches the correct action', function () {
                        mockStore.expectDispatchFor(deleteQuoteDispatchSpy);
                    });
                });
            });
            describe('SAVE_AND_NEW', function () {
                var createQuoteSpy;
                beforeEach(function () {
                    createQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'createQuote');
                    componentUnderTest.onNotification({ type: 'SAVE_AND_NEW' });
                });
                it('Calls the quote service createQuote method', function () {
                    expect(createQuoteSpy).toHaveBeenCalled();
                });
            });
            describe('CLONE_QUOTE', function () {
                var cloneQuoteSpy;
                beforeEach(function () {
                    cloneQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'cloneQuote');
                    mockStore.createStateSection('quoteEdit', { data: { id: 1 } });
                    componentUnderTest.onNotification({ type: 'CLONE_QUOTE' });
                });
                it('Dispatch the cloneQuote action with current quote', function () {
                    expect(cloneQuoteSpy).toHaveBeenCalledWith({ id: 1 });
                });
            });
            describe('GO_TO_NEXT_TAB', function () {
                it('enables the next tab, but no others', function () {
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    expect(componentUnderTest.tabEnabled).toEqual([true, true, false]);
                });
                it('selects the next tab', function (done) {
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    setTimeout(function (_) {
                        expect(componentUnderTest.selectedTabIndex).toBe(1);
                        done();
                    }, 100);
                });
                it('does not advance beyond the last tab', function (done) {
                    componentUnderTest.selectedTabIndex = 2;
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    setTimeout(function (_) {
                        expect(componentUnderTest.selectedTabIndex).toBe(2);
                        done();
                    }, 100);
                });
            });
            describe('GO_TO_PREVIOUS_TAB', function () {
                it('selects the previous tab', function () {
                    componentUnderTest.selectedTabIndex = 1;
                    componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });
                    expect(componentUnderTest.selectedTabIndex).toBe(0);
                });
                it('does not go back beyond the first tab', function () {
                    componentUnderTest.selectedTabIndex = 0;
                    componentUnderTest.onNotification({ type: 'GO_TO_PREVIOUS_TAB' });
                    expect(componentUnderTest.selectedTabIndex).toBe(0);
                });
            });
            describe('GO_TO_TAB', function () {
                it('selects the tab by index', function () {
                    componentUnderTest.selectedTabIndex = 1;
                    componentUnderTest.onNotification({ type: 'GO_TO_TAB', payload: 0 });
                    expect(componentUnderTest.selectedTabIndex).toBe(0);
                });
            });
            describe('DISABLE_TAB', function () {
                it('disables a tab based on index', function () {
                    componentUnderTest.selectedTabIndex = 1;
                    componentUnderTest.onNotification({ type: 'DISABLE_TAB', payload: 0 });
                    expect(componentUnderTest.tabEnabled).toEqual([false, false, false]);
                });
            });
        });
        describe('toggleCommentVisibility', function () {
            it('should toggle the showComments flag', function () {
                expect(componentUnderTest.showComments).toBe(null);
                componentUnderTest.toggleCommentsVisibility();
                expect(componentUnderTest.showComments).toBe(true);
                componentUnderTest.toggleCommentsVisibility();
                expect(componentUnderTest.showComments).toBe(false);
            });
        });
        describe('get bulkOrderIdActionLabel', function () {
            it('returns the right string for a known property (EDIT)', function () {
                mockStore.createStateSection('quoteEdit', { data: { bulkOrderId: 1 } });
                expect(componentUnderTest.bulkOrderIdActionLabel).toBe('QUOTE.EDIT_BULK_ORDER_ID_TITLE');
            });
            it('returns the right string for an unknown property (ADD)', function () {
                mockStore.createStateSection('quoteEdit', { data: {} });
                expect(componentUnderTest.bulkOrderIdActionLabel).toBe('QUOTE.ADD_BULK_ORDER_ID_TITLE');
            });
        });
        describe('get discountActionLabel', function () {
            it('returns the right string for a known property (EDIT)', function () {
                mockStore.createStateSection('quoteEdit', { data: { discount: 1 } });
                expect(componentUnderTest.discountActionLabel).toBe('QUOTE.EDIT_DISCOUNT_TITLE');
            });
            it('returns the right string for an unknown property (ADD)', function () {
                mockStore.createStateSection('quoteEdit', { data: {} });
                expect(componentUnderTest.discountActionLabel).toBe('QUOTE.ADD_DISCOUNT_TITLE');
            });
        });
        describe('shouldShowCloneButton()', function () {
            it('Should call the cloneQuote capability with the quote edit store', function () {
                mockStore.createStateSection('quoteEdit', { data: { id: 1 } });
                var shouldShowCloneButton = componentUnderTest.shouldShowCloneButton;
                expect(mockCapabilities.cloneQuote).toHaveBeenCalledWith(Observable_1.Observable.of({ data: { id: 1 } }));
            });
        });
        describe('commentCount', function () {
            it('should get the count from the correct part of the store', function () {
                mockStore.createStateSection('comment', { quote: { pagination: { totalCount: 10 } } });
                componentUnderTest.commentCount.take(1).subscribe(function (count) { return expect(count).toBe(10); });
            });
        });
        describe('addBulkOrderId()', function () {
            describe('calls openFormDialog() on the dialog service with the correct arguments', function () {
                it('for a known property', function () {
                    mockStore.createStateSection('quoteEdit', { data: { bulkOrderId: 1 } });
                    componentUnderTest.ngOnInit();
                    componentUnderTest.addBulkOrderId();
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'bulk', value: 1 }], {
                        title: 'QUOTE.EDIT_BULK_ORDER_ID_TITLE',
                        submitLabel: 'QUOTE.EDIT_BULK_ORDER_FORM_SUBMIT',
                        autocomplete: 'off'
                    }, jasmine.any(Function));
                });
                it('for an unknown property', function () {
                    mockStore.createStateSection('quoteEdit', { data: {} });
                    componentUnderTest.ngOnInit();
                    componentUnderTest.addBulkOrderId();
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'bulk', value: '' }], {
                        title: 'QUOTE.ADD_BULK_ORDER_ID_TITLE',
                        submitLabel: 'QUOTE.ADD_BULK_ORDER_FORM_SUBMIT',
                        autocomplete: 'off'
                    }, jasmine.any(Function));
                });
            });
            describe('the callback', function () {
                var updateQuoteFieldSpy;
                it('gets called', function () {
                    mockStore.createStateSection('quoteEdit', { data: { bulkOrderId: 1 } });
                    var updateQuoteFieldSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateQuoteField');
                    componentUnderTest.ngOnInit();
                    componentUnderTest.addBulkOrderId();
                    mockDialogService.onSubmitCallback({ some: 'options' });
                    expect(updateQuoteFieldSpy).toHaveBeenCalledWith({ some: 'options' });
                });
            });
        });
        describe('editDiscount()', function () {
            describe('calls openFormDialog() on the dialog service with the correct arguments', function () {
                it('for a known property', function () {
                    mockStore.createStateSection('quoteEdit', { data: { discount: 1 } });
                    componentUnderTest.ngOnInit();
                    componentUnderTest.editDiscount();
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'discount', value: 1 }], {
                        title: 'QUOTE.EDIT_DISCOUNT_TITLE',
                        submitLabel: 'QUOTE.EDIT_DISCOUNT_FORM_SUBMIT',
                        autocomplete: 'off'
                    }, jasmine.any(Function));
                });
                it('for an unknown property', function () {
                    mockStore.createStateSection('quoteEdit', { data: {} });
                    componentUnderTest.ngOnInit();
                    componentUnderTest.editDiscount();
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'discount', value: '' }], {
                        title: 'QUOTE.ADD_DISCOUNT_TITLE',
                        submitLabel: 'QUOTE.ADD_DISCOUNT_FORM_SUBMIT',
                        autocomplete: 'off'
                    }, jasmine.any(Function));
                });
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L3F1b3RlLWVkaXQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrREFBNEQ7QUFDNUQsOENBQTZDO0FBQzdDLDZFQUEwRTtBQUUxRTtJQUNFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGtCQUFzQyxDQUFDO1FBQzNDLElBQUksc0JBQW1DLENBQUM7UUFDeEMsSUFBSSx5QkFBc0MsQ0FBQztRQUMzQyxJQUFJLFdBQXdCLENBQUM7UUFDN0IsSUFBSSxZQUF5QixDQUFDO1FBQzlCLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksaUJBQXNCLENBQUM7UUFDM0IsSUFBSSxVQUFlLENBQUM7UUFDcEIsSUFBSSxrQkFBdUIsQ0FBQztRQUM1QixJQUFJLFVBQWUsQ0FBQztRQUNwQixJQUFJLFlBQWlCLENBQUM7UUFDdEIsSUFBSSxxQkFBMEIsQ0FBQztRQUUvQixVQUFVLENBQUM7WUFDVCxnQkFBZ0IsR0FBRztnQkFDakIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2FBQzVDLENBQUM7WUFFRixxQkFBcUIsR0FBRyxFQUFFLFlBQVksRUFBRSxjQUFRLENBQUMsRUFBRSxDQUFDO1lBRXBELGlCQUFpQixHQUFHO2dCQUNsQixjQUFjLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBQyxDQUFNLEVBQUUsRUFBTyxFQUFFLGdCQUEwQjtvQkFDM0csaUJBQWlCLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ3hELENBQUMsQ0FBQztnQkFDRixzQkFBc0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFDLENBQU0sRUFBRSxnQkFBMEI7b0JBQ2xI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QUFHLENBQUMsUUFBUSxDQUFDLENBQ3RCLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLHlCQUF5QixFQUFFO29CQUM1QixTQUFTLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3hELGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM5QixrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFFbEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDLG9CQUFvQixDQUMzRCxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFDakM7d0JBQ0UsS0FBSyxFQUFFLDBCQUEwQjt3QkFDakMsV0FBVyxFQUFFLGdDQUFnQzt3QkFDN0MsWUFBWSxFQUFFLEtBQUs7cUJBQ3BCLEVBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FDdEIsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF4WEQsb0JBd1hDIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L3F1b3RlLWVkaXQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdW90ZUVkaXRDb21wb25lbnQgfSBmcm9tICcuL3F1b3RlLWVkaXQuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdRdW90ZSBFZGl0IENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBRdW90ZUVkaXRDb21wb25lbnQ7XG4gICAgbGV0IGRlbGV0ZVF1b3RlRGlzcGF0Y2hTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBhZGRDdXN0b21QcmljZURpc3BhdGNoU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgc25hY2tiYXJTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBxdW90ZVNlbmRTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja0NhcGFiaWxpdGllczogYW55O1xuICAgIGxldCBtb2NrRGlhbG9nU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrV2luZG93OiBhbnk7XG4gICAgbGV0IG1vY2tVc2VyUHJlZmVyZW5jZTogYW55O1xuICAgIGxldCBtb2NrUm91dGVyOiBhbnk7XG4gICAgbGV0IG1vY2tEb2N1bWVudDogYW55O1xuICAgIGxldCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWY6IGFueTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgY2xvbmVRdW90ZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb25lUXVvdGUnKVxuICAgICAgfTtcblxuICAgICAgbW9ja0NoYW5nZURldGVjdG9yUmVmID0geyBtYXJrRm9yQ2hlY2s6ICgpID0+IHsgfSB9O1xuXG4gICAgICBtb2NrRGlhbG9nU2VydmljZSA9IHtcbiAgICAgICAgb3BlbkZvcm1EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuRm9ybURpYWxvZycpLmFuZC5jYWxsRmFrZSgoXzogYW55LCBfXzogYW55LCBvblN1Ym1pdENhbGxiYWNrOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9uU3VibWl0Q2FsbGJhY2sgPSBvblN1Ym1pdENhbGxiYWNrO1xuICAgICAgICB9KSxcbiAgICAgICAgb3BlbkNvbmZpcm1hdGlvbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db25maXJtYXRpb25EaWFsb2cnKS5hbmQuY2FsbEZha2UoKF86IGFueSwgb25BY2NlcHRDYWxsYmFjazogRnVuY3Rpb24pID0+IHtcbiAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vbkFjY2VwdENhbGxiYWNrID0gb25BY2NlcHRDYWxsYmFjaztcbiAgICAgICAgfSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZSA9IHsgZGF0YTogT2JzZXJ2YWJsZS5vZih7IHByaWNpbmdQcmVmZXJlbmNlczogeyBzb21lOiAncHJlZmVyZW5jZScgfSB9KSB9O1xuXG4gICAgICBtb2NrUm91dGVyID0geyBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJykgfTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuXG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgIHF1b3RlQ29tbWVudDogeyBjb25maWc6IHsgZm9ybTogeyBpdGVtczogW3sgc29tZTogJ2NvbmZpZycgfV0gfSB9IH0sXG4gICAgICAgICAgY2FydDoge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgIGZvcm06IHsgaXRlbXM6IFsnY29tbWVudCcsICdzdHVmZiddIH0sXG4gICAgICAgICAgICAgIGNyZWF0ZVF1b3RlOiB7IGl0ZW1zOiBbeyBuYW1lOiAncHVyY2hhc2VUeXBlJywgdmFsdWU6ICcnIH1dIH0sXG4gICAgICAgICAgICAgIGFkZEJ1bGtPcmRlcklkOiB7IGl0ZW1zOiBbeyBzb21lOiAnYnVsaycgfV0gfSxcbiAgICAgICAgICAgICAgYWRkRGlzY291bnQ6IHsgaXRlbXM6IFt7IHNvbWU6ICdkaXNjb3VudCcgfV0gfSxcbiAgICAgICAgICAgICAgYWRkQ29zdE11bHRpcGxpZXI6IHsgaXRlbXM6IFt7IHNvbWU6ICdtdWx0aXBsaWVyJyB9XSB9LFxuICAgICAgICAgICAgICBidWxrSW1wb3J0OiB7IGl0ZW1zOiBbeyBzb21lOiAnaW1wb3J0JyB9XSB9LFxuICAgICAgICAgICAgICBxdW90ZVB1cmNoYXNlVHlwZTogeyBpdGVtczogW3sgdmFsdWU6ICdTeXN0ZW1MaWNlbnNlJywgdmlld1ZhbHVlOiAnU3lzdGVtIExpY2Vuc2UnIH1dIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICBpdGVtQ291bnQ6IDIsXG4gICAgICAgICAgcHJvamVjdHM6IFtdXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZGVsZXRlUXVvdGVEaXNwYXRjaFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnZGVsZXRlJyk7XG4gICAgICBhZGRDdXN0b21QcmljZURpc3BhdGNoU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdhZGRDdXN0b21QcmljZVRvTGluZUl0ZW0nKTtcbiAgICAgIHNuYWNrYmFyU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3NuYWNrYmFyJywgJ2Rpc3BsYXknKTtcbiAgICAgIHF1b3RlU2VuZFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnc2VuZFF1b3RlJyk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9XG4gICAgICAgIG5ldyBRdW90ZUVkaXRDb21wb25lbnQoXG4gICAgICAgICAgbW9ja0NhcGFiaWxpdGllcywgbW9ja0RpYWxvZ1NlcnZpY2UsIG1vY2tTdG9yZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBUaGlzIGdldHMgdXNlZCBkb3duIGJlbG93IGZvciBzb21lIHRlZGlvdXMgc2V0dXAgaW4gdGhlIGVkaXRCdWxrSWQgYW5kIGVkaXREaXNjb3VudCBibG9ja3NcbiAgICBsZXQgc2V0dXBGb3IgPSAocHJvcGVydHlJblF1ZXN0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZUVkaXRDb21wb25lbnQoXG4gICAgICAgIG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrU3RvcmUsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZlxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRVbmRlclRlc3Q7XG4gICAgfTtcblxuICAgIGRlc2NyaWJlKCdDb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2V0cyB1cCB0aGUgY29uZmlnIGluc3RhbmNlIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbmZpZykudG9FcXVhbCh7XG4gICAgICAgICAgZm9ybTogeyBpdGVtczogWydjb21tZW50JywgJ3N0dWZmJ10gfSxcbiAgICAgICAgICBjcmVhdGVRdW90ZTogeyBpdGVtczogW3sgbmFtZTogJ3B1cmNoYXNlVHlwZScsIHZhbHVlOiAnJyB9XSB9LFxuICAgICAgICAgIGFkZEJ1bGtPcmRlcklkOiB7IGl0ZW1zOiBbeyBzb21lOiAnYnVsaycgfV0gfSxcbiAgICAgICAgICBhZGREaXNjb3VudDogeyBpdGVtczogW3sgc29tZTogJ2Rpc2NvdW50JyB9XSB9LFxuICAgICAgICAgIGFkZENvc3RNdWx0aXBsaWVyOiB7IGl0ZW1zOiBbeyBzb21lOiAnbXVsdGlwbGllcicgfV0gfSxcbiAgICAgICAgICBidWxrSW1wb3J0OiB7IGl0ZW1zOiBbeyBzb21lOiAnaW1wb3J0JyB9XSB9LFxuICAgICAgICAgIHF1b3RlUHVyY2hhc2VUeXBlOiB7IGl0ZW1zOiBbeyB2YWx1ZTogJ1N5c3RlbUxpY2Vuc2UnLCB2aWV3VmFsdWU6ICdTeXN0ZW0gTGljZW5zZScgfV0gfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2V0cyB1cCB0aGUgY29tbWVudFBhcmVudE9iamVjdCBpbnN0YW5jZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50UGFyZW50T2JqZWN0KS50b0VxdWFsKHsgb2JqZWN0VHlwZTogJ3F1b3RlJywgb2JqZWN0SWQ6IDEgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2dldHMgdGhlIFVJIGNvbmZpZyBzcGVjaWZpY2FsbHkgZm9yIHRoZSBjb21tZW50cycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50Rm9ybUNvbmZpZykudG9FcXVhbChbeyBzb21lOiAnY29uZmlnJyB9XSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdJbml0aWFsaXphdGlvbicsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGVmaW5lcyB0aGUgZXhwZWN0ZWQgdGFicycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC50YWJMYWJlbEtleXMpLnRvRXF1YWwoWydxdW90ZScsICdyZWNpcGllbnQnLCAnY29uZmlybSddKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzYWJsZXMgYWxsIGJ1dCB0aGUgZmlyc3QgdGFiJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnRhYkVuYWJsZWQpLnRvRXF1YWwoW3RydWUsIGZhbHNlLCBmYWxzZV0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZWxlY3RzIHRoZSBmaXJzdCB0YWInLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSgwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uTm90aWZpY2F0aW9uKCknLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ09QRU5fREVMRVRFX0RJQUxPRycsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnT1BFTl9ERUxFVEVfRElBTE9HJyB9KSk7XG4gICAgICAgIGl0KCdjYWxscyBvcGVuQ29uZmlybWF0aW9uRGlhbG9nKCkgb24gdGhlIGRpYWxvZyBzZXJ2aWNlJywgKCkgPT4ge1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtYXRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICAgIHRpdGxlOiAnUVVPVEUuREVMRVRFLlRJVExFJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdRVU9URS5ERUxFVEUuTUVTU0FHRScsXG4gICAgICAgICAgICBhY2NlcHQ6ICdRVU9URS5ERUxFVEUuQUNDRVBUJyxcbiAgICAgICAgICAgIGRlY2xpbmU6ICdRVU9URS5ERUxFVEUuREVDTElORSdcbiAgICAgICAgICB9LCBqYXNtaW5lLmFueShGdW5jdGlvbikpO1xuICAgICAgICB9KTtcblxuICAgICAgICBkZXNjcmliZSgnb25BY2NlcHQgY2FsbGJhY2snLCAoKSA9PiB7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vbkFjY2VwdENhbGxiYWNrKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgnZGlzcGF0Y2hlcyB0aGUgY29ycmVjdCBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoZGVsZXRlUXVvdGVEaXNwYXRjaFNweSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdTQVZFX0FORF9ORVcnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjcmVhdGVRdW90ZVNweTogamFzbWluZS5TcHk7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGNyZWF0ZVF1b3RlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdjcmVhdGVRdW90ZScpO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdTQVZFX0FORF9ORVcnIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnQ2FsbHMgdGhlIHF1b3RlIHNlcnZpY2UgY3JlYXRlUXVvdGUgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjcmVhdGVRdW90ZVNweSkudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnQ0xPTkVfUVVPVEUnLCAoKSA9PiB7XG4gICAgICAgIGxldCBjbG9uZVF1b3RlU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgY2xvbmVRdW90ZVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnY2xvbmVRdW90ZScpO1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBpZDogMSB9IH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdDTE9ORV9RVU9URScgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpdCgnRGlzcGF0Y2ggdGhlIGNsb25lUXVvdGUgYWN0aW9uIHdpdGggY3VycmVudCBxdW90ZScsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY2xvbmVRdW90ZVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBpZDogMSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0dPX1RPX05FWFRfVEFCJywgKCkgPT4ge1xuICAgICAgICBpdCgnZW5hYmxlcyB0aGUgbmV4dCB0YWIsIGJ1dCBubyBvdGhlcnMnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0dPX1RPX05FWFRfVEFCJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGFiRW5hYmxlZCkudG9FcXVhbChbdHJ1ZSwgdHJ1ZSwgZmFsc2VdKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NlbGVjdHMgdGhlIG5leHQgdGFiJywgKGRvbmUpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnR09fVE9fTkVYVF9UQUInIH0pO1xuXG4gICAgICAgICAgc2V0VGltZW91dChfID0+IHtcbiAgICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSgxKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgYWR2YW5jZSBiZXlvbmQgdGhlIGxhc3QgdGFiJywgKGRvbmUpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCA9IDI7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0dPX1RPX05FWFRfVEFCJyB9KTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoXyA9PiB7XG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdGVkVGFiSW5kZXgpLnRvQmUoMik7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0dPX1RPX1BSRVZJT1VTX1RBQicsICgpID0+IHtcbiAgICAgICAgaXQoJ3NlbGVjdHMgdGhlIHByZXZpb3VzIHRhYicsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCA9IDE7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnR09fVE9fUFJFVklPVVNfVEFCJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCkudG9CZSgwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IGdvIGJhY2sgYmV5b25kIHRoZSBmaXJzdCB0YWInLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdGVkVGFiSW5kZXggPSAwO1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0dPX1RPX1BSRVZJT1VTX1RBQicgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdGVkVGFiSW5kZXgpLnRvQmUoMCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdHT19UT19UQUInLCAoKSA9PiB7XG4gICAgICAgIGl0KCdzZWxlY3RzIHRoZSB0YWIgYnkgaW5kZXgnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdGVkVGFiSW5kZXggPSAxO1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0dPX1RPX1RBQicsIHBheWxvYWQ6IDAgfSk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zZWxlY3RlZFRhYkluZGV4KS50b0JlKDApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnRElTQUJMRV9UQUInLCAoKSA9PiB7XG4gICAgICAgIGl0KCdkaXNhYmxlcyBhIHRhYiBiYXNlZCBvbiBpbmRleCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2VsZWN0ZWRUYWJJbmRleCA9IDE7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnRElTQUJMRV9UQUInLCBwYXlsb2FkOiAwIH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QudGFiRW5hYmxlZCkudG9FcXVhbChbZmFsc2UsIGZhbHNlLCBmYWxzZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RvZ2dsZUNvbW1lbnRWaXNpYmlsaXR5JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCB0b2dnbGUgdGhlIHNob3dDb21tZW50cyBmbGFnJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cykudG9CZShudWxsKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eSgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cykudG9CZSh0cnVlKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eSgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgYnVsa09yZGVySWRBY3Rpb25MYWJlbCcsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSByaWdodCBzdHJpbmcgZm9yIGEga25vd24gcHJvcGVydHkgKEVESVQpJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgYnVsa09yZGVySWQ6IDEgfSB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5idWxrT3JkZXJJZEFjdGlvbkxhYmVsKS50b0JlKCdRVU9URS5FRElUX0JVTEtfT1JERVJfSURfVElUTEUnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0aGUgcmlnaHQgc3RyaW5nIGZvciBhbiB1bmtub3duIHByb3BlcnR5IChBREQpJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHt9IH0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmJ1bGtPcmRlcklkQWN0aW9uTGFiZWwpLnRvQmUoJ1FVT1RFLkFERF9CVUxLX09SREVSX0lEX1RJVExFJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgZGlzY291bnRBY3Rpb25MYWJlbCcsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSByaWdodCBzdHJpbmcgZm9yIGEga25vd24gcHJvcGVydHkgKEVESVQpJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgZGlzY291bnQ6IDEgfSB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kaXNjb3VudEFjdGlvbkxhYmVsKS50b0JlKCdRVU9URS5FRElUX0RJU0NPVU5UX1RJVExFJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdGhlIHJpZ2h0IHN0cmluZyBmb3IgYW4gdW5rbm93biBwcm9wZXJ0eSAoQUREKScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5kaXNjb3VudEFjdGlvbkxhYmVsKS50b0JlKCdRVU9URS5BRERfRElTQ09VTlRfVElUTEUnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dDbG9uZUJ1dHRvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBjbG9uZVF1b3RlIGNhcGFiaWxpdHkgd2l0aCB0aGUgcXVvdGUgZWRpdCBzdG9yZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IGlkOiAxIH0gfSk7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dDbG9uZUJ1dHRvbiA9IGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93Q2xvbmVCdXR0b247XG4gICAgICAgIGV4cGVjdChtb2NrQ2FwYWJpbGl0aWVzLmNsb25lUXVvdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKE9ic2VydmFibGUub2YoeyBkYXRhOiB7IGlkOiAxIH0gfSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29tbWVudENvdW50JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBnZXQgdGhlIGNvdW50IGZyb20gdGhlIGNvcnJlY3QgcGFydCBvZiB0aGUgc3RvcmUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NvbW1lbnQnLCB7IHF1b3RlOiB7IHBhZ2luYXRpb246IHsgdG90YWxDb3VudDogMTAgfSB9IH0pO1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50Q291bnQudGFrZSgxKS5zdWJzY3JpYmUoY291bnQgPT4gZXhwZWN0KGNvdW50KS50b0JlKDEwKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRCdWxrT3JkZXJJZCgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2NhbGxzIG9wZW5Gb3JtRGlhbG9nKCkgb24gdGhlIGRpYWxvZyBzZXJ2aWNlIHdpdGggdGhlIGNvcnJlY3QgYXJndW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBpdCgnZm9yIGEga25vd24gcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IGJ1bGtPcmRlcklkOiAxIH0gfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZEJ1bGtPcmRlcklkKCk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgW3sgc29tZTogJ2J1bGsnLCB2YWx1ZTogMSB9XSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdRVU9URS5FRElUX0JVTEtfT1JERVJfSURfVElUTEUnLFxuICAgICAgICAgICAgICBzdWJtaXRMYWJlbDogJ1FVT1RFLkVESVRfQlVMS19PUkRFUl9GT1JNX1NVQk1JVCcsXG4gICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogJ29mZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGFuIHVua25vd24gcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkQnVsa09yZGVySWQoKTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBbeyBzb21lOiAnYnVsaycsIHZhbHVlOiAnJyB9XSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdRVU9URS5BRERfQlVMS19PUkRFUl9JRF9USVRMRScsXG4gICAgICAgICAgICAgIHN1Ym1pdExhYmVsOiAnUVVPVEUuQUREX0JVTEtfT1JERVJfRk9STV9TVUJNSVQnLFxuICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3RoZSBjYWxsYmFjaycsICgpID0+IHtcbiAgICAgICAgbGV0IHVwZGF0ZVF1b3RlRmllbGRTcHk6IGphc21pbmUuU3B5O1xuICAgICAgICBpdCgnZ2V0cyBjYWxsZWQnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IGJ1bGtPcmRlcklkOiAxIH0gfSk7XG4gICAgICAgICAgbGV0IHVwZGF0ZVF1b3RlRmllbGRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ3VwZGF0ZVF1b3RlRmllbGQnKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkQnVsa09yZGVySWQoKTtcbiAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vblN1Ym1pdENhbGxiYWNrKHsgc29tZTogJ29wdGlvbnMnIH0pO1xuXG4gICAgICAgICAgZXhwZWN0KHVwZGF0ZVF1b3RlRmllbGRTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ29wdGlvbnMnIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXREaXNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgZGVzY3JpYmUoJ2NhbGxzIG9wZW5Gb3JtRGlhbG9nKCkgb24gdGhlIGRpYWxvZyBzZXJ2aWNlIHdpdGggdGhlIGNvcnJlY3QgYXJndW1lbnRzJywgKCkgPT4ge1xuICAgICAgICBpdCgnZm9yIGEga25vd24gcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IGRpc2NvdW50OiAxIH0gfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXREaXNjb3VudCgpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Gb3JtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgIFt7IHNvbWU6ICdkaXNjb3VudCcsIHZhbHVlOiAxIH1dLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aXRsZTogJ1FVT1RFLkVESVRfRElTQ09VTlRfVElUTEUnLFxuICAgICAgICAgICAgICBzdWJtaXRMYWJlbDogJ1FVT1RFLkVESVRfRElTQ09VTlRfRk9STV9TVUJNSVQnLFxuICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhbiB1bmtub3duIHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YToge30gfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXREaXNjb3VudCgpO1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Gb3JtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgIFt7IHNvbWU6ICdkaXNjb3VudCcsIHZhbHVlOiAnJyB9XSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdRVU9URS5BRERfRElTQ09VTlRfVElUTEUnLFxuICAgICAgICAgICAgICBzdWJtaXRMYWJlbDogJ1FVT1RFLkFERF9ESVNDT1VOVF9GT1JNX1NVQk1JVCcsXG4gICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogJ29mZidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

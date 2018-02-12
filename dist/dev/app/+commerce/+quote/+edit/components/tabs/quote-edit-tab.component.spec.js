"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var mock_app_store_1 = require("../../../../../store/spec-helpers/mock-app.store");
var quote_edit_tab_component_1 = require("./quote-edit-tab.component");
var mockRmLineItemWithRights = { rightsManaged: 'Rights Managed', attributes: ['a', 'b', 'c'] };
var mockRmLineItemWithoutRights = { rightsManaged: 'Rights Managed' };
var mockRfLineItem = { rightsManaged: 'Royalty Free' };
var mockFeeLineItem = { some: 'feeLineItem' };
function main() {
    describe('Quote Edit Tab Component', function () {
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
        var initPricingSpy;
        var setPriceSpy;
        var updateQuoteFieldSpy;
        beforeEach(function () {
            mockCapabilities = {
                cloneQuote: jasmine.createSpy('cloneQuote'),
                administerQuotes: function () { return false; }
            };
            mockDialogService = {
                openFormDialog: jasmine.createSpy('openFormDialog').and.callFake(function (_, __, onSubmitCallback) {
                    mockDialogService.onSubmitCallback = onSubmitCallback;
                }),
                openConfirmationDialog: jasmine.createSpy('openConfirmationDialog').and.callFake(function (_, onAcceptCallback) {
                    mockDialogService.onAcceptCallback = onAcceptCallback;
                }),
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({ data: 'Test data' })),
            };
            mockWindow = { nativeWindow: { location: { href: {} } } };
            mockDocument = {
                body: {
                    classList: {
                        add: jasmine.createSpy('add'),
                        remove: jasmine.createSpy('remove')
                    }
                }
            };
            mockUserPreference = { data: Observable_1.Observable.of({ pricingPreferences: { some: 'attribute' } }) };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockStore = new mock_app_store_1.MockAppStore();
            initPricingSpy = mockStore.createActionFactoryMethod('pricing', 'initializePricing');
            setPriceSpy = mockStore.createActionFactoryMethod('pricing', 'setPriceForDialog');
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
            deleteQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'delete');
            addCustomPriceDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addCustomPriceToLineItem');
            snackbarSpy = mockStore.createActionFactoryMethod('snackbar', 'display');
            quoteSendSpy = mockStore.createActionFactoryMethod('quoteEdit', 'sendQuote');
            updateQuoteFieldSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateQuoteField');
            componentUnderTest =
                new quote_edit_tab_component_1.QuoteEditTabComponent(mockCapabilities, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockStore);
        });
        var setupFor = function (propertyInQuestion) {
            componentUnderTest = new quote_edit_tab_component_1.QuoteEditTabComponent(mockCapabilities, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockStore);
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
        });
        describe('onNotification()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
            });
            describe('ADD_QUOTE_FEE', function () {
                var quoteFeeSpy;
                beforeEach(function () { quoteFeeSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addFeeTo'); });
                it('calls the addFeeTo() service method', function () {
                    componentUnderTest.onNotification({ type: 'ADD_QUOTE_FEE', payload: { project: { some: 'project' }, fee: { some: 'fee' } } });
                    expect(quoteFeeSpy).toHaveBeenCalledWith({ some: 'project' }, { some: 'fee' });
                });
                it('throws an error if the message doesn\'t have a payload', function () {
                    expect(function () { return componentUnderTest.onNotification({ type: 'ADD_QUOTE_FEE' }); }).toThrowError();
                });
            });
            describe('REMOVE_QUOTE_FEE', function () {
                var quoteFeeSpy;
                beforeEach(function () { quoteFeeSpy = mockStore.createActionFactoryMethod('quoteEdit', 'removeFee'); });
                it('calls the removeFee() service method', function () {
                    componentUnderTest.onNotification({ type: 'REMOVE_QUOTE_FEE', payload: { some: 'fee' } });
                    expect(quoteFeeSpy).toHaveBeenCalledWith({ some: 'fee' });
                });
            });
            describe('SHOW_COST_MULTIPLIER_DIALOG', function () {
                var quoteFeeSpy;
                beforeEach(function () { quoteFeeSpy = mockStore.createActionFactoryMethod('quoteEdit', 'editLineItem'); });
                it('should open a form dialog', function () {
                    componentUnderTest.onNotification({ type: 'SHOW_COST_MULTIPLIER_DIALOG', payload: { id: 1 } });
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'multiplier' }], { title: 'QUOTE.ADD_MULTIPLIER_TITLE', submitLabel: 'QUOTE.ADD_MULTIPLIER_FORM_SUBMIT' }, jasmine.any(Function));
                });
                it('calls the callback on form submit', function () {
                    componentUnderTest.onNotification({ type: 'SHOW_COST_MULTIPLIER_DIALOG', payload: { id: 1 } });
                    mockDialogService.onSubmitCallback({ multiplier: '1.2' });
                    expect(quoteFeeSpy).toHaveBeenCalledWith({ id: 1 }, { multiplier: '1.2' });
                });
                it('uses the correct strings for edit and merges form values', function () {
                    componentUnderTest.onNotification({ type: 'SHOW_COST_MULTIPLIER_DIALOG', payload: { id: 1, multiplier: 1.5 } });
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'multiplier', value: 1.5 }], { title: 'QUOTE.EDIT_MULTIPLIER_TITLE', submitLabel: 'QUOTE.EDIT_MULTIPLIER_FORM_SUBMIT' }, jasmine.any(Function));
                });
            });
            describe('REMOVE_COST_MULTIPLIER', function () {
                var quoteFeeSpy;
                beforeEach(function () { quoteFeeSpy = mockStore.createActionFactoryMethod('quoteEdit', 'editLineItem'); });
                it('should call the editLineItem method on the api service', function () {
                    componentUnderTest.onNotification({ type: 'REMOVE_COST_MULTIPLIER', payload: { id: 1, multiplier: 2 } });
                    expect(quoteFeeSpy).toHaveBeenCalledWith({ id: 1, multiplier: 2 }, { multiplier: 1 });
                });
            });
            describe('ADD_CUSTOM_PRICE', function () {
                beforeEach(function () {
                    componentUnderTest.onNotification({
                        type: 'ADD_CUSTOM_PRICE',
                        payload: { some: 'lineItem', price: 200, overrideGrossAssetPrice: 200 }
                    });
                });
                it('should open up a form dialog with the right config', function () {
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{
                            name: 'price',
                            label: 'QUOTE.PRICE_LABEL',
                            type: 'number',
                            min: '0',
                            validation: 'GREATER_THAN',
                            value: 200
                        }, {
                            name: 'priceLock',
                            label: 'QUOTE.PRICE_LOCK_LABEL',
                            type: 'slideToggle',
                            value: 'true'
                        }], { title: 'QUOTE.ADD_CUSTOM_PRICE_TITLE', submitLabel: 'QUOTE.ADD_CUSTOM_PRICE_SUBMIT', autocomplete: 'off' }, jasmine.any(Function));
                });
                it('should dispatch the proper action on form submit', function () {
                    mockDialogService.onSubmitCallback({ price: 10, priceLock: 'true' });
                    mockStore.expectDispatchFor(addCustomPriceDispatchSpy, { some: 'lineItem', price: 200, overrideGrossAssetPrice: 200 }, 10, true);
                });
            });
            describe('GO_TO_NEXT_TAB', function () {
                it('Should call the parent class method goToNextTab()', function () {
                    spyOn(componentUnderTest, 'goToNextTab');
                    componentUnderTest.onNotification({ type: 'GO_TO_NEXT_TAB' });
                    expect(componentUnderTest.goToNextTab).toHaveBeenCalled();
                });
            });
            describe('OPEN_DELETE_DIALOG', function () {
                it('Should forward the message upwards with notify()', function () {
                    spyOn(componentUnderTest.notify, 'emit');
                    componentUnderTest.onNotification({ type: 'OPEN_DELETE_DIALOG' });
                    expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'OPEN_DELETE_DIALOG' });
                });
            });
            describe('SAVE_AND_NEW', function () {
                it('Should forward the message upwards with notify()', function () {
                    spyOn(componentUnderTest.notify, 'emit');
                    componentUnderTest.onNotification({ type: 'SAVE_AND_NEW' });
                    expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'SAVE_AND_NEW' });
                });
            });
            describe('CLONE_QUOTE', function () {
                it('Should forward the message upwards with notify()', function () {
                    spyOn(componentUnderTest.notify, 'emit');
                    componentUnderTest.onNotification({ type: 'CLONE_QUOTE' });
                    expect(componentUnderTest.notify.emit).toHaveBeenCalledWith({ type: 'CLONE_QUOTE' });
                });
            });
            describe('ADD_PROJECT', function () {
                var addProjectSpy;
                beforeEach(function () { addProjectSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addProject'); });
                it('Should forward the message upwards with notify()', function () {
                    componentUnderTest.onNotification({ type: 'ADD_PROJECT' });
                    expect(addProjectSpy).toHaveBeenCalled();
                });
            });
            describe('REMOVE_PROJECT', function () {
                var removeProjectSpy;
                beforeEach(function () { removeProjectSpy = mockStore.createActionFactoryMethod('quoteEdit', 'removeProject'); });
                it('Should forward the message upwards with notify()', function () {
                    componentUnderTest.onNotification({ type: 'REMOVE_PROJECT', payload: { id: 1 } });
                    expect(removeProjectSpy).toHaveBeenCalledWith(1);
                });
            });
            describe('UPDATE_PROJECT', function () {
                var updateProjectSpy;
                var mockProject;
                beforeEach(function () {
                    updateProjectSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateProject');
                    mockProject = { project: { id: 1 }, items: ['test item'] };
                    componentUnderTest.onNotification({ type: 'UPDATE_PROJECT', payload: mockProject });
                });
                it('should open up a form dialog with the right config', function () {
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith(['test item'], {
                        dialogConfig: { position: { top: '10%' }, disableClose: false },
                        title: 'CART.PROJECTS.FORM.TITLE',
                        submitLabel: 'CART.PROJECTS.FORM.SUBMIT_LABEL',
                        autocomplete: 'off'
                    }, jasmine.any(Function));
                });
                it('should dispatch the proper action on form submit', function () {
                    mockDialogService.onSubmitCallback(['test item 2']);
                    mockStore.expectDispatchFor(updateProjectSpy, Object.assign({ id: 1 }, ['test item 2']));
                });
            });
            describe('MOVE_LINE_ITEM', function () {
                var moveLineItemSpy;
                beforeEach(function () { moveLineItemSpy = mockStore.createActionFactoryMethod('quoteEdit', 'moveLineItem'); });
                it('Should forward the message upwards with notify()', function () {
                    var mockProject = { otherProject: 'other project', lineItem: 'lineItemtoMove' };
                    componentUnderTest.onNotification({ type: 'MOVE_LINE_ITEM', payload: mockProject });
                    expect(moveLineItemSpy).toHaveBeenCalledWith('other project', 'lineItemtoMove');
                });
            });
            describe('CLONE_LINE_ITEM', function () {
                var cloneLineItemSpy;
                beforeEach(function () { cloneLineItemSpy = mockStore.createActionFactoryMethod('quoteEdit', 'cloneLineItem'); });
                it('Should forward the message upwards with notify()', function () {
                    var mockLineItem = {};
                    componentUnderTest.onNotification({ type: 'CLONE_LINE_ITEM', payload: mockLineItem });
                    expect(cloneLineItemSpy).toHaveBeenCalledWith(mockLineItem);
                });
            });
            describe('REMOVE_LINE_ITEM', function () {
                var removeLineItemSpy;
                beforeEach(function () { removeLineItemSpy = mockStore.createActionFactoryMethod('quoteEdit', 'removeAsset'); });
                it('Should forward the message upwards with notify()', function () {
                    var mockLineItem = { asset: { id: 1 } };
                    componentUnderTest.onNotification({ type: 'REMOVE_LINE_ITEM', payload: mockLineItem });
                    expect(removeLineItemSpy).toHaveBeenCalledWith(mockLineItem.asset);
                });
            });
            describe('EDIT_LINE_ITEM', function () {
                var editLineItemSpy;
                beforeEach(function () { editLineItemSpy = mockStore.createActionFactoryMethod('quoteEdit', 'editLineItem'); });
                it('Should forward the message upwards with notify()', function () {
                    var mockLineItem = { fieldToEdit: { field: 2 }, lineItem: { testItem: 1 } };
                    componentUnderTest.onNotification({ type: 'EDIT_LINE_ITEM', payload: mockLineItem });
                    expect(editLineItemSpy).toHaveBeenCalledWith(mockLineItem.lineItem, mockLineItem.fieldToEdit);
                });
            });
            describe('EDIT_LINE_ITEM_MARKERS', function () {
                it('edits the assets in and out markers with EDIT_LINE_ITEM_MARKERS', function () {
                    var mockAsset = { assetId: 1234 };
                    var mockMethod = mockStore.createLegacyServiceMethod('asset', 'getClipPreviewData', Observable_1.Observable.of({ url: 'fake url' }));
                    componentUnderTest.onNotification({ type: 'EDIT_LINE_ITEM_MARKERS', payload: { asset: mockAsset } });
                    mockStore.expectCallFor(mockMethod, 1234);
                });
            });
            describe('SHOW_PRICING_DIALOG', function () {
                it('calls openPricingDialog with SHOW_PRICING_DIALOG', function () {
                    var mockLineItem = { asset: { assetId: 123456 } };
                    componentUnderTest.ngOnInit();
                    componentUnderTest.onNotification({ type: 'SHOW_PRICING_DIALOG', payload: mockLineItem });
                    mockStore.expectDispatchFor(initPricingSpy, 'Rights Managed', {
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
            });
            describe('EDIT_PROJECT_PRICING', function () {
                it('edits the project pricing with EDIT_PROJECT_PRICING', function () {
                    var mockAsset = { assetId: 1234 };
                    componentUnderTest.ngOnInit();
                    componentUnderTest.onNotification({ type: 'EDIT_PROJECT_PRICING', payload: { asset: mockAsset } });
                    mockStore.expectDispatchFor(setPriceSpy, null);
                    mockStore.expectDispatchFor(initPricingSpy, 'Rights Managed', {
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
            });
            describe('ADD_NOTE', function () {
                it('opens a dialog with the correct config for a lineItem that has a note', function () {
                    componentUnderTest.onNotification({ type: 'ADD_NOTE', payload: { notes: [{ notes: ['some note'] }] } });
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ name: 'note', type: 'textarea', validation: 'REQUIRED', label: 'QUOTE.EDIT_NOTE', value: 'some note' }], { title: 'QUOTE.EDIT_NOTE' }, jasmine.any(Function));
                });
                it('opens a dialog with the correct config for a lineItem that doesn\'t have a note', function () {
                    componentUnderTest.onNotification({ type: 'ADD_NOTE', payload: { some: 'lineItem' } });
                    expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ name: 'note', type: 'textarea', validation: 'REQUIRED', label: 'QUOTE.ADD_NOTE', value: '' }], { title: 'QUOTE.ADD_NOTE' }, jasmine.any(Function));
                });
            });
            it('calls openConfirmationDialog with REMOVE_NOTE', function () {
                componentUnderTest.onNotification({ type: 'REMOVE_NOTE', payload: { some: 'lineItem' } });
                expect(mockDialogService.openConfirmationDialog).toHaveBeenCalledWith({
                    title: 'QUOTE.DELETE_NOTES.TITLE',
                    message: 'QUOTE.DELETE_NOTES.MESSAGE',
                    accept: 'QUOTE.DELETE_NOTES.ACCEPT',
                    decline: 'QUOTE.DELETE_NOTES.DECLINE'
                }, jasmine.any(Function));
            });
        });
        describe('get showUsageWarning()', function () {
            it('returns true if the cart has assets but rm assets dont have a rights package', function () {
                mockStore.createStateSection('quoteEdit', {
                    data: {
                        itemCount: 2,
                        projects: [{
                                lineItems: [
                                    { id: '2', price: 100, rightsManaged: 'Rights Managed' },
                                ]
                            }]
                    }
                });
                expect(componentUnderTest.showUsageWarning).toBe(true);
            });
            it('return false if the user has no assets in the cart', function () {
                mockStore.createStateSection('quoteEdit', { data: { itemCount: 0 } });
                expect(componentUnderTest.showUsageWarning).toBe(false);
            });
            it('returns false if the user has assess and userCanProceed is true', function () {
                mockStore.createStateSection('quoteEdit', {
                    data: {
                        itemCount: 2,
                        projects: [{
                                lineItems: [
                                    { id: '2', price: 100, attributes: ['a', 'b', 'c'], rightsManaged: 'Rights Managed' },
                                ]
                            }]
                    }
                });
                expect(componentUnderTest.showUsageWarning).toBe(false);
            });
        });
        describe('get userCanProceed()', function () {
            var tests = [
                {
                    expectedResult: false,
                    description: 'feeLineItems only',
                    purchaseType: 'SystemLicense',
                    feeLineItems: [mockFeeLineItem]
                },
                {
                    expectedResult: true,
                    description: 'feeLineItems only',
                    purchaseType: 'RevenueOnly',
                    feeLineItems: [mockFeeLineItem]
                },
                {
                    expectedResult: true,
                    description: 'feeLineItems only',
                    purchaseType: 'PrepayAccess',
                    feeLineItems: [mockFeeLineItem]
                },
                {
                    expectedResult: true,
                    description: 'RM lineItems that don\'t have rights',
                    purchaseType: 'Trial',
                    lineItems: [mockRmLineItemWithoutRights]
                },
                {
                    expectedResult: true,
                    description: 'RM lineItems that don\'t have rights',
                    purchaseType: 'DeliveryOnly',
                    lineItems: [mockRmLineItemWithoutRights]
                },
                {
                    expectedResult: false,
                    description: 'RM lineItems that don\'t have rights',
                    purchaseType: 'SystemLicense',
                    lineItems: [mockRmLineItemWithoutRights]
                },
                {
                    expectedResult: true,
                    description: 'RF lineItems',
                    purchaseType: 'SystemLicense',
                    lineItems: [mockRfLineItem]
                },
                {
                    expectedResult: false,
                    description: 'RF lineItems and RM lineItems without rights',
                    purchaseType: 'SystemLicense',
                    lineItems: [mockRfLineItem, mockRmLineItemWithoutRights]
                },
                {
                    expectedResult: true,
                    description: 'RF lineItems and RM lineItems with rights',
                    purchaseType: 'SystemLicense',
                    lineItems: [mockRfLineItem, mockRmLineItemWithRights]
                },
                {
                    expectedResult: false,
                    description: 'RM lineItems that don\'t have rights',
                    purchaseType: 'SystemLicense'
                },
            ];
            tests.forEach(function (test) {
                var mockQuote = {
                    purchaseType: test.purchaseType,
                    projects: [],
                    itemCount: test.lineItems ? test.lineItems.length : 0
                };
                if (test.lineItems)
                    mockQuote.projects.push({ lineItems: test.lineItems });
                if (test.feeLineItems)
                    mockQuote.projects.push({ feeLineItems: test.feeLineItems });
                it("returns " + test.expectedResult + " for " + test.description + " - " + test.purchaseType, function () {
                    mockStore.createStateSection('quoteEdit', { data: mockQuote });
                    expect(componentUnderTest.userCanProceed).toBe(test.expectedResult);
                });
            });
        });
        describe('get total()', function () {
            it('Should return the current total dollar amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { total: 1000 } });
                var currentTotal;
                componentUnderTest.total.subscribe(function (total) { return currentTotal = total; });
                expect(currentTotal).toBe(1000);
            });
        });
        describe('get subTotal()', function () {
            it('Should return the current subTotal dollar amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { subTotal: 1000 } });
                var currentSubTotal;
                componentUnderTest.subTotal.subscribe(function (total) { return currentSubTotal = total; });
                expect(currentSubTotal).toBe(1000);
            });
        });
        describe('get discount()', function () {
            it('Should return the current discount dollar amount for the quote', function () {
                mockStore.createStateSection('quoteEdit', { data: { discount: 1000 } });
                var currentDiscount;
                componentUnderTest.discount.subscribe(function (total) { return currentDiscount = total; });
                expect(currentDiscount).toBe(1000);
            });
        });
        describe('quoteHasItems()', function () {
            describe('returns true', function () {
                it('when the project(s) in the quote contain(s) at least 1 lineItem or feeLineItem', function () {
                    mockStore.createStateSection('quoteEdit', { data: { projects: [{ lineItems: [{ id: 1 }] }] } });
                    expect(componentUnderTest.quoteHasItems).toBe(true);
                });
            });
            describe('returns false', function () {
                it('when the only project in the quote is empty', function () {
                    mockStore.createStateSection('quoteEdit', { data: { projects: [{ id: '123' }] } });
                    expect(componentUnderTest.quoteHasItems).toBe(false);
                });
                it('when 1 of the projects in the quote is empty', function () {
                    mockStore.createStateSection('quoteEdit', { data: { projects: [{}, { lineItems: [{ id: 1 }] }] } });
                    expect(componentUnderTest.quoteHasItems).toBe(false);
                });
            });
        });
        describe('get quoteContainsAssets()', function () {
            it('returns false if the quote has no lineItems', function () {
                mockStore.createStateSection('quoteEdit', { data: { projects: [{ id: '123' }, { id: '456' }] } });
                expect(componentUnderTest.quoteContainsAssets).toBe(false);
            });
            it('returns true if the quote has lineItems', function () {
                mockStore.createStateSection('quoteEdit', { data: { projects: [{ lineItems: [] }] } });
                expect(componentUnderTest.quoteContainsAssets).toBe(true);
            });
        });
        describe('showDiscount()', function () {
            describe('returns false', function () {
                it('when the quote does not have the discount property', function () {
                    mockStore.createStateSection('quoteEdit', { data: {} });
                    expect(componentUnderTest.showDiscount).toBe(false);
                });
                it('when the quoteType is "Trial" and the quote DOES NOT have the discount property', function () {
                    mockStore.createStateSection('quoteEdit', { data: { purchaseType: 'Trial' } });
                    expect(componentUnderTest.showDiscount).toBe(false);
                });
                it('when the quoteType is "Trial" and the quote DOES have the discount property', function () {
                    mockStore.createStateSection('quoteEdit', { data: { discount: '100', purchaseType: 'Trial' } });
                    expect(componentUnderTest.showDiscount).toBe(false);
                });
            });
            describe('returns true', function () {
                it('when the quote does have the discount property AND the quoteType is NOT Trial', function () {
                    mockStore.createStateSection('quoteEdit', { data: { discount: '100', purchaseType: 'NotTrial' } });
                    expect(componentUnderTest.showDiscount).toBe(true);
                });
            });
        });
        describe('shouldShowCloneButton()', function () {
            it('Should call the cloneQuote capability with the quote edit store', function () {
                mockStore.createStateSection('quoteEdit', { data: { id: 1 } });
                var shouldShowCloneButton = componentUnderTest.shouldShowCloneButton;
                expect(mockCapabilities.cloneQuote).toHaveBeenCalledWith(Observable_1.Observable.of({ data: { id: 1 } }));
            });
        });
        describe('purchaseTypeConfig getter', function () {
            it('returns the config', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.purchaseTypeConfig).toEqual([{ value: 'SystemLicense', viewValue: 'System License' }]);
            });
        });
        describe('onSelectQuoteType()', function () {
            it('dispatches the right action to the store', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.onSelectQuoteType({ purchaseType: 'SystemLicense' });
                mockStore.expectDispatchFor(updateQuoteFieldSpy, { purchaseType: 'SystemLicense' });
            });
        });
        describe('onOpenBulkImportDialog()', function () {
            var bulkImportSpy;
            beforeEach(function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.onNotification({ type: 'OPEN_BULK_IMPORT_DIALOG', payload: 'abcd-1234' });
                bulkImportSpy = mockStore.createActionFactoryMethod('quoteEdit', 'bulkImport');
            });
            it('opens a form dialog', function () {
                expect(mockDialogService.openFormDialog).toHaveBeenCalledWith([{ some: 'import' }], { title: 'QUOTE.BULK_IMPORT.TITLE', submitLabel: 'QUOTE.BULK_IMPORT.SUBMIT_BTN', autocomplete: 'off' }, jasmine.any(Function));
            });
            it('calls the bulkImport() on the quote edit service in the callback', function () {
                mockDialogService.onSubmitCallback({ lineItemAttributes: 'one\ntwo' });
                expect(bulkImportSpy).toHaveBeenCalledWith({ lineItemAttributes: 'one\ntwo' }, 'abcd-1234');
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvdGFicy9xdW90ZS1lZGl0LXRhYi5jb21wb25lbnQuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUE2QztBQUM3QyxtRkFBZ0Y7QUFDaEYsdUVBQW1FO0FBV25FLElBQU0sd0JBQXdCLEdBQVEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ3ZHLElBQU0sMkJBQTJCLEdBQVEsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztBQUM3RSxJQUFNLGNBQWMsR0FBUSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsQ0FBQztBQUM5RCxJQUFNLGVBQWUsR0FBUSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQztBQUVyRDtJQUNFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRTtRQUNuQyxJQUFJLGtCQUF5QyxDQUFDO1FBQzlDLElBQUksc0JBQW1DLENBQUM7UUFDeEMsSUFBSSx5QkFBc0MsQ0FBQztRQUMzQyxJQUFJLFdBQXdCLENBQUM7UUFDN0IsSUFBSSxZQUF5QixDQUFDO1FBQzlCLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksaUJBQXNCLENBQUM7UUFDM0IsSUFBSSxVQUFlLENBQUM7UUFDcEIsSUFBSSxrQkFBdUIsQ0FBQztRQUM1QixJQUFJLFVBQWUsQ0FBQztRQUNwQixJQUFJLFlBQWlCLENBQUM7UUFDdEIsSUFBSSxjQUEyQixDQUFDO1FBQ2hDLElBQUksV0FBd0IsQ0FBQztRQUM3QixJQUFJLG1CQUFnQyxDQUFDO1FBRXJDLFVBQVUsQ0FBQztZQUNULGdCQUFnQixHQUFHO2dCQUNqQixVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7Z0JBQzNDLGdCQUFnQixFQUFFLGNBQU0s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QUFDO1lBQ2pGLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLHFCQUFxQixFQUFFO2dCQUN4QixNQUFNLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUMsb0JBQW9CLENBQzNELENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFDcEIsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsV0FBVyxFQUFFLDhCQUE4QixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsRUFDdEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FDdEIsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFO2dCQUNyRSxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBRXZFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLFVBQVUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzlGLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUF0cUJELG9CQXNxQkMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvK2VkaXQvY29tcG9uZW50cy90YWJzL3F1b3RlLWVkaXQtdGFiLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0IHsgUXVvdGVFZGl0VGFiQ29tcG9uZW50IH0gZnJvbSAnLi9xdW90ZS1lZGl0LXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHVyY2hhc2VUeXBlLCBBc3NldExpbmVJdGVtLCBGZWVMaW5lSXRlbSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbmludGVyZmFjZSBDYW5Qcm9jZWVkVGVzdCB7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGV4cGVjdGVkUmVzdWx0OiBib29sZWFuO1xuICBwdXJjaGFzZVR5cGU6IFB1cmNoYXNlVHlwZTtcbiAgbGluZUl0ZW1zPzogQXNzZXRMaW5lSXRlbVtdO1xuICBmZWVMaW5lSXRlbXM/OiBGZWVMaW5lSXRlbVtdO1xufVxuXG5jb25zdCBtb2NrUm1MaW5lSXRlbVdpdGhSaWdodHM6IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJywgYXR0cmlidXRlczogWydhJywgJ2InLCAnYyddIH07XG5jb25zdCBtb2NrUm1MaW5lSXRlbVdpdGhvdXRSaWdodHM6IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyB9O1xuY29uc3QgbW9ja1JmTGluZUl0ZW06IGFueSA9IHsgcmlnaHRzTWFuYWdlZDogJ1JveWFsdHkgRnJlZScgfTtcbmNvbnN0IG1vY2tGZWVMaW5lSXRlbTogYW55ID0geyBzb21lOiAnZmVlTGluZUl0ZW0nIH07XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnUXVvdGUgRWRpdCBUYWIgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IFF1b3RlRWRpdFRhYkNvbXBvbmVudDtcbiAgICBsZXQgZGVsZXRlUXVvdGVEaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGFkZEN1c3RvbVByaWNlRGlzcGF0Y2hTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBzbmFja2JhclNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IHF1b3RlU2VuZFNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IG1vY2tTdG9yZTogTW9ja0FwcFN0b3JlO1xuICAgIGxldCBtb2NrQ2FwYWJpbGl0aWVzOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tXaW5kb3c6IGFueTtcbiAgICBsZXQgbW9ja1VzZXJQcmVmZXJlbmNlOiBhbnk7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcbiAgICBsZXQgbW9ja0RvY3VtZW50OiBhbnk7XG4gICAgbGV0IGluaXRQcmljaW5nU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgc2V0UHJpY2VTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCB1cGRhdGVRdW90ZUZpZWxkU3B5OiBqYXNtaW5lLlNweTtcblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja0NhcGFiaWxpdGllcyA9IHtcbiAgICAgICAgY2xvbmVRdW90ZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb25lUXVvdGUnKSxcbiAgICAgICAgYWRtaW5pc3RlclF1b3RlczogKCkgPT4gZmFsc2VcbiAgICAgIH07XG5cbiAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlID0ge1xuICAgICAgICBvcGVuRm9ybURpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Gb3JtRGlhbG9nJykuYW5kLmNhbGxGYWtlKChfOiBhbnksIF9fOiBhbnksIG9uU3VibWl0Q2FsbGJhY2s6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICAgICAgbW9ja0RpYWxvZ1NlcnZpY2Uub25TdWJtaXRDYWxsYmFjayA9IG9uU3VibWl0Q2FsbGJhY2s7XG4gICAgICAgIH0pLFxuICAgICAgICBvcGVuQ29uZmlybWF0aW9uRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbkNvbmZpcm1hdGlvbkRpYWxvZycpLmFuZC5jYWxsRmFrZSgoXzogYW55LCBvbkFjY2VwdENhbGxiYWNrOiBGdW5jdGlvbikgPT4ge1xuICAgICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9uQWNjZXB0Q2FsbGJhY2sgPSBvbkFjY2VwdENhbGxiYWNrO1xuICAgICAgICB9KSxcbiAgICAgICAgb3BlbkNvbXBvbmVudEluRGlhbG9nOiBqYXNtaW5lLmNyZWF0ZVNweSgnb3BlbkNvbXBvbmVudEluRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoeyBkYXRhOiAnVGVzdCBkYXRhJyB9KSksXG4gICAgICB9O1xuICAgICAgbW9ja1dpbmRvdyA9IHsgbmF0aXZlV2luZG93OiB7IGxvY2F0aW9uOiB7IGhyZWY6IHt9IH0gfSB9O1xuICAgICAgbW9ja0RvY3VtZW50ID0ge1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgY2xhc3NMaXN0OiB7XG4gICAgICAgICAgICBhZGQ6IGphc21pbmUuY3JlYXRlU3B5KCdhZGQnKSxcbiAgICAgICAgICAgIHJlbW92ZTogamFzbWluZS5jcmVhdGVTcHkoJ3JlbW92ZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrVXNlclByZWZlcmVuY2UgPSB7IGRhdGE6IE9ic2VydmFibGUub2YoeyBwcmljaW5nUHJlZmVyZW5jZXM6IHsgc29tZTogJ2F0dHJpYnV0ZScgfSB9KSB9O1xuXG4gICAgICBtb2NrUm91dGVyID0geyBuYXZpZ2F0ZTogamFzbWluZS5jcmVhdGVTcHkoJ25hdmlnYXRlJykgfTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgaW5pdFByaWNpbmdTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncHJpY2luZycsICdpbml0aWFsaXplUHJpY2luZycpO1xuICAgICAgc2V0UHJpY2VTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncHJpY2luZycsICdzZXRQcmljZUZvckRpYWxvZycpO1xuXG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgIHF1b3RlQ29tbWVudDogeyBjb25maWc6IHsgZm9ybTogeyBpdGVtczogW3sgc29tZTogJ2NvbmZpZycgfV0gfSB9IH0sXG4gICAgICAgICAgY2FydDoge1xuICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgIGZvcm06IHsgaXRlbXM6IFsnY29tbWVudCcsICdzdHVmZiddIH0sXG4gICAgICAgICAgICAgIGNyZWF0ZVF1b3RlOiB7IGl0ZW1zOiBbeyBuYW1lOiAncHVyY2hhc2VUeXBlJywgdmFsdWU6ICcnIH1dIH0sXG4gICAgICAgICAgICAgIGFkZEJ1bGtPcmRlcklkOiB7IGl0ZW1zOiBbeyBzb21lOiAnYnVsaycgfV0gfSxcbiAgICAgICAgICAgICAgYWRkRGlzY291bnQ6IHsgaXRlbXM6IFt7IHNvbWU6ICdkaXNjb3VudCcgfV0gfSxcbiAgICAgICAgICAgICAgYWRkQ29zdE11bHRpcGxpZXI6IHsgaXRlbXM6IFt7IHNvbWU6ICdtdWx0aXBsaWVyJyB9XSB9LFxuICAgICAgICAgICAgICBidWxrSW1wb3J0OiB7IGl0ZW1zOiBbeyBzb21lOiAnaW1wb3J0JyB9XSB9LFxuICAgICAgICAgICAgICBxdW90ZVB1cmNoYXNlVHlwZTogeyBpdGVtczogW3sgdmFsdWU6ICdTeXN0ZW1MaWNlbnNlJywgdmlld1ZhbHVlOiAnU3lzdGVtIExpY2Vuc2UnIH1dIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGVRdW90ZURpc3BhdGNoU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdkZWxldGUnKTtcbiAgICAgIGFkZEN1c3RvbVByaWNlRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ2FkZEN1c3RvbVByaWNlVG9MaW5lSXRlbScpO1xuICAgICAgc25hY2tiYXJTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnc25hY2tiYXInLCAnZGlzcGxheScpO1xuICAgICAgcXVvdGVTZW5kU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdzZW5kUXVvdGUnKTtcbiAgICAgIHVwZGF0ZVF1b3RlRmllbGRTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncXVvdGVFZGl0JywgJ3VwZGF0ZVF1b3RlRmllbGQnKTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID1cbiAgICAgICAgbmV3IFF1b3RlRWRpdFRhYkNvbXBvbmVudChcbiAgICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzLCBtb2NrRGlhbG9nU2VydmljZSxcbiAgICAgICAgICBtb2NrV2luZG93LCBtb2NrVXNlclByZWZlcmVuY2UsIG1vY2tEb2N1bWVudCwgbW9ja1N0b3JlXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBUaGlzIGdldHMgdXNlZCBkb3duIGJlbG93IGZvciBzb21lIHRlZGlvdXMgc2V0dXAgaW4gdGhlIGVkaXRCdWxrSWQgYW5kIGVkaXREaXNjb3VudCBibG9ja3NcbiAgICBsZXQgc2V0dXBGb3IgPSAocHJvcGVydHlJblF1ZXN0aW9uOiBhbnkpID0+IHtcbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBRdW90ZUVkaXRUYWJDb21wb25lbnQoXG4gICAgICAgIG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBtb2NrV2luZG93LCBtb2NrVXNlclByZWZlcmVuY2UsIG1vY2tEb2N1bWVudCwgbW9ja1N0b3JlXG4gICAgICApO1xuICAgICAgcmV0dXJuIGNvbXBvbmVudFVuZGVyVGVzdDtcbiAgICB9O1xuXG4gICAgZGVzY3JpYmUoJ0NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZXRzIHVwIHRoZSBjb25maWcgaW5zdGFuY2UgdmFyaWFibGUnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29uZmlnKS50b0VxdWFsKHtcbiAgICAgICAgICBmb3JtOiB7IGl0ZW1zOiBbJ2NvbW1lbnQnLCAnc3R1ZmYnXSB9LFxuICAgICAgICAgIGNyZWF0ZVF1b3RlOiB7IGl0ZW1zOiBbeyBuYW1lOiAncHVyY2hhc2VUeXBlJywgdmFsdWU6ICcnIH1dIH0sXG4gICAgICAgICAgYWRkQnVsa09yZGVySWQ6IHsgaXRlbXM6IFt7IHNvbWU6ICdidWxrJyB9XSB9LFxuICAgICAgICAgIGFkZERpc2NvdW50OiB7IGl0ZW1zOiBbeyBzb21lOiAnZGlzY291bnQnIH1dIH0sXG4gICAgICAgICAgYWRkQ29zdE11bHRpcGxpZXI6IHsgaXRlbXM6IFt7IHNvbWU6ICdtdWx0aXBsaWVyJyB9XSB9LFxuICAgICAgICAgIGJ1bGtJbXBvcnQ6IHsgaXRlbXM6IFt7IHNvbWU6ICdpbXBvcnQnIH1dIH0sXG4gICAgICAgICAgcXVvdGVQdXJjaGFzZVR5cGU6IHsgaXRlbXM6IFt7IHZhbHVlOiAnU3lzdGVtTGljZW5zZScsIHZpZXdWYWx1ZTogJ1N5c3RlbSBMaWNlbnNlJyB9XSB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25Ob3RpZmljYXRpb24oKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnQUREX1FVT1RFX0ZFRScsICgpID0+IHtcbiAgICAgICAgbGV0IHF1b3RlRmVlU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7IHF1b3RlRmVlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdhZGRGZWVUbycpOyB9KTtcbiAgICAgICAgaXQoJ2NhbGxzIHRoZSBhZGRGZWVUbygpIHNlcnZpY2UgbWV0aG9kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbihcbiAgICAgICAgICAgIHsgdHlwZTogJ0FERF9RVU9URV9GRUUnLCBwYXlsb2FkOiB7IHByb2plY3Q6IHsgc29tZTogJ3Byb2plY3QnIH0sIGZlZTogeyBzb21lOiAnZmVlJyB9IH0gfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBleHBlY3QocXVvdGVGZWVTcHkpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgc29tZTogJ3Byb2plY3QnIH0sIHsgc29tZTogJ2ZlZScgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd0aHJvd3MgYW4gZXJyb3IgaWYgdGhlIG1lc3NhZ2UgZG9lc25cXCd0IGhhdmUgYSBwYXlsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdCgoKSA9PiBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnQUREX1FVT1RFX0ZFRScgfSkpLnRvVGhyb3dFcnJvcigpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnUkVNT1ZFX1FVT1RFX0ZFRScsICgpID0+IHtcbiAgICAgICAgbGV0IHF1b3RlRmVlU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7IHF1b3RlRmVlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdyZW1vdmVGZWUnKTsgfSk7XG4gICAgICAgIGl0KCdjYWxscyB0aGUgcmVtb3ZlRmVlKCkgc2VydmljZSBtZXRob2QnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKFxuICAgICAgICAgICAgeyB0eXBlOiAnUkVNT1ZFX1FVT1RFX0ZFRScsIHBheWxvYWQ6IHsgc29tZTogJ2ZlZScgfSB9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGV4cGVjdChxdW90ZUZlZVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBzb21lOiAnZmVlJyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1NIT1dfQ09TVF9NVUxUSVBMSUVSX0RJQUxPRycsICgpID0+IHtcbiAgICAgICAgbGV0IHF1b3RlRmVlU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7IHF1b3RlRmVlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdlZGl0TGluZUl0ZW0nKTsgfSk7XG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiBhIGZvcm0gZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdTSE9XX0NPU1RfTVVMVElQTElFUl9ESUFMT0cnLCBwYXlsb2FkOiB7IGlkOiAxIH0gfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgW3sgc29tZTogJ211bHRpcGxpZXInIH1dLFxuICAgICAgICAgICAgeyB0aXRsZTogJ1FVT1RFLkFERF9NVUxUSVBMSUVSX1RJVExFJywgc3VibWl0TGFiZWw6ICdRVU9URS5BRERfTVVMVElQTElFUl9GT1JNX1NVQk1JVCcgfSxcbiAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdjYWxscyB0aGUgY2FsbGJhY2sgb24gZm9ybSBzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1NIT1dfQ09TVF9NVUxUSVBMSUVSX0RJQUxPRycsIHBheWxvYWQ6IHsgaWQ6IDEgfSB9KTtcbiAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vblN1Ym1pdENhbGxiYWNrKHsgbXVsdGlwbGllcjogJzEuMicgfSk7XG4gICAgICAgICAgZXhwZWN0KHF1b3RlRmVlU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGlkOiAxIH0sIHsgbXVsdGlwbGllcjogJzEuMicgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1c2VzIHRoZSBjb3JyZWN0IHN0cmluZ3MgZm9yIGVkaXQgYW5kIG1lcmdlcyBmb3JtIHZhbHVlcycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnU0hPV19DT1NUX01VTFRJUExJRVJfRElBTE9HJywgcGF5bG9hZDogeyBpZDogMSwgbXVsdGlwbGllcjogMS41IH0gfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgW3sgc29tZTogJ211bHRpcGxpZXInLCB2YWx1ZTogMS41IH1dLFxuICAgICAgICAgICAgeyB0aXRsZTogJ1FVT1RFLkVESVRfTVVMVElQTElFUl9USVRMRScsIHN1Ym1pdExhYmVsOiAnUVVPVEUuRURJVF9NVUxUSVBMSUVSX0ZPUk1fU1VCTUlUJyB9LFxuICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1JFTU9WRV9DT1NUX01VTFRJUExJRVInLCAoKSA9PiB7XG4gICAgICAgIGxldCBxdW90ZUZlZVNweTogamFzbWluZS5TcHk7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4geyBxdW90ZUZlZVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnZWRpdExpbmVJdGVtJyk7IH0pO1xuICAgICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIGVkaXRMaW5lSXRlbSBtZXRob2Qgb24gdGhlIGFwaSBzZXJ2aWNlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdSRU1PVkVfQ09TVF9NVUxUSVBMSUVSJywgcGF5bG9hZDogeyBpZDogMSwgbXVsdGlwbGllcjogMiB9IH0pO1xuXG4gICAgICAgICAgZXhwZWN0KHF1b3RlRmVlU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGlkOiAxLCBtdWx0aXBsaWVyOiAyIH0sIHsgbXVsdGlwbGllcjogMSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0FERF9DVVNUT01fUFJJQ0UnLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7XG4gICAgICAgICAgICB0eXBlOiAnQUREX0NVU1RPTV9QUklDRScsXG4gICAgICAgICAgICBwYXlsb2FkOiB7IHNvbWU6ICdsaW5lSXRlbScsIHByaWNlOiAyMDAsIG92ZXJyaWRlR3Jvc3NBc3NldFByaWNlOiAyMDAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvdWxkIG9wZW4gdXAgYSBmb3JtIGRpYWxvZyB3aXRoIHRoZSByaWdodCBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Gb3JtRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgIG5hbWU6ICdwcmljZScsXG4gICAgICAgICAgICAgIGxhYmVsOiAnUVVPVEUuUFJJQ0VfTEFCRUwnLFxuICAgICAgICAgICAgICB0eXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgbWluOiAnMCcsXG4gICAgICAgICAgICAgIHZhbGlkYXRpb246ICdHUkVBVEVSX1RIQU4nLFxuICAgICAgICAgICAgICB2YWx1ZTogMjAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIG5hbWU6ICdwcmljZUxvY2snLFxuICAgICAgICAgICAgICBsYWJlbDogJ1FVT1RFLlBSSUNFX0xPQ0tfTEFCRUwnLFxuICAgICAgICAgICAgICB0eXBlOiAnc2xpZGVUb2dnbGUnLFxuICAgICAgICAgICAgICB2YWx1ZTogJ3RydWUnXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIHsgdGl0bGU6ICdRVU9URS5BRERfQ1VTVE9NX1BSSUNFX1RJVExFJywgc3VibWl0TGFiZWw6ICdRVU9URS5BRERfQ1VTVE9NX1BSSUNFX1NVQk1JVCcsIGF1dG9jb21wbGV0ZTogJ29mZicgfSxcbiAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgZGlzcGF0Y2ggdGhlIHByb3BlciBhY3Rpb24gb24gZm9ybSBzdWJtaXQnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja0RpYWxvZ1NlcnZpY2Uub25TdWJtaXRDYWxsYmFjayh7IHByaWNlOiAxMCwgcHJpY2VMb2NrOiAndHJ1ZScgfSk7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoYWRkQ3VzdG9tUHJpY2VEaXNwYXRjaFNweSwgeyBzb21lOiAnbGluZUl0ZW0nLCBwcmljZTogMjAwLCBvdmVycmlkZUdyb3NzQXNzZXRQcmljZTogMjAwIH0sIDEwLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0dPX1RPX05FWFRfVEFCJywgKCkgPT4ge1xuICAgICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIHBhcmVudCBjbGFzcyBtZXRob2QgZ29Ub05leHRUYWIoKScsICgpID0+IHtcbiAgICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QsICdnb1RvTmV4dFRhYicpO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdHT19UT19ORVhUX1RBQicgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdvVG9OZXh0VGFiKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdPUEVOX0RFTEVURV9ESUFMT0cnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdTaG91bGQgZm9yd2FyZCB0aGUgbWVzc2FnZSB1cHdhcmRzIHdpdGggbm90aWZ5KCknLCAoKSA9PiB7XG4gICAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0Lm5vdGlmeSwgJ2VtaXQnKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnT1BFTl9ERUxFVEVfRElBTE9HJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qubm90aWZ5LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ09QRU5fREVMRVRFX0RJQUxPRycgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdTQVZFX0FORF9ORVcnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdTaG91bGQgZm9yd2FyZCB0aGUgbWVzc2FnZSB1cHdhcmRzIHdpdGggbm90aWZ5KCknLCAoKSA9PiB7XG4gICAgICAgICAgc3B5T24oY29tcG9uZW50VW5kZXJUZXN0Lm5vdGlmeSwgJ2VtaXQnKTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnU0FWRV9BTkRfTkVXJyB9KTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qubm90aWZ5LmVtaXQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgdHlwZTogJ1NBVkVfQU5EX05FVycgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdDTE9ORV9RVU9URScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBmb3J3YXJkIHRoZSBtZXNzYWdlIHVwd2FyZHMgd2l0aCBub3RpZnkoKScsICgpID0+IHtcbiAgICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3Qubm90aWZ5LCAnZW1pdCcpO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdDTE9ORV9RVU9URScgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0Lm5vdGlmeS5lbWl0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IHR5cGU6ICdDTE9ORV9RVU9URScgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdBRERfUFJPSkVDVCcsICgpID0+IHtcbiAgICAgICAgbGV0IGFkZFByb2plY3RTcHk6IGphc21pbmUuU3B5O1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHsgYWRkUHJvamVjdFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnYWRkUHJvamVjdCcpOyB9KTtcbiAgICAgICAgaXQoJ1Nob3VsZCBmb3J3YXJkIHRoZSBtZXNzYWdlIHVwd2FyZHMgd2l0aCBub3RpZnkoKScsICgpID0+IHtcblxuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdBRERfUFJPSkVDVCcgfSk7XG4gICAgICAgICAgZXhwZWN0KGFkZFByb2plY3RTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1JFTU9WRV9QUk9KRUNUJywgKCkgPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlUHJvamVjdFNweTogamFzbWluZS5TcHk7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4geyByZW1vdmVQcm9qZWN0U3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdyZW1vdmVQcm9qZWN0Jyk7IH0pO1xuICAgICAgICBpdCgnU2hvdWxkIGZvcndhcmQgdGhlIG1lc3NhZ2UgdXB3YXJkcyB3aXRoIG5vdGlmeSgpJywgKCkgPT4ge1xuXG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1JFTU9WRV9QUk9KRUNUJywgcGF5bG9hZDogeyBpZDogMSB9IH0pO1xuICAgICAgICAgIGV4cGVjdChyZW1vdmVQcm9qZWN0U3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1VQREFURV9QUk9KRUNUJywgKCkgPT4ge1xuICAgICAgICBsZXQgdXBkYXRlUHJvamVjdFNweTogamFzbWluZS5TcHk7XG4gICAgICAgIGxldCBtb2NrUHJvamVjdDogUG9qbztcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgdXBkYXRlUHJvamVjdFNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAndXBkYXRlUHJvamVjdCcpO1xuICAgICAgICAgIG1vY2tQcm9qZWN0ID0geyBwcm9qZWN0OiB7IGlkOiAxIH0sIGl0ZW1zOiBbJ3Rlc3QgaXRlbSddIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1VQREFURV9QUk9KRUNUJywgcGF5bG9hZDogbW9ja1Byb2plY3QgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdzaG91bGQgb3BlbiB1cCBhIGZvcm0gZGlhbG9nIHdpdGggdGhlIHJpZ2h0IGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsndGVzdCBpdGVtJ10sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICcxMCUnIH0sIGRpc2FibGVDbG9zZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgdGl0bGU6ICdDQVJULlBST0pFQ1RTLkZPUk0uVElUTEUnLFxuICAgICAgICAgICAgICBzdWJtaXRMYWJlbDogJ0NBUlQuUFJPSkVDVFMuRk9STS5TVUJNSVRfTEFCRUwnLFxuICAgICAgICAgICAgICBhdXRvY29tcGxldGU6ICdvZmYnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3VsZCBkaXNwYXRjaCB0aGUgcHJvcGVyIGFjdGlvbiBvbiBmb3JtIHN1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vblN1Ym1pdENhbGxiYWNrKFsndGVzdCBpdGVtIDInXSk7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHVwZGF0ZVByb2plY3RTcHksIE9iamVjdC5hc3NpZ24oeyBpZDogMSB9LCBbJ3Rlc3QgaXRlbSAyJ10pKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ01PVkVfTElORV9JVEVNJywgKCkgPT4ge1xuICAgICAgICBsZXQgbW92ZUxpbmVJdGVtU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7IG1vdmVMaW5lSXRlbVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnbW92ZUxpbmVJdGVtJyk7IH0pO1xuICAgICAgICBpdCgnU2hvdWxkIGZvcndhcmQgdGhlIG1lc3NhZ2UgdXB3YXJkcyB3aXRoIG5vdGlmeSgpJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBtb2NrUHJvamVjdCA9IHsgb3RoZXJQcm9qZWN0OiAnb3RoZXIgcHJvamVjdCcsIGxpbmVJdGVtOiAnbGluZUl0ZW10b01vdmUnIH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ01PVkVfTElORV9JVEVNJywgcGF5bG9hZDogbW9ja1Byb2plY3QgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vdmVMaW5lSXRlbVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoJ290aGVyIHByb2plY3QnLCAnbGluZUl0ZW10b01vdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0NMT05FX0xJTkVfSVRFTScsICgpID0+IHtcbiAgICAgICAgbGV0IGNsb25lTGluZUl0ZW1TcHk6IGphc21pbmUuU3B5O1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHsgY2xvbmVMaW5lSXRlbVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnY2xvbmVMaW5lSXRlbScpOyB9KTtcbiAgICAgICAgaXQoJ1Nob3VsZCBmb3J3YXJkIHRoZSBtZXNzYWdlIHVwd2FyZHMgd2l0aCBub3RpZnkoKScsICgpID0+IHtcbiAgICAgICAgICBsZXQgbW9ja0xpbmVJdGVtID0ge307XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0NMT05FX0xJTkVfSVRFTScsIHBheWxvYWQ6IG1vY2tMaW5lSXRlbSB9KTtcbiAgICAgICAgICBleHBlY3QoY2xvbmVMaW5lSXRlbVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0xpbmVJdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ1JFTU9WRV9MSU5FX0lURU0nLCAoKSA9PiB7XG4gICAgICAgIGxldCByZW1vdmVMaW5lSXRlbVNweTogamFzbWluZS5TcHk7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4geyByZW1vdmVMaW5lSXRlbVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAncmVtb3ZlQXNzZXQnKTsgfSk7XG4gICAgICAgIGl0KCdTaG91bGQgZm9yd2FyZCB0aGUgbWVzc2FnZSB1cHdhcmRzIHdpdGggbm90aWZ5KCknLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IG1vY2tMaW5lSXRlbSA9IHsgYXNzZXQ6IHsgaWQ6IDEgfSB9O1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdSRU1PVkVfTElORV9JVEVNJywgcGF5bG9hZDogbW9ja0xpbmVJdGVtIH0pO1xuICAgICAgICAgIGV4cGVjdChyZW1vdmVMaW5lSXRlbVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0xpbmVJdGVtLmFzc2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0VESVRfTElORV9JVEVNJywgKCkgPT4ge1xuICAgICAgICBsZXQgZWRpdExpbmVJdGVtU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7IGVkaXRMaW5lSXRlbVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnZWRpdExpbmVJdGVtJyk7IH0pO1xuICAgICAgICBpdCgnU2hvdWxkIGZvcndhcmQgdGhlIG1lc3NhZ2UgdXB3YXJkcyB3aXRoIG5vdGlmeSgpJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBtb2NrTGluZUl0ZW0gPSB7IGZpZWxkVG9FZGl0OiB7IGZpZWxkOiAyIH0sIGxpbmVJdGVtOiB7IHRlc3RJdGVtOiAxIH0gfTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnRURJVF9MSU5FX0lURU0nLCBwYXlsb2FkOiBtb2NrTGluZUl0ZW0gfSk7XG4gICAgICAgICAgZXhwZWN0KGVkaXRMaW5lSXRlbVNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0xpbmVJdGVtLmxpbmVJdGVtLCBtb2NrTGluZUl0ZW0uZmllbGRUb0VkaXQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnRURJVF9MSU5FX0lURU1fTUFSS0VSUycsICgpID0+IHtcbiAgICAgICAgaXQoJ2VkaXRzIHRoZSBhc3NldHMgaW4gYW5kIG91dCBtYXJrZXJzIHdpdGggRURJVF9MSU5FX0lURU1fTUFSS0VSUycsICgpID0+IHtcbiAgICAgICAgICBsZXQgbW9ja0Fzc2V0ID0geyBhc3NldElkOiAxMjM0IH07XG4gICAgICAgICAgbGV0IG1vY2tNZXRob2QgPSBtb2NrU3RvcmUuY3JlYXRlTGVnYWN5U2VydmljZU1ldGhvZCgnYXNzZXQnLCAnZ2V0Q2xpcFByZXZpZXdEYXRhJywgT2JzZXJ2YWJsZS5vZih7IHVybDogJ2Zha2UgdXJsJyB9KSk7XG5cbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnRURJVF9MSU5FX0lURU1fTUFSS0VSUycsIHBheWxvYWQ6IHsgYXNzZXQ6IG1vY2tBc3NldCB9IH0pO1xuXG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdENhbGxGb3IobW9ja01ldGhvZCwgMTIzNCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdTSE9XX1BSSUNJTkdfRElBTE9HJywgKCkgPT4ge1xuICAgICAgICBpdCgnY2FsbHMgb3BlblByaWNpbmdEaWFsb2cgd2l0aCBTSE9XX1BSSUNJTkdfRElBTE9HJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBtb2NrTGluZUl0ZW0gPSB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEyMzQ1NiB9IH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1NIT1dfUFJJQ0lOR19ESUFMT0cnLCBwYXlsb2FkOiBtb2NrTGluZUl0ZW0gfSk7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoaW5pdFByaWNpbmdTcHksICdSaWdodHMgTWFuYWdlZCcsIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgICBwcmljaW5nUHJlZmVyZW5jZXM6IHsgc29tZTogJ2F0dHJpYnV0ZScgfSxcbiAgICAgICAgICAgICAgdXNlckNhbkN1c3RvbWl6ZVJpZ2h0czogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3ByaWNpbmdFdmVudCcsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdFRElUX1BST0pFQ1RfUFJJQ0lORycsICgpID0+IHtcbiAgICAgICAgaXQoJ2VkaXRzIHRoZSBwcm9qZWN0IHByaWNpbmcgd2l0aCBFRElUX1BST0pFQ1RfUFJJQ0lORycsICgpID0+IHtcbiAgICAgICAgICBsZXQgbW9ja0Fzc2V0ID0geyBhc3NldElkOiAxMjM0IH07XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0VESVRfUFJPSkVDVF9QUklDSU5HJywgcGF5bG9hZDogeyBhc3NldDogbW9ja0Fzc2V0IH0gfSk7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3Ioc2V0UHJpY2VTcHksIG51bGwpO1xuICAgICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihpbml0UHJpY2luZ1NweSwgJ1JpZ2h0cyBNYW5hZ2VkJywge1xuICAgICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHByaWNpbmdQcmVmZXJlbmNlczogeyBzb21lOiAnYXR0cmlidXRlJyB9LFxuICAgICAgICAgICAgICB1c2VyQ2FuQ3VzdG9taXplUmlnaHRzOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV2ZW50OiAncHJpY2luZ0V2ZW50JyxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ0FERF9OT1RFJywgKCkgPT4ge1xuICAgICAgICBpdCgnb3BlbnMgYSBkaWFsb2cgd2l0aCB0aGUgY29ycmVjdCBjb25maWcgZm9yIGEgbGluZUl0ZW0gdGhhdCBoYXMgYSBub3RlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdBRERfTk9URScsIHBheWxvYWQ6IHsgbm90ZXM6IFt7IG5vdGVzOiBbJ3NvbWUgbm90ZSddIH1dIH0gfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgW3sgbmFtZTogJ25vdGUnLCB0eXBlOiAndGV4dGFyZWEnLCB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnLCBsYWJlbDogJ1FVT1RFLkVESVRfTk9URScsIHZhbHVlOiAnc29tZSBub3RlJyB9XSxcbiAgICAgICAgICAgIHsgdGl0bGU6ICdRVU9URS5FRElUX05PVEUnIH0sXG4gICAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnb3BlbnMgYSBkaWFsb2cgd2l0aCB0aGUgY29ycmVjdCBjb25maWcgZm9yIGEgbGluZUl0ZW0gdGhhdCBkb2VzblxcJ3QgaGF2ZSBhIG5vdGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0FERF9OT1RFJywgcGF5bG9hZDogeyBzb21lOiAnbGluZUl0ZW0nIH0gfSk7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkZvcm1EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFxuICAgICAgICAgICAgW3sgbmFtZTogJ25vdGUnLCB0eXBlOiAndGV4dGFyZWEnLCB2YWxpZGF0aW9uOiAnUkVRVUlSRUQnLCBsYWJlbDogJ1FVT1RFLkFERF9OT1RFJywgdmFsdWU6ICcnIH1dLFxuICAgICAgICAgICAgeyB0aXRsZTogJ1FVT1RFLkFERF9OT1RFJyB9LFxuICAgICAgICAgICAgamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIG9wZW5Db25maXJtYXRpb25EaWFsb2cgd2l0aCBSRU1PVkVfTk9URScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1JFTU9WRV9OT1RFJywgcGF5bG9hZDogeyBzb21lOiAnbGluZUl0ZW0nIH0gfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtYXRpb25EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICB0aXRsZTogJ1FVT1RFLkRFTEVURV9OT1RFUy5USVRMRScsXG4gICAgICAgICAgbWVzc2FnZTogJ1FVT1RFLkRFTEVURV9OT1RFUy5NRVNTQUdFJyxcbiAgICAgICAgICBhY2NlcHQ6ICdRVU9URS5ERUxFVEVfTk9URVMuQUNDRVBUJyxcbiAgICAgICAgICBkZWNsaW5lOiAnUVVPVEUuREVMRVRFX05PVEVTLkRFQ0xJTkUnXG4gICAgICAgIH0sIGphc21pbmUuYW55KEZ1bmN0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdnZXQgc2hvd1VzYWdlV2FybmluZygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgY2FydCBoYXMgYXNzZXRzIGJ1dCBybSBhc3NldHMgZG9udCBoYXZlIGEgcmlnaHRzIHBhY2thZ2UnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpdGVtQ291bnQ6IDIsXG4gICAgICAgICAgICBwcm9qZWN0czogW3tcbiAgICAgICAgICAgICAgbGluZUl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBpZDogJzInLCBwcmljZTogMTAwLCByaWdodHNNYW5hZ2VkOiAnUmlnaHRzIE1hbmFnZWQnIH0sXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93VXNhZ2VXYXJuaW5nKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm4gZmFsc2UgaWYgdGhlIHVzZXIgaGFzIG5vIGFzc2V0cyBpbiB0aGUgY2FydCcsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IGl0ZW1Db3VudDogMCB9IH0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dVc2FnZVdhcm5pbmcpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSB1c2VyIGhhcyBhc3Nlc3MgYW5kIHVzZXJDYW5Qcm9jZWVkIGlzIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpdGVtQ291bnQ6IDIsXG4gICAgICAgICAgICBwcm9qZWN0czogW3tcbiAgICAgICAgICAgICAgbGluZUl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBpZDogJzInLCBwcmljZTogMTAwLCBhdHRyaWJ1dGVzOiBbJ2EnLCAnYicsICdjJ10sIHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfSxcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dVc2FnZVdhcm5pbmcpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHVzZXJDYW5Qcm9jZWVkKCknLCAoKSA9PiB7XG4gICAgICBjb25zdCB0ZXN0czogQ2FuUHJvY2VlZFRlc3RbXSA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGV4cGVjdGVkUmVzdWx0OiBmYWxzZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ZlZUxpbmVJdGVtcyBvbmx5JyxcbiAgICAgICAgICBwdXJjaGFzZVR5cGU6ICdTeXN0ZW1MaWNlbnNlJyxcbiAgICAgICAgICBmZWVMaW5lSXRlbXM6IFttb2NrRmVlTGluZUl0ZW1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogdHJ1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ2ZlZUxpbmVJdGVtcyBvbmx5JyxcbiAgICAgICAgICBwdXJjaGFzZVR5cGU6ICdSZXZlbnVlT25seScsXG4gICAgICAgICAgZmVlTGluZUl0ZW1zOiBbbW9ja0ZlZUxpbmVJdGVtXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IHRydWUsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdmZWVMaW5lSXRlbXMgb25seScsXG4gICAgICAgICAgcHVyY2hhc2VUeXBlOiAnUHJlcGF5QWNjZXNzJyxcbiAgICAgICAgICBmZWVMaW5lSXRlbXM6IFttb2NrRmVlTGluZUl0ZW1dXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogdHJ1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JNIGxpbmVJdGVtcyB0aGF0IGRvblxcJ3QgaGF2ZSByaWdodHMnLFxuICAgICAgICAgIHB1cmNoYXNlVHlwZTogJ1RyaWFsJyxcbiAgICAgICAgICBsaW5lSXRlbXM6IFttb2NrUm1MaW5lSXRlbVdpdGhvdXRSaWdodHNdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogdHJ1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JNIGxpbmVJdGVtcyB0aGF0IGRvblxcJ3QgaGF2ZSByaWdodHMnLFxuICAgICAgICAgIHB1cmNoYXNlVHlwZTogJ0RlbGl2ZXJ5T25seScsXG4gICAgICAgICAgbGluZUl0ZW1zOiBbbW9ja1JtTGluZUl0ZW1XaXRob3V0UmlnaHRzXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUk0gbGluZUl0ZW1zIHRoYXQgZG9uXFwndCBoYXZlIHJpZ2h0cycsXG4gICAgICAgICAgcHVyY2hhc2VUeXBlOiAnU3lzdGVtTGljZW5zZScsXG4gICAgICAgICAgbGluZUl0ZW1zOiBbbW9ja1JtTGluZUl0ZW1XaXRob3V0UmlnaHRzXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IHRydWUsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdSRiBsaW5lSXRlbXMnLFxuICAgICAgICAgIHB1cmNoYXNlVHlwZTogJ1N5c3RlbUxpY2Vuc2UnLFxuICAgICAgICAgIGxpbmVJdGVtczogW21vY2tSZkxpbmVJdGVtXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUkYgbGluZUl0ZW1zIGFuZCBSTSBsaW5lSXRlbXMgd2l0aG91dCByaWdodHMnLFxuICAgICAgICAgIHB1cmNoYXNlVHlwZTogJ1N5c3RlbUxpY2Vuc2UnLFxuICAgICAgICAgIGxpbmVJdGVtczogW21vY2tSZkxpbmVJdGVtLCBtb2NrUm1MaW5lSXRlbVdpdGhvdXRSaWdodHNdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBleHBlY3RlZFJlc3VsdDogdHJ1ZSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JGIGxpbmVJdGVtcyBhbmQgUk0gbGluZUl0ZW1zIHdpdGggcmlnaHRzJyxcbiAgICAgICAgICBwdXJjaGFzZVR5cGU6ICdTeXN0ZW1MaWNlbnNlJyxcbiAgICAgICAgICBsaW5lSXRlbXM6IFttb2NrUmZMaW5lSXRlbSwgbW9ja1JtTGluZUl0ZW1XaXRoUmlnaHRzXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZXhwZWN0ZWRSZXN1bHQ6IGZhbHNlLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUk0gbGluZUl0ZW1zIHRoYXQgZG9uXFwndCBoYXZlIHJpZ2h0cycsXG4gICAgICAgICAgcHVyY2hhc2VUeXBlOiAnU3lzdGVtTGljZW5zZSdcbiAgICAgICAgfSxcbiAgICAgIF07XG5cbiAgICAgIHRlc3RzLmZvckVhY2goKHRlc3Q6IENhblByb2NlZWRUZXN0KSA9PiB7XG4gICAgICAgIGxldCBtb2NrUXVvdGU6IGFueSA9IHtcbiAgICAgICAgICBwdXJjaGFzZVR5cGU6IHRlc3QucHVyY2hhc2VUeXBlLFxuICAgICAgICAgIHByb2plY3RzOiBbXSxcbiAgICAgICAgICBpdGVtQ291bnQ6IHRlc3QubGluZUl0ZW1zID8gdGVzdC5saW5lSXRlbXMubGVuZ3RoIDogMFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0ZXN0LmxpbmVJdGVtcykgbW9ja1F1b3RlLnByb2plY3RzLnB1c2goeyBsaW5lSXRlbXM6IHRlc3QubGluZUl0ZW1zIH0pO1xuICAgICAgICBpZiAodGVzdC5mZWVMaW5lSXRlbXMpIG1vY2tRdW90ZS5wcm9qZWN0cy5wdXNoKHsgZmVlTGluZUl0ZW1zOiB0ZXN0LmZlZUxpbmVJdGVtcyB9KTtcblxuICAgICAgICBpdChgcmV0dXJucyAke3Rlc3QuZXhwZWN0ZWRSZXN1bHR9IGZvciAke3Rlc3QuZGVzY3JpcHRpb259IC0gJHt0ZXN0LnB1cmNoYXNlVHlwZX1gLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiBtb2NrUXVvdGUgfSk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnVzZXJDYW5Qcm9jZWVkKS50b0JlKHRlc3QuZXhwZWN0ZWRSZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCB0b3RhbCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgdG90YWwgZG9sbGFyIGFtb3VudCBmb3IgdGhlIHF1b3RlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgdG90YWw6IDEwMDAgfSB9KTtcbiAgICAgICAgbGV0IGN1cnJlbnRUb3RhbDogbnVtYmVyO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudG90YWwuc3Vic2NyaWJlKHRvdGFsID0+IGN1cnJlbnRUb3RhbCA9IHRvdGFsKTtcbiAgICAgICAgZXhwZWN0KGN1cnJlbnRUb3RhbCkudG9CZSgxMDAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBzdWJUb3RhbCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgc3ViVG90YWwgZG9sbGFyIGFtb3VudCBmb3IgdGhlIHF1b3RlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgc3ViVG90YWw6IDEwMDAgfSB9KTtcbiAgICAgICAgbGV0IGN1cnJlbnRTdWJUb3RhbDogbnVtYmVyO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc3ViVG90YWwuc3Vic2NyaWJlKHRvdGFsID0+IGN1cnJlbnRTdWJUb3RhbCA9IHRvdGFsKTtcbiAgICAgICAgZXhwZWN0KGN1cnJlbnRTdWJUb3RhbCkudG9CZSgxMDAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCBkaXNjb3VudCgpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgZGlzY291bnQgZG9sbGFyIGFtb3VudCBmb3IgdGhlIHF1b3RlJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgZGlzY291bnQ6IDEwMDAgfSB9KTtcbiAgICAgICAgbGV0IGN1cnJlbnREaXNjb3VudDogbnVtYmVyO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZGlzY291bnQuc3Vic2NyaWJlKHRvdGFsID0+IGN1cnJlbnREaXNjb3VudCA9IHRvdGFsKTtcbiAgICAgICAgZXhwZWN0KGN1cnJlbnREaXNjb3VudCkudG9CZSgxMDAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3F1b3RlSGFzSXRlbXMoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIHRydWUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCd3aGVuIHRoZSBwcm9qZWN0KHMpIGluIHRoZSBxdW90ZSBjb250YWluKHMpIGF0IGxlYXN0IDEgbGluZUl0ZW0gb3IgZmVlTGluZUl0ZW0nLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IGlkOiAxIH1dIH1dIH0gfSk7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5xdW90ZUhhc0l0ZW1zKS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgncmV0dXJucyBmYWxzZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIG9ubHkgcHJvamVjdCBpbiB0aGUgcXVvdGUgaXMgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHByb2plY3RzOiBbeyBpZDogJzEyMycgfV0gfSB9KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnF1b3RlSGFzSXRlbXMpLnRvQmUoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnd2hlbiAxIG9mIHRoZSBwcm9qZWN0cyBpbiB0aGUgcXVvdGUgaXMgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHByb2plY3RzOiBbe30sIHsgbGluZUl0ZW1zOiBbeyBpZDogMSB9XSB9XSB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QucXVvdGVIYXNJdGVtcykudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0IHF1b3RlQ29udGFpbnNBc3NldHMoKScsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBxdW90ZSBoYXMgbm8gbGluZUl0ZW1zJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZUVkaXQnLCB7IGRhdGE6IHsgcHJvamVjdHM6IFt7IGlkOiAnMTIzJyB9LCB7IGlkOiAnNDU2JyB9XSB9IH0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnF1b3RlQ29udGFpbnNBc3NldHMpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRydWUgaWYgdGhlIHF1b3RlIGhhcyBsaW5lSXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbXSB9XSB9IH0pO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnF1b3RlQ29udGFpbnNBc3NldHMpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93RGlzY291bnQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCdyZXR1cm5zIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBpdCgnd2hlbiB0aGUgcXVvdGUgZG9lcyBub3QgaGF2ZSB0aGUgZGlzY291bnQgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7fSB9KTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnNob3dEaXNjb3VudCkudG9CZShmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd3aGVuIHRoZSBxdW90ZVR5cGUgaXMgXCJUcmlhbFwiIGFuZCB0aGUgcXVvdGUgRE9FUyBOT1QgaGF2ZSB0aGUgZGlzY291bnQgcHJvcGVydHknLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IHB1cmNoYXNlVHlwZTogJ1RyaWFsJyB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0Rpc2NvdW50KS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3doZW4gdGhlIHF1b3RlVHlwZSBpcyBcIlRyaWFsXCIgYW5kIHRoZSBxdW90ZSBET0VTIGhhdmUgdGhlIGRpc2NvdW50IHByb3BlcnR5JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBkaXNjb3VudDogJzEwMCcsIHB1cmNoYXNlVHlwZTogJ1RyaWFsJyB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0Rpc2NvdW50KS50b0JlKGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3JldHVybnMgdHJ1ZScsICgpID0+IHtcbiAgICAgICAgaXQoJ3doZW4gdGhlIHF1b3RlIGRvZXMgaGF2ZSB0aGUgZGlzY291bnQgcHJvcGVydHkgQU5EIHRoZSBxdW90ZVR5cGUgaXMgTk9UIFRyaWFsJywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlRWRpdCcsIHsgZGF0YTogeyBkaXNjb3VudDogJzEwMCcsIHB1cmNoYXNlVHlwZTogJ05vdFRyaWFsJyB9IH0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0Rpc2NvdW50KS50b0JlKHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3Nob3VsZFNob3dDbG9uZUJ1dHRvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBjbG9uZVF1b3RlIGNhcGFiaWxpdHkgd2l0aCB0aGUgcXVvdGUgZWRpdCBzdG9yZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVFZGl0JywgeyBkYXRhOiB7IGlkOiAxIH0gfSk7XG4gICAgICAgIGNvbnN0IHNob3VsZFNob3dDbG9uZUJ1dHRvbiA9IGNvbXBvbmVudFVuZGVyVGVzdC5zaG91bGRTaG93Q2xvbmVCdXR0b247XG4gICAgICAgIGV4cGVjdChtb2NrQ2FwYWJpbGl0aWVzLmNsb25lUXVvdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKE9ic2VydmFibGUub2YoeyBkYXRhOiB7IGlkOiAxIH0gfSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncHVyY2hhc2VUeXBlQ29uZmlnIGdldHRlcicsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBjb25maWcnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LnB1cmNoYXNlVHlwZUNvbmZpZykudG9FcXVhbChbeyB2YWx1ZTogJ1N5c3RlbUxpY2Vuc2UnLCB2aWV3VmFsdWU6ICdTeXN0ZW0gTGljZW5zZScgfV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnb25TZWxlY3RRdW90ZVR5cGUoKScsICgpID0+IHtcbiAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSByaWdodCBhY3Rpb24gdG8gdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uU2VsZWN0UXVvdGVUeXBlKHsgcHVyY2hhc2VUeXBlOiAnU3lzdGVtTGljZW5zZScgfSk7XG5cbiAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHVwZGF0ZVF1b3RlRmllbGRTcHksIHsgcHVyY2hhc2VUeXBlOiAnU3lzdGVtTGljZW5zZScgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk9wZW5CdWxrSW1wb3J0RGlhbG9nKCknLCAoKSA9PiB7XG4gICAgICBsZXQgYnVsa0ltcG9ydFNweTogamFzbWluZS5TcHk7XG4gICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdPUEVOX0JVTEtfSU1QT1JUX0RJQUxPRycsIHBheWxvYWQ6ICdhYmNkLTEyMzQnIH0pO1xuICAgICAgICBidWxrSW1wb3J0U3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdidWxrSW1wb3J0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29wZW5zIGEgZm9ybSBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgW3sgc29tZTogJ2ltcG9ydCcgfV0sXG4gICAgICAgICAgeyB0aXRsZTogJ1FVT1RFLkJVTEtfSU1QT1JULlRJVExFJywgc3VibWl0TGFiZWw6ICdRVU9URS5CVUxLX0lNUE9SVC5TVUJNSVRfQlROJywgYXV0b2NvbXBsZXRlOiAnb2ZmJyB9LFxuICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyB0aGUgYnVsa0ltcG9ydCgpIG9uIHRoZSBxdW90ZSBlZGl0IHNlcnZpY2UgaW4gdGhlIGNhbGxiYWNrJywgKCkgPT4ge1xuICAgICAgICBtb2NrRGlhbG9nU2VydmljZS5vblN1Ym1pdENhbGxiYWNrKHsgbGluZUl0ZW1BdHRyaWJ1dGVzOiAnb25lXFxudHdvJyB9KTtcblxuICAgICAgICBleHBlY3QoYnVsa0ltcG9ydFNweSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBsaW5lSXRlbUF0dHJpYnV0ZXM6ICdvbmVcXG50d28nIH0sICdhYmNkLTEyMzQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuIl19

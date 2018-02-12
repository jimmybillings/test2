"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var cart_tab_component_1 = require("./cart-tab.component");
var mock_app_store_1 = require("../../../../store/spec-helpers/mock-app.store");
function main() {
    describe('Cart Tab Component', function () {
        var componentUnderTest;
        var mockUserCan;
        var mockCartService;
        var mockDialogService;
        var mockAssetService;
        var mockUserPreference;
        var mockDocument;
        var mockWindow;
        var mockState;
        var mockQuoteService;
        var mockCurrentUserService;
        var mockCapabilities;
        var mockChangeDetectorRef;
        var mockAppStore;
        var initPricingSpy;
        var setPriceSpy;
        beforeEach(function () {
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
                data: Observable_1.Observable.of({ data: { someData: 'SOME_VALUE' } }),
                addProject: jasmine.createSpy('addProject'),
                removeProject: jasmine.createSpy('removeProject'),
                updateProject: jasmine.createSpy('updateProject'),
                moveLineItemTo: jasmine.createSpy('moveLineItemTo'),
                cloneLineItem: jasmine.createSpy('cloneLineItem'),
                removeLineItem: jasmine.createSpy('removeLineItem'),
                editLineItem: jasmine.createSpy('editLineItem'),
                getPaymentOptions: jasmine.createSpy('createPaymentOptions'),
                retrieveLicenseAgreements: jasmine.createSpy('retrieveLicenseAgreements').and.returnValue(Observable_1.Observable.of({})),
                projects: Observable_1.Observable.of([]),
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
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({ data: 'Test data' })),
                openFormDialog: jasmine.createSpy('openFormDialog').and.returnValue(Observable_1.Observable.of({ data: 'Test data' })),
                openConfirmationDialog: jasmine.createSpy('openConfirmationDialog')
            };
            mockWindow = { nativeWindow: { location: { href: {} } } };
            mockUserPreference = {
                data: Observable_1.Observable.of({ pricingPreferences: { some: 'attribute' } })
            };
            mockAppStore = new mock_app_store_1.MockAppStore();
            initPricingSpy = mockAppStore.createActionFactoryMethod('pricing', 'initializePricing');
            setPriceSpy = mockAppStore.createActionFactoryMethod('pricing', 'setPriceForDialog');
            mockAppStore.createStateSection('uiConfig', {
                components: { cart: { config: { form: 'SOME_CONFIG', createQuote: { items: [] } } } }
            });
            mockUserCan = {
                viewLicenseAgreementsButton: jasmine.createSpy('viewLicenseAgreementsButton'),
                administerQuotes: function () { return false; }
            };
            mockChangeDetectorRef = { markForCheck: function () { return true; } };
            componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
        });
        describe('Initialization', function () {
            it('caches the cart UI config', function () {
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.config).toEqual({ form: 'SOME_CONFIG', createQuote: { items: [] } });
            });
        });
        describe('rmAssetsHaveAttributes()', function () {
            it('should return false if there is an RM asset without attributes', function () {
                expect(componentUnderTest.rmAssetsHaveAttributes).toBe(false);
            });
            it('should return true if all assets are valid', function () {
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
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.rmAssetsHaveAttributes).toBe(true);
            });
            it('should return true if the cart is empty', function () {
                mockState = { data: { itemCount: 0 } };
                mockCartService = {
                    state: mockState
                };
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.rmAssetsHaveAttributes).toBe(true);
            });
        });
        describe('cartContainsNoAssets()', function () {
            it('should return true if the cart is empty', function () {
                mockState = { data: { itemCount: 0 } };
                mockCartService = {
                    state: mockState
                };
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.cartContainsNoAssets).toBe(true);
            });
            it('should return false if the cart is has 1 or more assets', function () {
                mockState = { data: { itemCount: 1 } };
                mockCartService = {
                    state: mockState
                };
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.cartContainsNoAssets).toBe(false);
            });
        });
        describe('showTotal()', function () {
            it('should return true the cart total is above 0', function () {
                mockAppStore.createStateSection('cart', {
                    data: { total: 100 }
                });
                expect(componentUnderTest.showTotal).toBe(true);
            });
            it('should return false if the cart total is 0', function () {
                mockAppStore.createStateSection('cart', {
                    data: { total: 0 }
                });
                expect(componentUnderTest.showTotal).toBe(false);
            });
        });
        describe('showUsageWarning()', function () {
            it('should return false if the cart is empty', function () {
                mockState = { data: { itemCount: 0 } };
                mockCartService = {
                    state: mockState
                };
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.showUsageWarning).toBe(false);
            });
            it('should return true if cart has assets and 1 or more RM assets are missing attributes ', function () {
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
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.showUsageWarning).toBe(true);
            });
            it('should return false if cart has assets and all RM assets have attributes ', function () {
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
                componentUnderTest = new cart_tab_component_1.CartTabComponent(mockUserCan, mockCartService, mockDialogService, mockWindow, mockUserPreference, mockDocument, mockAppStore, mockChangeDetectorRef);
                expect(componentUnderTest.showUsageWarning).toBe(false);
            });
        });
        describe('onNotification()', function () {
            it('adds a project when notified with ADD_PROJECT', function () {
                componentUnderTest.onNotification({ type: 'ADD_PROJECT' });
                expect(mockCartService.addProject).toHaveBeenCalled();
            });
            it('removes a project when notified with REMOVE_PROJECT', function () {
                var mockProject = {};
                componentUnderTest.onNotification({ type: 'REMOVE_PROJECT', payload: mockProject });
                expect(mockCartService.removeProject).toHaveBeenCalledWith(mockProject);
            });
            it('updates a project when notified with UPDATE_PROJECT', function () {
                var mockProject = {};
                componentUnderTest.onNotification({ type: 'UPDATE_PROJECT', payload: mockProject });
                expect(mockDialogService.openFormDialog).toHaveBeenCalled();
            });
            it('moves a line item when notified with MOVE_LINE_ITEM', function () {
                var mockProject = {};
                var mockLineItem = {};
                componentUnderTest.onNotification({
                    type: 'MOVE_LINE_ITEM',
                    payload: { lineItem: mockLineItem, otherProject: mockProject }
                });
                expect(mockCartService.moveLineItemTo).toHaveBeenCalledWith(mockProject, mockLineItem);
            });
            it('clones a line item when notified with CLONE_LINE_ITEM', function () {
                var mockLineItem = {};
                componentUnderTest.onNotification({ type: 'CLONE_LINE_ITEM', payload: mockLineItem });
                expect(mockCartService.cloneLineItem).toHaveBeenCalledWith(mockLineItem);
            });
            it('removes a line item when notified with REMOVE_LINE_ITEM', function () {
                var spy = mockAppStore.createActionFactoryMethod('cart', 'removeAsset');
                var mockLineItem = { asset: { id: 123, type: 'cart' } };
                componentUnderTest.onNotification({ type: 'REMOVE_LINE_ITEM', payload: mockLineItem });
                mockAppStore.expectDispatchFor(spy, { id: 123, type: 'cart' });
            });
            it('edits a line item when notified with EDIT_LINE_ITEM', function () {
                var mockLineItem = {};
                componentUnderTest.onNotification({
                    type: 'EDIT_LINE_ITEM',
                    payload: {
                        lineItem: mockLineItem, fieldToEdit: { selectedTranscodeTarget: '1080i' }
                    }
                });
                expect(mockCartService.editLineItem).toHaveBeenCalledWith(mockLineItem, { selectedTranscodeTarget: '1080i' });
            });
            it('edits the assets in and out markers with EDIT_LINE_ITEM_MARKERS', function () {
                var mockAsset = { assetId: 1234 };
                var mockMethod = mockAppStore.createLegacyServiceMethod('asset', 'getClipPreviewData', Observable_1.Observable.of({ url: 'fake url' }));
                componentUnderTest.onNotification({ type: 'EDIT_LINE_ITEM_MARKERS', payload: { asset: mockAsset } });
                mockAppStore.expectCallFor(mockMethod, 1234);
            });
            it('edits the project pricing with EDIT_PROJECT_PRICING', function () {
                var mockAsset = { assetId: 1234 };
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
            it('calls openPricingDialog with SHOW_PRICING_DIALOG', function () {
                var mockLineItem = { asset: { assetId: 123456 } };
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
                    title: 'CART.DELETE_NOTES.TITLE',
                    message: 'CART.DELETE_NOTES.MESSAGE',
                    accept: 'CART.DELETE_NOTES.ACCEPT',
                    decline: 'CART.DELETE_NOTES.DECLINE'
                }, jasmine.any(Function));
            });
        });
        describe('checkout()', function () {
            it('should go to the next tab', function () {
                spyOn(componentUnderTest, 'goToNextTab');
                componentUnderTest.checkout();
                expect(componentUnderTest.goToNextTab).toHaveBeenCalled();
            });
            it('should retrieve the payment options', function () {
                componentUnderTest.checkout();
                expect(mockCartService.getPaymentOptions).toHaveBeenCalled();
            });
        });
        describe('shouldShowLicenseDetailsBtn()', function () {
            it('should cal viewLicenseAgreementsButton on the commerce capabilities', function () {
                componentUnderTest.shouldShowLicenseDetailsBtn();
                expect(mockUserCan.viewLicenseAgreementsButton).toHaveBeenCalled();
            });
        });
        describe('showLicenseAgreements()', function () {
            it('should call retrieveLicenseAgreements() on the cart service', function () {
                componentUnderTest.showLicenseAgreements();
                expect(mockCartService.retrieveLicenseAgreements).toHaveBeenCalled();
            });
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtdGFiLmNvbXBvbmVudC5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQTZDO0FBQzdDLDJEQUF3RDtBQUN4RCxnRkFBNkU7QUFFN0U7SUFDRSxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IsSUFBSSxrQkFBb0MsQ0FBQztRQUN6QyxJQUFJLFdBQWdCLENBQUM7UUFDckIsSUFBSSxlQUFvQixDQUFDO1FBQ3pCLElBQUksaUJBQXNCLENBQUM7UUFDM0IsSUFBSSxnQkFBcUIsQ0FBQztRQUMxQixJQUFJLGtCQUF1QixDQUFDO1FBQzVCLElBQUksWUFBaUIsQ0FBQztRQUN0QixJQUFJLFVBQWUsQ0FBQztRQUNwQixJQUFJLFNBQWMsQ0FBQztRQUNuQixJQUFJLGdCQUFxQixDQUFDO1FBQzFCLElBQUksc0JBQTJCLENBQUM7UUFDaEMsSUFBSSxnQkFBcUIsQ0FBQztRQUMxQixJQUFJLHFCQUEwQixDQUFDO1FBQy9CLElBQUksWUFBMEIsQ0FBQztRQUMvQixJQUFJLGNBQTJCLENBQUM7UUFDaEMsSUFBSSxXQUF3QixDQUFDO1FBRTdCLFVBQVUsQ0FBQztZQUNULFNBQVMsR0FBRztnQkFDVixJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLENBQUM7b0JBQ1osUUFBUSxFQUFFLENBQUM7NEJBQ1QsU0FBUyxFQUFFO2dDQUNULEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFO2dDQUNyRixFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUU7NkJBQ3pEO3lCQUNGLENBQUM7aUJBQ0g7YUFDRixDQUFDO1lBRUYsZUFBZSxHQUFHO2dCQUNo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LENBQUM7Z0JBRTlCLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQy9ELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsK0JBQStCLEVBQUU7WUFDeEMsRUFBRSxDQUFDLHFFQUFxRSxFQUFFO2dCQUN4RSxrQkFBa0IsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO2dCQUVqRCxNQUFNLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xDLEVBQUUsQ0FBQyw2REFBNkQsRUFBRTtnQkFDaEUsa0JBQWtCLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFFM0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5iRCxvQkFtYkMiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9jb21wb25lbnRzL3RhYnMvY2FydC10YWIuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENhcnRUYWJDb21wb25lbnQgfSBmcm9tICcuL2NhcnQtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFpbigpIHtcbiAgZGVzY3JpYmUoJ0NhcnQgVGFiIENvbXBvbmVudCcsICgpID0+IHtcbiAgICBsZXQgY29tcG9uZW50VW5kZXJUZXN0OiBDYXJ0VGFiQ29tcG9uZW50O1xuICAgIGxldCBtb2NrVXNlckNhbjogYW55O1xuICAgIGxldCBtb2NrQ2FydFNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja0RpYWxvZ1NlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja0Fzc2V0U2VydmljZTogYW55O1xuICAgIGxldCBtb2NrVXNlclByZWZlcmVuY2U6IGFueTtcbiAgICBsZXQgbW9ja0RvY3VtZW50OiBhbnk7XG4gICAgbGV0IG1vY2tXaW5kb3c6IGFueTtcbiAgICBsZXQgbW9ja1N0YXRlOiBhbnk7XG4gICAgbGV0IG1vY2tRdW90ZVNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja0N1cnJlbnRVc2VyU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQ2FwYWJpbGl0aWVzOiBhbnk7XG4gICAgbGV0IG1vY2tDaGFuZ2VEZXRlY3RvclJlZjogYW55O1xuICAgIGxldCBtb2NrQXBwU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgaW5pdFByaWNpbmdTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBzZXRQcmljZVNweTogamFzbWluZS5TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tTdGF0ZSA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGl0ZW1Db3VudDogMixcbiAgICAgICAgICBwcm9qZWN0czogW3tcbiAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICB7IGlkOiAnMScsIHByaWNlOiAxMDAsIGF0dHJpYnV0ZXM6IFsnYScsICdiJywgJ2MnXSwgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyB9LFxuICAgICAgICAgICAgICB7IGlkOiAnMicsIHByaWNlOiAxMDAsIHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgZGF0YTogT2JzZXJ2YWJsZS5vZih7IGRhdGE6IHsgc29tZURhdGE6ICdTT01FX1ZBTFVFJyB9IH0pLFxuICAgICAgICBhZGRQcm9qZWN0OiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkUHJvamVjdCcpLFxuICAgICAgICByZW1vdmVQcm9qZWN0OiBqYXNtaW5lLmNyZWF0ZVNweSgncmVtb3ZlUHJvamVjdCcpLFxuICAgICAgICB1cGRhdGVQcm9qZWN0OiBqYXNtaW5lLmNyZWF0ZVNweSgndXBkYXRlUHJvamVjdCcpLFxuICAgICAgICBtb3ZlTGluZUl0ZW1UbzogamFzbWluZS5jcmVhdGVTcHkoJ21vdmVMaW5lSXRlbVRvJyksXG4gICAgICAgIGNsb25lTGluZUl0ZW06IGphc21pbmUuY3JlYXRlU3B5KCdjbG9uZUxpbmVJdGVtJyksXG4gICAgICAgIHJlbW92ZUxpbmVJdGVtOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVtb3ZlTGluZUl0ZW0nKSxcbiAgICAgICAgZWRpdExpbmVJdGVtOiBqYXNtaW5lLmNyZWF0ZVNweSgnZWRpdExpbmVJdGVtJyksXG4gICAgICAgIGdldFBheW1lbnRPcHRpb25zOiBqYXNtaW5lLmNyZWF0ZVNweSgnY3JlYXRlUGF5bWVudE9wdGlvbnMnKSxcbiAgICAgICAgcmV0cmlldmVMaWNlbnNlQWdyZWVtZW50czogamFzbWluZS5jcmVhdGVTcHkoJ3JldHJpZXZlTGljZW5zZUFncmVlbWVudHMnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpLFxuICAgICAgICBwcm9qZWN0czogT2JzZXJ2YWJsZS5vZihbXSksXG4gICAgICAgIHN0YXRlOiBtb2NrU3RhdGVcbiAgICAgIH07XG5cbiAgICAgIG1vY2tEb2N1bWVudCA9IHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIGNsYXNzTGlzdDoge1xuICAgICAgICAgICAgYWRkOiBqYXNtaW5lLmNyZWF0ZVNweSgnYWRkJyksXG4gICAgICAgICAgICByZW1vdmU6IGphc21pbmUuY3JlYXRlU3B5KCdyZW1vdmUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgbW9ja0RpYWxvZ1NlcnZpY2UgPSB7XG4gICAgICAgIG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHsgZGF0YTogJ1Rlc3QgZGF0YScgfSkpLFxuICAgICAgICBvcGVuRm9ybURpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Gb3JtRGlhbG9nJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2YoeyBkYXRhOiAnVGVzdCBkYXRhJyB9KSksXG4gICAgICAgIG9wZW5Db25maXJtYXRpb25EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29uZmlybWF0aW9uRGlhbG9nJylcbiAgICAgIH07XG5cbiAgICAgIG1vY2tXaW5kb3cgPSB7IG5hdGl2ZVdpbmRvdzogeyBsb2NhdGlvbjogeyBocmVmOiB7fSB9IH0gfTtcblxuICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlID0ge1xuICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgcHJpY2luZ1ByZWZlcmVuY2VzOiB7IHNvbWU6ICdhdHRyaWJ1dGUnIH0gfSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tBcHBTdG9yZSA9IG5ldyBNb2NrQXBwU3RvcmUoKTtcbiAgICAgIGluaXRQcmljaW5nU3B5ID0gbW9ja0FwcFN0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3ByaWNpbmcnLCAnaW5pdGlhbGl6ZVByaWNpbmcnKTtcbiAgICAgIHNldFByaWNlU3B5ID0gbW9ja0FwcFN0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3ByaWNpbmcnLCAnc2V0UHJpY2VGb3JEaWFsb2cnKTtcbiAgICAgIG1vY2tBcHBTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3VpQ29uZmlnJywge1xuICAgICAgICBjb21wb25lbnRzOiB7IGNhcnQ6IHsgY29uZmlnOiB7IGZvcm06ICdTT01FX0NPTkZJRycsIGNyZWF0ZVF1b3RlOiB7IGl0ZW1zOiBbXSB9IH0gfSB9XG4gICAgICB9KTtcblxuICAgICAgbW9ja1VzZXJDYW4gPSB7XG4gICAgICAgIHZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbjogamFzbWluZS5jcmVhdGVTcHkoJ3ZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbicpLFxuICAgICAgICBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZVxuICAgICAgfTtcblxuICAgICAgbW9ja0NoYW5nZURldGVjdG9yUmVmID0geyBtYXJrRm9yQ2hlY2s6ICgpID0+IHRydWUgfTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENhcnRUYWJDb21wb25lbnQoXG4gICAgICAgIG1vY2tVc2VyQ2FuLCBtb2NrQ2FydFNlcnZpY2UsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrV2luZG93LFxuICAgICAgICBtb2NrVXNlclByZWZlcmVuY2UsIG1vY2tEb2N1bWVudCwgbW9ja0FwcFN0b3JlLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnSW5pdGlhbGl6YXRpb24nLCAoKSA9PiB7XG4gICAgICBpdCgnY2FjaGVzIHRoZSBjYXJ0IFVJIGNvbmZpZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb25maWcpLnRvRXF1YWwoeyBmb3JtOiAnU09NRV9DT05GSUcnLCBjcmVhdGVRdW90ZTogeyBpdGVtczogW10gfSB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3JtQXNzZXRzSGF2ZUF0dHJpYnV0ZXMoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZXJlIGlzIGFuIFJNIGFzc2V0IHdpdGhvdXQgYXR0cmlidXRlcycsICgpID0+IHtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5ybUFzc2V0c0hhdmVBdHRyaWJ1dGVzKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGFsbCBhc3NldHMgYXJlIHZhbGlkJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RhdGUgPSB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaXRlbUNvdW50OiAxLFxuICAgICAgICAgICAgcHJvamVjdHM6IFt7XG4gICAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICAgIHsgaWQ6ICcxJywgcHJpY2U6IDEwMCwgYXR0cmlidXRlczogWydhJywgJ2InLCAnYyddLCByaWdodHNNYW5hZ2VkOiAnUmlnaHRzIE1hbmFnZWQnIH0sXG4gICAgICAgICAgICAgICAgeyBpZDogJzInLCBwcmljZTogMTAwLCBhdHRyaWJ1dGVzOiBbJ2EnLCAnYicsICdjJ10sIHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfSxcbiAgICAgICAgICAgICAgICB7IGlkOiAnMycsIHByaWNlOiA1OSwgcmlnaHRzTWFuYWdlZDogJ1JveWFsdHkgRnJlZScgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBtb2NrQ2FydFNlcnZpY2UgPSB7XG4gICAgICAgICAgc3RhdGU6IG1vY2tTdGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDYXJ0VGFiQ29tcG9uZW50KFxuICAgICAgICAgIG1vY2tVc2VyQ2FuLCBtb2NrQ2FydFNlcnZpY2UsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrV2luZG93LFxuICAgICAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja0RvY3VtZW50LCBtb2NrQXBwU3RvcmUsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZlxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qucm1Bc3NldHNIYXZlQXR0cmlidXRlcykudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBjYXJ0IGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RhdGUgPSB7IGRhdGE6IHsgaXRlbUNvdW50OiAwIH0gfTtcblxuICAgICAgICBtb2NrQ2FydFNlcnZpY2UgPSB7XG4gICAgICAgICAgc3RhdGU6IG1vY2tTdGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDYXJ0VGFiQ29tcG9uZW50KFxuICAgICAgICAgIG1vY2tVc2VyQ2FuLCBtb2NrQ2FydFNlcnZpY2UsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrV2luZG93LFxuICAgICAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja0RvY3VtZW50LCBtb2NrQXBwU3RvcmUsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZlxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Qucm1Bc3NldHNIYXZlQXR0cmlidXRlcykudG9CZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NhcnRDb250YWluc05vQXNzZXRzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHRoZSBjYXJ0IGlzIGVtcHR5JywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RhdGUgPSB7IGRhdGE6IHsgaXRlbUNvdW50OiAwIH0gfTtcblxuICAgICAgICBtb2NrQ2FydFNlcnZpY2UgPSB7XG4gICAgICAgICAgc3RhdGU6IG1vY2tTdGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDYXJ0VGFiQ29tcG9uZW50KFxuICAgICAgICAgIG1vY2tVc2VyQ2FuLCBtb2NrQ2FydFNlcnZpY2UsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrV2luZG93LFxuICAgICAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja0RvY3VtZW50LCBtb2NrQXBwU3RvcmUsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZlxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY2FydENvbnRhaW5zTm9Bc3NldHMpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGNhcnQgaXMgaGFzIDEgb3IgbW9yZSBhc3NldHMnLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdGF0ZSA9IHsgZGF0YTogeyBpdGVtQ291bnQ6IDEgfSB9O1xuXG4gICAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgICBzdGF0ZTogbW9ja1N0YXRlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENhcnRUYWJDb21wb25lbnQoXG4gICAgICAgICAgbW9ja1VzZXJDYW4sIG1vY2tDYXJ0U2VydmljZSwgbW9ja0RpYWxvZ1NlcnZpY2UsIG1vY2tXaW5kb3csXG4gICAgICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlLCBtb2NrRG9jdW1lbnQsIG1vY2tBcHBTdG9yZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmXG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jYXJ0Q29udGFpbnNOb0Fzc2V0cykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG93VG90YWwoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgdGhlIGNhcnQgdG90YWwgaXMgYWJvdmUgMCcsICgpID0+IHtcbiAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignY2FydCcsIHtcbiAgICAgICAgICBkYXRhOiB7IHRvdGFsOiAxMDAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93VG90YWwpLnRvQmUodHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGNhcnQgdG90YWwgaXMgMCcsICgpID0+IHtcbiAgICAgICAgbW9ja0FwcFN0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignY2FydCcsIHtcbiAgICAgICAgICBkYXRhOiB7IHRvdGFsOiAwIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1RvdGFsKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBkZXNjcmliZSgnc2hvd1VzYWdlV2FybmluZygpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIGNhcnQgaXMgZW1wdHknLCAoKSA9PiB7XG4gICAgICAgIG1vY2tTdGF0ZSA9IHsgZGF0YTogeyBpdGVtQ291bnQ6IDAgfSB9O1xuXG4gICAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgICBzdGF0ZTogbW9ja1N0YXRlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENhcnRUYWJDb21wb25lbnQoXG4gICAgICAgICAgbW9ja1VzZXJDYW4sIG1vY2tDYXJ0U2VydmljZSwgbW9ja0RpYWxvZ1NlcnZpY2UsIG1vY2tXaW5kb3csXG4gICAgICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlLCBtb2NrRG9jdW1lbnQsIG1vY2tBcHBTdG9yZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmXG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93VXNhZ2VXYXJuaW5nKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGNhcnQgaGFzIGFzc2V0cyBhbmQgMSBvciBtb3JlIFJNIGFzc2V0cyBhcmUgbWlzc2luZyBhdHRyaWJ1dGVzICcsICgpID0+IHtcbiAgICAgICAgbW9ja1N0YXRlID0ge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGl0ZW1Db3VudDogMyxcbiAgICAgICAgICAgIHByb2plY3RzOiBbe1xuICAgICAgICAgICAgICBsaW5lSXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGlkOiAnMScsIHByaWNlOiAxMDAsIHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfSxcbiAgICAgICAgICAgICAgICB7IGlkOiAnMicsIHByaWNlOiAxMDAsIGF0dHJpYnV0ZXM6IFsnYScsICdiJywgJ2MnXSwgcmlnaHRzTWFuYWdlZDogJ1JpZ2h0cyBNYW5hZ2VkJyB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6ICczJywgcHJpY2U6IDU5LCByaWdodHNNYW5hZ2VkOiAnUm95YWx0eSBGcmVlJyB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgICBzdGF0ZTogbW9ja1N0YXRlXG4gICAgICAgIH07XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENhcnRUYWJDb21wb25lbnQoXG4gICAgICAgICAgbW9ja1VzZXJDYW4sIG1vY2tDYXJ0U2VydmljZSwgbW9ja0RpYWxvZ1NlcnZpY2UsIG1vY2tXaW5kb3csXG4gICAgICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlLCBtb2NrRG9jdW1lbnQsIG1vY2tBcHBTdG9yZSwgbW9ja0NoYW5nZURldGVjdG9yUmVmXG4gICAgICAgICk7XG5cbiAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5zaG93VXNhZ2VXYXJuaW5nKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGNhcnQgaGFzIGFzc2V0cyBhbmQgYWxsIFJNIGFzc2V0cyBoYXZlIGF0dHJpYnV0ZXMgJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RhdGUgPSB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgaXRlbUNvdW50OiAzLFxuICAgICAgICAgICAgcHJvamVjdHM6IFt7XG4gICAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICAgIHsgaWQ6ICcxJywgcHJpY2U6IDE4OSwgYXR0cmlidXRlczogWydhJywgJ2InLCAnYyddLCByaWdodHNNYW5hZ2VkOiAnUmlnaHRzIE1hbmFnZWQnIH0sXG4gICAgICAgICAgICAgICAgeyBpZDogJzInLCBwcmljZTogMTAwLCBhdHRyaWJ1dGVzOiBbJ2EnLCAnYicsICdjJ10sIHJpZ2h0c01hbmFnZWQ6ICdSaWdodHMgTWFuYWdlZCcgfSxcbiAgICAgICAgICAgICAgICB7IGlkOiAnMycsIHByaWNlOiA1OSwgcmlnaHRzTWFuYWdlZDogJ1JveWFsdHkgRnJlZScgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBtb2NrQ2FydFNlcnZpY2UgPSB7XG4gICAgICAgICAgc3RhdGU6IG1vY2tTdGF0ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDYXJ0VGFiQ29tcG9uZW50KFxuICAgICAgICAgIG1vY2tVc2VyQ2FuLCBtb2NrQ2FydFNlcnZpY2UsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrV2luZG93LFxuICAgICAgICAgIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja0RvY3VtZW50LCBtb2NrQXBwU3RvcmUsIG1vY2tDaGFuZ2VEZXRlY3RvclJlZlxuICAgICAgICApO1xuXG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd1VzYWdlV2FybmluZykudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvbk5vdGlmaWNhdGlvbigpJywgKCkgPT4ge1xuICAgICAgaXQoJ2FkZHMgYSBwcm9qZWN0IHdoZW4gbm90aWZpZWQgd2l0aCBBRERfUFJPSkVDVCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0FERF9QUk9KRUNUJyB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLmFkZFByb2plY3QpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVtb3ZlcyBhIHByb2plY3Qgd2hlbiBub3RpZmllZCB3aXRoIFJFTU9WRV9QUk9KRUNUJywgKCkgPT4ge1xuICAgICAgICBsZXQgbW9ja1Byb2plY3QgPSB7fTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1JFTU9WRV9QUk9KRUNUJywgcGF5bG9hZDogbW9ja1Byb2plY3QgfSk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tDYXJ0U2VydmljZS5yZW1vdmVQcm9qZWN0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtb2NrUHJvamVjdCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3VwZGF0ZXMgYSBwcm9qZWN0IHdoZW4gbm90aWZpZWQgd2l0aCBVUERBVEVfUFJPSkVDVCcsICgpID0+IHtcbiAgICAgICAgbGV0IG1vY2tQcm9qZWN0ID0ge307XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdVUERBVEVfUFJPSkVDVCcsIHBheWxvYWQ6IG1vY2tQcm9qZWN0IH0pO1xuXG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdtb3ZlcyBhIGxpbmUgaXRlbSB3aGVuIG5vdGlmaWVkIHdpdGggTU9WRV9MSU5FX0lURU0nLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrUHJvamVjdCA9IHt9O1xuICAgICAgICBsZXQgbW9ja0xpbmVJdGVtID0ge307XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7XG4gICAgICAgICAgdHlwZTogJ01PVkVfTElORV9JVEVNJyxcbiAgICAgICAgICBwYXlsb2FkOiB7IGxpbmVJdGVtOiBtb2NrTGluZUl0ZW0sIG90aGVyUHJvamVjdDogbW9ja1Byb2plY3QgfVxuICAgICAgICB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLm1vdmVMaW5lSXRlbVRvKS50b0hhdmVCZWVuQ2FsbGVkV2l0aChtb2NrUHJvamVjdCwgbW9ja0xpbmVJdGVtKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2xvbmVzIGEgbGluZSBpdGVtIHdoZW4gbm90aWZpZWQgd2l0aCBDTE9ORV9MSU5FX0lURU0nLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrTGluZUl0ZW0gPSB7fTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0NMT05FX0xJTkVfSVRFTScsIHBheWxvYWQ6IG1vY2tMaW5lSXRlbSB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLmNsb25lTGluZUl0ZW0pLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKG1vY2tMaW5lSXRlbSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JlbW92ZXMgYSBsaW5lIGl0ZW0gd2hlbiBub3RpZmllZCB3aXRoIFJFTU9WRV9MSU5FX0lURU0nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNweSA9IG1vY2tBcHBTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdjYXJ0JywgJ3JlbW92ZUFzc2V0Jyk7XG4gICAgICAgIGNvbnN0IG1vY2tMaW5lSXRlbSA9IHsgYXNzZXQ6IHsgaWQ6IDEyMywgdHlwZTogJ2NhcnQnIH0gfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ1JFTU9WRV9MSU5FX0lURU0nLCBwYXlsb2FkOiBtb2NrTGluZUl0ZW0gfSk7XG4gICAgICAgIG1vY2tBcHBTdG9yZS5leHBlY3REaXNwYXRjaEZvcihzcHksIHsgaWQ6IDEyMywgdHlwZTogJ2NhcnQnIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdlZGl0cyBhIGxpbmUgaXRlbSB3aGVuIG5vdGlmaWVkIHdpdGggRURJVF9MSU5FX0lURU0nLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrTGluZUl0ZW0gPSB7fTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdFRElUX0xJTkVfSVRFTScsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgIGxpbmVJdGVtOiBtb2NrTGluZUl0ZW0sIGZpZWxkVG9FZGl0OiB7IHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnMTA4MGknIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLmVkaXRMaW5lSXRlbSkudG9IYXZlQmVlbkNhbGxlZFdpdGgobW9ja0xpbmVJdGVtLCB7IHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnMTA4MGknIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdlZGl0cyB0aGUgYXNzZXRzIGluIGFuZCBvdXQgbWFya2VycyB3aXRoIEVESVRfTElORV9JVEVNX01BUktFUlMnLCAoKSA9PiB7XG4gICAgICAgIGxldCBtb2NrQXNzZXQgPSB7IGFzc2V0SWQ6IDEyMzQgfTtcbiAgICAgICAgbGV0IG1vY2tNZXRob2QgPSBtb2NrQXBwU3RvcmUuY3JlYXRlTGVnYWN5U2VydmljZU1ldGhvZCgnYXNzZXQnLCAnZ2V0Q2xpcFByZXZpZXdEYXRhJywgT2JzZXJ2YWJsZS5vZih7IHVybDogJ2Zha2UgdXJsJyB9KSk7XG5cbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0VESVRfTElORV9JVEVNX01BUktFUlMnLCBwYXlsb2FkOiB7IGFzc2V0OiBtb2NrQXNzZXQgfSB9KTtcblxuICAgICAgICBtb2NrQXBwU3RvcmUuZXhwZWN0Q2FsbEZvcihtb2NrTWV0aG9kLCAxMjM0KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZWRpdHMgdGhlIHByb2plY3QgcHJpY2luZyB3aXRoIEVESVRfUFJPSkVDVF9QUklDSU5HJywgKCkgPT4ge1xuICAgICAgICBsZXQgbW9ja0Fzc2V0ID0geyBhc3NldElkOiAxMjM0IH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnRURJVF9QUk9KRUNUX1BSSUNJTkcnLCBwYXlsb2FkOiB7IGFzc2V0OiBtb2NrQXNzZXQgfSB9KTtcblxuICAgICAgICBtb2NrQXBwU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3Ioc2V0UHJpY2VTcHksIG51bGwpO1xuICAgICAgICBtb2NrQXBwU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IoaW5pdFByaWNpbmdTcHksICdSaWdodHMgTWFuYWdlZCcsIHtcbiAgICAgICAgICBjb21wb25lbnRUeXBlOiBqYXNtaW5lLmFueShGdW5jdGlvbiksXG4gICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICBwcmljaW5nUHJlZmVyZW5jZXM6IHsgc29tZTogJ2F0dHJpYnV0ZScgfSxcbiAgICAgICAgICAgIHVzZXJDYW5DdXN0b21pemVSaWdodHM6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGV2ZW50OiAncHJpY2luZ0V2ZW50JyxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIG9wZW5QcmljaW5nRGlhbG9nIHdpdGggU0hPV19QUklDSU5HX0RJQUxPRycsICgpID0+IHtcbiAgICAgICAgbGV0IG1vY2tMaW5lSXRlbSA9IHsgYXNzZXQ6IHsgYXNzZXRJZDogMTIzNDU2IH0gfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbk5vdGlmaWNhdGlvbih7IHR5cGU6ICdTSE9XX1BSSUNJTkdfRElBTE9HJywgcGF5bG9hZDogbW9ja0xpbmVJdGVtIH0pO1xuXG4gICAgICAgIG1vY2tBcHBTdG9yZS5leHBlY3REaXNwYXRjaEZvcihpbml0UHJpY2luZ1NweSwgJ1JpZ2h0cyBNYW5hZ2VkJywge1xuICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHByaWNpbmdQcmVmZXJlbmNlczogeyBzb21lOiAnYXR0cmlidXRlJyB9LFxuICAgICAgICAgICAgdXNlckNhbkN1c3RvbWl6ZVJpZ2h0czogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZXZlbnQ6ICdwcmljaW5nRXZlbnQnLFxuICAgICAgICAgICAgICBjYWxsYmFjazogamFzbWluZS5hbnkoRnVuY3Rpb24pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnQUREX05PVEUnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdvcGVucyBhIGRpYWxvZyB3aXRoIHRoZSBjb3JyZWN0IGNvbmZpZyBmb3IgYSBsaW5lSXRlbSB0aGF0IGhhcyBhIG5vdGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uTm90aWZpY2F0aW9uKHsgdHlwZTogJ0FERF9OT1RFJywgcGF5bG9hZDogeyBub3RlczogW3sgbm90ZXM6IFsnc29tZSBub3RlJ10gfV0gfSB9KTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBbeyBuYW1lOiAnbm90ZScsIHR5cGU6ICd0ZXh0YXJlYScsIHZhbGlkYXRpb246ICdSRVFVSVJFRCcsIGxhYmVsOiAnUVVPVEUuRURJVF9OT1RFJywgdmFsdWU6ICdzb21lIG5vdGUnIH1dLFxuICAgICAgICAgICAgeyB0aXRsZTogJ1FVT1RFLkVESVRfTk9URScgfSxcbiAgICAgICAgICAgIGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdvcGVucyBhIGRpYWxvZyB3aXRoIHRoZSBjb3JyZWN0IGNvbmZpZyBmb3IgYSBsaW5lSXRlbSB0aGF0IGRvZXNuXFwndCBoYXZlIGEgbm90ZScsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnQUREX05PVEUnLCBwYXlsb2FkOiB7IHNvbWU6ICdsaW5lSXRlbScgfSB9KTtcblxuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgICBbeyBuYW1lOiAnbm90ZScsIHR5cGU6ICd0ZXh0YXJlYScsIHZhbGlkYXRpb246ICdSRVFVSVJFRCcsIGxhYmVsOiAnUVVPVEUuQUREX05PVEUnLCB2YWx1ZTogJycgfV0sXG4gICAgICAgICAgICB7IHRpdGxlOiAnUVVPVEUuQUREX05PVEUnIH0sXG4gICAgICAgICAgICBqYXNtaW5lLmFueShGdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FsbHMgb3BlbkNvbmZpcm1hdGlvbkRpYWxvZyB3aXRoIFJFTU9WRV9OT1RFJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Qub25Ob3RpZmljYXRpb24oeyB0eXBlOiAnUkVNT1ZFX05PVEUnLCBwYXlsb2FkOiB7IHNvbWU6ICdsaW5lSXRlbScgfSB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbmZpcm1hdGlvbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIHRpdGxlOiAnQ0FSVC5ERUxFVEVfTk9URVMuVElUTEUnLFxuICAgICAgICAgIG1lc3NhZ2U6ICdDQVJULkRFTEVURV9OT1RFUy5NRVNTQUdFJyxcbiAgICAgICAgICBhY2NlcHQ6ICdDQVJULkRFTEVURV9OT1RFUy5BQ0NFUFQnLFxuICAgICAgICAgIGRlY2xpbmU6ICdDQVJULkRFTEVURV9OT1RFUy5ERUNMSU5FJ1xuICAgICAgICB9LCBqYXNtaW5lLmFueShGdW5jdGlvbikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2hlY2tvdXQoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZ28gdG8gdGhlIG5leHQgdGFiJywgKCkgPT4ge1xuICAgICAgICBzcHlPbihjb21wb25lbnRVbmRlclRlc3QsICdnb1RvTmV4dFRhYicpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY2hlY2tvdXQoKTtcblxuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmdvVG9OZXh0VGFiKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCByZXRyaWV2ZSB0aGUgcGF5bWVudCBvcHRpb25zJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY2hlY2tvdXQoKTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLmdldFBheW1lbnRPcHRpb25zKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzaG91bGRTaG93TGljZW5zZURldGFpbHNCdG4oKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsIHZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbiBvbiB0aGUgY29tbWVyY2UgY2FwYWJpbGl0aWVzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3Quc2hvdWxkU2hvd0xpY2Vuc2VEZXRhaWxzQnRuKCk7XG5cbiAgICAgICAgZXhwZWN0KG1vY2tVc2VyQ2FuLnZpZXdMaWNlbnNlQWdyZWVtZW50c0J1dHRvbikudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd0xpY2Vuc2VBZ3JlZW1lbnRzKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgcmV0cmlldmVMaWNlbnNlQWdyZWVtZW50cygpIG9uIHRoZSBjYXJ0IHNlcnZpY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93TGljZW5zZUFncmVlbWVudHMoKTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLnJldHJpZXZlTGljZW5zZUFncmVlbWVudHMpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiJdfQ==

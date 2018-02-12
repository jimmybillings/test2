"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var asset_component_1 = require("./asset.component");
var mock_app_store_1 = require("../store/spec-helpers/mock-app.store");
var EnhancedMock = require("../shared/interfaces/enhanced-asset");
var mock_asset_1 = require("../shared/mocks/mock-asset");
function main() {
    describe('Asset Component', function () {
        var mockCapabilities;
        var mockSearchContext;
        var mockUserPreference;
        var mockCartService;
        var mockWindow;
        var mockRouter;
        var mockRoute;
        var mockDialogService;
        var mockEnhancedAsset;
        var mockStore;
        var initPricingSpy;
        var setPriceForDetailsSpy;
        var resetPricingSpy;
        var setAppliedAttributesSpy;
        var componentUnderTest;
        var data;
        beforeEach(function () {
            mockCapabilities = { administerQuotes: function () { return false; } };
            mockUserPreference = {
                openCollectionTray: jasmine.createSpy('openCollectionTray'),
                state: { pricingPreferences: 'thePricingPreferences' },
                updatePricingPreferences: jasmine.createSpy('updatePricingPreferences')
            };
            mockCartService = {
                addAssetToProjectInCart: jasmine.createSpy('addAssetToProjectInCart'),
                state: { data: { projects: [{ lineItems: [{ id: 'abc-123' }] }] } }
            };
            mockWindow = { nativeWindow: { location: { href: {} }, history: { back: jasmine.createSpy('back') } } };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockRoute = { params: Observable_1.Observable.of({ id: '100', uuid: 'abc-123' }), snapshot: { params: { id: '100' } } };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({ data: 'Test data' }))
            };
            mockStore = new mock_app_store_1.MockAppStore();
            initPricingSpy = mockStore.createActionFactoryMethod('pricing', 'initializePricing');
            mockStore.createActionFactoryMethod('pricing', 'calculatePrice');
            setPriceForDetailsSpy = mockStore.createActionFactoryMethod('pricing', 'setPriceForDetails');
            resetPricingSpy = mockStore.createActionFactoryMethod('pricing', 'resetPricing');
            setAppliedAttributesSpy = mockStore.createActionFactoryMethod('pricing', 'setAppliedAttributes');
            mockStore.createStateSection('activeCollection', {
                collection: { some: 'collection' }
            });
            data = {
                id: 1,
                projects: [
                    {
                        lineItems: [
                            { id: 'ABCD', asset: { timeStart: 1000, timeEnd: 2000 } },
                            { id: 'EFGH' }
                        ]
                    },
                    {
                        lineItems: [
                            {
                                id: 'IJKL', asset: {}, attributes: [
                                    { priceAttributeName: 'a', selectedAttributeValue: '1' },
                                    { priceAttributeName: 'b', selectedAttributeValue: '2' },
                                    { priceAttributeName: 'c', selectedAttributeValue: '3' }
                                ]
                            },
                            {
                                id: 'MNOP', asset: {}, attributes: [
                                    { priceAttributeName: 'a', selectedAttributeValue: '1' },
                                    { priceAttributeName: 'b', selectedAttributeValue: '2' },
                                    { priceAttributeName: 'c', selectedAttributeValue: 'NOT 3' }
                                ]
                            },
                            {
                                id: 'QRST', asset: {}, attributes: [
                                    { priceAttributeName: 'a', selectedAttributeValue: '1' },
                                    { priceAttributeName: 'b', selectedAttributeValue: '2' }
                                ]
                            }
                        ]
                    }
                ]
            };
            ['quoteEdit', 'cart', 'quoteShow'].forEach(function (storeType) { return mockStore.createStateSection(storeType, {
                data: data
            }); });
            ['order'].forEach(function (storeType) { return mockStore.createStateSection(storeType, {
                activeOrder: data
            }); });
            componentUnderTest = new asset_component_1.AssetComponent(mockCapabilities, mockWindow, mockRouter, mockRoute, mockStore, mockUserPreference, mockCartService, mockDialogService, null);
        });
        describe('ngOnInit()', function () {
            it('sets up an asset instance variable', function () {
                mockStore.createStateSection('asset', { activeAsset: mock_asset_1.mockAsset });
                var expectedAsset = EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'collection', 100);
                componentUnderTest.assetType = 'collection';
                componentUnderTest.ngOnInit();
                expect(componentUnderTest.asset).toEqual(expectedAsset);
            });
            describe('sets up the commentParentObject', function () {
                it('for a collection asset', function () {
                    componentUnderTest.assetType = 'collection';
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.commentParentObject).toEqual({
                        objectId: 100,
                        objectType: 'collection',
                        nestedObjectId: 'abc-123',
                        nestedObjectType: 'lineItem'
                    });
                });
                it('for a quoteEdit Asset', function () {
                    componentUnderTest.assetType = 'quoteEdit';
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.commentParentObject).toEqual({
                        objectId: 1,
                        objectType: 'quote',
                        nestedObjectId: 'abc-123',
                        nestedObjectType: 'lineItem'
                    });
                });
                it('for a quoteShow Asset', function () {
                    componentUnderTest.assetType = 'quoteShow';
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.commentParentObject).toEqual({
                        objectId: 100,
                        objectType: 'quote',
                        nestedObjectId: 'abc-123',
                        nestedObjectType: 'lineItem'
                    });
                });
                it('for a cart asset', function () {
                    componentUnderTest.assetType = 'cart';
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.commentParentObject).toEqual({
                        objectId: 100,
                        objectType: 'cart',
                        nestedObjectId: 'abc-123',
                        nestedObjectType: 'lineItem'
                    });
                });
            });
            describe('Sets up the pricing correctly', function () {
                beforeEach(function () {
                    mockStore.createStateSection('asset', {
                        activeAsset: {
                            uuid: 'matching-uuid',
                            primary: [{ name: 'Rights.Reproduction', value: 'Rights Managed' }]
                        }, activeAssetType: 'quoteShow'
                    });
                    componentUnderTest.assetType = 'quoteShow';
                });
                it('for a Rights Managed asset with a parent asset that has a price AND rights attributes', function () {
                    mockStore.createStateSection('quoteShow', {
                        data: {
                            id: 1,
                            projects: [{ lineItems: [{ id: 'matching-uuid', attributes: true, price: 10.00 }] }]
                        }
                    });
                    componentUnderTest.ngOnInit();
                    mockStore.expectDispatchFor(setPriceForDetailsSpy, 10.00);
                    mockStore.expectDispatchFor(setAppliedAttributesSpy, true);
                });
                it('for Rights Managed asset with a parent asset that has no price AND no rights attributes', function () {
                    mockStore.createStateSection('quoteShow', {
                        data: {
                            id: 1,
                            projects: [{ lineItems: [{ id: 'matching-uuid' }] }]
                        }
                    });
                    componentUnderTest.ngOnInit();
                    mockStore.expectDispatchFor(resetPricingSpy);
                });
                it('for Rights Managed asset with a parent asset that has a price BUT no rights attributes', function () {
                    mockStore.createStateSection('quoteShow', {
                        data: {
                            id: 1,
                            projects: [{ lineItems: [{ id: 'matching-uuid', price: 10.00 }] }]
                        }
                    });
                    componentUnderTest.ngOnInit();
                    mockStore.expectDispatchFor(resetPricingSpy);
                });
                it('for Rights Managed asset with a parent asset that has no price BUT has rights attributes', function () {
                    mockStore.createStateSection('quoteShow', {
                        data: {
                            id: 1,
                            projects: [{ lineItems: [{ id: 'matching-uuid', attrubtues: true }] }]
                        }
                    });
                    componentUnderTest.ngOnInit();
                    mockStore.expectDispatchFor(resetPricingSpy);
                });
                it('for Rights Managed asset with no parent asset', function () {
                    mockStore.createStateSection('quoteShow', {
                        data: {
                            id: 1,
                            projects: [{ lineItems: [{ id: 'non-matching-uuid', attrubtues: true }] }]
                        }
                    });
                    componentUnderTest.ngOnInit();
                    mockStore.expectDispatchFor(resetPricingSpy);
                });
                it('for a non Rights Managed asset', function () {
                    mockStore.createStateSection('asset', {
                        activeAsset: {
                            uuid: 'matching-uuid',
                            primary: [{ name: 'Rights.Reproduction', value: 'Royalty Free' }]
                        }, activeAssetType: 'quoteShow'
                    });
                    mockStore.createStateSection('quoteShow', {
                        data: {
                            id: 1,
                            projects: [{ lineItems: [{ id: 'non-matching-uuid', attrubtues: true }] }]
                        }
                    });
                    componentUnderTest.ngOnInit();
                    expect(resetPricingSpy).not.toHaveBeenCalled();
                    expect(setPriceForDetailsSpy).not.toHaveBeenCalled();
                    expect(setAppliedAttributesSpy).not.toHaveBeenCalled();
                });
            });
        });
        describe('addAssetToCart()', function () {
            it('calls the cart service with the correct params', function () {
                mockStore.createStateSection('pricing', {
                    appliedAttributes: { some: 'attributes' },
                    priceForDetails: 100
                });
                componentUnderTest.ngOnInit();
                componentUnderTest.addAssetToCart({
                    assetId: 123123,
                    selectedTranscodeTarget: 'Target',
                    markers: { some: 'markers' }
                });
                expect(mockCartService.addAssetToProjectInCart).toHaveBeenCalledWith({
                    lineItem: {
                        selectedTranscodeTarget: 'Target',
                        price: 100,
                        asset: { assetId: 123123 }
                    },
                    markers: { some: 'markers' },
                    attributes: { some: 'attributes' }
                });
            });
        });
        describe('getPricingAttributes', function () {
            it('should dispatch the proper action to the store', function () {
                componentUnderTest.getPricingAttributes('Rights Managed');
                mockStore.expectDispatchFor(initPricingSpy, 'Rights Managed', {
                    componentType: jasmine.any(Function),
                    inputOptions: {
                        pricingPreferences: 'thePricingPreferences',
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
        describe('previousPage()', function () {
            it('should call the back method on the window api', function () {
                componentUnderTest.previousPage();
                expect(mockWindow.nativeWindow.history.back).toHaveBeenCalled();
            });
        });
        describe('assetMatchesCartAsset()', function () {
            ['collection', 'order', 'quoteShow', 'search'].forEach(function (assetType) {
                it("returns true (somewhat pointlessly) for an asset with type '" + assetType + "'", function () {
                    mockStore.createStateSection('asset', { activeAsset: mock_asset_1.mockAsset, activeAssetType: assetType });
                    componentUnderTest.assetType = assetType;
                    componentUnderTest.ngOnInit();
                    expect(componentUnderTest.assetMatchesCartAsset).toBe(true);
                });
            });
            ['cart', 'quoteEdit'].forEach(function (assetType) {
                describe("when asset has type '" + assetType + "'", function () {
                    var localMockAsset;
                    var storeType;
                    beforeEach(function () {
                        var mockAppliedAttributes = { a: '1', b: '2', c: '3' };
                        mockDialogService.openComponentInDialog =
                            jasmine.createSpy('openComponentInDialog').and.callFake(function (parameters) {
                                parameters.outputOptions[0].callback({ type: 'APPLY_PRICE', payload: { attributes: mockAppliedAttributes } }, { close: jasmine.createSpy('close') });
                            });
                        componentUnderTest = new asset_component_1.AssetComponent(mockCapabilities, mockWindow, mockRouter, mockRoute, mockStore, mockUserPreference, mockCartService, mockDialogService, null);
                        componentUnderTest.assetType = assetType;
                    });
                    it('returns true when the asset has no corresponding cart line item', function () {
                        localMockAsset = { uuid: '????' };
                        mockStore.createStateSection('asset', { activeAsset: localMockAsset });
                        componentUnderTest.ngOnInit();
                        expect(componentUnderTest.assetMatchesCartAsset).toBe(true);
                    });
                    it('returns true when the asset\'s corresponding cart line item has no asset', function () {
                        localMockAsset = { uuid: 'EFGH' };
                        mockStore.createStateSection('asset', { activeAsset: localMockAsset });
                        componentUnderTest.ngOnInit();
                        expect(componentUnderTest.assetMatchesCartAsset).toBe(true);
                    });
                });
            });
        });
        describe('onUpdateAssetLineItem()', function () {
            it('dispatches the proper action for a user that can\'t administer quotes', function () {
                mockStore.createActionFactoryMethod('cart', 'editLineItemFromDetails');
                componentUnderTest.asset = EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'cart');
                componentUnderTest.onUpdateAssetLineItem();
                expect(mockStore.dispatch).toHaveBeenCalled();
            });
            it('dispatches the proper action for a user that can administer quotes', function () {
                mockCapabilities = { administerQuotes: function () { return true; } };
                mockStore.createActionFactoryMethod('quoteEdit', 'editLineItemFromDetails');
                componentUnderTest = new asset_component_1.AssetComponent(mockCapabilities, null, null, null, mockStore, null, null, null, null);
                componentUnderTest.asset = EnhancedMock.enhanceAsset(mock_asset_1.mockAsset, 'quoteEdit');
                componentUnderTest.onUpdateAssetLineItem();
                expect(mockStore.dispatch).toHaveBeenCalled();
            });
        });
        describe('onCreateShareDialog()', function () {
            it('Should call the dialog service to open the asset sharing dialog', function () {
                var params = {
                    enhancedAsset: 'some asset',
                    subclipMarkers: 'markers',
                    formFields: ['field1', 'field2']
                };
                componentUnderTest.onCreateShareDialog(params);
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
                    inputOptions: {
                        enhancedAsset: params.enhancedAsset,
                        subclipMarkers: params.subclipMarkers,
                        formFields: params.formFields
                    },
                    outputOptions: [{
                            event: 'closeRequest',
                            callback: jasmine.any(Function),
                            closeOnEvent: true
                        }]
                });
            });
        });
        describe('addToDifferentCollection()', function () {
            it('Should call the dialog service to open the collection list component', function () {
                componentUnderTest.addToDifferentCollection();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
                    inputOptions: {
                        focusedCollection: { some: 'collection' },
                        roleFilter: ['owner', 'editor'],
                        editMode: true
                    },
                    outputOptions: [{
                            event: 'close',
                            callback: jasmine.any(Function),
                            closeOnEvent: true
                        }]
                });
            });
        });
    });
    function mockActiveCollectionAndAsset(id) {
        var currentId = (id) ? id : 8854642;
        var mockAsset = { 'name': 'id', 'value': currentId, 'assetId': currentId };
        var mockCollection = {
            'id': 123,
            'assets': {
                'items': [
                    { 'assetId': 8854642, 'uuid': 'adf3a8d2-8738-4c70-834d-0d7785d7e226' },
                    { 'assetId': 31996532, 'uuid': 'e8e82d76-e85a-4289-8fa6-b730ded0bf16' },
                    { 'assetId': 25015116, 'uuid': '739d6f81-247f-4b24-8121-c656852c05ff' },
                    { 'assetId': 25015124, 'uuid': 'a1ed7a37-da0e-4365-8f54-af8b4a8cdd19' },
                    { 'assetId': 25014612, 'uuid': '03101287-736b-4cc4-89f3-700d958a45b8' }
                ]
            }
        };
        return Object.assign({}, { collection: mockCollection }, { asset: mockAsset });
    }
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvYXNzZXQuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNkM7QUFFN0MscURBQW1EO0FBQ25ELHVFQUFvRTtBQUNwRSxrRUFBb0U7QUFDcEUseURBQXVEO0FBR3ZEO0lBQ0UsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLElBQUksZ0JBQXFCLENBQUM7UUFDMUIsSUFBSSxpQkFBc0IsQ0FBQztRQUMzQixJQUFJLGtCQUF1QixDQUFDO1FBQzVCLElBQUksZUFBb0IsQ0FBQztRQUN6QixJQUFJLFVBQWUsQ0FBQztRQUNwQixJQUFJLFVBQWUsQ0FBQztRQUNwQixJQUFJLFNBQWMsQ0FBQztRQUNuQixJQUFJLGlCQUFzQixDQUFDO1FBQzNCLElBQUksaUJBQTZDLENBQUM7UUFDbEQsSUFBSSxTQUF1QixDQUFDO1FBQzVCLElBQUksY0FBMkIsQ0FBQztRQUNoQyxJQUFJLHFCQUFrQyxDQUFDO1FBQ3ZDLElBQUksZUFBNEIsQ0FBQztRQUNqQyxJQUFJLHVCQUFvQyxDQUFDO1FBQ3pDLElBQUksa0JBQWtDLENBQUM7UUFDdkMsSUFBSSxJQUFTLENBQUM7UUFDZCxVQUFVLENBQUM7WUFDVCxnQkFBZ0IsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxFQUFFLENBQUM7WUFDckQsa0JBQWtCLEdBQUc7Z0JBQ25CLGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7Z0JBQzNELEtBQUssRUFBRSxFQUFFLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFO2dCQUN0RCx3QkFBd0IsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLDBCQUEwQixDQUFDO2FBQ3hFLENBQUM7WUFDRixlQUFlLEdBQUc7Z0JBQ2hCLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7Z0JBQ3JFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxF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LFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDakYsQ0FBQztBQUNILENBQUM7QUFyYkQsb0JBcWJDIiwiZmlsZSI6ImFwcC8rYXNzZXQvYXNzZXQuY29tcG9uZW50LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQXNzZXRDb21wb25lbnQgfSBmcm9tICcuL2Fzc2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2NrQXBwU3RvcmUgfSBmcm9tICcuLi9zdG9yZS9zcGVjLWhlbHBlcnMvbW9jay1hcHAuc3RvcmUnO1xuaW1wb3J0ICogYXMgRW5oYW5jZWRNb2NrIGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IG1vY2tBc3NldCB9IGZyb20gJy4uL3NoYXJlZC9tb2Nrcy9tb2NrLWFzc2V0JztcbmltcG9ydCB7IEZyYW1lIH0gZnJvbSAnLi4vc2hhcmVkL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdBc3NldCBDb21wb25lbnQnLCAoKSA9PiB7XG4gICAgbGV0IG1vY2tDYXBhYmlsaXRpZXM6IGFueTtcbiAgICBsZXQgbW9ja1NlYXJjaENvbnRleHQ6IGFueTtcbiAgICBsZXQgbW9ja1VzZXJQcmVmZXJlbmNlOiBhbnk7XG4gICAgbGV0IG1vY2tDYXJ0U2VydmljZTogYW55O1xuICAgIGxldCBtb2NrV2luZG93OiBhbnk7XG4gICAgbGV0IG1vY2tSb3V0ZXI6IGFueTtcbiAgICBsZXQgbW9ja1JvdXRlOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tFbmhhbmNlZEFzc2V0OiBFbmhhbmNlZE1vY2suRW5oYW5jZWRBc3NldDtcbiAgICBsZXQgbW9ja1N0b3JlOiBNb2NrQXBwU3RvcmU7XG4gICAgbGV0IGluaXRQcmljaW5nU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgc2V0UHJpY2VGb3JEZXRhaWxzU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgcmVzZXRQcmljaW5nU3B5OiBqYXNtaW5lLlNweTtcbiAgICBsZXQgc2V0QXBwbGllZEF0dHJpYnV0ZXNTcHk6IGphc21pbmUuU3B5O1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IEFzc2V0Q29tcG9uZW50O1xuICAgIGxldCBkYXRhOiBhbnk7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiBmYWxzZSB9O1xuICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlID0ge1xuICAgICAgICBvcGVuQ29sbGVjdGlvblRyYXk6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29sbGVjdGlvblRyYXknKSxcbiAgICAgICAgc3RhdGU6IHsgcHJpY2luZ1ByZWZlcmVuY2VzOiAndGhlUHJpY2luZ1ByZWZlcmVuY2VzJyB9LFxuICAgICAgICB1cGRhdGVQcmljaW5nUHJlZmVyZW5jZXM6IGphc21pbmUuY3JlYXRlU3B5KCd1cGRhdGVQcmljaW5nUHJlZmVyZW5jZXMnKVxuICAgICAgfTtcbiAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgYWRkQXNzZXRUb1Byb2plY3RJbkNhcnQ6IGphc21pbmUuY3JlYXRlU3B5KCdhZGRBc3NldFRvUHJvamVjdEluQ2FydCcpLFxuICAgICAgICBzdGF0ZTogeyBkYXRhOiB7IHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IGlkOiAnYWJjLTEyMycgfV0gfV0gfSB9XG4gICAgICB9O1xuICAgICAgbW9ja1dpbmRvdyA9IHsgbmF0aXZlV2luZG93OiB7IGxvY2F0aW9uOiB7IGhyZWY6IHt9IH0sIGhpc3Rvcnk6IHsgYmFjazogamFzbWluZS5jcmVhdGVTcHkoJ2JhY2snKSB9IH0gfTtcbiAgICAgIG1vY2tSb3V0ZXIgPSB7IG5hdmlnYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGUnKSB9O1xuICAgICAgbW9ja1JvdXRlID0geyBwYXJhbXM6IE9ic2VydmFibGUub2YoeyBpZDogJzEwMCcsIHV1aWQ6ICdhYmMtMTIzJyB9KSwgc25hcHNob3Q6IHsgcGFyYW1zOiB7IGlkOiAnMTAwJyB9IH0gfTtcbiAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlID0ge1xuICAgICAgICBvcGVuQ29tcG9uZW50SW5EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29tcG9uZW50SW5EaWFsb2cnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7IGRhdGE6ICdUZXN0IGRhdGEnIH0pKVxuICAgICAgfTtcblxuICAgICAgbW9ja1N0b3JlID0gbmV3IE1vY2tBcHBTdG9yZSgpO1xuICAgICAgaW5pdFByaWNpbmdTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgncHJpY2luZycsICdpbml0aWFsaXplUHJpY2luZycpO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3ByaWNpbmcnLCAnY2FsY3VsYXRlUHJpY2UnKTtcbiAgICAgIHNldFByaWNlRm9yRGV0YWlsc1NweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdwcmljaW5nJywgJ3NldFByaWNlRm9yRGV0YWlscycpO1xuICAgICAgcmVzZXRQcmljaW5nU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3ByaWNpbmcnLCAncmVzZXRQcmljaW5nJyk7XG4gICAgICBzZXRBcHBsaWVkQXR0cmlidXRlc1NweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdwcmljaW5nJywgJ3NldEFwcGxpZWRBdHRyaWJ1dGVzJyk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdhY3RpdmVDb2xsZWN0aW9uJywge1xuICAgICAgICBjb2xsZWN0aW9uOiB7IHNvbWU6ICdjb2xsZWN0aW9uJyB9XG4gICAgICB9KTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIGlkOiAxLFxuICAgICAgICBwcm9qZWN0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVJdGVtczogW1xuICAgICAgICAgICAgICB7IGlkOiAnQUJDRCcsIGFzc2V0OiB7IHRpbWVTdGFydDogMTAwMCwgdGltZUVuZDogMjAwMCB9IH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdFRkdIJyB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsaW5lSXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAnSUpLTCcsIGFzc2V0OiB7fSwgYXR0cmlidXRlczogW1xuICAgICAgICAgICAgICAgICAgeyBwcmljZUF0dHJpYnV0ZU5hbWU6ICdhJywgc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZTogJzEnIH0sXG4gICAgICAgICAgICAgICAgICB7IHByaWNlQXR0cmlidXRlTmFtZTogJ2InLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAnMicgfSxcbiAgICAgICAgICAgICAgICAgIHsgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYycsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICczJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdNTk9QJywgYXNzZXQ6IHt9LCBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICAgICB7IHByaWNlQXR0cmlidXRlTmFtZTogJ2EnLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAnMScgfSxcbiAgICAgICAgICAgICAgICAgIHsgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYicsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICcyJyB9LFxuICAgICAgICAgICAgICAgICAgeyBwcmljZUF0dHJpYnV0ZU5hbWU6ICdjJywgc2VsZWN0ZWRBdHRyaWJ1dGVWYWx1ZTogJ05PVCAzJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6ICdRUlNUJywgYXNzZXQ6IHt9LCBhdHRyaWJ1dGVzOiBbXG4gICAgICAgICAgICAgICAgICB7IHByaWNlQXR0cmlidXRlTmFtZTogJ2EnLCBzZWxlY3RlZEF0dHJpYnV0ZVZhbHVlOiAnMScgfSxcbiAgICAgICAgICAgICAgICAgIHsgcHJpY2VBdHRyaWJ1dGVOYW1lOiAnYicsIHNlbGVjdGVkQXR0cmlidXRlVmFsdWU6ICcyJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9O1xuICAgICAgWydxdW90ZUVkaXQnLCAnY2FydCcsICdxdW90ZVNob3cnXS5mb3JFYWNoKChzdG9yZVR5cGUpID0+IG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oc3RvcmVUeXBlLCB7XG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pKTtcbiAgICAgIFsnb3JkZXInXS5mb3JFYWNoKChzdG9yZVR5cGUpID0+IG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oc3RvcmVUeXBlLCB7XG4gICAgICAgIGFjdGl2ZU9yZGVyOiBkYXRhXG4gICAgICB9KSk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBBc3NldENvbXBvbmVudChcbiAgICAgICAgbW9ja0NhcGFiaWxpdGllcywgbW9ja1dpbmRvdywgbW9ja1JvdXRlciwgbW9ja1JvdXRlLCBtb2NrU3RvcmUsIG1vY2tVc2VyUHJlZmVyZW5jZSwgbW9ja0NhcnRTZXJ2aWNlLCBtb2NrRGlhbG9nU2VydmljZSwgbnVsbFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCduZ09uSW5pdCgpJywgKCkgPT4ge1xuXG4gICAgICBpdCgnc2V0cyB1cCBhbiBhc3NldCBpbnN0YW5jZSB2YXJpYWJsZScsICgpID0+IHtcbiAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGFjdGl2ZUFzc2V0OiBtb2NrQXNzZXQgfSk7XG4gICAgICAgIGxldCBleHBlY3RlZEFzc2V0OiBFbmhhbmNlZE1vY2suRW5oYW5jZWRBc3NldCA9IEVuaGFuY2VkTW9jay5lbmhhbmNlQXNzZXQobW9ja0Fzc2V0LCAnY29sbGVjdGlvbicsIDEwMCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnY29sbGVjdGlvbic7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0KS50b0VxdWFsKGV4cGVjdGVkQXNzZXQpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdzZXRzIHVwIHRoZSBjb21tZW50UGFyZW50T2JqZWN0JywgKCkgPT4ge1xuICAgICAgICBpdCgnZm9yIGEgY29sbGVjdGlvbiBhc3NldCcsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXRUeXBlID0gJ2NvbGxlY3Rpb24nO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuXG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50UGFyZW50T2JqZWN0KS50b0VxdWFsKHtcbiAgICAgICAgICAgIG9iamVjdElkOiAxMDAsXG4gICAgICAgICAgICBvYmplY3RUeXBlOiAnY29sbGVjdGlvbicsXG4gICAgICAgICAgICBuZXN0ZWRPYmplY3RJZDogJ2FiYy0xMjMnLFxuICAgICAgICAgICAgbmVzdGVkT2JqZWN0VHlwZTogJ2xpbmVJdGVtJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgcXVvdGVFZGl0IEFzc2V0JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAncXVvdGVFZGl0JztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29tbWVudFBhcmVudE9iamVjdCkudG9FcXVhbCh7XG4gICAgICAgICAgICBvYmplY3RJZDogMSxcbiAgICAgICAgICAgIG9iamVjdFR5cGU6ICdxdW90ZScsXG4gICAgICAgICAgICBuZXN0ZWRPYmplY3RJZDogJ2FiYy0xMjMnLFxuICAgICAgICAgICAgbmVzdGVkT2JqZWN0VHlwZTogJ2xpbmVJdGVtJ1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIGEgcXVvdGVTaG93IEFzc2V0JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAncXVvdGVTaG93JztcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29tbWVudFBhcmVudE9iamVjdCkudG9FcXVhbCh7XG4gICAgICAgICAgICBvYmplY3RJZDogMTAwLFxuICAgICAgICAgICAgb2JqZWN0VHlwZTogJ3F1b3RlJyxcbiAgICAgICAgICAgIG5lc3RlZE9iamVjdElkOiAnYWJjLTEyMycsXG4gICAgICAgICAgICBuZXN0ZWRPYmplY3RUeXBlOiAnbGluZUl0ZW0nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3IgYSBjYXJ0IGFzc2V0JywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAnY2FydCc7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbW1lbnRQYXJlbnRPYmplY3QpLnRvRXF1YWwoe1xuICAgICAgICAgICAgb2JqZWN0SWQ6IDEwMCxcbiAgICAgICAgICAgIG9iamVjdFR5cGU6ICdjYXJ0JyxcbiAgICAgICAgICAgIG5lc3RlZE9iamVjdElkOiAnYWJjLTEyMycsXG4gICAgICAgICAgICBuZXN0ZWRPYmplY3RUeXBlOiAnbGluZUl0ZW0nXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdTZXRzIHVwIHRoZSBwcmljaW5nIGNvcnJlY3RseScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhY3RpdmVBc3NldDoge1xuICAgICAgICAgICAgICAgIHV1aWQ6ICdtYXRjaGluZy11dWlkJyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiBbeyBuYW1lOiAnUmlnaHRzLlJlcHJvZHVjdGlvbicsIHZhbHVlOiAnUmlnaHRzIE1hbmFnZWQnIH1dXG4gICAgICAgICAgICAgIH0sIGFjdGl2ZUFzc2V0VHlwZTogJ3F1b3RlU2hvdydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSAncXVvdGVTaG93JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBhIFJpZ2h0cyBNYW5hZ2VkIGFzc2V0IHdpdGggYSBwYXJlbnQgYXNzZXQgdGhhdCBoYXMgYSBwcmljZSBBTkQgcmlnaHRzIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG5cbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBpZDogJ21hdGNoaW5nLXV1aWQnLCBhdHRyaWJ1dGVzOiB0cnVlLCBwcmljZTogMTAuMDAgfV0gfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3Ioc2V0UHJpY2VGb3JEZXRhaWxzU3B5LCAxMC4wMCk7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHNldEFwcGxpZWRBdHRyaWJ1dGVzU3B5LCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBSaWdodHMgTWFuYWdlZCBhc3NldCB3aXRoIGEgcGFyZW50IGFzc2V0IHRoYXQgaGFzIG5vIHByaWNlIEFORCBubyByaWdodHMgYXR0cmlidXRlcycsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBpZDogJ21hdGNoaW5nLXV1aWQnIH1dIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHJlc2V0UHJpY2luZ1NweSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3IgUmlnaHRzIE1hbmFnZWQgYXNzZXQgd2l0aCBhIHBhcmVudCBhc3NldCB0aGF0IGhhcyBhIHByaWNlIEJVVCBubyByaWdodHMgYXR0cmlidXRlcycsICgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBpZDogJ21hdGNoaW5nLXV1aWQnLCBwcmljZTogMTAuMDAgfV0gfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgICBtb2NrU3RvcmUuZXhwZWN0RGlzcGF0Y2hGb3IocmVzZXRQcmljaW5nU3B5KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2ZvciBSaWdodHMgTWFuYWdlZCBhc3NldCB3aXRoIGEgcGFyZW50IGFzc2V0IHRoYXQgaGFzIG5vIHByaWNlIEJVVCBoYXMgcmlnaHRzIGF0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigncXVvdGVTaG93Jywge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgcHJvamVjdHM6IFt7IGxpbmVJdGVtczogW3sgaWQ6ICdtYXRjaGluZy11dWlkJywgYXR0cnVidHVlczogdHJ1ZSB9XSB9XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihyZXNldFByaWNpbmdTcHkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZm9yIFJpZ2h0cyBNYW5hZ2VkIGFzc2V0IHdpdGggbm8gcGFyZW50IGFzc2V0JywgKCkgPT4ge1xuICAgICAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ3F1b3RlU2hvdycsIHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgIHByb2plY3RzOiBbeyBsaW5lSXRlbXM6IFt7IGlkOiAnbm9uLW1hdGNoaW5nLXV1aWQnLCBhdHRydWJ0dWVzOiB0cnVlIH1dIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHJlc2V0UHJpY2luZ1NweSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdmb3IgYSBub24gUmlnaHRzIE1hbmFnZWQgYXNzZXQnLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBhY3RpdmVBc3NldDoge1xuICAgICAgICAgICAgICAgIHV1aWQ6ICdtYXRjaGluZy11dWlkJyxcbiAgICAgICAgICAgICAgICBwcmltYXJ5OiBbeyBuYW1lOiAnUmlnaHRzLlJlcHJvZHVjdGlvbicsIHZhbHVlOiAnUm95YWx0eSBGcmVlJyB9XVxuICAgICAgICAgICAgICB9LCBhY3RpdmVBc3NldFR5cGU6ICdxdW90ZVNob3cnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdxdW90ZVNob3cnLCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICBwcm9qZWN0czogW3sgbGluZUl0ZW1zOiBbeyBpZDogJ25vbi1tYXRjaGluZy11dWlkJywgYXR0cnVidHVlczogdHJ1ZSB9XSB9XVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICAgIGV4cGVjdChyZXNldFByaWNpbmdTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgICAgZXhwZWN0KHNldFByaWNlRm9yRGV0YWlsc1NweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgICBleHBlY3Qoc2V0QXBwbGllZEF0dHJpYnV0ZXNTcHkpLm5vdC50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQXNzZXRUb0NhcnQoKScsICgpID0+IHtcbiAgICAgIGl0KCdjYWxscyB0aGUgY2FydCBzZXJ2aWNlIHdpdGggdGhlIGNvcnJlY3QgcGFyYW1zJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKFxuICAgICAgICAgICdwcmljaW5nJywge1xuICAgICAgICAgICAgYXBwbGllZEF0dHJpYnV0ZXM6IHsgc29tZTogJ2F0dHJpYnV0ZXMnIH0sXG4gICAgICAgICAgICBwcmljZUZvckRldGFpbHM6IDEwMFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWRkQXNzZXRUb0NhcnQoe1xuICAgICAgICAgIGFzc2V0SWQ6IDEyMzEyMyxcbiAgICAgICAgICBzZWxlY3RlZFRyYW5zY29kZVRhcmdldDogJ1RhcmdldCcsXG4gICAgICAgICAgbWFya2VyczogeyBzb21lOiAnbWFya2VycycgfVxuICAgICAgICB9KTtcblxuICAgICAgICBleHBlY3QobW9ja0NhcnRTZXJ2aWNlLmFkZEFzc2V0VG9Qcm9qZWN0SW5DYXJ0KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgbGluZUl0ZW06IHtcbiAgICAgICAgICAgIHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiAnVGFyZ2V0JyxcbiAgICAgICAgICAgIHByaWNlOiAxMDAsXG4gICAgICAgICAgICBhc3NldDogeyBhc3NldElkOiAxMjMxMjMgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWFya2VyczogeyBzb21lOiAnbWFya2VycycgfSxcbiAgICAgICAgICBhdHRyaWJ1dGVzOiB7IHNvbWU6ICdhdHRyaWJ1dGVzJyB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZ2V0UHJpY2luZ0F0dHJpYnV0ZXMnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGRpc3BhdGNoIHRoZSBwcm9wZXIgYWN0aW9uIHRvIHRoZSBzdG9yZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmdldFByaWNpbmdBdHRyaWJ1dGVzKCdSaWdodHMgTWFuYWdlZCcpO1xuXG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3REaXNwYXRjaEZvcihcbiAgICAgICAgICBpbml0UHJpY2luZ1NweSxcbiAgICAgICAgICAnUmlnaHRzIE1hbmFnZWQnLCB7XG4gICAgICAgICAgICBjb21wb25lbnRUeXBlOiBqYXNtaW5lLmFueShGdW5jdGlvbiksXG4gICAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgcHJpY2luZ1ByZWZlcmVuY2VzOiAndGhlUHJpY2luZ1ByZWZlcmVuY2VzJyxcbiAgICAgICAgICAgICAgdXNlckNhbkN1c3RvbWl6ZVJpZ2h0czogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRwdXRPcHRpb25zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBldmVudDogJ3ByaWNpbmdFdmVudCcsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncHJldmlvdXNQYWdlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGNhbGwgdGhlIGJhY2sgbWV0aG9kIG9uIHRoZSB3aW5kb3cgYXBpJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QucHJldmlvdXNQYWdlKCk7XG4gICAgICAgIGV4cGVjdChtb2NrV2luZG93Lm5hdGl2ZVdpbmRvdy5oaXN0b3J5LmJhY2spLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2Fzc2V0TWF0Y2hlc0NhcnRBc3NldCgpJywgKCkgPT4ge1xuICAgICAgWydjb2xsZWN0aW9uJywgJ29yZGVyJywgJ3F1b3RlU2hvdycsICdzZWFyY2gnXS5mb3JFYWNoKChhc3NldFR5cGU6IEVuaGFuY2VkTW9jay5Bc3NldFR5cGUpID0+IHtcbiAgICAgICAgaXQoYHJldHVybnMgdHJ1ZSAoc29tZXdoYXQgcG9pbnRsZXNzbHkpIGZvciBhbiBhc3NldCB3aXRoIHR5cGUgJyR7YXNzZXRUeXBlfSdgLCAoKSA9PiB7XG4gICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGFjdGl2ZUFzc2V0OiBtb2NrQXNzZXQsIGFjdGl2ZUFzc2V0VHlwZTogYXNzZXRUeXBlIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSBhc3NldFR5cGU7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG5cbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0TWF0Y2hlc0NhcnRBc3NldCkudG9CZSh0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgWydjYXJ0JywgJ3F1b3RlRWRpdCddLmZvckVhY2goKGFzc2V0VHlwZTogRW5oYW5jZWRNb2NrLkFzc2V0VHlwZSkgPT4ge1xuICAgICAgICBkZXNjcmliZShgd2hlbiBhc3NldCBoYXMgdHlwZSAnJHthc3NldFR5cGV9J2AsICgpID0+IHtcbiAgICAgICAgICBsZXQgbG9jYWxNb2NrQXNzZXQ6IGFueTtcbiAgICAgICAgICBsZXQgc3RvcmVUeXBlOiBzdHJpbmc7XG4gICAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb2NrQXBwbGllZEF0dHJpYnV0ZXMgPSB7IGE6ICcxJywgYjogJzInLCBjOiAnMycgfTtcbiAgICAgICAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyA9XG4gICAgICAgICAgICAgIGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29tcG9uZW50SW5EaWFsb2cnKS5hbmQuY2FsbEZha2UoKHBhcmFtZXRlcnM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMub3V0cHV0T3B0aW9uc1swXS5jYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ0FQUExZX1BSSUNFJywgcGF5bG9hZDogeyBhdHRyaWJ1dGVzOiBtb2NrQXBwbGllZEF0dHJpYnV0ZXMgfSB9LFxuICAgICAgICAgICAgICAgICAgeyBjbG9zZTogamFzbWluZS5jcmVhdGVTcHkoJ2Nsb3NlJykgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQXNzZXRDb21wb25lbnQoXG4gICAgICAgICAgICAgIG1vY2tDYXBhYmlsaXRpZXMsIG1vY2tXaW5kb3csIG1vY2tSb3V0ZXIsIG1vY2tSb3V0ZSwgbW9ja1N0b3JlLCBtb2NrVXNlclByZWZlcmVuY2UsIG1vY2tDYXJ0U2VydmljZSwgbW9ja0RpYWxvZ1NlcnZpY2UsIG51bGxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hc3NldFR5cGUgPSBhc3NldFR5cGU7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpdCgncmV0dXJucyB0cnVlIHdoZW4gdGhlIGFzc2V0IGhhcyBubyBjb3JyZXNwb25kaW5nIGNhcnQgbGluZSBpdGVtJywgKCkgPT4ge1xuICAgICAgICAgICAgbG9jYWxNb2NrQXNzZXQgPSB7IHV1aWQ6ICc/Pz8/JyB9O1xuICAgICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGFjdGl2ZUFzc2V0OiBsb2NhbE1vY2tBc3NldCB9KTtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0TWF0Y2hlc0NhcnRBc3NldCkudG9CZSh0cnVlKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGl0KCdyZXR1cm5zIHRydWUgd2hlbiB0aGUgYXNzZXRcXCdzIGNvcnJlc3BvbmRpbmcgY2FydCBsaW5lIGl0ZW0gaGFzIG5vIGFzc2V0JywgKCkgPT4ge1xuICAgICAgICAgICAgbG9jYWxNb2NrQXNzZXQgPSB7IHV1aWQ6ICdFRkdIJyB9O1xuICAgICAgICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYXNzZXQnLCB7IGFjdGl2ZUFzc2V0OiBsb2NhbE1vY2tBc3NldCB9KTtcbiAgICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuXG4gICAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0TWF0Y2hlc0NhcnRBc3NldCkudG9CZSh0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdvblVwZGF0ZUFzc2V0TGluZUl0ZW0oKScsICgpID0+IHtcbiAgICAgIGl0KCdkaXNwYXRjaGVzIHRoZSBwcm9wZXIgYWN0aW9uIGZvciBhIHVzZXIgdGhhdCBjYW5cXCd0IGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnY2FydCcsICdlZGl0TGluZUl0ZW1Gcm9tRGV0YWlscycpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYXNzZXQgPSBFbmhhbmNlZE1vY2suZW5oYW5jZUFzc2V0KG1vY2tBc3NldCwgJ2NhcnQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uVXBkYXRlQXNzZXRMaW5lSXRlbSgpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrU3RvcmUuZGlzcGF0Y2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyB0aGUgcHJvcGVyIGFjdGlvbiBmb3IgYSB1c2VyIHRoYXQgY2FuIGFkbWluaXN0ZXIgcXVvdGVzJywgKCkgPT4ge1xuICAgICAgICBtb2NrQ2FwYWJpbGl0aWVzID0geyBhZG1pbmlzdGVyUXVvdGVzOiAoKSA9PiB0cnVlIH07XG4gICAgICAgIG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdxdW90ZUVkaXQnLCAnZWRpdExpbmVJdGVtRnJvbURldGFpbHMnKTtcblxuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QgPSBuZXcgQXNzZXRDb21wb25lbnQobW9ja0NhcGFiaWxpdGllcywgbnVsbCwgbnVsbCwgbnVsbCwgbW9ja1N0b3JlLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFzc2V0ID0gRW5oYW5jZWRNb2NrLmVuaGFuY2VBc3NldChtb2NrQXNzZXQsICdxdW90ZUVkaXQnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uVXBkYXRlQXNzZXRMaW5lSXRlbSgpO1xuXG4gICAgICAgIGV4cGVjdChtb2NrU3RvcmUuZGlzcGF0Y2gpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ3JlYXRlU2hhcmVEaWFsb2coKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiB0aGUgYXNzZXQgc2hhcmluZyBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgZW5oYW5jZWRBc3NldDogJ3NvbWUgYXNzZXQnLFxuICAgICAgICAgIHN1YmNsaXBNYXJrZXJzOiAnbWFya2VycycsXG4gICAgICAgICAgZm9ybUZpZWxkczogWydmaWVsZDEnLCAnZmllbGQyJ11cbiAgICAgICAgfTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm9uQ3JlYXRlU2hhcmVEaWFsb2cocGFyYW1zIGFzIGFueSk7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHtcbiAgICAgICAgICBjb21wb25lbnRUeXBlOiBqYXNtaW5lLmFueShGdW5jdGlvbiksXG4gICAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzMlJyB9LCBwYW5lbENsYXNzOiAnd3otc2hhcmUtZGlhbG9nJyB9LFxuICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgZW5oYW5jZWRBc3NldDogcGFyYW1zLmVuaGFuY2VkQXNzZXQsXG4gICAgICAgICAgICBzdWJjbGlwTWFya2VyczogcGFyYW1zLnN1YmNsaXBNYXJrZXJzLFxuICAgICAgICAgICAgZm9ybUZpZWxkczogcGFyYW1zLmZvcm1GaWVsZHNcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgICAgICBldmVudDogJ2Nsb3NlUmVxdWVzdCcsXG4gICAgICAgICAgICBjYWxsYmFjazogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRUb0RpZmZlcmVudENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiB0aGUgY29sbGVjdGlvbiBsaXN0IGNvbXBvbmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZFRvRGlmZmVyZW50Q29sbGVjdGlvbigpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICczJScgfSwgcGFuZWxDbGFzczogJ2NvbGxlY3Rpb24tbGlzdC1kZC1jb21wb25lbnQnIH0sXG4gICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICBmb2N1c2VkQ29sbGVjdGlvbjogeyBzb21lOiAnY29sbGVjdGlvbicgfSxcbiAgICAgICAgICAgIHJvbGVGaWx0ZXI6IFsnb3duZXInLCAnZWRpdG9yJ10sXG4gICAgICAgICAgICBlZGl0TW9kZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3V0cHV0T3B0aW9uczogW3tcbiAgICAgICAgICAgIGV2ZW50OiAnY2xvc2UnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIG1vY2tBY3RpdmVDb2xsZWN0aW9uQW5kQXNzZXQoaWQ/OiBudW1iZXIpIHtcbiAgICBsZXQgY3VycmVudElkID0gKGlkKSA/IGlkIDogODg1NDY0MjtcbiAgICBsZXQgbW9ja0Fzc2V0ID0geyAnbmFtZSc6ICdpZCcsICd2YWx1ZSc6IGN1cnJlbnRJZCwgJ2Fzc2V0SWQnOiBjdXJyZW50SWQgfTtcbiAgICBsZXQgbW9ja0NvbGxlY3Rpb24gPSB7XG4gICAgICAnaWQnOiAxMjMsXG4gICAgICAnYXNzZXRzJzoge1xuICAgICAgICAnaXRlbXMnOiBbXG4gICAgICAgICAgeyAnYXNzZXRJZCc6IDg4NTQ2NDIsICd1dWlkJzogJ2FkZjNhOGQyLTg3MzgtNGM3MC04MzRkLTBkNzc4NWQ3ZTIyNicgfSxcbiAgICAgICAgICB7ICdhc3NldElkJzogMzE5OTY1MzIsICd1dWlkJzogJ2U4ZTgyZDc2LWU4NWEtNDI4OS04ZmE2LWI3MzBkZWQwYmYxNicgfSxcbiAgICAgICAgICB7ICdhc3NldElkJzogMjUwMTUxMTYsICd1dWlkJzogJzczOWQ2ZjgxLTI0N2YtNGIyNC04MTIxLWM2NTY4NTJjMDVmZicgfSxcbiAgICAgICAgICB7ICdhc3NldElkJzogMjUwMTUxMjQsICd1dWlkJzogJ2ExZWQ3YTM3LWRhMGUtNDM2NS04ZjU0LWFmOGI0YThjZGQxOScgfSxcbiAgICAgICAgICB7ICdhc3NldElkJzogMjUwMTQ2MTIsICd1dWlkJzogJzAzMTAxMjg3LTczNmItNGNjNC04OWYzLTcwMGQ5NThhNDViOCcgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgeyBjb2xsZWN0aW9uOiBtb2NrQ29sbGVjdGlvbiB9LCB7IGFzc2V0OiBtb2NrQXNzZXQgfSk7XG4gIH1cbn1cbiJdfQ==

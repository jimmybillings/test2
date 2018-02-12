"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var collection_show_component_1 = require("./collection-show.component");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
var index_1 = require("../../shared/modules/wazee-frame-formatter/index");
function main() {
    describe('Collection Show Component', function () {
        var componentUnderTest;
        var mockStore;
        var mockWindow;
        var mockCapabilitiesService;
        var mockChangeDetectorRef;
        var mockRoute;
        var getCountsSpy;
        var mockCollectionsService;
        var mockDialogService;
        var mockRouter;
        var handleCustomErrorSpy;
        var snackBarDisplaySpy;
        var canAdministerQuotes = true;
        var mockCartService;
        var mockDocumentService;
        var mockUserPreferenceService;
        var showConfirmationDialogDispatchSpy;
        beforeEach(function () {
            mockWindow = { nativeWindow: { location: { href: {} }, innerWidth: 200 } };
            mockRouter = { navigate: jasmine.createSpy('navigate') };
            mockCapabilitiesService = {
                editCollection: jasmine.createSpy('editCollection').and.returnValue(Observable_1.Observable.of(true)),
                administerQuotes: function () { return canAdministerQuotes; }
            };
            mockChangeDetectorRef = { markForCheck: jasmine.createSpy('markForCheck') };
            mockCollectionsService = {
                getByIdAndDuplicate: jasmine.createSpy('getByIdAndDuplicate').and.returnValue(Observable_1.Observable.of({
                    collection: {
                        id: 123, assets: {
                            items: [
                                { id: 123, uuid: 'slkdjf-lskdjf', timeStart: 123, timeEnd: 456 },
                                { id: 456, uuid: 'woieur-owisld', timeStart: -1, timeEnd: -2 }
                            ]
                        }
                    }
                })),
                delete: jasmine.createSpy('delete').and.returnValue(Observable_1.Observable.of({}))
            };
            mockRoute = { params: Observable_1.Observable.of({ id: 1, some: 'params' }) };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable_1.Observable.of({}))
            };
            mockCartService = {
                addAssetToProjectInCart: jasmine.createSpy('addAssetToProjectInCart')
            };
            mockDocumentService = {
                body: { classList: { add: jasmine.createSpy('add'), remove: jasmine.createSpy('remove') } }
            };
            mockUserPreferenceService = {
                updateAssetViewPreference: jasmine.createSpy('updateAssetViewPreference')
            };
            mockStore = new mock_app_store_1.MockAppStore();
            showConfirmationDialogDispatchSpy = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');
            mockStore.createStateSection('activeCollection', {
                collection: {
                    name: 'test collection',
                    id: 123, assets: {
                        items: [
                            {
                                assetId: 123,
                                uuid: 'ABCD',
                                other: 'stuff',
                                timeStart: 1000,
                                timeEnd: 2000,
                                metadata: [{ name: 'Format.FrameRate', value: '30 fps' }]
                            },
                            { assetId: 456, uuid: 'EFFH', other: 'stuff', timeStart: -1, timeEnd: -2 }
                        ]
                    }
                }, loaded: true
            });
            mockStore.createStateSection('uiConfig', {
                components: {
                    collectionComment: { config: { form: { items: [{ some: 'commentConfig' }] } } },
                    collection: { config: { some: 'collectionConfig' } }
                }
            });
            mockStore.createStateSection('comment', { collection: { pagination: { totalCount: 3 } } });
            getCountsSpy = mockStore.createActionFactoryMethod('comment', 'getCounts');
            handleCustomErrorSpy = mockStore.createActionFactoryMethod('error', 'handleCustomError');
            snackBarDisplaySpy = mockStore.createActionFactoryMethod('snackbar', 'display');
            componentUnderTest = new collection_show_component_1.CollectionShowComponent(mockCapabilitiesService, mockRouter, mockCollectionsService, mockCartService, mockUserPreferenceService, mockRoute, mockWindow, mockDialogService, mockDocumentService, mockStore, mockChangeDetectorRef);
        });
        describe('ngOnInit()', function () {
            describe('with a valid active collection', function () {
                beforeEach(function () {
                    componentUnderTest.ngOnInit();
                });
                it('calls getCounts on the comment action factory', function () {
                    expect(getCountsSpy).toHaveBeenCalled();
                });
                it('sets up the commentParentObject instance variable', function () {
                    expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'collection', objectId: 123 });
                });
                it('sets up the config instance vars', function () {
                    expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'commentConfig' }]);
                    expect(componentUnderTest.newCollectionFormConfig).toEqual({ some: 'collectionConfig' });
                });
            });
            describe('with an invalid active collection (without an id)', function () {
                beforeEach(function () {
                    mockStore.createStateElement('activeCollection', 'collection', { id: null });
                    componentUnderTest.ngOnInit();
                });
                it('does not call getCounts on the comment action factory', function () {
                    expect(getCountsSpy).not.toHaveBeenCalled();
                });
                it('does not set up the commentParentObject instance variabl', function () {
                    expect(componentUnderTest.commentParentObject).toBeUndefined();
                });
            });
        });
        describe('get userCanEditCollection()', function () {
            it('should call editCollection() on the cababilities service', function () {
                componentUnderTest.ngOnInit();
                var result = componentUnderTest.userCanEditCollection;
                result.take(1).subscribe(function (res) { return expect(res).toEqual(true); });
            });
        });
        describe('toggleCommentsVisibility()', function () {
            it('should toggle the showComments flag', function () {
                componentUnderTest.showComments = false;
                componentUnderTest.toggleCommentsVisibility();
                expect(componentUnderTest.showComments).toBe(true);
                componentUnderTest.toggleCommentsVisibility();
                expect(componentUnderTest.showComments).toBe(false);
            });
        });
        describe('commentCounts getter', function () {
            it('selects the right part of the store', function () {
                var count;
                componentUnderTest.commentCount.subscribe(function (c) { return count = c; });
                expect(count).toBe(3);
            });
        });
        describe('editCollection()', function () {
            it('Should call the dialog service to open the edit collection form in a dialog', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.editCollection();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
            });
        });
        describe('duplicateCollection()', function () {
            beforeEach(function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.duplicateCollection();
            });
            it('Should call the collection end point with the correct ID', function () {
                expect(mockCollectionsService.getByIdAndDuplicate).toHaveBeenCalledWith(123);
            });
            it('Should call the dialog service to open the duplicate collection form in a dialog', function () {
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
            });
        });
        describe('changePage()', function () {
            it('Should navigate to the correct page', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.changePage(3);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections/123', { some: 'params', i: 3 }]);
            });
        });
        describe('setCollectionForDelete()', function () {
            it('Should open the dialog to confirm delete of collection', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.setCollectionForDelete();
                mockStore.expectDispatchFor(showConfirmationDialogDispatchSpy, {
                    title: { key: 'COLLECTION.INDEX.CONFIRMATION_TITLE', values: { collectionName: 'test collection' } },
                    message: { key: 'COLLECTION.INDEX.CONFIRMATION_SUBTITLE', values: { collectionName: 'test collection' } },
                    decline: 'COLLECTION.INDEX.CONFIRMATION_CANCEL_BTN_TITLE',
                    accept: 'COLLECTION.INDEX.CONFIRMATION_DELETE_BTN_TITLE'
                }, jasmine.any(Function));
            });
        });
        describe('deleteCollection()', function () {
            it('Should navigate to the collections url', function () {
                componentUnderTest.deleteCollection(1);
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections']);
            });
            it('Should call the api with the correct collection id paramter to delete', function () {
                componentUnderTest.deleteCollection(1);
                expect(mockCollectionsService.delete).toHaveBeenCalledWith(1);
            });
            it('Should display a success toast when a collection has been succesfully completed', function () {
                componentUnderTest.deleteCollection(1);
                expect(snackBarDisplaySpy).toHaveBeenCalledWith('COLLECTION.INDEX.DELETE_SUCCESS_TOAST');
            });
        });
        describe('addAssetToCartOrQuote()', function () {
            var addAssetToQuoteSpy;
            it('Should add an asset to Quote if user has administerQuotes permission', function () {
                addAssetToQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addAssetToProjectInQuote');
                componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
                expect(addAssetToQuoteSpy).toHaveBeenCalledWith({ lineItem: { asset: { assetId: 123, name: 'test asset' } } });
            });
            it('Should display a snack bar with the correct string and asset name for add to quote', function () {
                addAssetToQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addAssetToProjectInQuote');
                componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
                expect(snackBarDisplaySpy).toHaveBeenCalledWith('ASSET.ADD_TO_QUOTE_TOAST', { assetId: 'test asset' });
            });
            it('Should add an asset to Cart if user does not have administerQuotes permission', function () {
                canAdministerQuotes = false;
                componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
                expect(mockCartService.addAssetToProjectInCart).toHaveBeenCalledWith({ lineItem: { asset: { assetId: 123, name: 'test asset' } } });
            });
            it('Should display a snack bar with the correct string and asset name for add to quote', function () {
                canAdministerQuotes = false;
                componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
                expect(snackBarDisplaySpy).toHaveBeenCalledWith('ASSET.ADD_TO_CART_TOAST', { assetId: 'test asset' });
            });
        });
        describe('getAssetsForLink()', function () {
            it('Should call the dialog service to open the collection link dialog', function () {
                componentUnderTest.ngOnInit();
                componentUnderTest.getAssetsForLink();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
            });
        });
        describe('editAsset', function () {
            var mockMethod;
            beforeEach(function () {
                mockMethod = mockStore.createLegacyServiceMethod('asset', 'getClipPreviewData', Observable_1.Observable.of({ url: 'test url' }));
                componentUnderTest.ngOnInit();
            });
            it('calls the api to get clip preview data with the correct asset id', function () {
                componentUnderTest.editAsset({ assetId: 123, name: 'test asset' });
                mockStore.expectCallFor(mockMethod, 123);
            });
            it('updates the document body with a new class', function () {
                componentUnderTest.editAsset({ assetId: 123, name: 'test asset' });
                expect(mockDocumentService.body.classList.add).toHaveBeenCalledWith('subclipping-edit-open');
            });
            it('opens a dialog to edit the asset inside', function () {
                componentUnderTest.editAsset({ assetId: 123, name: 'test asset' });
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
            });
            it('sends a list of already used markers for the asset in the active collection', function () {
                componentUnderTest.editAsset({ assetId: 123, name: 'test asset' });
                expect(mockDialogService.openComponentInDialog.calls.mostRecent().args[0].inputOptions.alreadyUsedMarkersList)
                    .toEqual([{ in: new index_1.Frame(30).setFromFrameNumber(30), out: new index_1.Frame(30).setFromFrameNumber(60) }]);
            });
            it('removes the document body with class added in the beginning', function () {
                componentUnderTest.editAsset({ assetId: 123, name: 'test asset' });
                expect(mockDocumentService.body.classList.remove).toHaveBeenCalledWith('subclipping-edit-open');
            });
        });
        describe('onChangeAssetView()', function () {
            it('Should call the userPreference service to update the asset view preference', function () {
                componentUnderTest.onChangeAssetView('grid');
                expect(mockUserPreferenceService.updateAssetViewPreference).toHaveBeenCalledWith('grid');
            });
        });
        describe('showShareMembers()', function () {
            it('Should call the dialog service to open the share members dialog', function () {
                componentUnderTest.activeCollection = { id: 123, name: 'Collection name', owner: 123 };
                componentUnderTest.showShareMembers();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
            });
        });
        describe('createShareDialog()', function () {
            it('Should call the dialog service to open the collection sharing dialog', function () {
                componentUnderTest.activeCollection = { id: 123, name: 'Collection name', owner: 123 };
                componentUnderTest.createShareDialog();
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
                    inputOptions: {
                        reloadType: 'activeCollection',
                        collection: { id: 123, name: 'Collection name', owner: 123 },
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
                componentUnderTest.activeCollection = { id: 123, name: 'Collection name', owner: 123 };
                componentUnderTest.addToDifferentCollection({ some: 'asset' });
                expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                    componentType: jasmine.any(Function),
                    dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
                    inputOptions: {
                        focusedCollection: { id: 123, name: 'Collection name', owner: 123 },
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
        describe('collectionIsShared()', function () {
            it('should return true when collection has editors or viewers', function () {
                componentUnderTest.activeCollection = mockCollection();
                expect(componentUnderTest.collectionIsShared).toBe(true);
            });
            it('should return false when collection does not have editors or viewers', function () {
                componentUnderTest.activeCollection = mockCollectionNotShared();
                expect(componentUnderTest.collectionIsShared).toBe(false);
            });
        });
        describe('collectionViewerIsOwner()', function () {
            it('should return true when person viewing the collection is the owner', function () {
                componentUnderTest.activeCollection = mockCollection();
                expect(componentUnderTest.collectionViewerIsOwner).toBe(true);
            });
            it('should return false when person viewing the collection is the NOT owner', function () {
                componentUnderTest.activeCollection = mockCollectionNotOwned();
                expect(componentUnderTest.collectionViewerIsOwner).toBe(false);
            });
        });
    });
}
exports.main = main;
function mockCollection() {
    return {
        id: 3,
        siteName: 'core',
        name: 'Reptiles',
        createdOn: new Date('2017-10-12T14:20:25.083Z'),
        owner: 333,
        tags: 'frog, lizard, snake',
        userRole: 'owner',
        editors: [
            { id: 6, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
            { id: 7, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
            { id: 800, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }
        ],
        viewers: [{ id: 5, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
    };
}
function mockCollectionNotShared() {
    return {
        id: 4,
        siteName: 'core',
        name: 'Business',
        createdOn: new Date('2017-07-12T14:20:25.083Z'),
        owner: 333,
        tags: 'suit, tie, pants',
        userRole: 'owner'
    };
}
function mockCollectionNotOwned() {
    return {
        id: 5,
        siteName: 'core',
        name: 'Mockeriffic collection',
        createdOn: new Date('2017-06-14T16:20:25.083Z'),
        owner: 7676,
        tags: 'blue, green',
        userRole: 'editor',
        editors: [
            { id: 6, firstName: 'Tom', lastName: 'Thumb', emailAddress: 'tt@test.co' },
            { id: 7, firstName: 'Jane', lastName: 'Doe', emailAddress: 'jd@test.co' },
            { id: 800, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }
        ]
    };
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi8rc2hvdy9jb2xsZWN0aW9uLXNob3cuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSw4Q0FBNkM7QUFDN0MseUVBQXNFO0FBRXRFLDBFQUF1RTtBQUN2RSwwRUFBeUU7QUFFekU7SUFDRSxRQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFDcEMsSUFBSSxrQkFBMkMsQ0FBQztRQUNoRCxJQUFJLFNBQXVCLENBQUM7UUFDNUIsSUFBSSxVQUFlLENBQUM7UUFDcEIsSUFBSSx1QkFBNEIsQ0FBQztRQUNqQyxJQUFJLHFCQUEwQixDQUFDO1FBQy9CLElBQUksU0FBYyxDQUFDO1FBQ25CLElBQUksWUFBeUIsQ0FBQztRQUM5QixJQUFJLHNCQUEyQixDQUFDO1FBQ2hDLElBQUksaUJBQXNCLENBQUM7UUFDM0IsSUFBSSxVQUFlLENBQUM7UUFDcEIsSUFBSSxvQkFBaUMsQ0FBQztRQUN0QyxJQUFJLGtCQUErQixDQUFDO1FBQ3BDLElBQUksbUJBQW1CLEdBQVksSUFBSSxDQUFDO1FBQ3hDLElBQUksZUFBb0IsQ0FBQztRQUN6QixJQUFJLG1CQUF3QixDQUFDO1FBQzdCLElBQUkseUJBQThCLENBQUM7UUFDbkMsSUFBSSxpQ0FBOEMsQ0FBQztRQUduRCxVQUFVLENBQUM7WUFDVCxVQUFVLEdBQUcsRUFBRSxZQUFZLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7WUFFM0UsVUFBVSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUV6RCx1QkFBdUIsR0FBRztnQkFDeEIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxD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LFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRTtZQUN6RSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUU7U0FBQztLQUM5RSxDQUFDO0FBQ0osQ0FBQyIsImZpbGUiOiJhcHAvK2NvbGxlY3Rpb24vK3Nob3cvY29sbGVjdGlvbi1zaG93LmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IENvbGxlY3Rpb25TaGFyZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1zaGFyZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uU2hvd0NvbXBvbmVudCB9IGZyb20gJy4vY29sbGVjdGlvbi1zaG93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTW9ja0FwcFN0b3JlIH0gZnJvbSAnLi4vLi4vc3RvcmUvc3BlYy1oZWxwZXJzL21vY2stYXBwLnN0b3JlJztcbmltcG9ydCB7IEZyYW1lIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oKSB7XG4gIGRlc2NyaWJlKCdDb2xsZWN0aW9uIFNob3cgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IENvbGxlY3Rpb25TaG93Q29tcG9uZW50O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgbW9ja1dpbmRvdzogYW55O1xuICAgIGxldCBtb2NrQ2FwYWJpbGl0aWVzU2VydmljZTogYW55O1xuICAgIGxldCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWY6IGFueTtcbiAgICBsZXQgbW9ja1JvdXRlOiBhbnk7XG4gICAgbGV0IGdldENvdW50c1NweTogamFzbWluZS5TcHk7XG4gICAgbGV0IG1vY2tDb2xsZWN0aW9uc1NlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja0RpYWxvZ1NlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja1JvdXRlcjogYW55O1xuICAgIGxldCBoYW5kbGVDdXN0b21FcnJvclNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IHNuYWNrQmFyRGlzcGxheVNweTogamFzbWluZS5TcHk7XG4gICAgbGV0IGNhbkFkbWluaXN0ZXJRdW90ZXM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGxldCBtb2NrQ2FydFNlcnZpY2U6IGFueTtcbiAgICBsZXQgbW9ja0RvY3VtZW50U2VydmljZTogYW55O1xuICAgIGxldCBtb2NrVXNlclByZWZlcmVuY2VTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IHNob3dDb25maXJtYXRpb25EaWFsb2dEaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG5cblxuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgbW9ja1dpbmRvdyA9IHsgbmF0aXZlV2luZG93OiB7IGxvY2F0aW9uOiB7IGhyZWY6IHt9IH0sIGlubmVyV2lkdGg6IDIwMCB9IH07XG5cbiAgICAgIG1vY2tSb3V0ZXIgPSB7IG5hdmlnYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnbmF2aWdhdGUnKSB9O1xuXG4gICAgICBtb2NrQ2FwYWJpbGl0aWVzU2VydmljZSA9IHtcbiAgICAgICAgZWRpdENvbGxlY3Rpb246IGphc21pbmUuY3JlYXRlU3B5KCdlZGl0Q29sbGVjdGlvbicpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHRydWUpKSxcbiAgICAgICAgYWRtaW5pc3RlclF1b3RlczogKCkgPT4gY2FuQWRtaW5pc3RlclF1b3Rlc1xuICAgICAgfTtcblxuICAgICAgbW9ja0NoYW5nZURldGVjdG9yUmVmID0geyBtYXJrRm9yQ2hlY2s6IGphc21pbmUuY3JlYXRlU3B5KCdtYXJrRm9yQ2hlY2snKSB9O1xuXG4gICAgICBtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlID0ge1xuICAgICAgICBnZXRCeUlkQW5kRHVwbGljYXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnZ2V0QnlJZEFuZER1cGxpY2F0ZScpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHtcbiAgICAgICAgICBjb2xsZWN0aW9uOiB7XG4gICAgICAgICAgICBpZDogMTIzLCBhc3NldHM6IHtcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGlkOiAxMjMsIHV1aWQ6ICdzbGtkamYtbHNrZGpmJywgdGltZVN0YXJ0OiAxMjMsIHRpbWVFbmQ6IDQ1NiB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6IDQ1NiwgdXVpZDogJ3dvaWV1ci1vd2lzbGQnLCB0aW1lU3RhcnQ6IC0xLCB0aW1lRW5kOiAtMiB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKSxcbiAgICAgICAgZGVsZXRlOiBqYXNtaW5lLmNyZWF0ZVNweSgnZGVsZXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe30pKVxuICAgICAgfTtcblxuICAgICAgbW9ja1JvdXRlID0geyBwYXJhbXM6IE9ic2VydmFibGUub2YoeyBpZDogMSwgc29tZTogJ3BhcmFtcycgfSkgfTtcblxuICAgICAgbW9ja0RpYWxvZ1NlcnZpY2UgPSB7XG4gICAgICAgIG9wZW5Db21wb25lbnRJbkRpYWxvZzogamFzbWluZS5jcmVhdGVTcHkoJ29wZW5Db21wb25lbnRJbkRpYWxvZycpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHt9KSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tDYXJ0U2VydmljZSA9IHtcbiAgICAgICAgYWRkQXNzZXRUb1Byb2plY3RJbkNhcnQ6IGphc21pbmUuY3JlYXRlU3B5KCdhZGRBc3NldFRvUHJvamVjdEluQ2FydCcpXG4gICAgICB9O1xuXG4gICAgICBtb2NrRG9jdW1lbnRTZXJ2aWNlID0ge1xuICAgICAgICBib2R5OiB7IGNsYXNzTGlzdDogeyBhZGQ6IGphc21pbmUuY3JlYXRlU3B5KCdhZGQnKSwgcmVtb3ZlOiBqYXNtaW5lLmNyZWF0ZVNweSgncmVtb3ZlJykgfSB9XG4gICAgICB9O1xuXG4gICAgICBtb2NrVXNlclByZWZlcmVuY2VTZXJ2aWNlID0ge1xuICAgICAgICB1cGRhdGVBc3NldFZpZXdQcmVmZXJlbmNlOiBqYXNtaW5lLmNyZWF0ZVNweSgndXBkYXRlQXNzZXRWaWV3UHJlZmVyZW5jZScpXG4gICAgICB9O1xuXG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBzaG93Q29uZmlybWF0aW9uRGlhbG9nRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZGlhbG9nJywgJ3Nob3dDb25maXJtYXRpb24nKTtcblxuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbignYWN0aXZlQ29sbGVjdGlvbicsIHtcbiAgICAgICAgY29sbGVjdGlvbjoge1xuICAgICAgICAgIG5hbWU6ICd0ZXN0IGNvbGxlY3Rpb24nLFxuICAgICAgICAgIGlkOiAxMjMsIGFzc2V0czoge1xuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFzc2V0SWQ6IDEyMyxcbiAgICAgICAgICAgICAgICB1dWlkOiAnQUJDRCcsXG4gICAgICAgICAgICAgICAgb3RoZXI6ICdzdHVmZicsXG4gICAgICAgICAgICAgICAgdGltZVN0YXJ0OiAxMDAwLFxuICAgICAgICAgICAgICAgIHRpbWVFbmQ6IDIwMDAsXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IFt7IG5hbWU6ICdGb3JtYXQuRnJhbWVSYXRlJywgdmFsdWU6ICczMCBmcHMnIH1dXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgYXNzZXRJZDogNDU2LCB1dWlkOiAnRUZGSCcsIG90aGVyOiAnc3R1ZmYnLCB0aW1lU3RhcnQ6IC0xLCB0aW1lRW5kOiAtMiB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LCBsb2FkZWQ6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCd1aUNvbmZpZycsIHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgIGNvbGxlY3Rpb25Db21tZW50OiB7IGNvbmZpZzogeyBmb3JtOiB7IGl0ZW1zOiBbeyBzb21lOiAnY29tbWVudENvbmZpZycgfV0gfSB9IH0sXG4gICAgICAgICAgY29sbGVjdGlvbjogeyBjb25maWc6IHsgc29tZTogJ2NvbGxlY3Rpb25Db25maWcnIH0gfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1vY2tTdG9yZS5jcmVhdGVTdGF0ZVNlY3Rpb24oJ2NvbW1lbnQnLCB7IGNvbGxlY3Rpb246IHsgcGFnaW5hdGlvbjogeyB0b3RhbENvdW50OiAzIH0gfSB9KTtcbiAgICAgIGdldENvdW50c1NweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdjb21tZW50JywgJ2dldENvdW50cycpO1xuICAgICAgaGFuZGxlQ3VzdG9tRXJyb3JTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZXJyb3InLCAnaGFuZGxlQ3VzdG9tRXJyb3InKTtcbiAgICAgIHNuYWNrQmFyRGlzcGxheVNweSA9IG1vY2tTdG9yZS5jcmVhdGVBY3Rpb25GYWN0b3J5TWV0aG9kKCdzbmFja2JhcicsICdkaXNwbGF5Jyk7XG5cbiAgICAgIGNvbXBvbmVudFVuZGVyVGVzdCA9IG5ldyBDb2xsZWN0aW9uU2hvd0NvbXBvbmVudChcbiAgICAgICAgbW9ja0NhcGFiaWxpdGllc1NlcnZpY2UsIG1vY2tSb3V0ZXIsIG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UsIG1vY2tDYXJ0U2VydmljZSxcbiAgICAgICAgbW9ja1VzZXJQcmVmZXJlbmNlU2VydmljZSwgbW9ja1JvdXRlLCBtb2NrV2luZG93LCBtb2NrRGlhbG9nU2VydmljZSxcbiAgICAgICAgbW9ja0RvY3VtZW50U2VydmljZSwgbW9ja1N0b3JlLCBtb2NrQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbmdPbkluaXQoKScsICgpID0+IHtcbiAgICAgIGRlc2NyaWJlKCd3aXRoIGEgdmFsaWQgYWN0aXZlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnY2FsbHMgZ2V0Q291bnRzIG9uIHRoZSBjb21tZW50IGFjdGlvbiBmYWN0b3J5JywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChnZXRDb3VudHNTcHkpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3NldHMgdXAgdGhlIGNvbW1lbnRQYXJlbnRPYmplY3QgaW5zdGFuY2UgdmFyaWFibGUnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50UGFyZW50T2JqZWN0KS50b0VxdWFsKHsgb2JqZWN0VHlwZTogJ2NvbGxlY3Rpb24nLCBvYmplY3RJZDogMTIzIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2V0cyB1cCB0aGUgY29uZmlnIGluc3RhbmNlIHZhcnMnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5jb21tZW50Rm9ybUNvbmZpZykudG9FcXVhbChbeyBzb21lOiAnY29tbWVudENvbmZpZycgfV0pO1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QubmV3Q29sbGVjdGlvbkZvcm1Db25maWcpLnRvRXF1YWwoeyBzb21lOiAnY29sbGVjdGlvbkNvbmZpZycgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCd3aXRoIGFuIGludmFsaWQgYWN0aXZlIGNvbGxlY3Rpb24gKHdpdGhvdXQgYW4gaWQpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVFbGVtZW50KCdhY3RpdmVDb2xsZWN0aW9uJywgJ2NvbGxlY3Rpb24nLCB7IGlkOiBudWxsIH0pO1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZG9lcyBub3QgY2FsbCBnZXRDb3VudHMgb24gdGhlIGNvbW1lbnQgYWN0aW9uIGZhY3RvcnknLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGdldENvdW50c1NweSkubm90LnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2RvZXMgbm90IHNldCB1cCB0aGUgY29tbWVudFBhcmVudE9iamVjdCBpbnN0YW5jZSB2YXJpYWJsJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29tbWVudFBhcmVudE9iamVjdCkudG9CZVVuZGVmaW5lZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldCB1c2VyQ2FuRWRpdENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgY2FsbCBlZGl0Q29sbGVjdGlvbigpIG9uIHRoZSBjYWJhYmlsaXRpZXMgc2VydmljZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGxldCByZXN1bHQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBjb21wb25lbnRVbmRlclRlc3QudXNlckNhbkVkaXRDb2xsZWN0aW9uO1xuXG4gICAgICAgIHJlc3VsdC50YWtlKDEpLnN1YnNjcmliZShyZXMgPT4gZXhwZWN0KHJlcykudG9FcXVhbCh0cnVlKSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0b2dnbGVDb21tZW50c1Zpc2liaWxpdHkoKScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgdG9nZ2xlIHRoZSBzaG93Q29tbWVudHMgZmxhZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dDb21tZW50cyA9IGZhbHNlO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudG9nZ2xlQ29tbWVudHNWaXNpYmlsaXR5KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0NvbW1lbnRzKS50b0JlKHRydWUpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QudG9nZ2xlQ29tbWVudHNWaXNpYmlsaXR5KCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3Quc2hvd0NvbW1lbnRzKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NvbW1lbnRDb3VudHMgZ2V0dGVyJywgKCkgPT4ge1xuICAgICAgaXQoJ3NlbGVjdHMgdGhlIHJpZ2h0IHBhcnQgb2YgdGhlIHN0b3JlJywgKCkgPT4ge1xuICAgICAgICBsZXQgY291bnQ6IG51bWJlcjtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNvbW1lbnRDb3VudC5zdWJzY3JpYmUoYyA9PiBjb3VudCA9IGMpO1xuICAgICAgICBleHBlY3QoY291bnQpLnRvQmUoMyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0Q29sbGVjdGlvbigpJywgKCkgPT4ge1xuXG4gICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGRpYWxvZyBzZXJ2aWNlIHRvIG9wZW4gdGhlIGVkaXQgY29sbGVjdGlvbiBmb3JtIGluIGEgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXRDb2xsZWN0aW9uKCk7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2R1cGxpY2F0ZUNvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmR1cGxpY2F0ZUNvbGxlY3Rpb24oKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGNvbGxlY3Rpb24gZW5kIHBvaW50IHdpdGggdGhlIGNvcnJlY3QgSUQnLCAoKSA9PiB7XG4gICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmdldEJ5SWRBbmREdXBsaWNhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEyMyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBkaWFsb2cgc2VydmljZSB0byBvcGVuIHRoZSBkdXBsaWNhdGUgY29sbGVjdGlvbiBmb3JtIGluIGEgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjaGFuZ2VQYWdlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIG5hdmlnYXRlIHRvIHRoZSBjb3JyZWN0IHBhZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuY2hhbmdlUGFnZSgzKTtcbiAgICAgICAgZXhwZWN0KG1vY2tSb3V0ZXIubmF2aWdhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKFsnL2NvbGxlY3Rpb25zLzEyMycsIHsgc29tZTogJ3BhcmFtcycsIGk6IDMgfV0pO1xuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZXRDb2xsZWN0aW9uRm9yRGVsZXRlKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIG9wZW4gdGhlIGRpYWxvZyB0byBjb25maXJtIGRlbGV0ZSBvZiBjb2xsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QubmdPbkluaXQoKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNldENvbGxlY3Rpb25Gb3JEZWxldGUoKTtcbiAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHNob3dDb25maXJtYXRpb25EaWFsb2dEaXNwYXRjaFNweSwge1xuICAgICAgICAgIHRpdGxlOiB7IGtleTogJ0NPTExFQ1RJT04uSU5ERVguQ09ORklSTUFUSU9OX1RJVExFJywgdmFsdWVzOiB7IGNvbGxlY3Rpb25OYW1lOiAndGVzdCBjb2xsZWN0aW9uJyB9IH0sXG4gICAgICAgICAgbWVzc2FnZTogeyBrZXk6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9TVUJUSVRMRScsIHZhbHVlczogeyBjb2xsZWN0aW9uTmFtZTogJ3Rlc3QgY29sbGVjdGlvbicgfSB9LFxuICAgICAgICAgIGRlY2xpbmU6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9DQU5DRUxfQlROX1RJVExFJyxcbiAgICAgICAgICBhY2NlcHQ6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9ERUxFVEVfQlROX1RJVExFJ1xuICAgICAgICB9LCBqYXNtaW5lLmFueShGdW5jdGlvbikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVsZXRlQ29sbGVjdGlvbigpJywgKCkgPT4ge1xuXG4gICAgICBpdCgnU2hvdWxkIG5hdmlnYXRlIHRvIHRoZSBjb2xsZWN0aW9ucyB1cmwnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kZWxldGVDb2xsZWN0aW9uKDEpO1xuICAgICAgICBleHBlY3QobW9ja1JvdXRlci5uYXZpZ2F0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoWycvY29sbGVjdGlvbnMnXSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBhcGkgd2l0aCB0aGUgY29ycmVjdCBjb2xsZWN0aW9uIGlkIHBhcmFtdGVyIHRvIGRlbGV0ZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRlbGV0ZUNvbGxlY3Rpb24oMSk7XG4gICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmRlbGV0ZSkudG9IYXZlQmVlbkNhbGxlZFdpdGgoMSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBkaXNwbGF5IGEgc3VjY2VzcyB0b2FzdCB3aGVuIGEgY29sbGVjdGlvbiBoYXMgYmVlbiBzdWNjZXNmdWxseSBjb21wbGV0ZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5kZWxldGVDb2xsZWN0aW9uKDEpO1xuICAgICAgICBleHBlY3Qoc25hY2tCYXJEaXNwbGF5U3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnQ09MTEVDVElPTi5JTkRFWC5ERUxFVEVfU1VDQ0VTU19UT0FTVCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWRkQXNzZXRUb0NhcnRPclF1b3RlKCknLCAoKSA9PiB7XG4gICAgICBsZXQgYWRkQXNzZXRUb1F1b3RlU3B5OiBqYXNtaW5lLlNweTtcbiAgICAgIGl0KCdTaG91bGQgYWRkIGFuIGFzc2V0IHRvIFF1b3RlIGlmIHVzZXIgaGFzIGFkbWluaXN0ZXJRdW90ZXMgcGVybWlzc2lvbicsICgpID0+IHtcbiAgICAgICAgYWRkQXNzZXRUb1F1b3RlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdhZGRBc3NldFRvUHJvamVjdEluUXVvdGUnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZEFzc2V0VG9DYXJ0T3JRdW90ZSh7IGFzc2V0SWQ6IDEyMywgbmFtZTogJ3Rlc3QgYXNzZXQnIH0pO1xuICAgICAgICBleHBlY3QoYWRkQXNzZXRUb1F1b3RlU3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aChcbiAgICAgICAgICB7IGxpbmVJdGVtOiB7IGFzc2V0OiB7IGFzc2V0SWQ6IDEyMywgbmFtZTogJ3Rlc3QgYXNzZXQnIH0gfSB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnU2hvdWxkIGRpc3BsYXkgYSBzbmFjayBiYXIgd2l0aCB0aGUgY29ycmVjdCBzdHJpbmcgYW5kIGFzc2V0IG5hbWUgZm9yIGFkZCB0byBxdW90ZScsICgpID0+IHtcbiAgICAgICAgYWRkQXNzZXRUb1F1b3RlU3B5ID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ3F1b3RlRWRpdCcsICdhZGRBc3NldFRvUHJvamVjdEluUXVvdGUnKTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZEFzc2V0VG9DYXJ0T3JRdW90ZSh7IGFzc2V0SWQ6IDEyMywgbmFtZTogJ3Rlc3QgYXNzZXQnIH0pO1xuICAgICAgICBleHBlY3Qoc25hY2tCYXJEaXNwbGF5U3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnQVNTRVQuQUREX1RPX1FVT1RFX1RPQVNUJywgeyBhc3NldElkOiAndGVzdCBhc3NldCcgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBhZGQgYW4gYXNzZXQgdG8gQ2FydCBpZiB1c2VyIGRvZXMgbm90IGhhdmUgYWRtaW5pc3RlclF1b3RlcyBwZXJtaXNzaW9uJywgKCkgPT4ge1xuICAgICAgICBjYW5BZG1pbmlzdGVyUXVvdGVzID0gZmFsc2U7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRBc3NldFRvQ2FydE9yUXVvdGUoeyBhc3NldElkOiAxMjMsIG5hbWU6ICd0ZXN0IGFzc2V0JyB9KTtcbiAgICAgICAgZXhwZWN0KG1vY2tDYXJ0U2VydmljZS5hZGRBc3NldFRvUHJvamVjdEluQ2FydCkudG9IYXZlQmVlbkNhbGxlZFdpdGgoXG4gICAgICAgICAgeyBsaW5lSXRlbTogeyBhc3NldDogeyBhc3NldElkOiAxMjMsIG5hbWU6ICd0ZXN0IGFzc2V0JyB9IH0gfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ1Nob3VsZCBkaXNwbGF5IGEgc25hY2sgYmFyIHdpdGggdGhlIGNvcnJlY3Qgc3RyaW5nIGFuZCBhc3NldCBuYW1lIGZvciBhZGQgdG8gcXVvdGUnLCAoKSA9PiB7XG4gICAgICAgIGNhbkFkbWluaXN0ZXJRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFkZEFzc2V0VG9DYXJ0T3JRdW90ZSh7IGFzc2V0SWQ6IDEyMywgbmFtZTogJ3Rlc3QgYXNzZXQnIH0pO1xuICAgICAgICBleHBlY3Qoc25hY2tCYXJEaXNwbGF5U3B5KS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnQVNTRVQuQUREX1RPX0NBUlRfVE9BU1QnLCB7IGFzc2V0SWQ6ICd0ZXN0IGFzc2V0JyB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dldEFzc2V0c0ZvckxpbmsoKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiB0aGUgY29sbGVjdGlvbiBsaW5rIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0Lm5nT25Jbml0KCk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5nZXRBc3NldHNGb3JMaW5rKCk7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRBc3NldCcsICgpID0+IHtcbiAgICAgIGxldCBtb2NrTWV0aG9kOiBqYXNtaW5lLlNweTtcblxuICAgICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICAgIG1vY2tNZXRob2QgPSBtb2NrU3RvcmUuY3JlYXRlTGVnYWN5U2VydmljZU1ldGhvZCgnYXNzZXQnLCAnZ2V0Q2xpcFByZXZpZXdEYXRhJywgT2JzZXJ2YWJsZS5vZih7IHVybDogJ3Rlc3QgdXJsJyB9KSk7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5uZ09uSW5pdCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyB0aGUgYXBpIHRvIGdldCBjbGlwIHByZXZpZXcgZGF0YSB3aXRoIHRoZSBjb3JyZWN0IGFzc2V0IGlkJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZWRpdEFzc2V0KHsgYXNzZXRJZDogMTIzLCBuYW1lOiAndGVzdCBhc3NldCcgfSBhcyBhbnkpO1xuXG4gICAgICAgIG1vY2tTdG9yZS5leHBlY3RDYWxsRm9yKG1vY2tNZXRob2QsIDEyMyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3VwZGF0ZXMgdGhlIGRvY3VtZW50IGJvZHkgd2l0aCBhIG5ldyBjbGFzcycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXRBc3NldCh7IGFzc2V0SWQ6IDEyMywgbmFtZTogJ3Rlc3QgYXNzZXQnIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KG1vY2tEb2N1bWVudFNlcnZpY2UuYm9keS5jbGFzc0xpc3QuYWRkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnc3ViY2xpcHBpbmctZWRpdC1vcGVuJyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ29wZW5zIGEgZGlhbG9nIHRvIGVkaXQgdGhlIGFzc2V0IGluc2lkZScsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmVkaXRBc3NldCh7IGFzc2V0SWQ6IDEyMywgbmFtZTogJ3Rlc3QgYXNzZXQnIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZW5kcyBhIGxpc3Qgb2YgYWxyZWFkeSB1c2VkIG1hcmtlcnMgZm9yIHRoZSBhc3NldCBpbiB0aGUgYWN0aXZlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5lZGl0QXNzZXQoeyBhc3NldElkOiAxMjMsIG5hbWU6ICd0ZXN0IGFzc2V0JyB9IGFzIGFueSk7XG5cbiAgICAgICAgLy8gVE9ETzogVGVzdCBvdGhlciBhcmd1bWVudHMgdG8gdGhpcyBmdW5jdGlvbi5cbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZy5jYWxscy5tb3N0UmVjZW50KCkuYXJnc1swXS5pbnB1dE9wdGlvbnMuYWxyZWFkeVVzZWRNYXJrZXJzTGlzdClcbiAgICAgICAgICAudG9FcXVhbChbeyBpbjogbmV3IEZyYW1lKDMwKS5zZXRGcm9tRnJhbWVOdW1iZXIoMzApLCBvdXQ6IG5ldyBGcmFtZSgzMCkuc2V0RnJvbUZyYW1lTnVtYmVyKDYwKSB9XSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JlbW92ZXMgdGhlIGRvY3VtZW50IGJvZHkgd2l0aCBjbGFzcyBhZGRlZCBpbiB0aGUgYmVnaW5uaW5nJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZWRpdEFzc2V0KHsgYXNzZXRJZDogMTIzLCBuYW1lOiAndGVzdCBhc3NldCcgfSBhcyBhbnkpO1xuICAgICAgICBleHBlY3QobW9ja0RvY3VtZW50U2VydmljZS5ib2R5LmNsYXNzTGlzdC5yZW1vdmUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdzdWJjbGlwcGluZy1lZGl0LW9wZW4nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ29uQ2hhbmdlQXNzZXRWaWV3KCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIHVzZXJQcmVmZXJlbmNlIHNlcnZpY2UgdG8gdXBkYXRlIHRoZSBhc3NldCB2aWV3IHByZWZlcmVuY2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNoYW5nZUFzc2V0VmlldygnZ3JpZCcpO1xuICAgICAgICBleHBlY3QobW9ja1VzZXJQcmVmZXJlbmNlU2VydmljZS51cGRhdGVBc3NldFZpZXdQcmVmZXJlbmNlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnZ3JpZCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2hvd1NoYXJlTWVtYmVycygpJywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBkaWFsb2cgc2VydmljZSB0byBvcGVuIHRoZSBzaGFyZSBtZW1iZXJzIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSB7IGlkOiAxMjMsIG5hbWU6ICdDb2xsZWN0aW9uIG5hbWUnLCBvd25lcjogMTIzIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zaG93U2hhcmVNZW1iZXJzKCk7XG4gICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZVNoYXJlRGlhbG9nKCknLCAoKSA9PiB7XG4gICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGRpYWxvZyBzZXJ2aWNlIHRvIG9wZW4gdGhlIGNvbGxlY3Rpb24gc2hhcmluZyBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hY3RpdmVDb2xsZWN0aW9uID0geyBpZDogMTIzLCBuYW1lOiAnQ29sbGVjdGlvbiBuYW1lJywgb3duZXI6IDEyMyB9O1xuXG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5jcmVhdGVTaGFyZURpYWxvZygpO1xuICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7XG4gICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICczJScgfSwgcGFuZWxDbGFzczogJ3d6LXNoYXJlLWRpYWxvZycgfSxcbiAgICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICAgIHJlbG9hZFR5cGU6ICdhY3RpdmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgIGNvbGxlY3Rpb246IHsgaWQ6IDEyMywgbmFtZTogJ0NvbGxlY3Rpb24gbmFtZScsIG93bmVyOiAxMjMgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgICAgICBldmVudDogJ2Nsb3NlUmVxdWVzdCcsXG4gICAgICAgICAgICBjYWxsYmFjazogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICAgICAgfV1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdhZGRUb0RpZmZlcmVudENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiB0aGUgY29sbGVjdGlvbiBsaXN0IGNvbXBvbmVudCcsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSB7IGlkOiAxMjMsIG5hbWU6ICdDb2xsZWN0aW9uIG5hbWUnLCBvd25lcjogMTIzIH07XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hZGRUb0RpZmZlcmVudENvbGxlY3Rpb24oeyBzb21lOiAnYXNzZXQnIH0gYXMgYW55KTtcbiAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgIGNvbXBvbmVudFR5cGU6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICBkaWFsb2dDb25maWc6IHsgcG9zaXRpb246IHsgdG9wOiAnMyUnIH0sIHBhbmVsQ2xhc3M6ICdjb2xsZWN0aW9uLWxpc3QtZGQtY29tcG9uZW50JyB9LFxuICAgICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgICAgZm9jdXNlZENvbGxlY3Rpb246IHsgaWQ6IDEyMywgbmFtZTogJ0NvbGxlY3Rpb24gbmFtZScsIG93bmVyOiAxMjMgfSxcbiAgICAgICAgICAgIHJvbGVGaWx0ZXI6IFsnb3duZXInLCAnZWRpdG9yJ10sXG4gICAgICAgICAgICBlZGl0TW9kZTogdHJ1ZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3V0cHV0T3B0aW9uczogW3tcbiAgICAgICAgICAgIGV2ZW50OiAnY2xvc2UnLFxuICAgICAgICAgICAgY2FsbGJhY2s6IGphc21pbmUuYW55KEZ1bmN0aW9uKSxcbiAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY29sbGVjdGlvbklzU2hhcmVkKCknLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIHdoZW4gY29sbGVjdGlvbiBoYXMgZWRpdG9ycyBvciB2aWV3ZXJzJywgKCkgPT4ge1xuICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuYWN0aXZlQ29sbGVjdGlvbiA9IG1vY2tDb2xsZWN0aW9uKCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvbklzU2hhcmVkKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gY29sbGVjdGlvbiBkb2VzIG5vdCBoYXZlIGVkaXRvcnMgb3Igdmlld2VycycsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbk5vdFNoYXJlZCgpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25Jc1NoYXJlZCkudG9CZShmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdjb2xsZWN0aW9uVmlld2VySXNPd25lcigpJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSB3aGVuIHBlcnNvbiB2aWV3aW5nIHRoZSBjb2xsZWN0aW9uIGlzIHRoZSBvd25lcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbigpO1xuICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25WaWV3ZXJJc093bmVyKS50b0JlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gcGVyc29uIHZpZXdpbmcgdGhlIGNvbGxlY3Rpb24gaXMgdGhlIE5PVCBvd25lcicsICgpID0+IHtcbiAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmFjdGl2ZUNvbGxlY3Rpb24gPSBtb2NrQ29sbGVjdGlvbk5vdE93bmVkKCk7XG4gICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvblZpZXdlcklzT3duZXIpLnRvQmUoZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBtb2NrQ29sbGVjdGlvbigpOiBDb2xsZWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogMyxcbiAgICBzaXRlTmFtZTogJ2NvcmUnLFxuICAgIG5hbWU6ICdSZXB0aWxlcycsXG4gICAgY3JlYXRlZE9uOiBuZXcgRGF0ZSgnMjAxNy0xMC0xMlQxNDoyMDoyNS4wODNaJyksXG4gICAgb3duZXI6IDMzMyxcbiAgICB0YWdzOiAnZnJvZywgbGl6YXJkLCBzbmFrZScsXG4gICAgdXNlclJvbGU6ICdvd25lcicsXG4gICAgZWRpdG9yczogW1xuICAgICAgeyBpZDogNiwgZmlyc3ROYW1lOiAnVG9tJywgbGFzdE5hbWU6ICdUaHVtYicsIGVtYWlsQWRkcmVzczogJ3R0QHRlc3QuY28nIH0sXG4gICAgICB7IGlkOiA3LCBmaXJzdE5hbWU6ICdKYW5lJywgbGFzdE5hbWU6ICdEb2UnLCBlbWFpbEFkZHJlc3M6ICdqZEB0ZXN0LmNvJyB9LFxuICAgICAgeyBpZDogODAwLCBmaXJzdE5hbWU6ICdUeScsIGxhc3ROYW1lOiAnVGVzdCcsIGVtYWlsQWRkcmVzczogJ3R5QHRlc3QuY28nIH1dLFxuICAgIHZpZXdlcnM6IFt7IGlkOiA1LCBmaXJzdE5hbWU6ICdNYXJ5JywgbGFzdE5hbWU6ICdNYXplJywgZW1haWxBZGRyZXNzOiAnbW1AdGVzdC5jbycgfV1cbiAgfTtcbn1cblxuZnVuY3Rpb24gbW9ja0NvbGxlY3Rpb25Ob3RTaGFyZWQoKTogQ29sbGVjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgaWQ6IDQsXG4gICAgc2l0ZU5hbWU6ICdjb3JlJyxcbiAgICBuYW1lOiAnQnVzaW5lc3MnLFxuICAgIGNyZWF0ZWRPbjogbmV3IERhdGUoJzIwMTctMDctMTJUMTQ6MjA6MjUuMDgzWicpLFxuICAgIG93bmVyOiAzMzMsXG4gICAgdGFnczogJ3N1aXQsIHRpZSwgcGFudHMnLFxuICAgIHVzZXJSb2xlOiAnb3duZXInXG4gIH07XG59XG5cbmZ1bmN0aW9uIG1vY2tDb2xsZWN0aW9uTm90T3duZWQoKTogQ29sbGVjdGlvbiB7XG4gIHJldHVybiB7XG4gICAgaWQ6IDUsXG4gICAgc2l0ZU5hbWU6ICdjb3JlJyxcbiAgICBuYW1lOiAnTW9ja2VyaWZmaWMgY29sbGVjdGlvbicsXG4gICAgY3JlYXRlZE9uOiBuZXcgRGF0ZSgnMjAxNy0wNi0xNFQxNjoyMDoyNS4wODNaJyksXG4gICAgb3duZXI6IDc2NzYsXG4gICAgdGFnczogJ2JsdWUsIGdyZWVuJyxcbiAgICB1c2VyUm9sZTogJ2VkaXRvcicsXG4gICAgZWRpdG9yczogW1xuICAgICAgeyBpZDogNiwgZmlyc3ROYW1lOiAnVG9tJywgbGFzdE5hbWU6ICdUaHVtYicsIGVtYWlsQWRkcmVzczogJ3R0QHRlc3QuY28nIH0sXG4gICAgICB7IGlkOiA3LCBmaXJzdE5hbWU6ICdKYW5lJywgbGFzdE5hbWU6ICdEb2UnLCBlbWFpbEFkZHJlc3M6ICdqZEB0ZXN0LmNvJyB9LFxuICAgICAgeyBpZDogODAwLCBmaXJzdE5hbWU6ICdUeScsIGxhc3ROYW1lOiAnVGVzdCcsIGVtYWlsQWRkcmVzczogJ3R5QHRlc3QuY28nIH1dXG4gIH07XG59XG4iXX0=

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var collections_component_1 = require("./collections.component");
var Observable_1 = require("rxjs/Observable");
var mock_app_store_1 = require("../../store/spec-helpers/mock-app.store");
function main() {
    describe('Collections Component', function () {
        var componentUnderTest;
        var mockCollectionsService;
        var mockDialogService;
        var mockCollectionContext;
        var mockStore;
        var activeCollectionSetter;
        var showConfirmationDialogDispatchSpy;
        beforeEach(function () {
            mockCollectionsService = {
                getByIdAndDuplicate: jasmine.createSpy('getByIdAndDuplicate').and.returnValue(Observable_1.Observable.of({
                    collection: {
                        id: 123,
                        assets: {
                            items: [
                                { id: 123, uuid: 'slkdjf-lskdjf', timeStart: 123, timeEnd: 456 },
                                { id: 456, uuid: 'woieur-owisld', timeStart: -1, timeEnd: -2 }
                            ]
                        }
                    }
                })),
                getItems: jasmine.createSpy('getItems').and.returnValue(Observable_1.Observable.of({
                    data: {
                        items: [
                            { id: 123, uuid: 'slkdjf-lskdjf', timeStart: 123, timeEnd: 456 },
                            { id: 456, uuid: 'woieur-owisld', timeStart: -1, timeEnd: -2 }
                        ]
                    }
                })),
                delete: jasmine.createSpy('delete').and.returnValue(Observable_1.Observable.of({})),
                load: jasmine.createSpy('load').and.returnValue(Observable_1.Observable.of({}))
            };
            mockDialogService = {
                openComponentInDialog: jasmine.createSpy('openComponentInDialog')
            };
            mockCollectionContext = {
                data: Observable_1.Observable.of({ mockCollectionContext: 'mock data' }),
                updateCollectionOptions: jasmine.createSpy('updateCollectionOptions')
            };
            mockStore = new mock_app_store_1.MockAppStore();
            mockStore.createStateSection('activeCollection', {
                collection: {
                    id: 123,
                    assets: {
                        items: [
                            { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                            { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                        ]
                    },
                    loaded: true
                }
            });
            mockStore.createStateSection('uiConfig', { components: { collection: { config: { some: 'config' } } } });
            activeCollectionSetter = mockStore.createActionFactoryMethod('activeCollection', 'set');
            showConfirmationDialogDispatchSpy = mockStore.createActionFactoryMethod('dialog', 'showConfirmation');
            componentUnderTest = new collections_component_1.CollectionsComponent(null, mockCollectionsService, mockCollectionContext, null, mockDialogService, mockStore);
        });
        describe('activeCollection() - get', function () {
            it('Should return the current active collection', function () {
                componentUnderTest.activeCollection.subscribe(function (data) {
                    expect(data).toEqual({
                        id: 123,
                        assets: {
                            items: [
                                { id: 123, other: 'stuff', timeStart: 123, timeEnd: 456 },
                                { id: 456, other: 'stuff', timeStart: -1, timeEnd: -2 }
                            ]
                        },
                        loaded: true
                    });
                });
            });
            describe('toggleCollectionSearch()', function () {
                it('should toggle the boolean collectionSearchIsShowing variable', function () {
                    expect(componentUnderTest.collectionSearchIsShowing).toEqual(false);
                    componentUnderTest.toggleCollectionSearch();
                    expect(componentUnderTest.collectionSearchIsShowing).toEqual(true);
                });
            });
            describe('selectActiveCollection()', function () {
                it('Should set the active collection with the id paramater supplied', function () {
                    componentUnderTest.selectActiveCollection(1);
                    expect(activeCollectionSetter).toHaveBeenCalledWith(1);
                });
            });
            describe('editCollection()', function () {
                it('Should call the dialog service to open the edit collection form in a dialog', function () {
                    componentUnderTest.editCollection({ id: 123, name: 'Collection name', owner: 123 });
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
            describe('createCollection()', function () {
                it('Should call the dialog service to open the edit collection form in a dialog', function () {
                    componentUnderTest.createCollection();
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
            describe('setCollectionForDelete()', function () {
                it('Should call the dialog service to open dialog which confirms delete', function () {
                    componentUnderTest.setCollectionForDelete({ id: 123, name: 'test collection', owner: 123 });
                    mockStore.expectDispatchFor(showConfirmationDialogDispatchSpy, {
                        title: { key: 'COLLECTION.INDEX.CONFIRMATION_TITLE', values: { collectionName: 'test collection' } },
                        message: { key: 'COLLECTION.INDEX.CONFIRMATION_SUBTITLE', values: { collectionName: 'test collection' } },
                        decline: 'COLLECTION.INDEX.CONFIRMATION_CANCEL_BTN_TITLE',
                        accept: 'COLLECTION.INDEX.CONFIRMATION_DELETE_BTN_TITLE'
                    }, jasmine.any(Function));
                });
            });
            describe('deleteCollection()', function () {
                it('Should call the dialog service to open dialog which confirms delete', function () {
                    componentUnderTest.deleteCollection(1);
                    expect(mockCollectionsService.delete).toHaveBeenCalledWith(1, true);
                });
            });
            describe('search()', function () {
                beforeEach(function () { return componentUnderTest.search('dogs'); });
                it('Should update collection options on collectionContext', function () {
                    expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentSearchQuery: 'dogs' });
                });
                it('Should call the api to load collections with the specified search', function () {
                    expect(mockCollectionsService.load).toHaveBeenCalledWith('dogs', true);
                });
            });
            describe('onFilterCollections()', function () {
                beforeEach(function () { return componentUnderTest.onFilterCollections({ access: 'owner' }); });
                it('Should update collection options on collectionContext based on the passed in filter parameter', function () {
                    expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentFilter: { access: 'owner' } });
                });
                it('Should call the api to load collections with the specified filter', function () {
                    expect(mockCollectionsService.load).toHaveBeenCalledWith('owner', true);
                });
            });
            describe('onSortCollections()', function () {
                beforeEach(function () { return componentUnderTest.onSortCollections({ sort: 'descending' }); });
                it('Should update collection options on collectionContext based on the passed in sort parameter', function () {
                    expect(mockCollectionContext.updateCollectionOptions).toHaveBeenCalledWith({ currentSort: { sort: 'descending' } });
                });
                it('Should call the api to load collections with the specified sort', function () {
                    expect(mockCollectionsService.load).toHaveBeenCalledWith('descending', true);
                });
            });
            describe('isActiveCollection()', function () {
                it('Should true if the passed in id parameter matches that of the active collection', function () {
                    expect(componentUnderTest.isActiveCollection(123)).toEqual(true);
                });
                it('Should false if the passed in id parameter matches that of the active collection', function () {
                    expect(componentUnderTest.isActiveCollection(12)).toEqual(false);
                });
            });
            describe('getAssetsForLink()', function () {
                it('Should call the API to getItems with the correct collectionId', function () {
                    componentUnderTest.getAssetsForLink(123);
                    expect(mockCollectionsService.getItems).toHaveBeenCalledWith(123);
                });
                it('Should call the dialog service to open the collection link dialog', function () {
                    componentUnderTest.getAssetsForLink(123);
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
            describe('duplicateCollection()', function () {
                beforeEach(function () { return componentUnderTest.onDuplicateCollection(1); });
                it('Should call the collection end point with the correct ID', function () {
                    expect(mockCollectionsService.getByIdAndDuplicate).toHaveBeenCalledWith(1);
                });
                it('Should call the dialog service to open the duplicate collection form in a dialog', function () {
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
            describe('showShareMembers()', function () {
                it('Should call the dialog service to open the share members dialog', function () {
                    componentUnderTest.showShareMembers(({ id: 123, name: 'Collection name', owner: 123 }));
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
                });
            });
            describe('onCreateShareDialog()', function () {
                it('Should call the dialog service to open the collection sharing dialog', function () {
                    componentUnderTest.onCreateShareDialog({ id: 123, name: 'Collection name', owner: 123 });
                    expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
                        componentType: jasmine.any(Function),
                        dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
                        inputOptions: {
                            reloadType: 'collections',
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
        });
    });
}
exports.main = main;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi8raW5kZXgvY29sbGVjdGlvbnMuY29tcG9uZW50LnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRUFBK0Q7QUFDL0QsOENBQTZDO0FBQzdDLDBFQUF1RTtBQUV2RTtJQUNFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUNoQyxJQUFJLGtCQUF3QyxDQUFDO1FBQzdDLElBQUksc0JBQTJCLENBQUM7UUFDaEMsSUFBSSxpQkFBc0IsQ0FBQztRQUMzQixJQUFJLHFCQUEwQixDQUFDO1FBQy9CLElBQUksU0FBdUIsQ0FBQztRQUM1QixJQUFJLHNCQUFtQyxDQUFDO1FBQ3hDLElBQUksaUNBQThDLENBQUM7UUFFbkQsVUFBVSxDQUFDO1lBQ1Qsc0JBQXNCLEdBQUc7Z0JBQ3ZCLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDO29CQUMxRixVQUFVLEVBQUU7d0JBQ1YsRUFBRSxFQUFFLEdBQUc7d0JBQ1AsTUFBTSxFQUFFOzRCQUNOLEtBQUssRUFBRTtnQ0FDTCxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0NBQ2hFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NkJBQy9EO3lCQUNGO3FCQUNGO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxRQUFRLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDO29CQUNwRSxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFOzRCQUNMLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDaEUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTt5QkFDL0Q7cUJBQ0Y7aUJBQ0YsQ0FBQyxDQUFDO2dCQUNILE1BQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLElBQUksRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsdUJBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkUsQ0FBQztZQUVGLGlCQUFpQixHQUFHO2dCQUNsQixxQkFBcUIsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO2FBQ2xFLENBQUM7WUFFRixxQkFBcUIsR0FBRztnQkFDdEIsSUFBSSxFQUFFLHVCQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLENBQUM7Z0JBQzNELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7YUFDdEUsQ0FBQztZQUVGLFNBQVMsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztZQUMvQixTQUFTLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUU7Z0JBQy9DLFVBQVUsRUFBRTtvQkFDVixFQUFFLEVBQUUsR0FBRztvQkFDUCxNQUFNLEVBQUU7d0JBQ04sS0FBSyxFQUFFOzRCQUNMLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTs0QkFDekQsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRTt5QkFDeEQ7cUJBQ0Y7b0JBQ0QsTUFBTSxFQUFFLElBQUk7aUJBQ2I7YUFDRixDQUFDLENBQUM7WUFDSCxTQUFTLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekcsc0JBQXNCLEdBQUcsU0FBUyxDQUFDLHlCQUF5QixDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hGLGlDQUFpQyxHQUFHLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUV0RyxrQkFBa0IsR0FBRyxJQUFJLDRDQUFvQixDQUMzQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsQ0FDeEYsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFO1lBQ25DLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRTtnQkFDaEQsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtvQkFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDbkIsRUFBRSxFQUFFLEdBQUc7d0JBQ1AsTUFBTSxFQUFFOzRCQUNOLEtBQUssRUFBRTtnQ0FDTCxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0NBQ3pELEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NkJBQ3hEO3lCQUNGO3dCQUNELE1BQU0sRUFBRSxJQUFJO3FCQUNiLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFO2dCQUNuQyxFQUFFLENBQUMsOERBQThELEVBQUU7b0JBQ2pFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEUsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHlCQUF5QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFO2dCQUNuQyxFQUFFLENBQUMsaUVBQWlFLEVBQUU7b0JBQ3BFLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTtnQkFDM0IsRUFBRSxDQUFDLDZFQUE2RSxFQUFFO29CQUNoRixrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDcEYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDN0IsRUFBRSxDQUFDLDZFQUE2RSxFQUFFO29CQUNoRixrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN0QyxNQUFNLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNyRSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLDBCQUEwQixFQUFFO2dCQUNuQyxFQUFFLENBQUMscUVBQXFFLEVBQUU7b0JBQ3hFLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzVGLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxpQ0FBaUMsRUFBRTt3QkFDN0QsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sRUFBRSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFO3dCQUNwRyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSxFQUFFLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFFLEVBQUU7d0JBQ3pHLE9BQU8sRUFBRSxnREFBZ0Q7d0JBQ3pELE1BQU0sRUFBRSxnREFBZ0Q7cUJBQ3pELEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixFQUFFLENBQUMscUVBQXFFLEVBQUU7b0JBQ3hFLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxNQUFNLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztnQkFDcEQsRUFBRSxDQUFDLHVEQUF1RCxFQUFFO29CQUUxRCxNQUFNLENBQUMscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzdHLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxtRUFBbUUsRUFBRTtvQkFFdEUsTUFBTSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekUsQ0FBQyxDQUFDLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDaEMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDLENBQUM7Z0JBQzlFLEVBQUUsQ0FBQywrRkFBK0YsRUFBRTtvQkFFbEcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLHVCQUF1QixDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNySCxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsbUVBQW1FLEVBQUU7b0JBRXRFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzFFLENBQUMsQ0FBQyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7Z0JBQzlCLFVBQVUsQ0FBQyxjQUFNLE9BQUEsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUMsRUFBNUQsQ0FBNEQsQ0FBQyxDQUFDO2dCQUMvRSxFQUFFLENBQUMsNkZBQTZGLEVBQUU7b0JBRWhHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDdEgsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGlFQUFpRSxFQUFFO29CQUNwRSxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMvRSxDQUFDLENBQUMsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1lBRUgsUUFBUSxDQUFDLHNCQUFzQixFQUFFO2dCQUUvQixFQUFFLENBQUMsaUZBQWlGLEVBQUU7b0JBQ3BGLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLGtGQUFrRixFQUFFO29CQUNyRixNQUFNLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsQ0FBQyxDQUFDO1lBRUwsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7Z0JBRTdCLEVBQUUsQ0FBQywrREFBK0QsRUFBRTtvQkFDbEUsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFcEUsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsRUFBRSxDQUFDLG1FQUFtRSxFQUFFO29CQUN0RSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDckUsQ0FBQyxDQUFDLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDaEMsVUFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDO2dCQUU5RCxFQUFFLENBQUMsMERBQTBELEVBQUU7b0JBQzdELE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RSxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsa0ZBQWtGLEVBQUU7b0JBQ3JGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7Z0JBRTdCLEVBQUUsQ0FBQyxpRUFBaUUsRUFBRTtvQkFDcEUsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3JFLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2hDLEVBQUUsQ0FBQyxzRUFBc0UsRUFBRTtvQkFDekUsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDekYsTUFBTSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsb0JBQW9CLENBQUM7d0JBQ25FLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzt3QkFDcEMsWUFBWSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRTt3QkFDeEUsWUFBWSxFQUFFOzRCQUNaLFVBQVUsRUFBRSxhQUFhOzRCQUN6QixVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO3lCQUM3RDt3QkFDRCxhQUFhLEVBQUUsQ0FBQztnQ0FDZCxLQUFLLEVBQUUsY0FBYztnQ0FDckIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2dDQUMvQixZQUFZLEVBQUUsSUFBSTs2QkFDbkIsQ0FBQztxQkFDSCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBOU9ELG9CQThPQyIsImZpbGUiOiJhcHAvK2NvbGxlY3Rpb24vK2luZGV4L2NvbGxlY3Rpb25zLmNvbXBvbmVudC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sbGVjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbGxlY3Rpb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IE1vY2tBcHBTdG9yZSB9IGZyb20gJy4uLy4uL3N0b3JlL3NwZWMtaGVscGVycy9tb2NrLWFwcC5zdG9yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluKCkge1xuICBkZXNjcmliZSgnQ29sbGVjdGlvbnMgQ29tcG9uZW50JywgKCkgPT4ge1xuICAgIGxldCBjb21wb25lbnRVbmRlclRlc3Q6IENvbGxlY3Rpb25zQ29tcG9uZW50O1xuICAgIGxldCBtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tEaWFsb2dTZXJ2aWNlOiBhbnk7XG4gICAgbGV0IG1vY2tDb2xsZWN0aW9uQ29udGV4dDogYW55O1xuICAgIGxldCBtb2NrU3RvcmU6IE1vY2tBcHBTdG9yZTtcbiAgICBsZXQgYWN0aXZlQ29sbGVjdGlvblNldHRlcjogamFzbWluZS5TcHk7XG4gICAgbGV0IHNob3dDb25maXJtYXRpb25EaWFsb2dEaXNwYXRjaFNweTogamFzbWluZS5TcHk7XG5cbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgIG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UgPSB7XG4gICAgICAgIGdldEJ5SWRBbmREdXBsaWNhdGU6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRCeUlkQW5kRHVwbGljYXRlJykuYW5kLnJldHVyblZhbHVlKE9ic2VydmFibGUub2Yoe1xuICAgICAgICAgIGNvbGxlY3Rpb246IHtcbiAgICAgICAgICAgIGlkOiAxMjMsXG4gICAgICAgICAgICBhc3NldHM6IHtcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGlkOiAxMjMsIHV1aWQ6ICdzbGtkamYtbHNrZGpmJywgdGltZVN0YXJ0OiAxMjMsIHRpbWVFbmQ6IDQ1NiB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6IDQ1NiwgdXVpZDogJ3dvaWV1ci1vd2lzbGQnLCB0aW1lU3RhcnQ6IC0xLCB0aW1lRW5kOiAtMiB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pKSxcbiAgICAgICAgZ2V0SXRlbXM6IGphc21pbmUuY3JlYXRlU3B5KCdnZXRJdGVtcycpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHtcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IGlkOiAxMjMsIHV1aWQ6ICdzbGtkamYtbHNrZGpmJywgdGltZVN0YXJ0OiAxMjMsIHRpbWVFbmQ6IDQ1NiB9LFxuICAgICAgICAgICAgICB7IGlkOiA0NTYsIHV1aWQ6ICd3b2lldXItb3dpc2xkJywgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpLFxuICAgICAgICBkZWxldGU6IGphc21pbmUuY3JlYXRlU3B5KCdkZWxldGUnKS5hbmQucmV0dXJuVmFsdWUoT2JzZXJ2YWJsZS5vZih7fSkpLFxuICAgICAgICBsb2FkOiBqYXNtaW5lLmNyZWF0ZVNweSgnbG9hZCcpLmFuZC5yZXR1cm5WYWx1ZShPYnNlcnZhYmxlLm9mKHt9KSlcbiAgICAgIH07XG5cbiAgICAgIG1vY2tEaWFsb2dTZXJ2aWNlID0ge1xuICAgICAgICBvcGVuQ29tcG9uZW50SW5EaWFsb2c6IGphc21pbmUuY3JlYXRlU3B5KCdvcGVuQ29tcG9uZW50SW5EaWFsb2cnKVxuICAgICAgfTtcblxuICAgICAgbW9ja0NvbGxlY3Rpb25Db250ZXh0ID0ge1xuICAgICAgICBkYXRhOiBPYnNlcnZhYmxlLm9mKHsgbW9ja0NvbGxlY3Rpb25Db250ZXh0OiAnbW9jayBkYXRhJyB9KSxcbiAgICAgICAgdXBkYXRlQ29sbGVjdGlvbk9wdGlvbnM6IGphc21pbmUuY3JlYXRlU3B5KCd1cGRhdGVDb2xsZWN0aW9uT3B0aW9ucycpXG4gICAgICB9O1xuXG4gICAgICBtb2NrU3RvcmUgPSBuZXcgTW9ja0FwcFN0b3JlKCk7XG4gICAgICBtb2NrU3RvcmUuY3JlYXRlU3RhdGVTZWN0aW9uKCdhY3RpdmVDb2xsZWN0aW9uJywge1xuICAgICAgICBjb2xsZWN0aW9uOiB7XG4gICAgICAgICAgaWQ6IDEyMyxcbiAgICAgICAgICBhc3NldHM6IHtcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6IDEyMywgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogMTIzLCB0aW1lRW5kOiA0NTYgfSxcbiAgICAgICAgICAgICAgeyBpZDogNDU2LCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAtMSwgdGltZUVuZDogLTIgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbG9hZGVkOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbW9ja1N0b3JlLmNyZWF0ZVN0YXRlU2VjdGlvbigndWlDb25maWcnLCB7IGNvbXBvbmVudHM6IHsgY29sbGVjdGlvbjogeyBjb25maWc6IHsgc29tZTogJ2NvbmZpZycgfSB9IH0gfSk7XG4gICAgICBhY3RpdmVDb2xsZWN0aW9uU2V0dGVyID0gbW9ja1N0b3JlLmNyZWF0ZUFjdGlvbkZhY3RvcnlNZXRob2QoJ2FjdGl2ZUNvbGxlY3Rpb24nLCAnc2V0Jyk7XG4gICAgICBzaG93Q29uZmlybWF0aW9uRGlhbG9nRGlzcGF0Y2hTcHkgPSBtb2NrU3RvcmUuY3JlYXRlQWN0aW9uRmFjdG9yeU1ldGhvZCgnZGlhbG9nJywgJ3Nob3dDb25maXJtYXRpb24nKTtcblxuICAgICAgY29tcG9uZW50VW5kZXJUZXN0ID0gbmV3IENvbGxlY3Rpb25zQ29tcG9uZW50KFxuICAgICAgICBudWxsLCBtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLCBtb2NrQ29sbGVjdGlvbkNvbnRleHQsIG51bGwsIG1vY2tEaWFsb2dTZXJ2aWNlLCBtb2NrU3RvcmVcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWN0aXZlQ29sbGVjdGlvbigpIC0gZ2V0JywgKCkgPT4ge1xuICAgICAgaXQoJ1Nob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgYWN0aXZlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5hY3RpdmVDb2xsZWN0aW9uLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICBleHBlY3QoZGF0YSkudG9FcXVhbCh7XG4gICAgICAgICAgICBpZDogMTIzLFxuICAgICAgICAgICAgYXNzZXRzOiB7XG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBpZDogMTIzLCBvdGhlcjogJ3N0dWZmJywgdGltZVN0YXJ0OiAxMjMsIHRpbWVFbmQ6IDQ1NiB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6IDQ1Niwgb3RoZXI6ICdzdHVmZicsIHRpbWVTdGFydDogLTEsIHRpbWVFbmQ6IC0yIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYWRlZDogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgndG9nZ2xlQ29sbGVjdGlvblNlYXJjaCgpJywgKCkgPT4ge1xuICAgICAgICBpdCgnc2hvdWxkIHRvZ2dsZSB0aGUgYm9vbGVhbiBjb2xsZWN0aW9uU2VhcmNoSXNTaG93aW5nIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChjb21wb25lbnRVbmRlclRlc3QuY29sbGVjdGlvblNlYXJjaElzU2hvd2luZykudG9FcXVhbChmYWxzZSk7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnRvZ2dsZUNvbGxlY3Rpb25TZWFyY2goKTtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmNvbGxlY3Rpb25TZWFyY2hJc1Nob3dpbmcpLnRvRXF1YWwodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdzZWxlY3RBY3RpdmVDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdTaG91bGQgc2V0IHRoZSBhY3RpdmUgY29sbGVjdGlvbiB3aXRoIHRoZSBpZCBwYXJhbWF0ZXIgc3VwcGxpZWQnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNlbGVjdEFjdGl2ZUNvbGxlY3Rpb24oMSk7XG4gICAgICAgICAgZXhwZWN0KGFjdGl2ZUNvbGxlY3Rpb25TZXR0ZXIpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZWRpdENvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBkaWFsb2cgc2VydmljZSB0byBvcGVuIHRoZSBlZGl0IGNvbGxlY3Rpb24gZm9ybSBpbiBhIGRpYWxvZycsICgpID0+IHtcbiAgICAgICAgICBjb21wb25lbnRVbmRlclRlc3QuZWRpdENvbGxlY3Rpb24oeyBpZDogMTIzLCBuYW1lOiAnQ29sbGVjdGlvbiBuYW1lJywgb3duZXI6IDEyMyB9KTtcbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdjcmVhdGVDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiB0aGUgZWRpdCBjb2xsZWN0aW9uIGZvcm0gaW4gYSBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmNyZWF0ZUNvbGxlY3Rpb24oKTtcbiAgICAgICAgICBleHBlY3QobW9ja0RpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKS50b0hhdmVCZWVuQ2FsbGVkKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdzZXRDb2xsZWN0aW9uRm9yRGVsZXRlKCknLCAoKSA9PiB7XG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiBkaWFsb2cgd2hpY2ggY29uZmlybXMgZGVsZXRlJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5zZXRDb2xsZWN0aW9uRm9yRGVsZXRlKHsgaWQ6IDEyMywgbmFtZTogJ3Rlc3QgY29sbGVjdGlvbicsIG93bmVyOiAxMjMgfSk7XG4gICAgICAgICAgbW9ja1N0b3JlLmV4cGVjdERpc3BhdGNoRm9yKHNob3dDb25maXJtYXRpb25EaWFsb2dEaXNwYXRjaFNweSwge1xuICAgICAgICAgICAgdGl0bGU6IHsga2V5OiAnQ09MTEVDVElPTi5JTkRFWC5DT05GSVJNQVRJT05fVElUTEUnLCB2YWx1ZXM6IHsgY29sbGVjdGlvbk5hbWU6ICd0ZXN0IGNvbGxlY3Rpb24nIH0gfSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsga2V5OiAnQ09MTEVDVElPTi5JTkRFWC5DT05GSVJNQVRJT05fU1VCVElUTEUnLCB2YWx1ZXM6IHsgY29sbGVjdGlvbk5hbWU6ICd0ZXN0IGNvbGxlY3Rpb24nIH0gfSxcbiAgICAgICAgICAgIGRlY2xpbmU6ICdDT0xMRUNUSU9OLklOREVYLkNPTkZJUk1BVElPTl9DQU5DRUxfQlROX1RJVExFJyxcbiAgICAgICAgICAgIGFjY2VwdDogJ0NPTExFQ1RJT04uSU5ERVguQ09ORklSTUFUSU9OX0RFTEVURV9CVE5fVElUTEUnXG4gICAgICAgICAgfSwgamFzbWluZS5hbnkoRnVuY3Rpb24pKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ2RlbGV0ZUNvbGxlY3Rpb24oKScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBkaWFsb2cgc2VydmljZSB0byBvcGVuIGRpYWxvZyB3aGljaCBjb25maXJtcyBkZWxldGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LmRlbGV0ZUNvbGxlY3Rpb24oMSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UuZGVsZXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgxLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ3NlYXJjaCgpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IGNvbXBvbmVudFVuZGVyVGVzdC5zZWFyY2goJ2RvZ3MnKSk7XG4gICAgICAgIGl0KCdTaG91bGQgdXBkYXRlIGNvbGxlY3Rpb24gb3B0aW9ucyBvbiBjb2xsZWN0aW9uQ29udGV4dCcsICgpID0+IHtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbkNvbnRleHQudXBkYXRlQ29sbGVjdGlvbk9wdGlvbnMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKHsgY3VycmVudFNlYXJjaFF1ZXJ5OiAnZG9ncycgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgYXBpIHRvIGxvYWQgY29sbGVjdGlvbnMgd2l0aCB0aGUgc3BlY2lmaWVkIHNlYXJjaCcsICgpID0+IHtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdkb2dzJywgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ29uRmlsdGVyQ29sbGVjdGlvbnMoKScsICgpID0+IHtcbiAgICAgICAgYmVmb3JlRWFjaCgoKSA9PiBjb21wb25lbnRVbmRlclRlc3Qub25GaWx0ZXJDb2xsZWN0aW9ucyh7IGFjY2VzczogJ293bmVyJyB9KSk7XG4gICAgICAgIGl0KCdTaG91bGQgdXBkYXRlIGNvbGxlY3Rpb24gb3B0aW9ucyBvbiBjb2xsZWN0aW9uQ29udGV4dCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIGZpbHRlciBwYXJhbWV0ZXInLCAoKSA9PiB7XG5cbiAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25Db250ZXh0LnVwZGF0ZUNvbGxlY3Rpb25PcHRpb25zKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCh7IGN1cnJlbnRGaWx0ZXI6IHsgYWNjZXNzOiAnb3duZXInIH0gfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgYXBpIHRvIGxvYWQgY29sbGVjdGlvbnMgd2l0aCB0aGUgc3BlY2lmaWVkIGZpbHRlcicsICgpID0+IHtcblxuICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCdvd25lcicsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdvblNvcnRDb2xsZWN0aW9ucygpJywgKCkgPT4ge1xuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IGNvbXBvbmVudFVuZGVyVGVzdC5vblNvcnRDb2xsZWN0aW9ucyh7IHNvcnQ6ICdkZXNjZW5kaW5nJyB9KSk7XG4gICAgICAgIGl0KCdTaG91bGQgdXBkYXRlIGNvbGxlY3Rpb24gb3B0aW9ucyBvbiBjb2xsZWN0aW9uQ29udGV4dCBiYXNlZCBvbiB0aGUgcGFzc2VkIGluIHNvcnQgcGFyYW1ldGVyJywgKCkgPT4ge1xuXG4gICAgICAgICAgZXhwZWN0KG1vY2tDb2xsZWN0aW9uQ29udGV4dC51cGRhdGVDb2xsZWN0aW9uT3B0aW9ucykudG9IYXZlQmVlbkNhbGxlZFdpdGgoeyBjdXJyZW50U29ydDogeyBzb3J0OiAnZGVzY2VuZGluZycgfSB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBhcGkgdG8gbG9hZCBjb2xsZWN0aW9ucyB3aXRoIHRoZSBzcGVjaWZpZWQgc29ydCcsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QobW9ja0NvbGxlY3Rpb25zU2VydmljZS5sb2FkKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgnZGVzY2VuZGluZycsIHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdpc0FjdGl2ZUNvbGxlY3Rpb24oKScsICgpID0+IHtcblxuICAgICAgICBpdCgnU2hvdWxkIHRydWUgaWYgdGhlIHBhc3NlZCBpbiBpZCBwYXJhbWV0ZXIgbWF0Y2hlcyB0aGF0IG9mIHRoZSBhY3RpdmUgY29sbGVjdGlvbicsICgpID0+IHtcbiAgICAgICAgICBleHBlY3QoY29tcG9uZW50VW5kZXJUZXN0LmlzQWN0aXZlQ29sbGVjdGlvbigxMjMpKS50b0VxdWFsKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIGZhbHNlIGlmIHRoZSBwYXNzZWQgaW4gaWQgcGFyYW1ldGVyIG1hdGNoZXMgdGhhdCBvZiB0aGUgYWN0aXZlIGNvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGNvbXBvbmVudFVuZGVyVGVzdC5pc0FjdGl2ZUNvbGxlY3Rpb24oMTIpKS50b0VxdWFsKGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZ2V0QXNzZXRzRm9yTGluaygpJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgQVBJIHRvIGdldEl0ZW1zIHdpdGggdGhlIGNvcnJlY3QgY29sbGVjdGlvbklkJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5nZXRBc3NldHNGb3JMaW5rKDEyMyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tDb2xsZWN0aW9uc1NlcnZpY2UuZ2V0SXRlbXMpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEyMyk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBkaWFsb2cgc2VydmljZSB0byBvcGVuIHRoZSBjb2xsZWN0aW9uIGxpbmsgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5nZXRBc3NldHNGb3JMaW5rKDEyMyk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdkdXBsaWNhdGVDb2xsZWN0aW9uKCknLCAoKSA9PiB7XG4gICAgICAgIGJlZm9yZUVhY2goKCkgPT4gY29tcG9uZW50VW5kZXJUZXN0Lm9uRHVwbGljYXRlQ29sbGVjdGlvbigxKSk7XG5cbiAgICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBjb2xsZWN0aW9uIGVuZCBwb2ludCB3aXRoIHRoZSBjb3JyZWN0IElEJywgKCkgPT4ge1xuICAgICAgICAgIGV4cGVjdChtb2NrQ29sbGVjdGlvbnNTZXJ2aWNlLmdldEJ5SWRBbmREdXBsaWNhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnU2hvdWxkIGNhbGwgdGhlIGRpYWxvZyBzZXJ2aWNlIHRvIG9wZW4gdGhlIGR1cGxpY2F0ZSBjb2xsZWN0aW9uIGZvcm0gaW4gYSBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnc2hvd1NoYXJlTWVtYmVycygpJywgKCkgPT4ge1xuXG4gICAgICAgIGl0KCdTaG91bGQgY2FsbCB0aGUgZGlhbG9nIHNlcnZpY2UgdG8gb3BlbiB0aGUgc2hhcmUgbWVtYmVycyBkaWFsb2cnLCAoKSA9PiB7XG4gICAgICAgICAgY29tcG9uZW50VW5kZXJUZXN0LnNob3dTaGFyZU1lbWJlcnMoKHsgaWQ6IDEyMywgbmFtZTogJ0NvbGxlY3Rpb24gbmFtZScsIG93bmVyOiAxMjMgfSkpO1xuICAgICAgICAgIGV4cGVjdChtb2NrRGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2cpLnRvSGF2ZUJlZW5DYWxsZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgZGVzY3JpYmUoJ29uQ3JlYXRlU2hhcmVEaWFsb2coKScsICgpID0+IHtcbiAgICAgICAgaXQoJ1Nob3VsZCBjYWxsIHRoZSBkaWFsb2cgc2VydmljZSB0byBvcGVuIHRoZSBjb2xsZWN0aW9uIHNoYXJpbmcgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICAgIGNvbXBvbmVudFVuZGVyVGVzdC5vbkNyZWF0ZVNoYXJlRGlhbG9nKHsgaWQ6IDEyMywgbmFtZTogJ0NvbGxlY3Rpb24gbmFtZScsIG93bmVyOiAxMjMgfSk7XG4gICAgICAgICAgZXhwZWN0KG1vY2tEaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZykudG9IYXZlQmVlbkNhbGxlZFdpdGgoe1xuICAgICAgICAgICAgY29tcG9uZW50VHlwZTogamFzbWluZS5hbnkoRnVuY3Rpb24pLFxuICAgICAgICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzMlJyB9LCBwYW5lbENsYXNzOiAnd3otc2hhcmUtZGlhbG9nJyB9LFxuICAgICAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHJlbG9hZFR5cGU6ICdjb2xsZWN0aW9ucycsXG4gICAgICAgICAgICAgIGNvbGxlY3Rpb246IHsgaWQ6IDEyMywgbmFtZTogJ0NvbGxlY3Rpb24gbmFtZScsIG93bmVyOiAxMjMgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICAgICAgICBldmVudDogJ2Nsb3NlUmVxdWVzdCcsXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBqYXNtaW5lLmFueShGdW5jdGlvbiksXG4gICAgICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICAgICAgfV1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iXX0=

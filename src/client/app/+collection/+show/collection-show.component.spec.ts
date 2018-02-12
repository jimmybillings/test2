import { Common } from '../../shared/utilities/common.functions';
import { CollectionShareComponent } from '../components/collection-share.component';
import { Observable } from 'rxjs/Observable';
import { CollectionShowComponent } from './collection-show.component';
import { Collection } from '../../shared/interfaces/collection.interface';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';
import { Frame } from '../../shared/modules/wazee-frame-formatter/index';

export function main() {
  describe('Collection Show Component', () => {
    let componentUnderTest: CollectionShowComponent;
    let mockStore: MockAppStore;
    let mockWindow: any;
    let mockCapabilitiesService: any;
    let mockChangeDetectorRef: any;
    let mockRoute: any;
    let getCountsSpy: jasmine.Spy;
    let mockCollectionsService: any;
    let mockDialogService: any;
    let mockRouter: any;
    let handleCustomErrorSpy: jasmine.Spy;
    let snackBarDisplaySpy: jasmine.Spy;
    let canAdministerQuotes: boolean = true;
    let mockCartService: any;
    let mockDocumentService: any;
    let mockUserPreferenceService: any;
    let showConfirmationDialogDispatchSpy: jasmine.Spy;


    beforeEach(() => {
      mockWindow = { nativeWindow: { location: { href: {} }, innerWidth: 200 } };

      mockRouter = { navigate: jasmine.createSpy('navigate') };

      mockCapabilitiesService = {
        editCollection: jasmine.createSpy('editCollection').and.returnValue(Observable.of(true)),
        administerQuotes: () => canAdministerQuotes
      };

      mockChangeDetectorRef = { markForCheck: jasmine.createSpy('markForCheck') };

      mockCollectionsService = {
        getByIdAndDuplicate: jasmine.createSpy('getByIdAndDuplicate').and.returnValue(Observable.of({
          collection: {
            id: 123, assets: {
              items: [
                { id: 123, uuid: 'slkdjf-lskdjf', timeStart: 123, timeEnd: 456 },
                { id: 456, uuid: 'woieur-owisld', timeStart: -1, timeEnd: -2 }
              ]
            }
          }
        })),
        delete: jasmine.createSpy('delete').and.returnValue(Observable.of({}))
      };

      mockRoute = { params: Observable.of({ id: 1, some: 'params' }) };

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.returnValue(Observable.of({}))
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

      mockStore = new MockAppStore();
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

      componentUnderTest = new CollectionShowComponent(
        mockCapabilitiesService, mockRouter, mockCollectionsService, mockCartService,
        mockUserPreferenceService, mockRoute, mockWindow, mockDialogService,
        mockDocumentService, mockStore, mockChangeDetectorRef
      );
    });

    describe('ngOnInit()', () => {
      describe('with a valid active collection', () => {
        beforeEach(() => {
          componentUnderTest.ngOnInit();
        });

        it('calls getCounts on the comment action factory', () => {
          expect(getCountsSpy).toHaveBeenCalled();
        });

        it('sets up the commentParentObject instance variable', () => {
          expect(componentUnderTest.commentParentObject).toEqual({ objectType: 'collection', objectId: 123 });
        });

        it('sets up the config instance vars', () => {
          expect(componentUnderTest.commentFormConfig).toEqual([{ some: 'commentConfig' }]);
          expect(componentUnderTest.newCollectionFormConfig).toEqual({ some: 'collectionConfig' });
        });
      });

      describe('with an invalid active collection (without an id)', () => {
        beforeEach(() => {
          mockStore.createStateElement('activeCollection', 'collection', { id: null });
          componentUnderTest.ngOnInit();
        });

        it('does not call getCounts on the comment action factory', () => {
          expect(getCountsSpy).not.toHaveBeenCalled();
        });

        it('does not set up the commentParentObject instance variabl', () => {
          expect(componentUnderTest.commentParentObject).toBeUndefined();
        });
      });
    });

    describe('get userCanEditCollection()', () => {
      it('should call editCollection() on the cababilities service', () => {
        componentUnderTest.ngOnInit();
        let result: Observable<boolean> = componentUnderTest.userCanEditCollection;

        result.take(1).subscribe(res => expect(res).toEqual(true));
      });
    });

    describe('toggleCommentsVisibility()', () => {
      it('should toggle the showComments flag', () => {
        componentUnderTest.showComments = false;
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(true);
        componentUnderTest.toggleCommentsVisibility();
        expect(componentUnderTest.showComments).toBe(false);
      });
    });

    describe('commentCounts getter', () => {
      it('selects the right part of the store', () => {
        let count: number;
        componentUnderTest.commentCount.subscribe(c => count = c);
        expect(count).toBe(3);
      });
    });

    describe('editCollection()', () => {

      it('Should call the dialog service to open the edit collection form in a dialog', () => {
        componentUnderTest.ngOnInit();
        componentUnderTest.editCollection();
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
      });
    });

    describe('duplicateCollection()', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
        componentUnderTest.duplicateCollection();
      });

      it('Should call the collection end point with the correct ID', () => {
        expect(mockCollectionsService.getByIdAndDuplicate).toHaveBeenCalledWith(123);
      });

      it('Should call the dialog service to open the duplicate collection form in a dialog', () => {
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
      });
    });

    describe('changePage()', () => {
      it('Should navigate to the correct page', () => {
        componentUnderTest.ngOnInit();
        componentUnderTest.changePage(3);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections/123', { some: 'params', i: 3 }]);
      });

    });

    describe('setCollectionForDelete()', () => {
      it('Should open the dialog to confirm delete of collection', () => {
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

    describe('deleteCollection()', () => {

      it('Should navigate to the collections url', () => {
        componentUnderTest.deleteCollection(1);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/collections']);
      });

      it('Should call the api with the correct collection id paramter to delete', () => {
        componentUnderTest.deleteCollection(1);
        expect(mockCollectionsService.delete).toHaveBeenCalledWith(1);
      });

      it('Should display a success toast when a collection has been succesfully completed', () => {
        componentUnderTest.deleteCollection(1);
        expect(snackBarDisplaySpy).toHaveBeenCalledWith('COLLECTION.INDEX.DELETE_SUCCESS_TOAST');
      });
    });

    describe('addAssetToCartOrQuote()', () => {
      let addAssetToQuoteSpy: jasmine.Spy;
      it('Should add an asset to Quote if user has administerQuotes permission', () => {
        addAssetToQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addAssetToProjectInQuote');
        componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
        expect(addAssetToQuoteSpy).toHaveBeenCalledWith(
          { lineItem: { asset: { assetId: 123, name: 'test asset' } } });
      });

      it('Should display a snack bar with the correct string and asset name for add to quote', () => {
        addAssetToQuoteSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addAssetToProjectInQuote');
        componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
        expect(snackBarDisplaySpy).toHaveBeenCalledWith('ASSET.ADD_TO_QUOTE_TOAST', { assetId: 'test asset' });
      });

      it('Should add an asset to Cart if user does not have administerQuotes permission', () => {
        canAdministerQuotes = false;
        componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
        expect(mockCartService.addAssetToProjectInCart).toHaveBeenCalledWith(
          { lineItem: { asset: { assetId: 123, name: 'test asset' } } });
      });

      it('Should display a snack bar with the correct string and asset name for add to quote', () => {
        canAdministerQuotes = false;
        componentUnderTest.addAssetToCartOrQuote({ assetId: 123, name: 'test asset' });
        expect(snackBarDisplaySpy).toHaveBeenCalledWith('ASSET.ADD_TO_CART_TOAST', { assetId: 'test asset' });
      });
    });

    describe('getAssetsForLink()', () => {
      it('Should call the dialog service to open the collection link dialog', () => {
        componentUnderTest.ngOnInit();
        componentUnderTest.getAssetsForLink();
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
      });
    });

    describe('editAsset', () => {
      let mockMethod: jasmine.Spy;

      beforeEach(() => {
        mockMethod = mockStore.createLegacyServiceMethod('asset', 'getClipPreviewData', Observable.of({ url: 'test url' }));
        componentUnderTest.ngOnInit();
      });

      it('calls the api to get clip preview data with the correct asset id', () => {
        componentUnderTest.editAsset({ assetId: 123, name: 'test asset' } as any);

        mockStore.expectCallFor(mockMethod, 123);
      });

      it('updates the document body with a new class', () => {
        componentUnderTest.editAsset({ assetId: 123, name: 'test asset' } as any);
        expect(mockDocumentService.body.classList.add).toHaveBeenCalledWith('subclipping-edit-open');
      });

      it('opens a dialog to edit the asset inside', () => {
        componentUnderTest.editAsset({ assetId: 123, name: 'test asset' } as any);
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
      });

      it('sends a list of already used markers for the asset in the active collection', () => {
        componentUnderTest.editAsset({ assetId: 123, name: 'test asset' } as any);

        // TODO: Test other arguments to this function.
        expect(mockDialogService.openComponentInDialog.calls.mostRecent().args[0].inputOptions.alreadyUsedMarkersList)
          .toEqual([{ in: new Frame(30).setFromFrameNumber(30), out: new Frame(30).setFromFrameNumber(60) }]);
      });

      it('removes the document body with class added in the beginning', () => {
        componentUnderTest.editAsset({ assetId: 123, name: 'test asset' } as any);
        expect(mockDocumentService.body.classList.remove).toHaveBeenCalledWith('subclipping-edit-open');
      });
    });

    describe('onChangeAssetView()', () => {
      it('Should call the userPreference service to update the asset view preference', () => {
        componentUnderTest.onChangeAssetView('grid');
        expect(mockUserPreferenceService.updateAssetViewPreference).toHaveBeenCalledWith('grid');
      });
    });

    describe('showShareMembers()', () => {
      it('Should call the dialog service to open the share members dialog', () => {
        componentUnderTest.activeCollection = { id: 123, name: 'Collection name', owner: 123 };
        componentUnderTest.showShareMembers();
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalled();
      });
    });

    describe('createShareDialog()', () => {
      it('Should call the dialog service to open the collection sharing dialog', () => {
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

    describe('addToDifferentCollection()', () => {
      it('Should call the dialog service to open the collection list component', () => {
        componentUnderTest.activeCollection = { id: 123, name: 'Collection name', owner: 123 };
        componentUnderTest.addToDifferentCollection({ some: 'asset' } as any);
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

    describe('collectionIsShared()', () => {
      it('should return true when collection has editors or viewers', () => {
        componentUnderTest.activeCollection = mockCollection();
        expect(componentUnderTest.collectionIsShared).toBe(true);
      });

      it('should return false when collection does not have editors or viewers', () => {
        componentUnderTest.activeCollection = mockCollectionNotShared();
        expect(componentUnderTest.collectionIsShared).toBe(false);
      });
    });

    describe('collectionViewerIsOwner()', () => {
      it('should return true when person viewing the collection is the owner', () => {
        componentUnderTest.activeCollection = mockCollection();
        expect(componentUnderTest.collectionViewerIsOwner).toBe(true);
      });

      it('should return false when person viewing the collection is the NOT owner', () => {
        componentUnderTest.activeCollection = mockCollectionNotOwned();
        expect(componentUnderTest.collectionViewerIsOwner).toBe(false);
      });
    });
  });
}

function mockCollection(): Collection {
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
      { id: 800, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }],
    viewers: [{ id: 5, firstName: 'Mary', lastName: 'Maze', emailAddress: 'mm@test.co' }]
  };
}

function mockCollectionNotShared(): Collection {
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

function mockCollectionNotOwned(): Collection {
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
      { id: 800, firstName: 'Ty', lastName: 'Test', emailAddress: 'ty@test.co' }]
  };
}

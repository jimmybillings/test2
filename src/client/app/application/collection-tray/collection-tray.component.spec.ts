import { Observable } from 'rxjs/Observable';
import { CollectionTrayComponent } from './collection-tray.component';
import { CollectionFormComponent } from './components/collection-form.component';
import { Asset } from '../../shared/interfaces/common.interface';
import * as EnhancedMock from '../../shared/interfaces/enhanced-asset';
import { mockAsset } from '../../shared/mocks/mock-asset';
import { MockAppStore } from '../../store/spec-helpers/mock-app.store';

export function main() {
  describe('Collection Tray Component', () => {
    let componentUnderTest: CollectionTrayComponent;
    let mockEnhancedAsset: EnhancedMock.EnhancedAsset;
    let mockAppStore: MockAppStore;
    let mockDialogService: any;
    let navigateDispatchSpy: jasmine.Spy;
    let snackBarDispatchSpy: jasmine.Spy;

    beforeEach(() => {
      mockEnhancedAsset = EnhancedMock.enhanceAsset(mockAsset, 'collection');

      mockAppStore = new MockAppStore();
      mockAppStore.createStateSection('uiConfig', {
        components: {
          collection: { config: { some: 'config' } }
        }
      });
      navigateDispatchSpy = mockAppStore.createActionFactoryMethod('router', 'goToCollection');
      snackBarDispatchSpy = mockAppStore.createActionFactoryMethod('snackbar', 'display');
      mockAppStore.createActionFactoryMethod('activeCollection', 'loadIfNeeded');

      mockDialogService = {
        openComponentInDialog: jasmine.createSpy('openComponentInDialog').and.callFake((_: any) => {
          mockDialogService.onSubmitCallback = _.outputOptions[0].callback;
        })
      };

      componentUnderTest = new CollectionTrayComponent(mockDialogService, mockAppStore, null);

      componentUnderTest.collection = { assets: { items: [EnhancedMock.enhanceAsset(mockAsset, 'collection')] } } as any;
      componentUnderTest.urlPath = '/collections/';
    });

    describe('hasId()', () => {
      it('returns true when the asset exists and has an id', () => {
        expect(componentUnderTest.hasId({ assetId: 47 } as EnhancedMock.EnhancedAsset)).toBe(true);
      });

      it('returns false when the asset is undefined', () => {
        expect(componentUnderTest.hasId(undefined)).toBe(false);
      });

      it('returns false when the asset is null', () => {
        expect(componentUnderTest.hasId(null)).toBe(false);
      });

      it('returns false when the asset doesn\'t have an id', () => {
        expect(componentUnderTest.hasId({} as EnhancedMock.EnhancedAsset)).toBe(false);
      });
    });

    describe('routerLinkFor()', () => {
      it('returns the enhanced asset\'s router link array', () => {
        expect(componentUnderTest.routerLinkFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.routerLink);
      });
    });

    describe('hasThumbnail()', () => {
      it('returns true if the asset has a thumbnail URL', () => {
        expect(componentUnderTest.hasThumbnail(mockEnhancedAsset)).toBe(true);
      });
    });

    describe('thumbnailUrlFor()', () => {
      it('returns the thumbnail URL for the asset', () => {
        expect(componentUnderTest.thumbnailUrlFor(mockEnhancedAsset)).toEqual(mockEnhancedAsset.thumbnailUrl);
      });
    });

    describe('createCollection', () => {
      beforeEach(() => {
        componentUnderTest.ngOnInit();
        componentUnderTest.createCollection();
      });


      it('calls openComponentInDialog on the dialog service', () => {
        expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
          componentType: CollectionFormComponent,
          dialogConfig: { position: { top: '10%' } },
          inputOptions: {
            fields: { some: 'config' },
            collectionActionType: 'create'
          },
          outputOptions: [{
            event: 'collectionSaved',
            callback: jasmine.any(Function),
            closeOnEvent: true
          }]
        });
      });

      describe('createCollectionlistDialog()', () => {
        it('Should call the dialog service to open the asset sharing dialog', () => {
          componentUnderTest.collection = { id: 1, name: 'some collection' } as any;
          componentUnderTest.collectionFormConfig = { config: 'some config' } as any;
          componentUnderTest.createCollectionlistDialog();
          expect(mockDialogService.openComponentInDialog).toHaveBeenCalledWith({
            componentType: jasmine.any(Function),
            dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
            inputOptions: {
              focusedCollection: componentUnderTest.collection,
            },
            outputOptions: [{
              event: 'close',
              callback: jasmine.any(Function),
              closeOnEvent: true
            }]
          });
        });
      });

      describe('dispatches the proper action when the callback is called', () => {
        it('Should redirect to the collection show if currently on the collection show page.', () => {
          componentUnderTest.urlPath = '/collections/';
          mockDialogService.onSubmitCallback({ collectionId: 123 });

          mockAppStore.expectDispatchFor(navigateDispatchSpy, 123);
        });
        it('Should just display a snackbar if on any other page.', () => {
          componentUnderTest.urlPath = '/collections';
          mockDialogService.onSubmitCallback({ collectionId: 123 });

          mockAppStore.expectDispatchFor(snackBarDispatchSpy, 'COLLECTION.COLLECTION_CREATED');
        });
      });
    });
  });
}

import { ActiveCollectionEffects } from './active-collection.effects';
import * as ActiveCollectionActions from './active-collection.actions';
import { EffectsSpecHelper, EffectTestParameters, EffectTestState } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Active Collection Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();
    let mockUserPreferenceService: any;

    function instantiator(): ActiveCollectionEffects {
      return new ActiveCollectionEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService,
        mockUserPreferenceService
      );
    }

    beforeEach(() => {
      mockUserPreferenceService = { openCollectionTray: jasmine.createSpy('openCollectionTray') };
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.Load.Type,
        pagination: { some: 'pagination' }
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [{ some: 'pagination' }],
        returnsObservableOf: { some: 'collection' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'loadSuccess',
          expectedArguments: [{ some: 'collection' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadIfNeeded',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.LoadIfNeeded.Type,
        pagination: { some: 'pagination' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { id: null }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'load',
          expectedArguments: [{ some: 'pagination' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadIfNeeded',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.LoadIfNeeded.Type,
        pagination: { some: 'pagination' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { id: 123 }
      },
      expectToEmitAction: false
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'set',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.Set.Type,
        collectionId: 42,
        pagination: { some: 'pagination' }
      },
      serviceMethod: {
        name: 'set',
        expectedArguments: [42, { some: 'pagination' }],
        returnsObservableOf: { some: 'collection' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'setSuccess',
          expectedArguments: [{ some: 'collection' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadPage',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.LoadPage.Type,
        pagination: { some: 'pagination' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { id: 123 }
      },
      serviceMethod: {
        name: 'loadPage',
        expectedArguments: [123, { some: 'pagination' }],
        returnsObservableOf: { some: 'collection' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'loadPageSuccess',
          expectedArguments: [{ some: 'collection' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'openTrayOnAddOrRemove',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.AddAsset.Type
      },
      customTests: [{
        it: 'works for AddAsset action',
        expectation: () => {
          expect(mockUserPreferenceService.openCollectionTray).toHaveBeenCalled();
        }
      }]
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'openTrayOnAddOrRemove',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.RemoveAsset.Type
      },
      customTests: [{
        it: 'works for RemoveAsset action',
        expectation: () => {
          expect(mockUserPreferenceService.openCollectionTray).toHaveBeenCalled();
        }
      }]
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'addAsset',
      comment: 'with a new asset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.AddAsset.Type,
        asset: { some: 'asset' },
        markers: { some: 'markers' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { some: 'collection' }
      },
      serviceMethod: {
        name: 'addAssetTo',
        expectedArguments: [{ some: 'collection' }, { some: 'asset' }, { some: 'markers' }],
        returnsObservableOf: { items: ['something'] }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'addAssetSuccess',
          expectedArguments: [{ items: ['something'] }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'addAsset',
      comment: 'with an asset already in the collection',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.AddAsset.Type,
        asset: { some: 'asset' },
        markers: { some: 'markers' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { name: 'some-collection' }
      },
      serviceMethod: {
        name: 'addAssetTo',
        expectedArguments: [{ name: 'some-collection' }, { some: 'asset' }, { some: 'markers' }],
        returnsObservableOf: { items: [] }
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COLLECTION.ALREADY_IN_COLLECTION_TOAST', { collectionName: 'some-collection' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'showSnackBarOnAddSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.AddAssetSuccess.Type,
        currentPage: { some: 'assets' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { name: 'someCollectionName' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COLLECTION.ADD_TO_COLLECTION_TOAST', { collectionName: 'someCollectionName' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'removeAsset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.RemoveAsset.Type,
        asset: { some: 'asset' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { some: 'collection' }
      },
      serviceMethod: {
        name: 'removeAssetFrom',
        expectedArguments: [{ some: 'collection' }, { some: 'asset' }],
        returnsObservableOf: { some: 'assets' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'removeAssetSuccess',
          expectedArguments: [{ some: 'assets' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'showSnackBarOnRemoveSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.RemoveAssetSuccess.Type,
        currentPageItems: { some: 'assets' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { name: 'someCollectionName' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COLLECTION.REMOVE_ASSET.SUCCESS', { collectionName: 'someCollectionName' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'changeRouteOnRemoveAssetSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.RemoveAssetSuccess.Type,
        currentPageItems: { some: 'assets' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { id: 123 }
      },
      outputActionFactories: {
        success: {
          sectionName: 'router',
          methodName: 'goToCollection',
          expectedArguments: [123]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'updateAssetMarkers',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.UpdateAssetMarkers.Type,
        asset: { some: 'asset' },
        markers: { some: 'markers' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { some: 'collection' }
      },
      serviceMethod: {
        name: 'updateAssetMarkers',
        expectedArguments: [{ some: 'collection' }, { some: 'asset' }, { some: 'markers' }],
        returnsObservableOf: { some: 'assets' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'updateAssetMarkersSuccess',
          expectedArguments: [{ some: 'assets' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'showSnackbarOnUpdateAssetMarkersSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.UpdateAssetMarkersSuccess.Type,
        currentPageItems: { some: 'assets' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { name: 'someCollectionName' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COLLECTION.UPDATE_IN_COLLECTION_TOAST', { collectionName: 'someCollectionName' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'addPageOfSearchAssets',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.AddPageOfSearchAssets.Type
      },
      state: [
        {
          storeSectionName: 'search',
          propertyName: 'results',
          value: { items: [{ some: 'items' }] }
        },
        {
          storeSectionName: 'activeCollection',
          propertyName: 'collection',
          value: { assets: { pagination: { some: 'pagination' } } }
        }
      ],
      serviceMethod: {
        name: 'addAssetsToFocusedCollection',
        expectedArguments: [[{ some: 'items' }], { some: 'pagination' }],
        returnsObservableOf: [{ some: 'new items' }]
      },
      outputActionFactories: {
        success: {
          sectionName: 'activeCollection',
          methodName: 'addPageOfSearchAssetsSuccess',
          expectedArguments: [[{ some: 'new items' }]]
        },
        failure: {
          sectionName: 'error',
          methodName: 'handle'
        }
      }
    });


    effectsSpecHelper.generateTestsFor({
      effectName: 'showToastOnAddPageSuccess',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActiveCollectionActions.AddPageOfSearchAssetsSuccess.Type,
        currentPageItems: { totalAssetsAdded: 5, some: 'assets' }
      },
      state: {
        storeSectionName: 'activeCollection',
        propertyName: 'collection',
        value: { name: 'someCollectionName' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: [
            'COLLECTION.ADD_ASSETS_SUCCESS_TOAST',
            { collectionName: 'someCollectionName', totalAssetsAdded: 5 }
          ]
        }
      }
    });
  });
}

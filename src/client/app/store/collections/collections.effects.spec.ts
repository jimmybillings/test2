import { CollectionsEffects } from './collections.effects';
import * as CollectionsActions from './collections.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Collections Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): CollectionsEffects {
      return new CollectionsEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'addAsset',
      comment: 'with a new asset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CollectionsActions.AddAssetToCollection.Type,
        asset: { assetId: 'asset' },
        collection: { name: 'collection' }
      },
      serviceMethod: {
        name: 'addAssetTo',
        expectedArguments: [{ name: 'collection' }, { assetId: 'asset' }],
        returnsObservableOf: { list: ['something'] }
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COLLECTION.SHOW.ASSET_ADDED',
            { collectionName: 'collection', assetId: 'asset' }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'addAsset',
      comment: 'with a new asset',
      effectsInstantiator: instantiator,
      inputAction: {
        type: CollectionsActions.AddAssetToCollection.Type,
        asset: { assetId: 'asset' },
        collection: { name: 'collection' }
      },
      serviceMethod: {
        name: 'addAssetTo',
        expectedArguments: [{ name: 'collection' }, { assetId: 'asset' }],
        returnsObservableOf: {}
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'display',
          expectedArguments: ['COLLECTION.ALREADY_IN_COLLECTION_TOAST',
            { collectionName: 'collection' }]
        }
      }
    });
  });
}

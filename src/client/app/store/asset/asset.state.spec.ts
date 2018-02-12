import * as AssetActions from './asset.actions';

import * as AssetState from './asset.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Asset Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: AssetActions,
      state: AssetState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: [
        'LoadQuoteShowAsset', 'LoadQuoteShowAsset', 'LoadOrderAsset',
        'LoadCartAsset', 'LoadQuoteEditAsset', 'LoadActiveCollectionAsset'
      ],
      mutationTestData: {
        actionParameters: { uuid: 'abc-123', assetType: 'order' }
      },
      customTests: [
        {
          it: 'sets loading to true, sets the loadingUuid, and sets the activeAssetType',
          previousState: AssetState.initialState,
          actionParameters: { uuid: 'abc-123', assetType: 'order' },
          expectedNextState: {
            activeAssetType: 'order',
            loading: true,
            loadingUuid: 'abc-123',
            activeAsset: { assetId: 0, name: '' }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSearchAsset',
      mutationTestData: {
        actionParameters: { assetType: 'search' }
      },
      customTests: [
        {
          it: 'sets loading to true, and sets the activeAssetType',
          previousState: AssetState.initialState,
          actionParameters: { assetType: 'search' },
          expectedNextState: {
            activeAssetType: 'search',
            loading: true,
            loadingUuid: null,
            activeAsset: { assetId: 0, name: '' }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      mutationTestData: {
        actionParameters: { activeAsset: { some: 'asset' } }
      },
      customTests: [
        {
          it: 'sets loading to false, activeAsset to the asset, and sets the loadingUuid to null',
          previousState: {
            loading: true,
            activeAssetType: 'search',
            loadingUuid: 'abc-123',
            activeAsset: { assetId: 0, name: '' }
          },
          actionParameters: { activeAsset: { some: 'asset' } },
          expectedNextState: {
            activeAssetType: 'search',
            loading: false,
            loadingUuid: null,
            activeAsset: { some: 'asset' }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadFailure',
      mutationTestData: {
        previousState: {
          loading: true,
          activeAssetType: 'search',
          loadingUuid: 'abc-123',
          activeAsset: { assetId: 0, name: '' }
        },
        actionParameters: { error: { some: 'error' } }
      },
      customTests: [
        {
          it: 'resets to the initial state',
          previousState: {
            loading: true,
            activeAssetType: 'search',
            loadingUuid: 'abc-123',
            activeAsset: { assetId: 0, name: '' }
          },
          actionParameters: { error: { some: 'error' } },
          expectedNextState: {
            loading: false,
            activeAssetType: 'search',
            loadingUuid: 'abc-123',
            activeAsset: { assetId: 0, name: '' }
          }
        }
      ]
    });
  });
}

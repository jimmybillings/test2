import * as SpeedPreviewActions from './speed-preview.actions';
import * as SpeedPreviewState from './speed-preview.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Speed Preview Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: SpeedPreviewActions,
      state: SpeedPreviewState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      mutationTestData: {
        actionParameters: {
          speedViewData: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
          assetId: 444444
        }
      },
      customTests: [
        {
          it: 'returns new state with updated speedview data objects and loadingAssetId: undefined',

          previousState: {
            222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
          },

          actionParameters: {
            speedViewData: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            assetId: 444444
          },

          expectedNextState: {
            222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            444444: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadFailure',
      mutationTestData: {
        actionParameters: {
          speedViewData: {},
          assetId: 444444
        }
      },
      customTests: [
        {
          it: 'returns new state with the noData property set to true',

          previousState: {
            222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
          },

          actionParameters: {
            speedViewData: {},
            assetId: 444444
          },

          expectedNextState: {
            222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
            444444: { noData: true },
          }
        }
      ]
    });
  });
}

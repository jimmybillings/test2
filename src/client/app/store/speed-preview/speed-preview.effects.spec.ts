import { SpeedPreviewEffects } from './speed-preview.effects';
import * as SpeedPreviewActions from './speed-preview.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Speed Preview Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new SpeedPreviewEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      comment: 'with the asset not yet available in the store',
      effectsInstantiator: instantiator,
      inputAction: {
        type: SpeedPreviewActions.Load.Type,
        asset: { assetId: 111111 }
      },
      state: {
        storeSectionName: 'speedPreview',
        value: {
          222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
          333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
        }
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: [{ assetId: 111111 }],
        returnsObservableOf: {
          111111: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
        }
      },
      outputActionFactories: {
        success: {
          sectionName: 'speedPreview',
          methodName: 'loadSuccess',
          expectedArguments: [{ 111111: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' } }, 111111]
        },
        failure: {
          sectionName: 'speedPreview',
          methodName: 'loadFailure',
          expectedArgument: 111111
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      comment: 'with the asset already in the store',
      effectsInstantiator: instantiator,
      inputAction: {
        type: SpeedPreviewActions.Load.Type,
        asset: { assetId: 222222 }
      },
      state: {
        storeSectionName: 'speedPreview',
        value: {
          222222: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
          333333: { 'price': 159.0, 'imageQuickView': false, 'posterUrl': 'someposterurl' },
        }
      },
      serviceMethod: {
        name: 'load',
        expectToHaveBeenCalled: false
      },
      expectToEmitAction: false,
    });
  });
}

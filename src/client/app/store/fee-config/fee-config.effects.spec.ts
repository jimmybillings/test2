import { FeeConfigEffects } from './fee-config.effects';
import * as FeeConfigActions from './fee-config.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Fee Config Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): FeeConfigEffects {
      return new FeeConfigEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadFeeConfig',
      comment: 'if fee config not yet initialized',
      effectsInstantiator: instantiator,
      inputAction: {
        type: FeeConfigActions.LoadFeeConfig.Type,
      },
      state: {
        storeSectionName: 'feeConfig',
        value: {
          initialized: false,
          feeConfig: { items: [] },
        }
      },
      serviceMethod: {
        name: 'loadFeeConfig',
        returnsObservableOf: { items: [{ item: 1 }, { item: 2 }] }
      },
      outputActionFactories: {
        success: {
          sectionName: 'feeConfig',
          methodName: 'loadFeeConfigSuccess',
          expectedArguments: [{ items: [{ item: 1 }, { item: 2 }] }]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectName: 'loadFeeConfig',
      comment: 'With the feeConfig already initialized',
      effectsInstantiator: instantiator,
      inputAction: {
        type: FeeConfigActions.LoadFeeConfig.Type,
      },
      state: {
        storeSectionName: 'feeConfig',
        value: {
          initialized: true,
          feeConfig: { items: [] },
        }
      },
      serviceMethod: {
        name: 'loadFeeConfig',
        expectToHaveBeenCalled: false
      },
      expectToEmitAction: false,
    });
  });
}

import { UiConfigEffects } from './ui-config.effects';
import * as UiConfigActions from './ui-config.actions';
import * as UiConfigState from './ui-config.state';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Ui Config Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): UiConfigEffects {
      return new UiConfigEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'initialize',
      inputAction: {
        type: UiConfigActions.Initialize.Type
      },
      outputActionFactories: {
        success: {
          sectionName: 'uiConfig',
          methodName: 'initializeSuccess',
          expectedArguments: [UiConfigState.initialState]
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'load',
      inputAction: {
        type: UiConfigActions.Load.Type
      },
      serviceMethod: {
        name: 'load',
        returnsObservableOf: { some: 'config' }
      },
      outputActionFactories: {
        success: {
          sectionName: 'uiConfig',
          methodName: 'loadSuccess',
          expectedArguments: [{ some: 'config' }]
        },
        failure: {
          sectionName: 'uiConfig',
          methodName: 'loadFailure'
        }
      }
    });

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'setInLocalStorage',
      inputAction: {
        type: UiConfigActions.LoadSuccess.Type,
        config: { some: 'config' }
      },
      customTests: [{
        it: 'sets the config in localStorage',
        beforeInstantiation: () => spyOn(localStorage, 'setItem'),
        expectation: () => {
          expect(localStorage.setItem).toHaveBeenCalledWith('uiConfig', JSON.stringify({ some: 'config' }));
        }
      }]
    });
  });
}

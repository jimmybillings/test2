import { SnackbarEffects } from './snackbar.effects';
import * as SnackbarActions from './snackbar.actions';
import { EffectsSpecHelper } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Snackbar Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): any {
      return new SnackbarEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'display',
      effectsInstantiator: instantiator,
      inputAction: {
        type: SnackbarActions.Display.Type,
        messageKey: 'someMessageKey',
        messageParameters: { some: 'parameters' }
      },
      serviceMethod: {
        name: 'display',
        callsApiService: false,
        expectedArguments: ['someMessageKey', { some: 'parameters' }],
        returnsObservableOf: 'translatedString'
      },
      outputActionFactories: {
        success: {
          sectionName: 'snackbar',
          methodName: 'displaySuccess',
          expectedArguments: ['translatedString']
        }
      }
    });
  });
}

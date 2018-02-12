import { DialogEffects } from './dialog.effects';
import * as DialogActions from './dialog.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Dialog Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): DialogEffects {
      return new DialogEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'showConfirmation',
      effectsInstantiator: instantiator,
      inputAction: {
        type: DialogActions.ShowConfirmation.Type,
        confirmationDialogOptions: { some: 'option' },
        onAccept: () => { },
        onDecline: () => { }
      },
      serviceMethod: {
        name: 'openConfirmationDialog',
        expectedArguments: [{ some: 'option' }, jasmine.any(Function), jasmine.any(Function)],
        returnsObservableOf: '',
      },
      outputActionFactories: {
        success: {
          sectionName: 'dialog',
          methodName: 'showConfirmationSuccess',
          expectedArguments: []
        }
      }
    });
  });
}

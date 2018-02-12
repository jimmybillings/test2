import { ActivityEffects } from './activity.effects';
import * as ActivityActions from './activity.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Activity Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): ActivityEffects {
      return new ActivityEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'record',
      effectsInstantiator: instantiator,
      inputAction: {
        type: ActivityActions.Record.Type,
        options: { some: 'options' }
      },
      serviceMethod: {
        name: 'record',
        expectedArguments: [{ some: 'options' }]
      }
    });
  });
}

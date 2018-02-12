import { PageDataEffects } from './page-data.effects';
import * as PageDataActions from './page-data.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Page Data Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): PageDataEffects {
      return new PageDataEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectsInstantiator: instantiator,
      effectName: 'updateTitle',
      inputAction: {
        type: PageDataActions.UpdateTitle.Type,
        trKey: 'key',
        trParams: { some: 'params' }
      },
      serviceMethod: {
        name: 'updateTitle',
        expectedArguments: ['key', { some: 'params' }]
      }
    });
  });
}

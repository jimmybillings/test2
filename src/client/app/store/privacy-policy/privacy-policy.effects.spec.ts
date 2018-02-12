import { PrivacyPolicyEffects } from './privacy-policy.effects';
import * as PrivacyPolicyActions from './privacy-policy.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('Privacy Policy Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): PrivacyPolicyEffects {
      return new PrivacyPolicyEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'load',
      effectsInstantiator: instantiator,
      inputAction: {
        type: '[Privacy Policy] Load',
        documentId: '12'
      },
      serviceMethod: {
        name: 'load',
        expectedArguments: ['12'],
        returnsObservableOf: 'some-document'
      },
      outputActionFactories: {
        success: {
          sectionName: 'privacyPolicy',
          methodName: 'loadSuccess',
          expectedArguments: ['some-document']
        },
        failure: {
          sectionName: 'privacyPolicy',
          methodName: 'loadFailure'
        }
      }
    });
  });
}

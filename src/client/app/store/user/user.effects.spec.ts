import { UserEffects } from './user.effects';
import * as UserActions from './user.actions';
import { EffectsSpecHelper, EffectTestParameters } from '../spec-helpers/effects.spec-helper';

export function main() {
  describe('User Effects', () => {
    const effectsSpecHelper: EffectsSpecHelper = new EffectsSpecHelper();

    function instantiator(): UserEffects {
      return new UserEffects(
        effectsSpecHelper.mockNgrxEffectsActions, effectsSpecHelper.mockStore, effectsSpecHelper.mockService
      );
    }

    effectsSpecHelper.generateTestsFor({
      effectName: 'getAllUsersByAccountId',
      effectsInstantiator: instantiator,
      inputAction: {
        type: UserActions.GetAllUsersByAccountId.Type,
        accountId: 1,
      },
      serviceMethod: {
        name: 'getUsersByAccountId',
        expectedArguments: [1, 'offAfterResponse'],
        returnsObservableOf: [{
          id: 1,
          firstName: 'firstName',
          lastName: 'lastName',
          emailAddress: 'emailAddress'
        }, {
          id: 2,
          firstName: 'firstName',
          lastName: 'lastName',
          emailAddress: 'emailAddress'
        }]
      },
      outputActionFactories: {
        success: {
          sectionName: 'user',
          methodName: 'getAllUsersByAccountIdSuccess',
          expectedArguments: [[{
            id: 1,
            name: 'firstName lastName',
            emailAddress: 'emailAddress'
          }, {
            id: 2,
            name: 'firstName lastName',
            emailAddress: 'emailAddress'
          }]]
        }
      }
    });
  });
}

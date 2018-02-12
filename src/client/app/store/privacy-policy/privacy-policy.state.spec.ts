import * as PrivacyPolicyState from './privacy-policy.state';
import * as PrivacyPolicyActions from './privacy-policy.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Privacy Policy Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: PrivacyPolicyActions,
      state: PrivacyPolicyState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      customTests: [
        {
          it: 'returns the state with the document propopulated',
          actionParameters: { document: 'some doc' },
          previousState: PrivacyPolicyState.initialState,
          expectedNextState: { document: 'some doc' }
        }
      ]
    });
  });
}

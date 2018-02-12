import * as MultiLingualState from './multi-lingual.state';
import * as MultiLingualActions from './multi-lingual.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Multilingual Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      state: MultiLingualState,
      actions: MultiLingualActions
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'SetLanguage',
      customTests: [
        {
          it: 'returns the state with a correct language code',
          actionParameters: { lang: 'fr' },
          previousState: MultiLingualState.initialState,
          expectedNextState: { lang: 'fr' }
        }
      ]
    });

  });
}

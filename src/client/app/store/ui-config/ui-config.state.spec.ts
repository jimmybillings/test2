import * as UiConfigState from './ui-config.state';
import * as UiConfigActions from './ui-config.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Ui Config Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: UiConfigActions,
      state: UiConfigState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      customTests: [{
        it: 'returns the state with loaded true and the new config',
        actionParameters: { config: { components: { some: 'config' } } },
        expectedNextState: { loaded: true, components: { some: 'config' } }
      }]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'InitializeSuccess',
      mutationTestData: {
        actionParameters: { config: { components: { some: 'config' } } }
      },
      customTests: [{
        it: 'returns the state with loaded false and the new config',
        actionParameters: { config: { components: { some: 'config' } } },
        expectedNextState: { loaded: false, components: { some: 'config' } }
      }]
    });
  });
}

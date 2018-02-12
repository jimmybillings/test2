import * as LoadingIndicatorActions from './loading-indicator.actions';
import * as LoadingIndicatorState from './loading-indicator.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Loading Indicator Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: LoadingIndicatorActions,
      state: LoadingIndicatorState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Show',
      mutationTestData: {
        previousState: { show: false }
      },
      customTests: [
        {
          it: 'returns state with show: true',
          previousState: { show: false },
          expectedNextState: { show: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Hide',
      mutationTestData: {
        previousState: { show: true }
      },
      customTests: [
        {
          it: 'returns state with show: false',
          previousState: { show: true },
          expectedNextState: { show: false }
        }
      ]
    });
  });
}

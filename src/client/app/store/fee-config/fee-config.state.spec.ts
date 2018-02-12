import * as FeeConfigState from './fee-config.state';
import * as FeeConfigActions from './fee-config.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Fee Config Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: FeeConfigActions,
      state: FeeConfigState,
    });

    stateSpecHelper.setReducerTestModules({
      actions: FeeConfigActions,
      state: FeeConfigState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['LoadFeeConfig'],
      customTests: [
        {
          it: 'Sets initialized to false',
          previousState: FeeConfigState.initialState,
          expectedNextState: { ...FeeConfigState.initialState, initialized: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['LoadFeeConfigSuccess'],
      customTests: [
        {
          it: 'Sets feeConfig from server if object has items and initialized to true',
          actionParameters: { feeConfig: { items: ['one', 'two', 'three'] } },
          previousState: { ...FeeConfigState.initialState, initialized: false },
          expectedNextState: { ...FeeConfigState.initialState, feeConfig: { items: ['one', 'two', 'three'] }, initialized: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['LoadFeeConfigSuccess'],
      customTests: [
        {
          it: 'Sets empty items array if response from server is bad',
          actionParameters: {},
          previousState: { ...FeeConfigState.initialState, initialized: false },
          expectedNextState: { ...FeeConfigState.initialState, feeConfig: { items: [] }, initialized: true }
        }
      ]
    });
  });
}

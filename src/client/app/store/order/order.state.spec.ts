import * as OrderActions from './order.actions';
import * as OrderState from './order.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Order Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: OrderActions,
      state: OrderState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Load',
      mutationTestData: {
        previousState: { loading: false }
      },
      customTests: [
        {
          it: 'with previous state, returns previous state but with loading: true',
          previousState: { some: 'stuff', loading: false },
          expectedNextState: { some: 'stuff', loading: true }
        },
        {
          it: 'without previous state, returns initialState but with loading: true',
          expectedNextState: { ...OrderState.initialState, loading: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      customTests: [
        {
          it: 'with previous state, returns new state with updated order and loading: false',
          previousState: { activeOrder: 'previous', loading: true, checkingOut: false },
          actionParameters: { activeOrder: 'new' },
          expectedNextState: { activeOrder: 'new', loading: false, checkingOut: false }
        },
        {
          it: 'without previous state, returns new state with updated order and loading: false',
          actionParameters: { activeOrder: 'new' },
          expectedNextState: { activeOrder: 'new', loading: false, checkingOut: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadFailure',
      mutationTestData: {
        previousState: { loading: true }
      },
      customTests: [
        {
          it: 'with previous state, returns previous state but with loading: false',
          previousState: { some: 'stuff', loading: true },
          actionParameters: { error: { some: 'error' } },
          expectedNextState: { some: 'stuff', loading: false }
        },
        {
          it: 'without previous state, returns initial state',
          actionParameters: { error: { some: 'error' } },
          expectedNextState: OrderState.initialState
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'SetCheckoutState',
      mutationTestData: {
        previousState: { checkingOut: true }
      },
      customTests: [
        {
          it: 'with previous state, returns previous state but with action.checkingOut',
          previousState: { some: 'stuff', checkingOut: false },
          actionParameters: { checkingOut: true },
          expectedNextState: { some: 'stuff', checkingOut: true }
        },
        {
          it: 'without previous state, returns initial state but with action.checkingOut',
          actionParameters: { checkingOut: true },
          expectedNextState: { ...OrderState.initialState, checkingOut: true }
        }
      ]
    });
  });
}

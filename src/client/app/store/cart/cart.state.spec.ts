import * as CartActions from './cart.actions';
import * as CartState from './cart.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Cart Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: CartActions,
      state: CartState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['Load'],
      customTests: [
        {
          it: 'returns a clone of the state with the loading flag as true',
          previousState: CartState.initialState,
          expectedNextState: { ...CartState.initialState, loading: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: [
        'LoadSuccess', 'EditLineItemFromDetailsSuccess', 'RemoveAssetSuccess', 'AddNoteSuccess', 'RemoveNoteSuccess'
      ],
      customTests: [
        {
          it: 'returns a the cart with the loading flag as false',
          actionParameters: { cart: { some: 'cart' } },
          previousState: { ...CartState.initialState, loading: true },
          expectedNextState: { data: { some: 'cart' }, loading: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['LoadFailure'],
      mutationTestData: {
        previousState: { ...CartState.initialState, loading: true }
      },
      customTests: [
        {
          it: 'returns a clone of the state with the loading flag as false',
          actionParameters: { error: { some: 'error' } },
          previousState: { ...CartState.initialState, loading: true },
          expectedNextState: { ...CartState.initialState, loading: false }
        }
      ]
    });
  });
}

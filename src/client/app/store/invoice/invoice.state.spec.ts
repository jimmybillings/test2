import * as InvoiceActions from './invoice.actions';
import * as InvoiceState from './invoice.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Invoice Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: InvoiceActions,
      state: InvoiceState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Load',
      customTests: [
        {
          it: 'returns the state with loading: true',
          actionParameters: { id: 47 },
          previousState: InvoiceState.initialState,
          expectedNextState: { ...InvoiceState.initialState, loading: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      customTests: [
        {
          it: 'returns the state with the invoice and loading: false',
          actionParameters: { invoice: { some: 'invoice' } },
          previousState: { ...InvoiceState.initialState, loading: true },
          expectedNextState: { invoice: { some: 'invoice' }, loading: false }
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
          it: 'returns the state with loading: false',
          previousState: { ...InvoiceState.initialState, loading: true },
          expectedNextState: { ...InvoiceState.initialState, loading: false }
        }
      ]
    });
  });
}

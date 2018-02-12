import * as QuoteShowState from './quote-show.state';
import * as QuoteShowActions from './quote-show.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Quote Show Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      state: QuoteShowState,
      actions: QuoteShowActions
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Load',
      customTests: [
        {
          it: 'returns the state with loading: true',
          actionParameters: { id: 47 },
          previousState: QuoteShowState.initialState,
          expectedNextState: { ...QuoteShowState.initialState, loading: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadSuccess',
      customTests: [
        {
          it: 'returns the state with the new quote and loading: false',
          actionParameters: { quote: { some: 'quote' } },
          previousState: { ...QuoteShowState.initialState, loading: true },
          expectedNextState: { data: { some: 'quote' }, loading: false }
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
          previousState: { ...QuoteShowState.initialState, loading: true },
          expectedNextState: { ...QuoteShowState.initialState, loading: false }
        }
      ]
    });
  });
}

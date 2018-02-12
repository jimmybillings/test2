import * as SearchState from './search.state';
import * as SearchActions from './search.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Search Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: SearchActions,
      state: SearchState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadResults',
      mutationTestData: {
        previousState: SearchState.initialState
      },
      customTests: [
        {
          it: 'returns a new state with loading: true',
          previousState: SearchState.initialState,
          expectedNextState: { ...SearchState.initialState, loading: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadResultsSuccess',
      mutationTestData: {
        previousState: SearchState.initialState,
        actionParameters: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } } }
      },
      customTests: [
        {
          it: 'returns a new state with loading: false, and the search results',
          previousState: { ...SearchState.initialState, loading: true },
          actionParameters: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } } },
          expectedNextState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Reset',
      mutationTestData: {
        previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false }
      },
      customTests: [
        {
          it: 'returns the initialState',
          previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false },
          expectedNextState: SearchState.initialState
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'LoadResultsFailure',
      mutationTestData: {
        previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: true }
      },
      customTests: [
        {
          it: 'returns the previous state with loading set to false',
          previousState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: true },
          expectedNextState: { results: { items: [{ some: 'results' }], pagination: { some: 'pagination' } }, loading: false }
        }
      ]
    });
  });
}

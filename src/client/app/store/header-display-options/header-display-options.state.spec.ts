import * as HeaderDisplayOptionsState from './header-display-options.state';
import * as HeaderDisplayOptionsActions from './header-display-options.actions';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Header Display Options Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      actions: HeaderDisplayOptionsActions,
      state: HeaderDisplayOptionsState,
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'EnableFix',
      customTests: [
        {
          it: 'returns the state with canBeFixed: true',
          previousState: { canBeFixed: false },
          expectedNextState: { canBeFixed: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'DisableFix',
      mutationTestData: {
        previousState: { canBeFixed: true }
      },
      customTests: [
        {
          it: 'returns the state with canBeFixed: false',
          previousState: { canBeFixed: true },
          expectedNextState: { canBeFixed: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'EnableFilters',
      customTests: [
        {
          it: 'returns the state with filtersAreAvailable: true',
          previousState: { filtersAreAvailable: false },
          expectedNextState: { filtersAreAvailable: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'DisableFilters',
      mutationTestData: {
        previousState: { filtersAreAvailable: true }
      },
      customTests: [
        {
          it: 'returns the state with filtersAreAvailable: false',
          previousState: { filtersAreAvailable: true },
          expectedNextState: { filtersAreAvailable: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Fix',
      customTests: [
        {
          it: 'returns the state with isFixed: true',
          previousState: { isFixed: false },
          expectedNextState: { isFixed: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Unfix',
      mutationTestData: {
        previousState: { isFixed: true }
      },
      customTests: [
        {
          it: 'returns the state with isFixed: false',
          previousState: { isFixed: true },
          expectedNextState: { isFixed: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'Reset',
      mutationTestData: {
        previousState: { canBeFixed: true }
      },
      customTests: [
        {
          it: 'returns the default state',
          previousState: { canBeFixed: true },
          expectedNextState: HeaderDisplayOptionsState.initialState
        }
      ]
    });
  });
}

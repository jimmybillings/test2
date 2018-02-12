import { ActionReducer } from '@ngrx/store';

import { Pojo } from '../../shared/interfaces/common.interface';

export interface ReducerTestModules {
  actions: Pojo;
  state: Pojo;
}

export interface ReducerTestParameters {
  overrideActionClass?: Pojo;
  actionClassName?: string | string[];
  actionTypes?: string | string[];
  mutationTestData?: {
    previousState?: Pojo;
    actionParameters?: Pojo;
  };
  customTests: {
    it: string;
    previousState?: Pojo;
    actionParameters?: Pojo;
    expectedNextState: Pojo;
  }[];
}

export class StateSpecHelper {
  private reducerTestModules: ReducerTestModules = null;

  public setReducerTestModules(modules: ReducerTestModules): void {
    this.reducerTestModules = modules;

    describe('for an unexpected action', () => {
      it('with previous state, returns previous state', () => {
        expect(modules.state.reducer({ previous: 'state' }, { type: 'BLAH' })).toEqual({ previous: 'state' });
      });

      it('without previous state, returns initial state', () => {
        expect(modules.state.reducer(undefined, { type: 'BLAH' })).toEqual(modules.state.initialState);
      });
    });
  }

  public generateTestsFor(parameters: ReducerTestParameters): void {
    if (parameters.actionClassName) {
      (Array.isArray(parameters.actionClassName) ? parameters.actionClassName : [parameters.actionClassName])
        .forEach(actionClassName => {
          const actionType: string = parameters.overrideActionClass ?
            parameters.overrideActionClass[actionClassName].Type :
            this.reducerTestModules.actions[actionClassName].Type;
          this.runSpecsFor(actionType, parameters);
        });
    }

    if (parameters.actionTypes) {
      (Array.isArray(parameters.actionTypes) ? parameters.actionTypes : [parameters.actionTypes])
        .forEach(actionType => {
          this.runSpecsFor(actionType, parameters);
        });
    }
  }

  private runSpecsFor(actionType: string, parameters: ReducerTestParameters): void {
    if (!this.reducerTestModules) {
      describe(`for ${actionType} (unknown action type)`, () => {
        it('has modules defined for test', () => {
          fail(`setStandardReducerTestModules() needs to be called before addStandardReducerTestsFor()`);
        });
      });

      return;
    }

    const reducerUnderTest: ActionReducer<any> = this.reducerTestModules.state.reducer;

    describe(`for ${actionType} ('${actionType}')`, () => {
      parameters.customTests.forEach(test => {
        it(test.it, () => {
          const testAction: any = { type: actionType, ...test.actionParameters };

          expect(reducerUnderTest(test.previousState, testAction)).toEqual(test.expectedNextState);
        });
      });

      describe('meets basic reducer standards, because it:', () => {
        const testAction: any = {
          type: actionType,
          ...(parameters.mutationTestData ? (parameters.mutationTestData.actionParameters || []) : [])
        };
        const previousState: Pojo = parameters.mutationTestData ? parameters.mutationTestData.previousState : undefined;
        const previousStateSnapshot: string = JSON.stringify(previousState);
        const initialState: Pojo = this.reducerTestModules.state.initialState;
        const initialStateSnapshot: string = JSON.stringify(initialState);

        it('does not throw an exception when the previous state is null', () => {
          expect(() => reducerUnderTest(null, testAction)).not.toThrow();
        });

        it('has test parameters sufficient to prove lack of mutation', () => {
          const newState = reducerUnderTest(previousState, testAction);

          if (JSON.stringify(newState) === (previousStateSnapshot || initialStateSnapshot)) {
            fail('The test parameters do not cause a difference between pre- and post-action states for this reducer,'
              + ' so we cannot determine whether it could potentially mutate the previous state.'
              + ' (Specify \'mutationTestData\' with \'previousState\' and/or \'actionParameters\' to ensure a state change.)');
          }
        });

        it('does not directly mutate the previous state', () => {
          reducerUnderTest(previousState, testAction);

          const postReducerSnapshot = JSON.stringify(previousState);

          expect(postReducerSnapshot).toEqual(previousStateSnapshot);
        });

        it('does not directly mutate the initial state when there was a previous state', () => {
          reducerUnderTest(previousState, testAction);

          const postReducerSnapshot = JSON.stringify(initialState);

          expect(postReducerSnapshot).toEqual(initialStateSnapshot);
        });

        it('does not directly mutate the initial state when there was not a previous state', () => {
          reducerUnderTest(undefined, testAction);

          const postReducerSnapshot = JSON.stringify(initialState);

          expect(postReducerSnapshot).toEqual(initialStateSnapshot);
        });

        it('protects the previous state from changes to the returned state', () => {
          const newState = reducerUnderTest(previousState, testAction);

          expect(this.preserves(previousState, 'previous', newState)).toBe(true);
        });

        it('protects the initial state from changes to the returned state when there was a previous state', () => {
          const newState = reducerUnderTest(previousState, testAction);

          expect(this.preserves(initialState, 'initial', newState)).toBe(true);
        });

        it('protects the initial state from changes to the returned state when there was not a previous state', () => {
          const newState = reducerUnderTest(undefined, testAction);

          expect(this.preserves(initialState, 'initial', newState)).toBe(true);
        });
      });
    });
  }

  private preserves(
    previousState: any,
    previousStateName: string,
    newState: any,
    propertyPath: string = 'state',
    previousStateSnapshot: string = JSON.stringify(previousState)
  ): boolean {
    if (Array.isArray(newState)) {
      return this.preservesArrayIn(previousState, previousStateName, newState, propertyPath, previousStateSnapshot);
    }

    if (newState === Object(newState)) {
      return this.preservesObjectIn(previousState, previousStateName, newState, propertyPath, previousStateSnapshot);
    }

    return this.preservesValueIn(previousState, previousStateName, newState, propertyPath, previousStateSnapshot);
  }

  private preservesArrayIn(
    previousState: any,
    previousStateName: string,
    array: any[],
    propertyPath: string,
    previousStateSnapshot: string
  ): boolean {
    array.push('evil mutation');

    this.verifyPreservationOf(previousState, previousStateSnapshot,
      `'${propertyPath}' array in the ${previousStateName} state is changed when pushing an element to it in the new state`);

    array.pop();

    for (const index in array) {
      if (!this.preserves(previousState, previousStateName, array[index], `${propertyPath}[${index}]`, previousStateSnapshot)) {
        return false;
      }
    }

    return true;
  }

  private preservesObjectIn(
    previousState: any,
    previousStateName: string,
    object: any,
    propertyPath: string,
    previousStateSnapshot: string
  ): boolean {
    object['evil mutation'] = 'evil mutation';

    this.verifyPreservationOf(previousState, previousStateSnapshot,
      `'${propertyPath}' object in the ${previousStateName} state is changed when adding a property to it in the new state`);

    delete object['evil mutation'];

    for (var key of Object.keys(object)) {
      if (!this.preserves(previousState, previousStateName, object[key], `${propertyPath}.${key}`, previousStateSnapshot)) {
        return false;
      }
    }

    return true;
  }

  private preservesValueIn(
    previousState: any,
    previousStateName: string,
    value: any,
    propertyPath: string,
    previousStateSnapshot: string
  ): boolean {
    const valueBeforeMutation = value;
    value = 'evil mutation';

    this.verifyPreservationOf(previousState, previousStateSnapshot,
      `'${propertyPath}' value in the ${previousStateName} state is changed when changing it in the new state`);

    value = valueBeforeMutation;

    return true;
  }

  private verifyPreservationOf(previousState: any, previousStateSnapshot: string, errorMessage: string) {
    if (JSON.stringify(previousState) !== previousStateSnapshot) throw new Error(errorMessage);
  }
}

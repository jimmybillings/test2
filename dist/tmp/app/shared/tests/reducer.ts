import { ActionReducer, Action } from '@ngrx/store';

// TODO: This file can be deleted once all stores/reducers are moved to the new AppStore.

export function addStandardReducerTestsFor(
  reducer: ActionReducer<any>,
  actionType: string,
  initialState: any,
  payload: any = { some: 'payload' },
  currentState: any = initialState
) {
  describe('Reducer (standard tests)', () => {
    it('does not fail with a null current state', () => {
      expect(() => reducer(null, { type: actionType, payload: payload } as Action)).not.toThrow();
    });

    it('does not directly mutate the current state', () => {
      const currentStateSnapshot: string = JSON.stringify(currentState);

      reducer(currentState, { type: actionType, payload: payload } as Action);

      expect(JSON.stringify(currentState)).toEqual(currentStateSnapshot);
    });
  });
}

import { Common } from '../../shared/utilities/common.functions';
import { FeeConfig } from '../../shared/interfaces/commerce.interface';
import * as FeeConfigActions from './fee-config.actions';

export interface State {
  initialized: boolean;
  feeConfig: FeeConfig;
}

export const initialState: State = {
  initialized: null,
  feeConfig: { items: [] },
};


export function reducer(state: State = initialState, action: FeeConfigActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case FeeConfigActions.LoadFeeConfig.Type: {
      return {
        ...Common.clone(state),
        initialized: false,
      };
    }

    case FeeConfigActions.LoadFeeConfigSuccess.Type: {
      return {
        initialized: true,
        feeConfig: action.feeConfig ? action.feeConfig : { items: [] }
      };
    }

    default: {
      return state;
    }
  }
}

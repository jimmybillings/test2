import * as CartActions from './cart.actions';
import { Common } from '../../shared/utilities/common.functions';
import { Cart } from '../../shared/interfaces/commerce.interface';

export interface State {
  data: Cart;
  loading: boolean;
}

export const initialState: State = {
  data: {
    id: null,
    userId: null,
    total: null
  },
  loading: false
};

export function reducer(state: State = initialState, action: CartActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case CartActions.Load.Type: {
      return {
        ...Common.clone(state),
        loading: true
      };
    }

    case CartActions.EditLineItemFromDetailsSuccess.Type:
    case CartActions.LoadSuccess.Type:
    case CartActions.AddNoteSuccess.Type:
    case CartActions.RemoveNoteSuccess.Type:
    case CartActions.RemoveAssetSuccess.Type: {
      return {
        loading: false,
        data: {
          ...action.cart
        }
      };
    }

    case CartActions.LoadFailure.Type: {
      return {
        ...Common.clone(state),
        loading: false
      };
    }

    default: {
      return state;
    }

  }
}

import * as QuoteShowActions from './quote-show.actions';
import { Common } from '../../shared/utilities/common.functions';
import { Quote } from '../../shared/interfaces/commerce.interface';

export interface State {
  data: Quote;
  loading: boolean;
}

export const initialState: State = {
  data: {
    id: 0,
    total: 0,
    createdUserId: 0,
    ownerUserId: 0,
    quoteStatus: 'PENDING'
  },
  loading: false
};

export function reducer(state: State = initialState, action: QuoteShowActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case QuoteShowActions.Load.Type: {
      return {
        ...Common.clone(state),
        loading: true
      };
    }

    case QuoteShowActions.LoadSuccess.Type: {
      return {
        loading: false,
        data: {
          ...action.quote
        }
      };
    }

    case QuoteShowActions.LoadFailure.Type: {
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

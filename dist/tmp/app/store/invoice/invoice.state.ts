import * as InvoiceActions from './invoice.actions';
import { Common } from '../../shared/utilities/common.functions';
import { Invoice } from '../../shared/interfaces/commerce.interface';

export interface State {
  readonly loading: boolean;
  readonly invoice: Invoice;
};

export const initialState: State = {
  loading: false,
  invoice: null
};

export function reducer(state: State = initialState, action: InvoiceActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case InvoiceActions.Load.Type: {
      return { ...Common.clone(state), loading: true };
    }

    case InvoiceActions.LoadSuccess.Type: {
      return { ...Common.clone(state), invoice: action.invoice, loading: false, };
    }

    case InvoiceActions.LoadFailure.Type: {
      return { ...Common.clone(state), loading: false };
    }

    default: {
      return state;
    }
  }
}

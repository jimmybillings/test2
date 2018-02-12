import * as OrderActions from './order.actions';
import { Asset } from '../../shared/interfaces/common.interface';
import { Common } from '../../shared/utilities/common.functions';
import { Order } from '../../shared/interfaces/commerce.interface';

export interface State {
  readonly activeOrder: Order;
  readonly loading: boolean;
  readonly checkingOut: boolean;
};

export const initialState: State = {
  activeOrder: {
    id: 0,
    paymentTerms: '',
    paymentType: null,
    poNumber: '',
    discount: 0,
    bulkOrderId: '',
    createdUserId: 0,
    ownerUserId: 0,
    orderStatus: null,
    orderType: null,
    quoteId: 0,
    taxAmount: 0,
    licenseAgreementId: '',
    refundAmount: 0,
    salesVertical: '',
    oldCommerceId: 0,
    salesForceId: '',
    createdByIntegration: false,
    salesForceSyncedError: false,
    paymentBalance: 0,
    creditMemoForOrderId: 0,
    projects: []
  },
  loading: false,
  checkingOut: false
};

export function reducer(state: State = initialState, action: OrderActions.Any): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case OrderActions.Load.Type: {
      return { ...Common.clone(state), loading: true };
    }

    case OrderActions.LoadSuccess.Type: {
      return { activeOrder: action.activeOrder, loading: false, checkingOut: state.checkingOut };
    }

    case OrderActions.LoadFailure.Type: {
      return { ...Common.clone(state), loading: false };
    }

    case OrderActions.SetCheckoutState.Type: {
      return { ...Common.clone(state), checkingOut: action.checkingOut };
    }

    default: {
      return state;
    }
  }
}

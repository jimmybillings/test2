import { User } from '../../shared/interfaces/user.interface';
import * as QuoteEditActions from './quote-edit.actions';
import * as AccountActions from '../account/account.actions';
import * as UserActions from '../user/user.actions';
import { Pojo } from '../../shared/interfaces/common.interface';
import { Common } from '../../shared/utilities/common.functions';
import { Quote, SendDetails, SendDetailsUser, SendDetailsBillingAccount } from '../../shared/interfaces/commerce.interface';

export interface State {
  data: Quote;
  loading: boolean;
  sendDetails?: SendDetails;
}

export const initialState: State = {
  data: {
    id: 0,
    total: 0,
    createdUserId: 0,
    ownerUserId: 0,
    quoteStatus: 'PENDING'
  },
  sendDetails: {
    user: {
      customerName: null,
      accountName: null
    },
    billingAccount: {
      purchaseOnCredit: null,
      creditExemption: null,
      licensingVertical: null,
      paymentTermsDays: null,
      readonlyPaymentTermsDays: null,
      salesOwner: null
    },
    invoiceContact: {
      contactEmail: null,
      name: null,
      id: null,
      contacts: []
    },
    salesManager: {
      expirationDate: null,
      salesManager: null,
      offlineAgreement: null
    }
  },
  loading: false
};

export type AllowedActions = AccountActions.Any | QuoteEditActions.Any | UserActions.Any;

export function reducer(state: State = initialState, action: AllowedActions): State {
  if (state === null) state = initialState;

  switch (action.type) {
    case QuoteEditActions.Delete.Type:
    case QuoteEditActions.Load.Type:
    case QuoteEditActions.CloneQuote.Type:
    case QuoteEditActions.CreateQuote.Type:
    case QuoteEditActions.UpdateQuoteFields.Type:
    case QuoteEditActions.AddFeeTo.Type:
    case QuoteEditActions.RemoveFee.Type:
    case QuoteEditActions.BulkImport.Type:
    case QuoteEditActions.EditLineItem.Type:
    case QuoteEditActions.AddAssetToProjectInQuote.Type:
    case QuoteEditActions.AddProject.Type:
    case QuoteEditActions.RemoveProject.Type:
    case QuoteEditActions.UpdateProject.Type:
    case QuoteEditActions.MoveLineItem.Type:
    case QuoteEditActions.CloneLineItem.Type:
    case QuoteEditActions.EditLineItemMarkers.Type: {
      return {
        ...Common.clone(state),
        loading: true
      };
    }

    case QuoteEditActions.EditLineItemFromDetailsSuccess.Type:
    case QuoteEditActions.AddCustomPriceToLineItemSuccess.Type:
    case QuoteEditActions.DeleteSuccess.Type:
    case QuoteEditActions.LoadSuccess.Type:
    case QuoteEditActions.RemoveAssetSuccess.Type:
    case QuoteEditActions.CloneQuoteSuccess.Type:
    case QuoteEditActions.BulkImportSuccess.Type:
    case QuoteEditActions.AddAssetToProjectInQuoteSuccess.Type:
    case QuoteEditActions.RefreshAndNotify.Type: {

      return {
        loading: false,
        data: {
          ...action.quote
        },
        sendDetails: {
          ...Common.clone(state.sendDetails)
        }
      };
    }

    case QuoteEditActions.AddUserToQuote.Type: {
      const clonedState = Common.clone(state);
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          user: {
            id: action.user.id,
            customerName: `${action.user.firstName} ${action.user.lastName}`,
            email: action.user.emailAddress
          }
        }
      };
    }

    case AccountActions.GetAccountForQuoteAdminSuccess.Type: {
      const clonedState = Common.clone(state);
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          billingAccount: {
            ...action.account
          },
          invoiceContact: {
            ...clonedState.sendDetails.invoiceContact,
            id: action.account.invoiceContactId
          }
        }
      };
    }

    case AccountActions.GetAccountForQuoteAdminOnUserAddSuccess.Type: {
      const clonedState = Common.clone(state);
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          billingAccount: {
            ...action.account,
            readonlyPaymentTermsDays: action.account.paymentTermsDays
          },
          invoiceContact: {
            ...clonedState.sendDetails.invoiceContact,
            id: action.account.invoiceContactId
          },
          user: {
            ...clonedState.sendDetails.user,
            accountName: action.account.name
          }
        }
      };
    }

    case UserActions.GetAllUsersByAccountIdSuccess.Type: {
      const clonedState = Common.clone(state);
      const clonedInitialState = Common.clone(initialState);
      const selectedUser: SendDetailsBillingAccount = action.users.find((user) => {
        return user.id === clonedState.sendDetails.billingAccount.invoiceContactId;
      });
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          invoiceContact: {
            ...clonedState.sendDetails.invoiceContact,
            contacts: [...clonedInitialState.sendDetails.invoiceContact.contacts, ...action.users],
            contactEmail: (selectedUser) ? selectedUser.emailAddress : null,
            name: (selectedUser) ? selectedUser.name : null
          }
        }
      };
    }

    case QuoteEditActions.AddInvoiceContactToQuote.Type: {
      const clonedState = Common.clone(state);
      const selectedUser: SendDetailsBillingAccount = clonedState.sendDetails.invoiceContact.contacts.find((user) => {
        return user.id === action.userId;
      });
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          invoiceContact: {
            ...clonedState.sendDetails.invoiceContact,
            id: action.userId,
            contactEmail: (selectedUser) ? selectedUser.emailAddress : null,
            name: (selectedUser) ? selectedUser.name : null
          }
        }
      };
    }

    case QuoteEditActions.InitializeSalesManagerFormOnQuote.Type: {
      const clonedState = Common.clone(state);
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          salesManager: {
            ...clonedState.sendDetails.salesManager,
            expirationDate: action.defaultDate,
            salesManager: action.emailAddress
          }
        }
      };
    }

    case QuoteEditActions.UpdateSalesManagerFormOnQuote.Type: {
      const clonedState = Common.clone(state);
      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          salesManager: {
            expirationDate: action.form.expirationDate,
            salesManager: action.form.salesManager,
            offlineAgreement: action.form.offlineAgreementReference,
          }
        }
      };
    }

    case QuoteEditActions.DeleteFailure.Type:
    case QuoteEditActions.EditLineItemFromDetailsFailure.Type:
    case QuoteEditActions.AddCustomPriceToLineItemFailure.Type:
    case QuoteEditActions.LoadFailure.Type: {
      return {
        ...Common.clone(state),
        loading: false
      };
    }

    case QuoteEditActions.UpdateBillingAccount.Type: {
      // const clonedState: State = Common.clone(state);

      return {
        ...state,
        sendDetails: {
          ...state.sendDetails,
          billingAccount: {
            ...state.sendDetails.billingAccount,
            ...action.form
          }
        }
      };
    }

    case QuoteEditActions.OverrideInvoiceContact.Type: {
      const clonedState: State = Common.clone(state);

      return {
        ...clonedState,
        sendDetails: {
          ...clonedState.sendDetails,
          invoiceContact: {
            ...clonedState.sendDetails.invoiceContact,
            ...action.contact
          }
        }
      };
    }

    default: {
      return state;
    }
  }
}

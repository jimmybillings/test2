import { SendDetails } from '../../shared/interfaces/commerce.interface';
import * as QuoteEditActions from './quote-edit.actions';
import * as QuoteState from './quote-edit.state';
import { StateSpecHelper } from '../spec-helpers/state.spec-helper';
import * as UserActions from '../user/user.actions';
import * as AccountActions from '../account/account.actions';

export function main() {
  const stateSpecHelper: StateSpecHelper = new StateSpecHelper();

  describe('Quote Edit Reducer', () => {
    stateSpecHelper.setReducerTestModules({
      state: QuoteState,
      actions: QuoteEditActions
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['Load', 'Delete', 'CloneQuote', 'CreateQuote', 'UpdateQuoteFields', 'AddFeeTo', 'RemoveFee',
        'BulkImport', 'EditLineItem', 'AddAssetToProjectInQuote', 'AddProject', 'RemoveProject', 'UpdateProject',
        'MoveLineItem', 'CloneLineItem', 'EditLineItemMarkers'],
      customTests: [
        {
          it: 'returns a clone of the state with loading: true',
          previousState: QuoteState.initialState,
          expectedNextState: { ...QuoteState.initialState, loading: true }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: [
        'LoadSuccess', 'DeleteSuccess', 'EditLineItemFromDetailsSuccess', 'RemoveAssetSuccess',
        'AddCustomPriceToLineItemSuccess', 'CloneQuoteSuccess', 'BulkImportSuccess',
        'AddAssetToProjectInQuoteSuccess', 'RefreshAndNotify'
      ],
      customTests: [
        {
          it: 'returns the state with the requested quote and loading: false',
          previousState: { ...QuoteState.initialState, loading: true },
          actionParameters: { quote: { some: 'quote' } },
          expectedNextState: { data: { some: 'quote' }, sendDetails: QuoteState.initialState.sendDetails, loading: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['LoadFailure', 'DeleteFailure', 'EditLineItemFromDetailsFailure',
        'AddCustomPriceToLineItemFailure'],
      mutationTestData: {
        previousState: { loading: true }
      },
      customTests: [
        {
          it: 'returns a clone of the state with loading: false',
          previousState: { ...QuoteState.initialState, loading: true },
          expectedNextState: { ...QuoteState.initialState, sendDetails: QuoteState.initialState.sendDetails, loading: false }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['AddUserToQuote'],
      mutationTestData: {
        previousState: QuoteState.initialState,
        actionParameters: { user: { id: 1, firstName: 'test', lastName: 'user', emailAddress: 'test@email.com' } }
      },
      customTests: [
        {
          it: 'Adds user properties to the sendDetails and updates the user field value with current user',
          previousState: QuoteState.initialState,
          actionParameters: { user: { id: 1, firstName: 'test', lastName: 'user', emailAddress: 'test@email.com' } },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              user: {
                id: 1,
                customerName: 'test user',
                email: 'test@email.com'
              }
            }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      overrideActionClass: UserActions,
      actionClassName: ['GetAllUsersByAccountIdSuccess'],
      mutationTestData: {
        actionParameters: {
          users: [
            { id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' },
            { id: 2, user: 'test 2', name: 'test2', emailAddress: 'email2@test.com' },
            { id: 3, user: 'test 3', name: 'test3', emailAddress: 'email3@test.com' }
          ]
        }
      },
      customTests: [
        {
          it: 'adds the users and the selectedUser to the invoiceContact',
          previousState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              billingAccount: {
                ...QuoteState.initialState.sendDetails.billingAccount,
                invoiceContactId: 2
              },
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact
              }
            }
          },
          actionParameters: {
            users: [
              { id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' },
              { id: 2, user: 'test 2', name: 'test2', emailAddress: 'email2@test.com' },
              { id: 3, user: 'test 3', name: 'test3', emailAddress: 'email3@test.com' }
            ]
          },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              billingAccount: {
                ...QuoteState.initialState.sendDetails.billingAccount,
                invoiceContactId: 2
              },
              invoiceContact: {
                contactEmail: 'email2@test.com',
                name: 'test2',
                id: null,
                contacts: [
                  ...QuoteState.initialState.sendDetails.invoiceContact.contacts,
                  { id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' },
                  { id: 2, user: 'test 2', name: 'test2', emailAddress: 'email2@test.com' },
                  { id: 3, user: 'test 3', name: 'test3', emailAddress: 'email3@test.com' }
                ]
              }
            }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['AddInvoiceContactToQuote'],
      mutationTestData: {
        actionParameters: { userId: 1 },
        previousState: {
          ...QuoteState.initialState,
          sendDetails: {
            ...QuoteState.initialState.sendDetails,
            invoiceContact: {
              ...QuoteState.initialState.sendDetails.invoiceContact,
              contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }]
            }
          }
        }
      },
      customTests: [
        {
          it: 'Adds the selected user as the invoiceContactId on the quote',
          previousState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact,
                contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }]
              }
            }
          },
          actionParameters: { userId: 1 },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact,
                contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }],
                id: 1,
                contactEmail: 'email1@test.com',
                name: 'test'
              }
            }
          }
        },
        {
          it: 'does nothing if there is no matching user',
          previousState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact,
                contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }]
              }
            }
          },
          actionParameters: { userId: 10 },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact,
                id: 10,
                contacts: [{ id: 1, user: 'test', name: 'test', emailAddress: 'email1@test.com' }]
              }
            }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      overrideActionClass: AccountActions,
      actionClassName: ['GetAccountForQuoteAdminSuccess'],
      mutationTestData: {
        actionParameters: {
          account: {
            name: 'Wazee Account',
            salesOwner: 'testOwner',
            purchaseOnCredit: 100,
            creditExemption: 100,
            paymentTermsDays: 20,
            licensingVertical: 'yes',
            invoiceContactId: 1
          }
        }
      },
      customTests: [
        {
          it: `Adds new account to state, updates form element with new account name as the value, 
          adds invoiceContactId property value to ID property on invoice contact object`,
          previousState: {
            ...QuoteState.initialState
          },
          actionParameters: {
            account: {
              name: 'Wazee Account',
              salesOwner: 'testOwner',
              purchaseOnCredit: 100,
              creditExemption: 100,
              paymentTermsDays: 20,
              licensingVertical: 'yes',
              invoiceContactId: 1
            }
          },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              billingAccount: {
                name: 'Wazee Account',
                salesOwner: 'testOwner',
                purchaseOnCredit: 100,
                creditExemption: 100,
                paymentTermsDays: 20,
                licensingVertical: 'yes',
                invoiceContactId: 1
              },
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact,
                id: 1
              }
            }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      overrideActionClass: AccountActions,
      actionClassName: ['GetAccountForQuoteAdminOnUserAddSuccess'],
      mutationTestData: {
        actionParameters: {
          account: {
            name: 'Wazee Account',
            salesOwner: 'testOwner',
            purchaseOnCredit: 100,
            creditExemption: 100,
            paymentTermsDays: 20,
            licensingVertical: 'yes',
            invoiceContactId: 1
          }
        }
      },
      customTests: [
        {
          it: `After adding a new user, automatically adds the users account to the state, updates form 
          element with new account name as the value, adds invoiceContactId property value to ID 
          property on invoice contact object and adds the accountName property to the user state`,
          previousState: {
            ...QuoteState.initialState
          },
          actionParameters: {
            account: {
              name: 'Wazee Account',
              salesOwner: 'testOwner',
              purchaseOnCredit: 100,
              creditExemption: 100,
              paymentTermsDays: 20,
              licensingVertical: 'yes',
              invoiceContactId: 1
            }
          },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              billingAccount: {
                name: 'Wazee Account',
                salesOwner: 'testOwner',
                purchaseOnCredit: 100,
                creditExemption: 100,
                paymentTermsDays: 20,
                readonlyPaymentTermsDays: 20,
                licensingVertical: 'yes',
                invoiceContactId: 1
              },
              invoiceContact: {
                ...QuoteState.initialState.sendDetails.invoiceContact,
                id: 1
              },
              user: {
                ...QuoteState.initialState.sendDetails.user,
                accountName: 'Wazee Account'
              }
            }
          }
        }
      ]
    });


    stateSpecHelper.generateTestsFor({
      actionClassName: ['InitializeSalesManagerFormOnQuote'],
      mutationTestData: {
        actionParameters: { emailAddress: 'email@test.com', defaultDate: '2018/12/12' }
      },
      customTests: [
        {
          it: 'Initializes sales manager form with current user and adds current user and default date to the state',
          previousState: {
            ...QuoteState.initialState,
          },
          actionParameters: { emailAddress: 'email@test.com', defaultDate: '2018/12/12' },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              salesManager: {
                expirationDate: '2018/12/12',
                salesManager: 'email@test.com',
                offlineAgreement: null
              }
            }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: ['UpdateSalesManagerFormOnQuote'],
      mutationTestData: {
        actionParameters: {
          form: {
            salesManager: 'email@test.com',
            expirationDate: '2018/12/12',
            offlineAgreementReference: 'SD12FJ23GJ23'
          }
        }
      },
      customTests: [
        {
          it: 'Initializes sales manager form with current user and adds current user and default date to the state',
          previousState: {
            ...QuoteState.initialState,
          },
          actionParameters: {
            form: {
              salesManager: 'email@test.com',
              expirationDate: '2018/12/12',
              offlineAgreementReference: 'SD12FJ23GJ23'
            }
          },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              salesManager: {
                expirationDate: '2018/12/12',
                salesManager: 'email@test.com',
                offlineAgreement: 'SD12FJ23GJ23'
              }
            }
          }
        }
      ]
    });

    stateSpecHelper.generateTestsFor({
      actionClassName: 'OverrideInvoiceContact',
      mutationTestData: {
        previousState: QuoteState.initialState,
        actionParameters: { contact: { name: 'Ross Edfort', id: 1 } }
      },
      customTests: [
        {
          it: 'Overrides the existing invoice contact',
          previousState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              invoiceContact: { name: 'Some Contact', id: 999 }
            }
          },
          actionParameters: {
            contact: { name: 'Ross Edfort', id: 1 }
          },
          expectedNextState: {
            ...QuoteState.initialState,
            sendDetails: {
              ...QuoteState.initialState.sendDetails,
              invoiceContact: { name: 'Ross Edfort', id: 1 }
            }
          }
        }
      ]
    });

    // stateSpecHelper.generateTestsFor({
    //   actionClassName: ['UpdateBillingAccount'],
    //   mutationTestData: {
    //     actionParameters: { form: { salesOwner: 'Ross' } }
    //   },
    //   customTests: [
    //     {
    //       it: 'overrides any properties on the billingAccount',
    //       previousState: {
    //         ...QuoteState.initialState
    //       },
    //       actionParameters: {
    //         form: { salesOwner: 'Ross' }
    //       },
    //       expectedNextState: {
    //         ...QuoteState.initialState,
    //         sendDetails: {
    //           ...QuoteState.initialState.sendDetails,
    //           billingAccount: {
    //             ...QuoteState.initialState.sendDetails.billingAccount,
    //             salesOwner: 'Ross'
    //           }
    //         }
    //       }
    //     }
    //   ]
    // });
  });
}

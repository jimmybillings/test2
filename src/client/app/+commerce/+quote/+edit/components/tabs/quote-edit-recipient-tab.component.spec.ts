import { Observable } from 'rxjs/Observable';
import { MockAppStore } from '../../../../../store/spec-helpers/mock-app.store';
import { QuoteEditRecipientTabComponent } from './quote-edit-recipient-tab.component';
import {
  SendDetailsBillingAccount,
  SendDetailsInvoiceContact,
  SendDetailsSalesManager,
  SendDetailsUser,
} from '../../../../../shared/interfaces/commerce.interface';

function defaultDate(days: number) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10).replace(/-/g, '/');
}

export function main() {
  describe('Quote Edit Recipient Tab Component', () => {
    let componentUnderTest: QuoteEditRecipientTabComponent;
    let addUserToQuoteDispatchSpy: jasmine.Spy;
    let addBillingAccountToQuoteDispatchSpy: jasmine.Spy;
    let addInvoiceContactToQuoteDispatchSpy: jasmine.Spy;
    let updateSalesManagerFormOnQuoteDispatchSpy: jasmine.Spy;
    let initializeSalesManagerFormOnQuoteDispatchSpy: jasmine.Spy;
    let overrideInvoiceContactDispatchSpy: jasmine.Spy;
    let updateBillingAccountDispatchSpy: jasmine.Spy;
    let mockForm: any;
    let mockCurrentUserService: any;
    let mockStore: MockAppStore;

    beforeEach(() => {
      mockStore = new MockAppStore();

      mockStore.createStateSection('quoteEdit', {
        data: {},
        sendDetails: {
          user: {
            customerName: null,
            accountName: null
          },
          billingAccount: {
            salesOwner: null,
            purchaseOnCredit: null,
            creditExemption: null,
            paymentTermsDays: null,
            licensingVertical: null
          },
          invoiceContact: {
            contactEmail: null
          },
          salesManager: {
            expirationDate: null,
            salesManager: null,
            offlineAgreement: null
          }
        },
        loading: false
      });

      addUserToQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addUserToQuote');
      addBillingAccountToQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addBillingAccountToQuote');
      addInvoiceContactToQuoteDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'addInvoiceContactToQuote');
      updateBillingAccountDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'updateBillingAccount');
      overrideInvoiceContactDispatchSpy = mockStore.createActionFactoryMethod('quoteEdit', 'overrideInvoiceContact');

      updateSalesManagerFormOnQuoteDispatchSpy = mockStore.createActionFactoryMethod(
        'quoteEdit',
        'updateSalesManagerFormOnQuote'
      );

      initializeSalesManagerFormOnQuoteDispatchSpy = mockStore.createActionFactoryMethod(
        'quoteEdit',
        'initializeSalesManagerFormOnQuote'
      );

      mockForm = {
        resetForm: jasmine.createSpy('resetForm'),
        markFieldsAsTouched: jasmine.createSpy('markFieldsAsTouched'),
        form: {
          valid: true,
          value: { invoiceContact: { name: 'Ross Edfort', contactEmail: 'ross@ross.com' } },
          controls: { someControl: { disable: jasmine.createSpy('disable'), enable: jasmine.createSpy('enable') } }
        }
      };

      mockCurrentUserService = { state: { id: 10, emailAddress: 'test email', firstName: 'test', lastName: 'user' } };

      componentUnderTest = new QuoteEditRecipientTabComponent(
        mockStore,
        mockCurrentUserService
      );
    });

    describe('ngOnInit()', () => {
      describe('initializeSalesManagerInState()', () => {
        it('dispatches the proper action', () => {
          componentUnderTest.ngOnInit();
          expect(initializeSalesManagerFormOnQuoteDispatchSpy).toHaveBeenCalledWith('test email', defaultDate(15));
        });
      });

      describe('updateFormValidity()', () => {
        beforeEach(() => {
          componentUnderTest.invoiceContactform = mockForm;
          componentUnderTest.billingAccountForm = mockForm;
        });

        it('resets the forms if the user account name matches the billing account', () => {
          mockStore.createStateSection('quoteEdit', {
            sendDetails: {
              user: {
                accountName: 'Test Account',
              },
              billingAccount: {
                name: 'Test Account',
                id: 1
              },
              invoiceContact: {}
            }
          });
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.invoiceContactform.resetForm).toHaveBeenCalled();
          expect(componentUnderTest.invoiceContactform.markFieldsAsTouched).not.toHaveBeenCalled();
          expect(componentUnderTest.billingAccountForm.resetForm).toHaveBeenCalled();
          expect(componentUnderTest.billingAccountForm.markFieldsAsTouched).not.toHaveBeenCalled();
          expect(componentUnderTest.config.invoiceContact[0].validation).toEqual('OPTIONAL');
        });

        it(`marks the forms as touched if the user account name does not match the billing account`, () => {
          mockStore.createStateSection('quoteEdit', {
            sendDetails: {
              user: {
                accountName: 'Test 2 Account',
              },
              billingAccount: {
                name: 'Test Account',
                id: 1
              },
              invoiceContact: {}
            }
          });
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.invoiceContactform.resetForm).not.toHaveBeenCalled();
          expect(componentUnderTest.invoiceContactform.markFieldsAsTouched).toHaveBeenCalled();
          expect(componentUnderTest.billingAccountForm.resetForm).not.toHaveBeenCalled();
          expect(componentUnderTest.billingAccountForm.markFieldsAsTouched).toHaveBeenCalled();
          expect(componentUnderTest.config.invoiceContact[0].validation).toEqual('REQUIRED');
        });
      });

      describe('mergeFormValues()', () => {
        it('updates the config when the billingAccount changes in the state', () => {
          mockStore.createStateSection('quoteEdit', {
            sendDetails: {
              billingAccount: { id: 1, readonlyPaymentTermsDays: 30, salesOwner: 'Ross' },
              user: { email: 'some-email' },
              invoiceContact: {}
            }
          });
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.config.billingAccount[1].value).toBe('Ross');
          expect(componentUnderTest.config.billingAccount[2].max).toBe(30);
        });

        it('updats the config when the invoiceContact changes in the state', () => {
          mockStore.createStateSection('quoteEdit', {
            sendDetails: {
              billingAccount: { invoiceContactId: 13 },
              user: { email: 'some-email' },
              invoiceContact: { contacts: [{ id: 13, some: 'user' }] }
            }
          });
          componentUnderTest.ngOnInit();

          expect(componentUnderTest.config.invoiceContact[0].value).toEqual({ id: 13, some: 'user' });
          expect(componentUnderTest.config.invoiceContact[0].options).toEqual([{ id: 13, some: 'user' }]);
        });
      });
    });

    describe('get user()', () => {
      it('returns an observable of the send details user', () => {
        let user: SendDetailsUser;
        componentUnderTest.user.subscribe(returnedUser => user = returnedUser);
        expect(user).toEqual({
          customerName: null,
          accountName: null
        });
      });
    });

    describe('get billingAccount()', () => {
      it('returns an observable of the send details user', () => {
        let billingAccount: SendDetailsBillingAccount;
        componentUnderTest.billingAccount.subscribe(returnedBillingAccount => billingAccount = returnedBillingAccount);
        expect(billingAccount).toEqual({
          salesOwner: null,
          purchaseOnCredit: null,
          creditExemption: null,
          paymentTermsDays: null,
          licensingVertical: null
        });
      });
    });

    describe('get invoiceContact()', () => {
      it('returns an observable of the send details user', () => {
        let invoiceContact: SendDetailsInvoiceContact;
        componentUnderTest.invoiceContact.subscribe(returnedInvoiceContact => invoiceContact = returnedInvoiceContact);
        expect(invoiceContact).toEqual({
          contactEmail: null
        });
      });
    });

    describe('get salesManager()', () => {
      it('returns an observable of the send details user', () => {
        let salesManager: SendDetailsSalesManager;
        componentUnderTest.salesManager.subscribe(returnedSalesManager => salesManager = returnedSalesManager);
        expect(salesManager).toEqual({
          expirationDate: null,
          salesManager: null,
          offlineAgreement: null
        });
      });
    });

    describe('userSelect()', () => {
      it('dispatches addUserToQuote with a User', () => {
        componentUnderTest.userSelect({ user: 'some user' } as any);
        expect(addUserToQuoteDispatchSpy).toHaveBeenCalledWith({ user: 'some user' });
      });
    });

    describe('accountSelect()', () => {
      it('dispatches addBillingAccountToQuote with an Account', () => {
        componentUnderTest.accountSelect({ account: 'some account' } as any);
        expect(addBillingAccountToQuoteDispatchSpy).toHaveBeenCalledWith({ account: 'some account' });
      });
    });

    describe('invoiceContactSelect()', () => {
      it('dispatches addInvoiceContactToQuote with a value from event', () => {
        componentUnderTest.invoiceContactSelect({ value: 'some contact' } as any);
        expect(addInvoiceContactToQuoteDispatchSpy).toHaveBeenCalledWith('some contact');
      });
    });

    describe('onBlur()', () => {
      it('dispatchs updateSalesManagerFormOnQuote with the sales manager form', () => {
        componentUnderTest.onBlur({ salesManger: 'some sales manager' } as any);
        expect(updateSalesManagerFormOnQuoteDispatchSpy).toHaveBeenCalledWith({ salesManger: 'some sales manager' });
      });
    });

    describe('get allBillingSelectionComplete()', () => {
      beforeEach(() => {
        componentUnderTest.salesManagerForm = mockForm;
        componentUnderTest.billingAccountForm = mockForm;
        componentUnderTest.recipientForm = mockForm;
      });

      it('returns true if the user account matches the selected billing account', () => {
        let billingSectionsComplete: Boolean;
        mockStore.createStateSection('quoteEdit', {
          sendDetails: {
            user: {
              accountName: 'Test Account',
            },
            billingAccount: {
              name: 'Test Account',
            }
          }
        });
        componentUnderTest.allBillingSelectionComplete.subscribe(complete => billingSectionsComplete = complete);
        expect(billingSectionsComplete).toEqual(true);
      });

      it('returns true when invoice contact is selected and the user account doesnt match billing account', () => {
        let billingSectionsComplete: Boolean;
        mockStore.createStateSection('quoteEdit', {
          sendDetails: {
            user: {
              accountName: 'Test Account',
            },
            billingAccount: {
              name: 'Test 2 Account',
              id: 1
            },
            invoiceContact: {
              id: 3
            }
          }
        });
        componentUnderTest.allBillingSelectionComplete.subscribe(complete => billingSectionsComplete = complete);
        expect(billingSectionsComplete).toEqual(true);
      });

      it('returns false if the user account does not match the selected billing account and there is no invoice contact', () => {
        let billingSectionsComplete: Boolean = false;
        mockStore.createStateSection('quoteEdit', {
          sendDetails: {
            user: {
              accountName: 'Test 2 Account',
            },
            billingAccount: {
              name: 'Test Account',
            }
          }
        });
        componentUnderTest.allBillingSelectionComplete.subscribe(complete => billingSectionsComplete = complete);
        expect(billingSectionsComplete).toEqual(false);
      });
    });

    describe('onEditableFeldChange()', () => {
      it('dispatches the proper action', () => {
        componentUnderTest.onEditableFieldChange({ some: 'change' });
        mockStore.expectDispatchFor(updateBillingAccountDispatchSpy, { some: 'change' });
      });
    });

    describe('onCheckboxChange()', () => {
      describe('when the checkbox has been checked', () => {
        beforeEach(() => {
          componentUnderTest.invoiceContactform = mockForm;
          componentUnderTest.onCheckboxChange({ checked: true } as any);
        });

        it('disables the form\s controls', () => {
          expect(mockForm.form.controls['someControl'].disable).toHaveBeenCalled();
        });

        it('dispatches the proper action', () => {
          mockStore.expectDispatchFor(
            overrideInvoiceContactDispatchSpy,
            { id: 10, contactEmail: 'test email', name: 'test user' }
          );
        });
      });

      describe('when the checkbox has been un-checked', () => {
        beforeEach(() => {
          componentUnderTest.invoiceContactform = mockForm;
          componentUnderTest.onCheckboxChange({ checked: false } as any);
        });

        it('enables the form\s controls', () => {
          expect(mockForm.form.controls['someControl'].enable).toHaveBeenCalled();
        });

        it('dispatches the proper action', () => {
          mockStore.expectDispatchFor(
            addInvoiceContactToQuoteDispatchSpy,
            { name: 'Ross Edfort', contactEmail: 'ross@ross.com' }
          );
        });
      });
    });
  });
}

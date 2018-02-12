import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  QuoteOptions,
  SendDetails,
  SendDetailsBillingAccount,
  SendDetailsInvoiceContact,
  SendDetailsUser,
  SendDetailsSalesManager,
} from '../../../../../shared/interfaces/commerce.interface';
import { WzFormComponent } from '../../../../../shared/modules/wz-form/wz.form.component';
import { User } from '../../../../../shared/interfaces/user.interface';
import { Account } from '../../../../../shared/interfaces/account.interface';
import { Tab } from '../../../../components/tabs/tab';
import { CurrentUserService } from '../../../../../shared/services/current-user.service';
import { AppStore } from '../../../../../app.store';
import { Pojo } from '../../../../../shared/interfaces/common.interface';
import { FormFields } from '../../../../../shared/interfaces/forms.interface';
import { WzFormPicklistComponent } from '../wz-form-picklist.component';
import { WzFormAutoCompleteViewComponent } from '../wz-form-autocomplete-view.component';
import { MatCheckboxChange } from '@angular/material';

interface SendDetailsConfig {
  user: FormFields[];
  billingAccount: FormFields[];
  invoiceContact: Pojo[];
  salesManager: FormFields[];
};
@Component({
  moduleId: module.id,
  selector: 'quote-edit-recipient-tab-component',
  templateUrl: 'quote-edit-recipient-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteEditRecipientTabComponent extends Tab implements OnInit {
  @ViewChild('invoiceContactform') public invoiceContactform: WzFormPicklistComponent;
  @ViewChild('billingAccountForm') public billingAccountForm: WzFormAutoCompleteViewComponent;
  @ViewChild('salesManagerForm') public salesManagerForm: WzFormAutoCompleteViewComponent;
  @ViewChild('recipientForm') public recipientForm: WzFormAutoCompleteViewComponent;

  public config: SendDetailsConfig;

  constructor(
    private store: AppStore,
    private currentUserService: CurrentUserService) {
    super();
  }

  ngOnInit() {
    this.config = this.sendConfig();
    this.initializeSalesManagerInState();
    this.listenToStateChanges();
  }

  public get user(): Observable<SendDetailsUser> {
    return this.store.select(state => state.quoteEdit.sendDetails.user);
  }

  public get billingAccount(): Observable<SendDetailsBillingAccount> {
    return this.store.select(state => state.quoteEdit.sendDetails.billingAccount);
  }

  public get invoiceContact(): Observable<SendDetailsInvoiceContact> {
    return this.store.select(state => state.quoteEdit.sendDetails.invoiceContact);
  }

  public get salesManager(): Observable<SendDetailsSalesManager> {
    return this.store.select(state => state.quoteEdit.sendDetails.salesManager);
  }

  public userSelect(user: User): void {
    this.store.dispatch(factory => factory.quoteEdit.addUserToQuote(user));
  }

  public accountSelect(account: Account): void {
    this.store.dispatch(factory => factory.quoteEdit.addBillingAccountToQuote(account));
  }

  public invoiceContactSelect(event: Pojo): void {
    this.store.dispatch(factory => factory.quoteEdit.addInvoiceContactToQuote(event.value));
  }

  public onBlur(form: Pojo): void {
    this.store.dispatch(factory => factory.quoteEdit.updateSalesManagerFormOnQuote(form));
  }

  public get allBillingSelectionComplete(): Observable<boolean> {
    return this.store.select(state => state.quoteEdit.sendDetails)
      .map((sendDetails: SendDetails) => (
        this.userAccountMatchesBillingAccount(sendDetails) ||
        this.allBillingFieldsSelected(sendDetails)
      ));
  }

  public onEditableFieldChange(change: Pojo): void {
    this.store.dispatch(factory => factory.quoteEdit.updateBillingAccount(change));
  }

  public onCheckboxChange(event: MatCheckboxChange): void {
    for (let controlName in this.invoiceContactform.form.controls) {
      if (event.checked) {
        this.invoiceContactform.form.controls[controlName].disable();
        this.store.dispatch(factory => factory.quoteEdit.overrideInvoiceContact({
          id: this.currentUserService.state.id,
          contactEmail: this.currentUserService.state.emailAddress,
          name: `${this.currentUserService.state.firstName} ${this.currentUserService.state.lastName}`
        }));
      } else {
        this.invoiceContactform.form.controls[controlName].enable();
        this.store.dispatch(factory => factory.quoteEdit.addInvoiceContactToQuote(
          this.invoiceContactform.form.value.invoiceContact
        ));
      }
    }
  }

  private userAccountMatchesBillingAccount(sendDetails: SendDetails): boolean {
    return (sendDetails.user.hasOwnProperty('accountName') && sendDetails.billingAccount.hasOwnProperty('name')) &&
      sendDetails.user.accountName === sendDetails.billingAccount.name &&
      this.formsAreValid;
  }

  private allBillingFieldsSelected(sendDetails: SendDetails): boolean {
    return sendDetails.user.hasOwnProperty('accountName') &&
      sendDetails.billingAccount.hasOwnProperty('id') &&
      sendDetails.invoiceContact.hasOwnProperty('id') &&
      this.formsAreValid;
  }

  private initializeSalesManagerInState(): void {
    this.store.dispatch(factory =>
      factory.quoteEdit.initializeSalesManagerFormOnQuote(
        this.currentUserService.state.emailAddress,
        this.defaultDate(15)
      )
    );
  }

  private get formsAreValid(): boolean {
    return (this.billingAccountForm && this.billingAccountForm.form.valid) &&
      (this.salesManagerForm && this.salesManagerForm.form.valid) &&
      (this.recipientForm && this.recipientForm.form.valid);
  }

  private defaultDate(days: number): string {
    let date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10).replace(/-/g, '/');
  }

  private listenToStateChanges(): void {
    this.store.select(state => state.quoteEdit.sendDetails).subscribe(state => {
      this.mergeFormValues(state);
      this.updateFormValidity(state);
    });
  }

  private updateFormValidity(state: SendDetails): void {

    if (!this.invoiceContactform || !this.billingAccountForm) return;
    if ((state.billingAccount.name === state.user.accountName) && !state.invoiceContact.id) {
      this.config.invoiceContact = this.config.invoiceContact.map(item => {
        item.validation = 'OPTIONAL';
        return item;
      });
      this.billingAccountForm.resetForm();
      this.invoiceContactform.resetForm();
    }

    if ((state.billingAccount.name !== state.user.accountName) && !state.invoiceContact.id) {
      this.config.invoiceContact = this.config.invoiceContact.map(item => {
        item.validation = 'REQUIRED';
        return item;
      });
      this.billingAccountForm.markFieldsAsTouched();
      this.invoiceContactform.markFieldsAsTouched();
    }
  }

  private mergeFormValues(state: SendDetails): void {
    if (state.user.email) {
      this.config.user[0].value = state.user.email;
    }

    if (state.billingAccount.id) {
      this.config.billingAccount = this.config.billingAccount.map(field => {
        field.value = state.billingAccount[field.name];
        if (field.hasOwnProperty('max') && state.billingAccount.hasOwnProperty('readonlyPaymentTermsDays')) {
          field.max = state.billingAccount.readonlyPaymentTermsDays;
          if (this.billingAccountForm) this.billingAccountForm.updateValidatorsFor(field);
        }
        return field;
      });
    }

    if (state.invoiceContact.contacts) {
      const contact = state.invoiceContact.contacts.find(c => {
        return state.invoiceContact.id ?
          c.id === state.invoiceContact.id :
          c.id === state.billingAccount.invoiceContactId;
      });
      this.config.invoiceContact[0].value = contact || '';
      this.config.invoiceContact[0].options = state.invoiceContact.contacts;
    }
  }

  private sendConfig(): SendDetailsConfig {
    return {
      user: [
        {
          endPoint: 'user/searchFields',
          queryParams: 'fields,emailAddress,values',
          service: 'identities',
          suggestionHeading: 'Matching users',
          name: 'emailAddress',
          label: 'QUOTE.EDIT.FORMS.RECIPIENT_EMAIL_LABEL',
          type: 'suggestions',
          value: '',
          validation: 'REQUIRED'
        }
      ],
      billingAccount: [
        {
          endPoint: 'account/searchFields',
          queryParams: 'fields,name,values',
          service: 'identities',
          suggestionHeading: 'Matching accounts',
          name: 'name',
          label: 'QUOTE.EDIT.FORMS.ACCOUNT_NAME_LABEL',
          type: 'suggestions',
          value: '',
          validation: 'REQUIRED'
        },
        {
          name: 'salesOwner',
          label: 'QUOTE.EDIT.SALES_OWNER_KEY',
          type: 'text',
          value: '',
          validation: 'REQUIRED'
        },
        {
          name: 'paymentTermsDays',
          label: 'QUOTE.EDIT.PAYMENT_TERMS_DAYS_KEY',
          type: 'number',
          value: '',
          validation: 'BETWEEN',
          min: '1',
          max: '0'
        }
      ],
      invoiceContact: [
        {
          name: 'invoiceContact',
          options: [],
          label: 'QUOTE.EDIT.FORMS.INVOICE_CONTACT_LABEL',
          type: 'select',
          value: '',
          validation: 'OPTIONAL'
        }
      ],
      salesManager: [
        {
          default: 'TODAY+15',
          name: 'expirationDate',
          label: 'QUOTE.EDIT.FORMS.EXPIRATION_DATE_LABEL',
          type: 'wzdate',
          minimum: 'TODAY',
          validation: 'REQUIRED',
          value: ''
        },
        {
          name: 'salesManager',
          label: 'QUOTE.EDIT.FORMS.SALES_MANAGER_LABEL',
          type: 'email',
          value: this.currentUserService.state.emailAddress,
          validation: 'EMAIL'
        },
        {
          name: 'offlineAgreementReference',
          label: 'QUOTE.EDIT.FORMS.OFFLINE_AGREEMENT_LABEL',
          type: 'textarea',
          value: '',
          validation: 'OPTIONAL'
        }
      ]
    };
  }
}

import { Component, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Tab } from './tab';
import { CartService } from '../../../shared/services/cart.service';
import { QuoteService } from '../../../shared/services/quote.service';
import { UserService } from '../../../shared/services/user.service';
import { CurrentUserService } from '../../../shared/services/current-user.service';
import { Address, User, ViewAddress, AddressKeys } from '../../../shared/interfaces/user.interface';
import { RowFormFields } from '../../../shared/interfaces/forms.interface';
import { CommerceCapabilities } from '../../services/commerce.capabilities';
import { WzAddressFormComponent } from '../../../shared/modules/wz-form/components/wz-address-form/wz.address-form.component';
import { WzDialogService } from '../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { SendDetailsInvoiceContact } from '../../../shared/interfaces/commerce.interface';
import { AppStore, CheckoutState } from '../../../app.store';
import { Pojo } from '../../../shared/interfaces/common.interface';

export class CommerceBillingTab extends Tab {
  public orderInProgress: Observable<CheckoutState>;
  public addressErrors: Pojo = {};
  public showAddAddressForm: boolean;
  public showEditAddressForm: boolean;
  public quoteBillingAccountInfo: Observable<SendDetailsInvoiceContact>;
  public quoteInvoiceContactInfo: Observable<ViewAddress>;
  @Input() loaded: boolean;
  @Output() tabNotify: EventEmitter<Object> = this.notify;

  constructor(
    public userCan: CommerceCapabilities,
    protected commerceService: CartService | QuoteService,
    protected user: UserService,
    protected currentUser: CurrentUserService,
    protected dialog: WzDialogService,
    protected store: AppStore
  ) {
    super();
  }

  public typeFor(address: ViewAddress): string {
    return address.type ? address.type : '';
  }

  public nameFor(address: ViewAddress): string {
    return address.name ? address.name : '';
  }

  public lineOneFor(address: ViewAddress): string {
    return this.addressJoinSegment(address, 'address', 'address2');
  }

  public cityFor(address: ViewAddress): string {
    return this.addressSegmentWithComma(address, 'city');
  }

  public stateFor(address: ViewAddress): string {
    return this.addressSegment(address, 'state');
  }

  public zipcodeFor(address: ViewAddress): string {
    return this.addressSegmentWithComma(address, 'zipcode');
  }

  public countryFor(address: ViewAddress): string {
    return this.addressSegment(address, 'country');
  }

  public phoneFor(address: ViewAddress): string {
    return this.addressSegment(address, 'phone');
  }

  public addUserAddress(form: Address): void {
    this.user.addBillingAddress(form).subscribe((user: User) => {
      this.fetchAddresses().subscribe(this.determineNewSelectedAddress);
    });
  }

  public addAccountAddress(form: Address, wholeAddress: ViewAddress): void {
    let newAddress: ViewAddress = Object.assign({}, wholeAddress, { address: form });
    this.user.addAccountBillingAddress(newAddress).subscribe((account: any) => {
      this.fetchAddresses().subscribe(this.determineNewSelectedAddress);
    });
  }
  // Hopefully this can be removed at some point. (JH)
  // Currently in a quote the invoiceContact data is not returned like most user Addresses (ViewAddress)
  // We reformat it here so we still something to display in the confirmation, when a mail address is absent.
  public formatAndSelectAddress(invoiceContact: Pojo): void {
    let invoiceAddress: ViewAddress = Object.assign({
      addressEntityId: invoiceContact.addressId,
      type: invoiceContact.type,
      name: `${invoiceContact.firstName} ${invoiceContact.lastName}`,
      address: invoiceContact.billingInfo.address
    });
    this.selectAddress(invoiceAddress);
  }

  public selectAddress(address: ViewAddress, nextTab: boolean = true): void {
    this.store.dispatch(factory => factory.checkout.setSelectedAddress(address));
    if (nextTab) this.goToNextTab();
  }

  public get userCanProceed(): Observable<boolean> {
    return this.store.select(state => state.checkout).map((data: CheckoutState) => {
      if (!data.selectedAddress.address) {
        return false;
      } else {
        return Object.keys(data.selectedAddress.address).filter((k: string) => {
          return data.selectedAddress.address[k] === '';
        }).length === 0;
      }
    });
  }

  public openFormFor(resourceType: 'account' | 'user', mode: 'edit' | 'create', address?: ViewAddress): void {
    let title: string = mode === 'edit' ? this.editFormTitle(resourceType) : this.createFormTitle(resourceType);
    this.dialog.openComponentInDialog(
      {
        componentType: WzAddressFormComponent,
        dialogConfig: { position: { top: '6%' } },
        inputOptions: {
          loaded: this.loaded,
          title: title,
          address: mode === 'edit' ? address.address : null
        },
        outputOptions: [{
          event: 'onSaveAddress',
          callback: (form: any) => {
            if (typeof form === 'undefined') return;
            if (resourceType === 'user') {
              this.addUserAddress(form);
            } else {
              this.addAccountAddress(form, address);
            }
          },
          closeOnEvent: true
        }]
      }
    );
  }

  public displayAddressErrors(addressId: number): boolean {
    return this.addressErrors[addressId] && this.addressErrors[addressId].length > 0;
  }

  public formatAddressErrors(address: ViewAddress): string {
    let errors: Array<string> = this.addressErrors[address.addressEntityId];
    return errors.reduce((prev: string, curr: string, i: number) => {
      prev += `${curr}`;
      if (i < errors.length - 1) prev += ', ';
      if (i === errors.length - 2) prev += 'and ';
      return prev;
    }, '');
  }

  public disableSelectBtnFor(address: ViewAddress): boolean {
    return !address.address ||
      (this.addressErrors[address.addressEntityId] && this.addressErrors[address.addressEntityId].length > 0);
  }

  public fetchAddresses(): Observable<Array<ViewAddress>> {
    return this.user.getAddresses().do((addresses: Array<ViewAddress>) => {
      this.validate(addresses);
      this.showAddAddressForm = this.showAddForm(addresses);
      this.showEditAddressForm = this.showEditForm(addresses);
      this.store.dispatch(factory => factory.checkout.setAvailableAddresses(addresses));
    });
  }

  private addressSegment(address: ViewAddress, segment: string): string | null {
    return address.address && address.address[segment] ? address.address[segment] : null;
  }

  private addressSegmentWithComma(address: ViewAddress, segment: string): string {
    return this.addressSegment(address, segment) ? this.addressSegment(address, segment) + ',' : '';
  }

  private addressJoinSegment(address: ViewAddress, segmentOne: string, segmentTwo: string): string {
    return (address.address[segmentOne] ? address.address[segmentOne] : '') +
      (address.address[segmentTwo] ? ', ' + address.address[segmentTwo] : '');
  }

  private editFormTitle(resourceType: 'user' | 'account'): string {
    return `CART.BILLING.EDIT_${resourceType.toUpperCase()}_ADDRESS_TITLE`;
  }

  private createFormTitle(resourceType: 'user' | 'account'): string {
    return `CART.BILLING.ADD_${resourceType.toUpperCase()}_ADDRESS_TITLE`;
  }

  // If GET /currentUsersAssociatedAddresses does not return ANY addresses,
  // we automatically show the add form for a new user address
  private showAddForm(addresses: Array<ViewAddress>): boolean {
    return addresses.filter((a: ViewAddress) => !!a.address).length === 0;
  }

  // if GET /currentUsersAssociatedAddresses returns only 1 address, but it is not complete,
  // we automatically show the edit form for that address
  private showEditForm(addresses: Array<ViewAddress>): boolean {
    return addresses.filter((a: ViewAddress) => !!a.address).length === 1 &&
      this.addressErrors[addresses[0].addressEntityId].length > 0;
  }

  private determineNewSelectedAddress = (addresses: Array<ViewAddress>) => {
    let newSelected: ViewAddress;
    this.store.select(state => state.checkout).take(1).subscribe((data: CheckoutState) => {
      if (data.selectedAddress && typeof data.selectedAddress.addressEntityId !== 'undefined') {
        newSelected = this.previouslySelectedAddress;
      } else {
        newSelected = data.addresses.filter((a: ViewAddress) => !!a.address)[0];
      }
    });
    this.selectAddress(newSelected, false);
  }

  private get previouslySelectedAddress(): ViewAddress {
    let previouslySelected: ViewAddress;
    this.store.select(state => state.checkout).take(1).subscribe((data: CheckoutState) => {
      previouslySelected = data.addresses.filter((a: ViewAddress) => {
        return a.addressEntityId === data.selectedAddress.addressEntityId;
      })[0];
    });
    return previouslySelected;
  }

  private validate(addresses: Array<ViewAddress>): void {
    this.addressErrors = {};
    addresses.forEach((address: ViewAddress) => {
      this.addressErrors[address.addressEntityId] = [];
      if (!address.address) return;
      let actualAddressKeys: Array<String> = Object.keys(address.address);
      AddressKeys.forEach((key: string) => {
        if (actualAddressKeys.indexOf(key) < 0 || address.address[key] === '') {
          this.addressErrors[address.addressEntityId].push(key);
        }
      });
    });
  }
}

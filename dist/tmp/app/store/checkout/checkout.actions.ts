import { Action } from '@ngrx/store';
import { PaymentOption, PaymentOptions, CreditCardAuthorization } from '../../shared/interfaces/commerce.interface';
import { ViewAddress } from '../../shared/interfaces/user.interface';

export class ActionFactory {
  public setPurchaseOrderId(purchaseOrderId: string): SetPurchaseOrderId {
    return new SetPurchaseOrderId(purchaseOrderId);
  }

  public setAvailablePaymentOptions(paymentOptions: PaymentOptions): SetAvailablePaymentOptions {
    return new SetAvailablePaymentOptions(paymentOptions);
  }

  public setSelectedPaymentType(paymentType: PaymentOption): SetSelectedPaymentType {
    return new SetSelectedPaymentType(paymentType);
  }

  public setAvailableAddresses(addresses: ViewAddress[]): SetAvailableAddresses {
    return new SetAvailableAddresses(addresses);
  }

  public setSelectedAddress(address: ViewAddress): SetSelectedAddress {
    return new SetSelectedAddress(address);
  }

  public setCreditCardAuthorization(authorization: CreditCardAuthorization): SetCreditCardAuthorization {
    return new SetCreditCardAuthorization(authorization);
  }

  public reset(): Reset {
    return new Reset();
  }
}

export class InternalActionFactory extends ActionFactory { }

export class SetPurchaseOrderId implements Action {
  public static readonly Type = '[Checkout] Set Purchase Order Id';
  public readonly type = SetPurchaseOrderId.Type;
  constructor(public readonly purchaseOrderId: string) { }
}

export class SetAvailablePaymentOptions implements Action {
  public static readonly Type = '[Checkout] Set Available Payment Options';
  public readonly type = SetAvailablePaymentOptions.Type;
  constructor(public readonly paymentOptions: PaymentOptions) { }
}

export class SetSelectedPaymentType implements Action {
  public static readonly Type = '[Checkout] Set Selected Payment Type';
  public readonly type = SetSelectedPaymentType.Type;
  constructor(public readonly selectedPaymentType: PaymentOption) { }
}

export class SetAvailableAddresses implements Action {
  public static readonly Type = '[Checkout] Set Available Addresses';
  public readonly type = SetAvailableAddresses.Type;
  constructor(public readonly addresses: ViewAddress[]) { }
}

export class SetSelectedAddress implements Action {
  public static readonly Type = '[Checkout] Set Selected Address';
  public readonly type = SetSelectedAddress.Type;
  constructor(public readonly selectedAddress: ViewAddress) { }
}

export class SetCreditCardAuthorization implements Action {
  public static readonly Type = '[Checkout] Set Credit Card Authorization';
  public readonly type = SetCreditCardAuthorization.Type;
  constructor(public readonly authorization: CreditCardAuthorization) { }
}

export class Reset implements Action {
  public static readonly Type = '[Checkout] Reset';
  public readonly type = Reset.Type;
}

export type Any = SetPurchaseOrderId | SetSelectedPaymentType | SetSelectedAddress | SetAvailableAddresses |
  SetCreditCardAuthorization | SetAvailablePaymentOptions | Reset;

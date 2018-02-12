import { Output, EventEmitter, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { Tab } from './tab';
import { CartService } from '../../../shared/services/cart.service';
import { QuoteService } from '../../../shared/services/quote.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {
  QuoteState, CartState, PaymentOption, PaymentOptions, CreditCardAuthorization
} from '../../../shared/interfaces/commerce.interface';
import { FormFields } from '../../../shared/interfaces/forms.interface';
import { AppStore } from '../../../app.store';

export class CommercePaymentTab extends Tab implements OnInit {
  @Output() tabNotify: EventEmitter<Object> = this.notify;
  public serverErrors: any = null;
  public successfullyVerified: Subject<any> = new Subject();
  public selectedPaymentOption: PaymentOption = null;
  public fields: Observable<FormFields>;

  constructor(
    protected _zone: NgZone,
    protected commerceService: CartService | QuoteService,
    protected store: AppStore,
    protected ref: ChangeDetectorRef
  ) {
    super();
    this.successfullyVerified.next(false);
  }

  ngOnInit() {
    this.fields = this.store.selectCloned(state => state.uiConfig.components.cart.config.payment.items).take(1);
    this.loadStripe();
  }

  public get data(): Observable<any> {
    return this.commerceService.data.map((state: QuoteState | CartState) => state.data);
  }

  public get paymentOptions(): Observable<PaymentOptions> {
    return this.store.select(state => state.checkout.paymentOptions);
  }

  public get showHoldMessage(): Observable<boolean> {
    return this.commerceService.paymentOptionsEqual(['Hold']);
  }

  public get showCreditCardForm(): Observable<boolean> {
    return this.commerceService.paymentOptionsEqual(['CreditCard']);
  }

  public get showCreditCardAndPurchaseOnCredit(): Observable<boolean> {
    return this.commerceService.paymentOptionsEqual(['CreditCard', 'PurchaseOnCredit']);
  }

  public selectPurchaseOnCredit() {
    this.store.dispatch(factory => factory.checkout.setSelectedPaymentType('PurchaseOnCredit'));
    this.tabNotify.emit({ type: 'GO_TO_NEXT_TAB' });
  }

  public preAuthorize(form: any) {
    (<any>window).Stripe.card.createToken(
      form,
      (status: number, response: CreditCardAuthorization) => {
        this._zone.run(() => {
          if (status === 200) {
            this.store.dispatch(factory => factory.checkout.setCreditCardAuthorization(response));
            this.store.dispatch(factory => factory.checkout.setSelectedPaymentType('CreditCard'));
            this.tabNotify.emit({ type: 'GO_TO_NEXT_TAB' });
            this.successfullyVerified.next(true);
            this.ref.markForCheck();
          } else {
            this.serverErrors = { fieldErrors: [] };
            this.serverErrors.fieldErrors
              .push({
                code: response.error.code,
                field: response.error.param
              });
            this.successfullyVerified.next(false);
            this.ref.markForCheck();
          }
        });
      });
  }

  public editCreditCard() {
    this.successfullyVerified.next(false);
    this.disableTab(3);
  }

  private loadStripe() {
    const stripeScript = 'https://js.stripe.com/v2/';
    var scripts = document.getElementsByTagName('script');
    var i = scripts.length, stripeLoaded = false;
    while (i--) {
      if (scripts[i].src === stripeScript) {
        stripeLoaded = true;
      }
    }
    if (!stripeLoaded) {
      var script = document.createElement('script');
      Object.assign(script, { src: stripeScript, type: 'text/javascript' });
      document.body.appendChild(script);
      script.onload = () => {
        (<any>window).Stripe.setPublishableKey(this.commerceService.state.data.stripePublicKey);
      };
    }
  }
}

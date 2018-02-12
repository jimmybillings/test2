import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Quote, Order } from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'commerce-list',
  templateUrl: 'commerce-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CommerceListComponent {
  @Input() items: Array<Order> | Array<Quote>;
  @Input() type: 'ORDER' | 'QUOTE';
  @Input() userCanAdministerQuotes: boolean;
  @Output() setAsFocusedQuote: EventEmitter<any> = new EventEmitter();
  @Output() editQuote: EventEmitter<any> = new EventEmitter();
  @Output() rejectQuote: EventEmitter<any> = new EventEmitter();

  public shouldShowSetFocusedButton(item: Quote): boolean {
    return this.type === 'QUOTE' && item.quoteStatus === 'PENDING' && this.userCanAdministerQuotes;
  }

  public shouldShowEditQuoteButton(item: Quote): boolean {
    return this.type === 'QUOTE' && item.quoteStatus === 'PENDING' && this.userCanAdministerQuotes;
  }

  public shouldShowViewQuoteButton(item: Quote): boolean {
    return this.type === 'QUOTE' && item.quoteStatus !== 'PENDING';
  }

  public shouldShowRejectQuoteButton(item: Quote): boolean {
    return this.type === 'QUOTE' && item.quoteStatus === 'ACTIVE' && !this.userCanAdministerQuotes;
  }

  public shouldShowRefundIndicatorFor(item: Order): boolean {
    return this.type === 'ORDER' && !!item.creditMemoForOrderId;
  }

  public shouldShowPaymentBalanceFor(item: Order): boolean {
    return this.type === 'ORDER' && !!item.paymentBalance && !!item.paymentDueDate && item.paymentBalance > 0;
  }

  public get shouldShowViewOrderButton(): boolean {
    return this.type === 'ORDER';
  }
}

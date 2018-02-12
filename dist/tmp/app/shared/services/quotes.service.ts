import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { CartService } from '../../shared/services/cart.service';
import { Api } from '../../shared/interfaces/api.interface';
import { Observable } from 'rxjs/Observable';
import { Quote, Quotes, QuotesApiResponse } from '../../shared/interfaces/commerce.interface';
import { QuotesStore } from '../../shared/stores/quotes.store';

@Injectable()
export class QuotesService {
  constructor(private api: ApiService,
    private cart: CartService,
    private quotesStore: QuotesStore
  ) { }


  public get data(): Observable<Quotes> {
    return this.quotesStore.data;
  }

  public get state(): Quotes {
    return this.quotesStore.state;
  }

  public getQuotes(userCanAdministerQuotes: boolean = false, params: any = {}): Observable<any> {
    if (userCanAdministerQuotes) {
      return this.getQuotesForSalesUser(params);
    } else {
      return this.getQuotesForCustomer(params);
    }
  }

  public getFocused(): Observable<Quote> {
    return this.api.get(Api.Orders, 'quote/focused');
  }

  public setFocused(quoteId: number): Observable<Quote> {
    return this.api.put(Api.Orders, `quote/focused/${quoteId}`, { loadingIndicator: true }).do((quote: Quote) => {
      this.updateNewFocusedQuote(quote.id);
    });
  }

  public rejectQuote(quoteId: number): Observable<Quote> {
    return this.api.put(Api.Orders, `quote/reject/${quoteId}`);
  }

  public createEmpty(): Observable<Quote> {
    return this.api.post(Api.Orders, 'quote', { loadingIndicator: true });
  }

  private getQuotesForCustomer(params: any): Observable<QuotesApiResponse> {
    return this.quotesList(params);
  }

  private getQuotesForSalesUser(params: any): Observable<QuotesApiResponse> {
    return this.getFocused().switchMap(quote => this.quotesList(params, quote.id));
  }

  private quotesList(params: any = {}, focusedQuoteId?: number): Observable<QuotesApiResponse> {
    return this.api.get(
      Api.Orders,
      'quote/myQuotes',
      { parameters: this.buildSearchParams(params), loadingIndicator: true }
    ).map((res: QuotesApiResponse) => {
      res.items = res.items ? res.items : [];
      if (focusedQuoteId) this.findNewFocused(res.items, focusedQuoteId);
      return res;
    }).do(this.setQuotesInStore);
  }

  private findNewFocused(quotes: Quote[], activeQuoteId: number): Quote[] {
    return quotes.map((quote: Quote) => {
      quote.focused = quote.id === activeQuoteId;
      return quote;
    });
  }

  private updateNewFocusedQuote(quoteId: number): void {
    this.data.do((data: Quotes) => {
      data.items.map((quote: Quote) => {
        quote.focused = false;
        if (quote.id === quoteId) quote.focused = true;
        return quote;
      });
    }).do(this.updateQuotesInStore).take(1).subscribe();
  }

  private buildSearchParams(params: any) {
    params['i'] = (params['i'] && params['i'] > 0) ? params['i'] - 1 : 0;
    return Object.assign({}, { q: '', i: 0, n: 20, s: '', d: '' }, params);
  }

  private updateQuotesInStore = (quotes: Quotes): void => {
    this.quotesStore.updateQuotes({ items: quotes.items });
  }

  private setQuotesInStore = (quotes: QuotesApiResponse): void => {
    this.quotesStore.setQuotes(quotes);
  }
}

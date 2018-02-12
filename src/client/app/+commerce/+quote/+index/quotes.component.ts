import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotesService } from '../../../shared/services/quotes.service';
import { CommerceCapabilities } from '../../services/commerce.capabilities';
import { AppStore } from '../../../app.store';
import { Quote, Quotes } from '../../../shared/interfaces/commerce.interface';
import { Observable } from 'rxjs/Observable';
import { WzDialogService } from '../../../shared/modules/wz-dialog/services/wz.dialog.service';

@Component({
  selector: 'quotes-component',
  templateUrl: 'quotes.html',
  moduleId: module.id,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent {
  public quotes: Observable<Quotes>;
  public config: any;
  public sortOptions: any[];
  public filterOptions: any[];
  public currentSort: any;
  public currentFilter: any;
  private params: any;
  private quoteToReject: Quote;
  constructor(
    public userCan: CommerceCapabilities,
    private quotesService: QuotesService,
    private store: AppStore,
    private router: Router,
    private dialogService: WzDialogService
  ) {
    this.quotes = this.quotesService.data;
    this.buildFilterOptions();
    this.buildSortOptions();
    this.config = this.store.snapshotCloned(state => state.uiConfig.components.cart.config);
  }

  public changePage(i: string): void {
    this.buildRouteParams({ i });
    this.router.navigate(['/quotes', this.params]);
  }

  public onSortResults(sort: any): void {
    this.currentSort = sort;
    this.buildRouteParams(sort.sort);
    this.router.navigate(['/quotes', this.params]);
  }

  public onSearch(query: { q: string }): void {
    this.buildRouteParams(query);
    this.quotesService.getQuotes(this.userCan.administerQuotes(), this.params).subscribe();
  }

  public onFilterResults(filter: any): void {
    this.currentFilter = filter;
    if (!filter.status) {
      delete this.params.status;
    } else {
      let newParams: any = Object.assign({}, filter.status, { i: 1 });
      this.buildRouteParams(newParams);

    }
    this.router.navigate(['/quotes', this.params]);
  }

  public onEditQuote(quoteId: number): void {
    this.quotesService.setFocused(quoteId).subscribe((quote: Quote) => {
      this.router.navigate(['/active-quote']);
    });
  }

  public onSetAsFocusedQuote(quoteId: number): void {
    this.quotesService.setFocused(quoteId).subscribe();
  }

  public onRejectQuote(quote: Quote): void {
    this.quoteToReject = quote;
    this.dialogService.openConfirmationDialog({
      title: 'QUOTE.REJECT.TITLE',
      message: 'QUOTE.REJECT.MESSAGE',
      accept: 'QUOTE.REJECT.ACCEPT',
      decline: 'QUOTE.REJECT.DECLINE'
    }, this.rejectQuote);
  }

  public createNewQuote(): void {
    this.quotesService.createEmpty().subscribe(() => {
      this.router.navigate(['/active-quote']);
    });
  }

  private rejectQuote = () => {
    this.quotesService.rejectQuote(this.quoteToReject.id).subscribe(() => {
      this.quotesService.getQuotes(this.userCan.administerQuotes(), this.params).subscribe();
    });
  }

  private buildRouteParams(params: any) {
    this.params = Object.assign({}, this.params, params);
  }

  private buildSortOptions(): void {
    this.sortOptions = this.theSortOptions;
    this.currentSort = this.sortOptions[0].first;
  }

  private buildFilterOptions(): void {
    this.filterOptions = this.theFilterOptions;
    if (this.userCan.administerQuotes()) this.addPendingFilterOption();
    this.currentFilter = this.filterOptions[0].first;
  }

  private addPendingFilterOption(): void {
    this.filterOptions[1]['fifth'] = {
      'id': 5,
      'name': 'QUOTE.INDEX.FILTER.PENDING',
      'value': 'pending',
      'status': { 'status': 'PENDING' }
    };
  }

  private get theSortOptions(): any[] {
    return [
      {
        'first': {
          'id': 1,
          'name': 'QUOTE.INDEX.SORT.DATE_CREATED_DESC',
          'value': 'createdNewestFirst',
          'sort': { 's': 'createdOn', 'd': true }
        },
        'second': {
          'id': 2,
          'name': 'QUOTE.INDEX.SORT.DATE_CREATED_ASC',
          'value': 'createdOldestFirst',
          'sort': { 's': 'createdOn', 'd': false }
        }
      },
      {
        'first': {
          'id': 3,
          'name': 'QUOTE.INDEX.SORT.STATUS_ASC',
          'value': 'statusAsc',
          'sort': { 's': 'quoteStatus', 'd': false }
        },
        'second': {
          'id': 4,
          'name': 'QUOTE.INDEX.SORT.STATUS_DESC',
          'value': 'statusDesc',
          'sort': { 's': 'quoteStatus', 'd': true }
        }
      },
      {
        'first': {
          'id': 5,
          'name': 'QUOTE.INDEX.SORT.EXPIRATION_DATE_DESC',
          'value': 'expirationDate',
          'sort': { 's': 'expirationDate', 'd': true }
        },
        'second': {
          'id': 6,
          'name': 'QUOTE.INDEX.SORT.EXPIRATION_DATE_ASC',
          'value': 'expirationDate',
          'sort': { 's': 'expirationDate', 'd': false }
        }
      }
    ];
  }

  private get theFilterOptions(): any[] {
    return [
      {
        'first': {
          'id': 0,
          'name': 'QUOTE.INDEX.FILTER.ALL',
          'value': 'all'
        }
      },
      {
        'first': {
          'id': 1,
          'name': 'QUOTE.INDEX.FILTER.ACTIVE',
          'value': 'active',
          'status': { 'status': 'ACTIVE' }
        },
        'second': {
          'id': 2,
          'name': 'QUOTE.INDEX.FILTER.ORDERED',
          'value': 'ordered',
          'status': { 'status': 'ORDERED' }
        },
        'third': {
          'id': 3,
          'name': 'QUOTE.INDEX.FILTER.EXPIRED',
          'value': 'expired',
          'status': { 'status': 'EXPIRED' }
        },
        'fourth': {
          'id': 4,
          'name': 'QUOTE.INDEX.FILTER.CANCELLED',
          'value': 'cancelled',
          'status': { 'status': 'CANCELLED' }
        }
      },
    ];
  }
}

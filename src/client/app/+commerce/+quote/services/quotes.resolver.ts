import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { QuotesService } from '../../../shared/services/quotes.service';
import { CommerceCapabilities } from '../../services/commerce.capabilities';
import { Common } from '../../../shared/utilities/common.functions';

@Injectable()
export class QuotesResolver implements Resolve<boolean> {
  constructor(private quotesService: QuotesService, private userCan: CommerceCapabilities) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.quotesService.getQuotes(this.userCan.administerQuotes(), Common.clone(route.params)).subscribe();

    return this.quotesService.data.map((data => data.items !== null)).filter(data => data).take(1);
  }
}

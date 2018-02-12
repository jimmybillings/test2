import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Quote } from '../../shared/interfaces/commerce.interface';
import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';

@Injectable()
export class FutureQuoteShowService {
  constructor(private apiService: FutureApiService) { }

  public load(quoteId: number): Observable<Quote> {
    return this.apiService.get(Api.Orders, `quote/${quoteId}`, { loadingIndicator: true });
  }
}

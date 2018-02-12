import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api, LoadingIndicatorOption } from '../../shared/interfaces/api.interface';
import { SendDetailsBillingAccount } from '../../shared/interfaces/commerce.interface';

@Injectable()
export class AccountService {
  constructor(private apiService: FutureApiService) { }

  public getAccount(accountId: number, loadingIndicator: LoadingIndicatorOption): Observable<any> {
    return this.apiService.get(Api.Identities, `account/${accountId}`, { loadingIndicator: loadingIndicator });
  }
}

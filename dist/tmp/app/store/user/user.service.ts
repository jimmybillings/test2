import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FutureApiService } from '../api/api.service';
import { Api, LoadingIndicatorOption } from '../../shared/interfaces/api.interface';
import { User } from '../../shared/interfaces/user.interface';

@Injectable()
export class FutureUserService {
  constructor(private apiService: FutureApiService) { }

  public getUsersByAccountId(accountId: number, loadingIndicator: LoadingIndicatorOption): Observable<User[]> {
    return this.apiService.get(Api.Identities, 'user/searchFields',
      {
        loadingIndicator: loadingIndicator,
        parameters: { 'fields': 'accountId', 'values': `${accountId}`, 'n': '500' }
      })
      .map(users => users.items);
  }

}

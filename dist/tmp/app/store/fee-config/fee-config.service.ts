import { FeeConfig } from '../../shared/interfaces/commerce.interface';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';

@Injectable()
export class FeeConfigService {
  constructor(private apiService: FutureApiService) { }

  public loadFeeConfig(): Observable<FeeConfig> {
    return this.apiService.get(Api.Identities, 'feeConfig/search', { loadingIndicator: true });
  }
}

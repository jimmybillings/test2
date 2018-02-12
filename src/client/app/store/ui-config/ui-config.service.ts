import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';
import { State as UiConfig } from './ui-config.state';

@Injectable()
export class UiConfigService {
  constructor(private apiService: FutureApiService) { }

  public load(): Observable<UiConfig> {
    return this.apiService.get(Api.Identities, 'configuration/site').map((config: UiConfig) => {
      return { ...config, loaded: true };
    });
  }
}

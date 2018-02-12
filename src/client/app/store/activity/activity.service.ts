import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { ActivityOptions } from '../../shared/interfaces/common.interface';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { FutureApiService } from '../api/api.service';
import { Api } from '../../shared/interfaces/api.interface';

@Injectable()
export class ActivityService {
  constructor(private apiService: FutureApiService, private currentUserService: CurrentUserService) { }

  public record(activityOptions: ActivityOptions): void {
    const body: ActivityOptionsRequestBody = {
      ...activityOptions,
      userId: this.currentUserService.state.id
    };

    this.apiService.post(Api.Identities, 'activityAudit', { body }).subscribe();
  }
}

interface ActivityOptionsRequestBody extends ActivityOptions {
  userId: number;
};

import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import * as MultiLingualActions from './multi-lingual.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, AppState, InternalActionFactoryMapper } from '../../app.store';
import { TranslateService } from '@ngx-translate/core';
import { ApiConfig } from '../../shared/services/api.config';

@Injectable()
export class MultiLingualEffects {
  @Effect({ dispatch: false })
  public setLanguage: Observable<Action> = this.actions.ofType(MultiLingualActions.SetLanguage.Type)
    .do((action: MultiLingualActions.SetLanguage) => {
      this.translate.use(`${this.apiConfig.baseUrl.split(':/')[1]}identities-api/v1/translation/${this.apiConfig.portal}/${action.lang}`);
    });


  constructor(
    private actions: Actions,
    private store: AppStore,
    private translate: TranslateService,
    private apiConfig: ApiConfig) { }
}

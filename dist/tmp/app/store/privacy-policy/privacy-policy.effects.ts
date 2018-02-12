import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { PrivacyPolicyService } from './privacy-policy.service';
import * as PrivacyPolicyActions from './privacy-policy.actions';

@Injectable()
export class PrivacyPolicyEffects {
  @Effect()
  public load: Observable<Action> = this.actions.ofType(PrivacyPolicyActions.Load.Type)
    .switchMap((action: PrivacyPolicyActions.Load) => this.service.load(action.documentId)
      .map(document => this.store.create(factory => factory.privacyPolicy.loadSuccess(document)))
      .catch(error => Observable.of(this.store.create(factory => factory.privacyPolicy.loadFailure(error))))
    );

  constructor(private actions: Actions, private store: AppStore, private service: PrivacyPolicyService) { }
}

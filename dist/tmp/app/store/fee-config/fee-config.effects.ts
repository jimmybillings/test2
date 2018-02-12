import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { FeeConfigService } from './fee-config.service';
import * as FeeConfigActions from './fee-config.actions';

@Injectable()
export class FeeConfigEffects {

  @Effect()
  public loadFeeConfig: Observable<Action> = this.actions
    .ofType(FeeConfigActions.LoadFeeConfig.Type)

    .filter((action: FeeConfigActions.LoadFeeConfig) =>
      !this.store.snapshot(state => state.feeConfig.initialized)
    )

    .switchMap(() => this.service.loadFeeConfig()
      .map((feeConfig) => this.store.create(factory => factory.feeConfig.loadFeeConfigSuccess(feeConfig)))
      .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );


  constructor(private actions: Actions, private store: AppStore, private service: FeeConfigService) { }
}

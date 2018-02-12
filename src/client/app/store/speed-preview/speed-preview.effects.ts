import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import * as SpeedPreviewActions from './speed-preview.actions';
import { SpeedPreviewService } from './speed-preview.service';
import { State } from './speed-preview.state';
import { AppStore } from '../../app.store';
import { SpeedviewData } from '../../shared/interfaces/asset.interface';

@Injectable()
export class SpeedPreviewEffects {

  @Effect()
  public load: Observable<Action> = this.actions.ofType(SpeedPreviewActions.Load.Type)

    .filter((action: SpeedPreviewActions.Load) =>
      !this.store.snapshot(state => state.speedPreview[action.asset.assetId]))

    .switchMap((action: SpeedPreviewActions.Load) => {
      return this.service.load(action.asset)
        .map((speedPreviewData: SpeedviewData) =>
          this.store.create(factory => factory.speedPreview.loadSuccess(speedPreviewData, action.asset.assetId)))
        .catch(error => Observable.of(this.store.create(factory => factory.speedPreview.loadFailure(action.asset.assetId)
        )));
    });

  constructor(
    private actions: Actions,
    private store: AppStore,
    private service: SpeedPreviewService
  ) { }
}

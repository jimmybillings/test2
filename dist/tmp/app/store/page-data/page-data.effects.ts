import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { AppStore } from '../../app.store';
import { PageDataService } from './page-data.service';
import * as PageDataActions from './page-data.actions';

@Injectable()
export class PageDataEffects {
  @Effect({ dispatch: false })
  updateTitle: Observable<Action> = this.actions.ofType(PageDataActions.UpdateTitle.Type)
    .do((action: PageDataActions.UpdateTitle) => this.service.updateTitle(action.trKey, action.trParams));

  constructor(private actions: Actions, private store: AppStore, private service: PageDataService) { }
}

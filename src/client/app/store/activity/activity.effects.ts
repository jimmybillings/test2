import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { ActivityService } from './activity.service';
import * as ActivityActions from './activity.actions';

@Injectable()
export class ActivityEffects {
  @Effect({ dispatch: false })
  public record: Observable<Action> = this.actions.ofType(ActivityActions.Record.Type)
    .do((action: ActivityActions.Record) => this.service.record(action.options));

  constructor(private actions: Actions, private service: ActivityService) { }
}

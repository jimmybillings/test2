import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';

import * as InvoiceActions from './invoice.actions';
import { AppStore } from '../../app.store';
import { InvoiceService } from './invoice.service';
import { Invoice } from '../../shared/interfaces/commerce.interface';

@Injectable()
export class InvoiceEffects {
  @Effect()
  public load: Observable<Action> = this.actions.ofType(InvoiceActions.Load.Type)
    .switchMap((action: InvoiceActions.Load) =>
      this.service.load(action.orderId, action.shareKey)
        .map((invoice: Invoice) => this.store.create(factory => factory.invoice.loadSuccess(invoice)))
        .catch(error => Observable.of(this.store.create(factory => factory.invoice.loadFailure(error))))
    );

  constructor(private actions: Actions, private store: AppStore, private service: InvoiceService) { }
}

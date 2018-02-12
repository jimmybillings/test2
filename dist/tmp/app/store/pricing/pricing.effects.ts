import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AppStore, PricingState, InternalActionFactoryMapper } from '../../app.store';
import { PriceAttribute } from '../../shared/interfaces/commerce.interface';
import { PricingService } from './pricing.service';
import { WzDialogService } from '../../shared/modules/wz-dialog/services/wz.dialog.service';
import * as PricingActions from './pricing.actions';

@Injectable()
export class PricingEffects {
  @Effect()
  public initializePricing: Observable<Action> = this.actions.ofType(PricingActions.InitializePricing.Type)
    .withLatestFrom(this.store.select(state => state.pricing))
    .map(([action, state]: [PricingActions.InitializePricing, PricingState]) =>
      this.store.create(this.nextActionFor(action, state.attributes))
    );

  @Effect()
  public getAttributes: Observable<Action> = this.actions.ofType(PricingActions.GetAttributes.Type)
    .switchMap((action: PricingActions.GetAttributes) => this.service.getPriceAttributes(action.rightsReproduction)
      .map(attributes => this.store.create(factory => factory.pricing.getAttributesSuccess(
        attributes,
        action.rightsReproduction,
        action.dialogOptions
      )))
      .catch(error => Observable.of(this.store.create(factory => factory.pricing.getAttributesFailure(error))))
    );

  @Effect()
  public getAttributesSuccess: Observable<Action> = this.actions.ofType(PricingActions.GetAttributesSuccess.Type)
    .map((action: PricingActions.GetAttributesSuccess) => this.store.create(factory =>
      factory.pricing.openDialog(action.dialogOptions))
    );

  @Effect()
  public calculatePrice: Observable<Action> = this.actions.ofType(PricingActions.CalculatePrice.Type)
    .switchMap((action: PricingActions.CalculatePrice) =>
      this.service.getPrice(action.selectedAttributes, action.assetId, action.subclipMarkers)
        .map(price => this.store.create(factory => factory.pricing.calculatePriceSuccess(price)))
        .catch(error => Observable.of(this.store.create(factory => factory.pricing.calculatePriceFailure(error))))
    );

  @Effect()
  public calculatePriceSuccess: Observable<Action> = this.actions.ofType(PricingActions.CalculatePriceSuccess.Type)
    .map((action: PricingActions.CalculatePriceSuccess) =>
      this.store.create(factory => factory.pricing.setPriceForDialog(action.price))
    );

  @Effect({ dispatch: false })
  public openDialog: Observable<Action> = this.actions.ofType(PricingActions.OpenDialog.Type)
    .do((action: PricingActions.OpenDialog) => this.dialogService.openComponentInDialog(action.dialogOptions));

  constructor(
    private actions: Actions,
    private store: AppStore,
    private service: PricingService,
    private dialogService: WzDialogService
  ) { }

  private nextActionFor(action: PricingActions.InitializePricing, attributes: PriceAttribute[]): InternalActionFactoryMapper {
    if (attributes === null) {
      return factory => factory.pricing.getAttributes(
        action.rightsReproduction,
        action.dialogOptions
      );
    }

    return factory => factory.pricing.openDialog(action.dialogOptions);
  }
}

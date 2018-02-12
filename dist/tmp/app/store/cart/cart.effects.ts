import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { AppStore } from '../../app.store';
import { FutureCartService } from './cart.service';
import { Cart, AssetLineItem } from '../../shared/interfaces/commerce.interface';

@Injectable()
export class CartEffects {
  @Effect()
  public load: Observable<Action> = this.actions.ofType(CartActions.Load.Type)
    .switchMap(action => this.service.load())
    .map(cart => this.store.create(factory => factory.cart.loadSuccess(cart)))
    .catch(error => Observable.of(this.store.create(factory => factory.cart.loadFailure(error))));

  @Effect()
  public editLineItemFromDetails: Observable<Action> = this.actions.ofType(CartActions.EditLineItemFromDetails.Type)
    .withLatestFrom(this.store.select(state => state.cart.data))
    .switchMap(([action, cart]: [CartActions.EditLineItemFromDetails, Cart]) => {
      const lineItemToEdit: AssetLineItem = this.findLineItemBy(action.uuid, cart);
      return this.service.editLineItem(lineItemToEdit, action.markers, action.attributes)
        .map(cart => this.store.create(factory => factory.cart.editLineItemFromDetailsSuccess(cart)))
        .catch(error => Observable.of(this.store.create(factory => factory.cart.editLineItemFromDetailsFailure(error))));
    });

  @Effect()
  public showSnackbarOnEditLineItemSuccess: Observable<Action> =
    this.actions.ofType(CartActions.EditLineItemFromDetailsSuccess.Type).map(() => {
      return this.store.create(factory => factory.snackbar.display('ASSET.DETAIL.CART_ITEM_UPDATED'));
    });

  @Effect()
  public removeAsset: Observable<Action> = this.actions.ofType(CartActions.RemoveAsset.Type)
    .withLatestFrom(this.store.select(state => state.cart.data.id))
    .switchMap(([action, cartId]: [CartActions.RemoveAsset, number]) => this.service.removeAsset(action.asset)
      .map(cart => this.store.create(factory => factory.cart.removeAssetSuccess(cart)))
      .catch(error => Observable.of(this.store.create(factory => factory.cart.removeAssetFailure(error))))
    );

  @Effect()
  public showSnackbarOnRemoveAssetSuccess: Observable<Action> =
    this.actions.ofType(CartActions.RemoveAssetSuccess.Type).map((action: CartActions.RemoveAssetSuccess) =>
      this.store.create(factory => factory.snackbar.display('CART.REMOVE_ASSET.SUCCESS'))
    );

  @Effect()
  public changeRouteOnRemoveAssetSuccess: Observable<Action> =
    this.actions.ofType(CartActions.RemoveAssetSuccess.Type).map((action: CartActions.RemoveAssetSuccess) =>
      this.store.create(factory => factory.router.goToCart())
    );

  @Effect()
  public addNote: Observable<Action> = this.actions.ofType(CartActions.AddNote.Type)
    .switchMap((action: CartActions.AddNote) =>
      this.service.addNote(action.note, action.lineItem)
        .map((cart) => this.store.create(factory => factory.cart.addNoteSuccess(cart)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  @Effect()
  public removeNote: Observable<Action> = this.actions.ofType(CartActions.RemoveNote.Type)
    .switchMap((action: CartActions.RemoveNote) =>
      this.service.removeNoteFrom(action.lineItem)
        .map((cart) => this.store.create(factory => factory.cart.removeNoteSuccess(cart)))
        .catch(error => Observable.of(this.store.create(factory => factory.error.handle(error))))
    );

  constructor(private actions: Actions, private store: AppStore, private service: FutureCartService) { }

  private findLineItemBy(assetLineItemUuid: string, cart: Cart): AssetLineItem {
    return cart.projects
      .reduce((allLineItems, project) => allLineItems.concat(project.lineItems), [])
      .find(lineItem => lineItem.id === assetLineItemUuid);
  }
}

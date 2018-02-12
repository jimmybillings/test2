import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { AppStore, AppState, InternalActionFactoryMapper } from '../../app.store';
import { AssetType } from '../../shared/interfaces/enhanced-asset';
import * as SubclipMarkersInterface from '../../shared/interfaces/subclip-markers';
import * as CommonInterface from '../../shared/interfaces/common.interface';
import * as Commerce from '../../shared/interfaces/commerce.interface';
import { Collection } from '../../shared/interfaces/collection.interface';
import { AssetService } from './asset.service';
import { Common } from '../../shared/utilities/common.functions';

import * as AssetActions from './asset.actions';
import * as CartActions from '../cart/cart.actions';
import * as OrderActions from '../order/order.actions';
import * as QuoteEditActions from '../quote-edit/quote-edit.actions';
import * as QuoteShowActions from '../quote-show/quote-show.actions';
import * as ActiveCollectionActions from '../active-collection/active-collection.actions';

@Injectable()
export class AssetEffects {
  /** Global Asset Effects */

  @Effect()
  public loadAfterParentIsAvailable: Observable<Action> = this.actions.ofType(AssetActions.LoadAssetAfterParentIsAvailable.Type)
    .switchMap((action: AssetActions.LoadAssetAfterParentIsAvailable) =>
      this.service.load(action.loadParameters, action.assetType, action.parentId)
        .mergeMap((asset: CommonInterface.Asset) => {
          const actions: Array<Action> = [
            this.store.create(factory => factory.asset.loadSuccess(asset))
          ];

          if (action.assetType !== 'order') {
            actions.push(this.store.create(factory => factory.deliveryOptions.load(asset)));
          }

          return actions;
        })
        .catch(error => Observable.of(this.store.create(factory => factory.asset.loadFailure(error))))
    );

  /** Cart Asset Effects */

  @Effect() loadAssetOnCartLoadSuccess: Observable<Action> = this.actions.ofType(CartActions.LoadSuccess.Type)
    .withLatestFrom(this.store.select(state => state))
    .filter(([action, state]: [CartActions.LoadSuccess, AppState]) => {
      return !!state.asset.loadingUuid && state.asset.activeAssetType === 'cart';
    })
    .map(([action, state]: [CartActions.LoadSuccess, AppState]) =>
      this.createNextCartActionFor(state.cart.data, state.asset.loadingUuid)
    );

  @Effect()
  public loadCartAsset: Observable<Action> = this.actions.ofType(AssetActions.LoadCartAsset.Type)
    .withLatestFrom(this.store.select(state => state.cart.data))
    .map(([action, cart]: [AssetActions.LoadCartAsset, Commerce.Cart]) =>
      this.createNextCartActionFor(cart, action.uuid)
    );

  /** Active Collection Asset Effects */

  @Effect()
  public loadAssetOnCollectionLoadSuccess: Observable<Action> = this.actions.ofType(ActiveCollectionActions.LoadSuccess.Type)
    .withLatestFrom(this.store.select(state => state))
    .filter(([action, state]: [ActiveCollectionActions.LoadSuccess, AppState]) => {
      return !!state.asset.loadingUuid && state.asset.activeAssetType === 'collection';
    })
    .map(([action, state]: [ActiveCollectionActions.LoadSuccess, AppState]) =>
      this.createNextCollectionActionFor(state.activeCollection.collection, state.asset.loadingUuid)
    );

  @Effect()
  public loadActiveCollectionAsset: Observable<Action> = this.actions.ofType(AssetActions.LoadActiveCollectionAsset.Type)
    .withLatestFrom(this.store.select(state => state.activeCollection.collection))
    .map(([action, collection]: [AssetActions.LoadActiveCollectionAsset, Collection]) =>
      this.createNextCollectionActionFor(collection, action.uuid)
    );

  /** Order Asset Effects */

  @Effect() loadAssetOnOrderLoadSuccess: Observable<Action> = this.actions.ofType(OrderActions.LoadSuccess.Type)
    .withLatestFrom(this.store.select(state => state))
    .filter(([action, state]: [OrderActions.LoadSuccess, AppState]) => {
      return !!state.asset.loadingUuid && state.asset.activeAssetType === 'order';
    })
    .map(([action, state]: [OrderActions.LoadSuccess, AppState]) =>
      this.createNextOrderActionFor(state.order.activeOrder, state.order.activeOrder.id, state.asset.loadingUuid)
    );

  @Effect()
  public loadOrderAsset: Observable<Action> = this.actions.ofType(AssetActions.LoadOrderAsset.Type)
    .withLatestFrom(this.store.select(state => state.order.activeOrder))
    .map(([action, order]: [AssetActions.LoadOrderAsset, Commerce.Order]) =>
      this.createNextOrderActionFor(order, action.orderId, action.uuid)
    );

  /** Quote Edit Asset Effect */

  @Effect() loadAssetOnQuoteLoadSuccess: Observable<Action> = this.actions.ofType(QuoteEditActions.LoadSuccess.Type)
    .withLatestFrom(this.store.select(state => state))
    .filter(([action, state]: [QuoteEditActions.LoadSuccess, AppState]) => {
      return !!state.asset.loadingUuid && state.asset.activeAssetType === 'quoteEdit';
    })
    .map(([action, state]: [QuoteEditActions.LoadSuccess, AppState]) =>
      this.createNextQuoteEditActionFor(state.quoteEdit.data, state.asset.loadingUuid)
    );

  @Effect()
  public loadQuoteEditAsset: Observable<Action> = this.actions.ofType(AssetActions.LoadQuoteEditAsset.Type)
    .withLatestFrom(this.store.select(state => state.quoteEdit.data))
    .map(([action, quote]: [AssetActions.LoadQuoteEditAsset, Commerce.Quote]) =>
      this.createNextQuoteEditActionFor(quote, action.uuid)
    );

  /** Quote Show Asset Effects */

  @Effect() loadAssetOnQuoteShowLoadSuccess: Observable<Action> = this.actions.ofType(QuoteShowActions.LoadSuccess.Type)
    .withLatestFrom(this.store.select(state => state))
    .filter(([action, state]: [QuoteShowActions.LoadSuccess, AppState]) => {
      return !!state.asset.loadingUuid && state.asset.activeAssetType === 'quoteShow';
    })
    .map(([action, state]: [QuoteShowActions.LoadSuccess, AppState]) =>
      this.createNextQuoteShowActionFor(state.quoteShow.data, state.quoteShow.data.id, state.asset.loadingUuid)
    );

  @Effect()
  public loadQuoteShowAsset: Observable<Action> = this.actions.ofType(AssetActions.LoadQuoteShowAsset.Type)
    .withLatestFrom(this.store.select(state => state.quoteShow.data))
    .map(([action, quote]: [AssetActions.LoadQuoteShowAsset, Commerce.Quote]) =>
      this.createNextQuoteShowActionFor(quote, action.quoteId, action.uuid)
    );

  /** Search Asset Effects */

  @Effect()
  public loadSearchAsset: Observable<Action> = this.actions.ofType(AssetActions.LoadSearchAsset.Type)
    .switchMap((action: AssetActions.LoadSearchAsset) =>
      this.service.load(action.loadParameters, action.assetType)
        .mergeMap((asset: CommonInterface.Asset) => [
          this.store.create(factory => factory.asset.loadSuccess(asset)),
          this.store.create(factory => factory.deliveryOptions.load(asset, action.loadParameters.share_key))
        ])
        .catch(error => Observable.of(this.store.create(factory => factory.asset.loadFailure(error))))
    );

  @Effect()
  public load500Failure: Observable<Action> = this.actions.ofType(AssetActions.LoadFailure.Type)
    .filter((action: AssetActions.LoadFailure) => action.error.status === 500)
    .map((action: AssetActions.LoadFailure) =>
      this.store.create(factory => factory.error.handle(action.error))
    );

  @Effect()
  public updateMarkersInUrl: Observable<Action> = this.actions.ofType(AssetActions.UpdateMarkersInUrl.Type)
    .map((action: AssetActions.UpdateMarkersInUrl) => {
      const duration: SubclipMarkersInterface.Duration = SubclipMarkersInterface.durationFrom(action.markers);
      let updatedTimeStart: number = duration.timeStart;
      let updatedTimeEnd: number = duration.timeEnd;
      if (updatedTimeEnd < 0) updatedTimeEnd = undefined;
      if (updatedTimeStart < 0) updatedTimeStart = undefined;
      return this.store.create(factory => factory.router.addMarkersToUrl(action.assetId, updatedTimeStart, updatedTimeEnd));
    });

  constructor(private actions: Actions, private store: AppStore, private service: AssetService) { }

  private createNextQuoteShowActionFor(quote: Commerce.Quote, requestedQuoteId: number, assetUuid: string): Action {
    return this.store.create(this.nextQuoteShowActionMapperFor(quote, requestedQuoteId, assetUuid));
  }

  private nextQuoteShowActionMapperFor(quote: Commerce.Quote, requestedId: number, uuid: string): InternalActionFactoryMapper {
    if (quote.id !== requestedId) return factory => factory.quoteShow.load(requestedId);

    const lineItem: Commerce.AssetLineItem = this.lineItemIn(quote, uuid);

    if (lineItem) {
      const asset: Commerce.Asset = lineItem.asset;
      return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'quoteShow', quote.id);
    }

    return factory => factory.asset.loadFailure({ status: 404 });
  }

  private createNextQuoteEditActionFor(quote: Commerce.Quote, assetUuid: string): Action {
    return this.store.create(this.nextQuoteEditActionMapperFor(quote, assetUuid));
  }

  private nextQuoteEditActionMapperFor(quote: Commerce.Quote, uuid: string): InternalActionFactoryMapper {
    if (quote.id === 0) return factory => factory.quoteEdit.load();

    const lineItem: Commerce.AssetLineItem = this.lineItemIn(quote, uuid);

    if (lineItem) {
      const asset: Commerce.Asset = lineItem.asset;
      return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'quoteEdit', quote.id);
    }

    return factory => factory.asset.loadFailure({ status: 404 });
  }

  private createNextOrderActionFor(order: Commerce.Order, requestedId: number, assetUuid: string): Action {
    return this.store.create(this.orderActionMapperFor(order, requestedId, assetUuid));
  }

  private orderActionMapperFor(order: Commerce.Order, requestedId: number, uuid: string): InternalActionFactoryMapper {
    if (order.id !== requestedId) return factory => factory.order.load(requestedId);

    const lineItem: Commerce.AssetLineItem = this.lineItemIn(order, uuid);

    if (lineItem) {
      const asset: Commerce.Asset = lineItem.asset;
      return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'order', order.id);
    }

    return factory => factory.asset.loadFailure({ status: 404 });
  }

  private createNextCartActionFor(cart: Commerce.Cart, assetUuid: string): Action {
    return this.store.create(this.nextCartActionMapperFor(cart, assetUuid));
  }

  private nextCartActionMapperFor(cart: Commerce.Cart, uuid: string): InternalActionFactoryMapper {
    if (cart.id === null) return factory => factory.cart.load();

    const lineItem: Commerce.AssetLineItem = this.lineItemIn(cart, uuid);

    if (lineItem) {
      const asset: Commerce.Asset = lineItem.asset;
      return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'cart');
    }

    return factory => factory.asset.loadFailure({ status: 404 });
  }

  private createNextCollectionActionFor(collection: Collection, assetUuid: string): Action {
    return this.store.create(this.nextCollectionActionMapperFor(collection, assetUuid));
  }

  private nextCollectionActionMapperFor(collection: Collection, uuid: string): InternalActionFactoryMapper {
    if (collection.id === null) return factory => factory.activeCollection.load();

    const asset: CommonInterface.Asset = collection.assets.items.find(asset => asset.uuid === uuid);

    if (asset) {
      return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'collection', collection.id);
    }

    return factory => factory.asset.loadFailure({ status: 404 });
  }

  private lineItemIn(orderable: Commerce.Quote | Commerce.Cart | Commerce.Order, uuid: string): Commerce.AssetLineItem {
    return orderable.projects
      .filter(project => project.lineItems)
      .reduce((allLineItems, project) => allLineItems.concat(project.lineItems), [])
      .find(lineItem => lineItem.id === uuid);
  }

  private loadAssetActionGenerator(
    id: number,
    uuid: string,
    timeStart: number,
    timeEnd: number,
    assetType: AssetType,
    parentId?: number,
  ): InternalActionFactoryMapper {
    return factory => factory.asset.loadAssetAfterParentIsAvailable({
      id: String(id),
      uuid: uuid,
      timeStart: String(timeStart),
      timeEnd: String(timeEnd)
    }, assetType, parentId);
  }
}

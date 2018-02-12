"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var app_store_1 = require("../../app.store");
var SubclipMarkersInterface = require("../../shared/interfaces/subclip-markers");
var asset_service_1 = require("./asset.service");
var AssetActions = require("./asset.actions");
var CartActions = require("../cart/cart.actions");
var OrderActions = require("../order/order.actions");
var QuoteEditActions = require("../quote-edit/quote-edit.actions");
var QuoteShowActions = require("../quote-show/quote-show.actions");
var ActiveCollectionActions = require("../active-collection/active-collection.actions");
var AssetEffects = (function () {
    function AssetEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.loadAfterParentIsAvailable = this.actions.ofType(AssetActions.LoadAssetAfterParentIsAvailable.Type)
            .switchMap(function (action) {
            return _this.service.load(action.loadParameters, action.assetType, action.parentId)
                .mergeMap(function (asset) {
                var actions = [
                    _this.store.create(function (factory) { return factory.asset.loadSuccess(asset); })
                ];
                if (action.assetType !== 'order') {
                    actions.push(_this.store.create(function (factory) { return factory.deliveryOptions.load(asset); }));
                }
                return actions;
            })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.asset.loadFailure(error); })); });
        });
        this.loadAssetOnCartLoadSuccess = this.actions.ofType(CartActions.LoadSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state; }))
            .filter(function (_a) {
            var action = _a[0], state = _a[1];
            return !!state.asset.loadingUuid && state.asset.activeAssetType === 'cart';
        })
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.createNextCartActionFor(state.cart.data, state.asset.loadingUuid);
        });
        this.loadCartAsset = this.actions.ofType(AssetActions.LoadCartAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.cart.data; }))
            .map(function (_a) {
            var action = _a[0], cart = _a[1];
            return _this.createNextCartActionFor(cart, action.uuid);
        });
        this.loadAssetOnCollectionLoadSuccess = this.actions.ofType(ActiveCollectionActions.LoadSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state; }))
            .filter(function (_a) {
            var action = _a[0], state = _a[1];
            return !!state.asset.loadingUuid && state.asset.activeAssetType === 'collection';
        })
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.createNextCollectionActionFor(state.activeCollection.collection, state.asset.loadingUuid);
        });
        this.loadActiveCollectionAsset = this.actions.ofType(AssetActions.LoadActiveCollectionAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection; }))
            .map(function (_a) {
            var action = _a[0], collection = _a[1];
            return _this.createNextCollectionActionFor(collection, action.uuid);
        });
        this.loadAssetOnOrderLoadSuccess = this.actions.ofType(OrderActions.LoadSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state; }))
            .filter(function (_a) {
            var action = _a[0], state = _a[1];
            return !!state.asset.loadingUuid && state.asset.activeAssetType === 'order';
        })
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.createNextOrderActionFor(state.order.activeOrder, state.order.activeOrder.id, state.asset.loadingUuid);
        });
        this.loadOrderAsset = this.actions.ofType(AssetActions.LoadOrderAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.order.activeOrder; }))
            .map(function (_a) {
            var action = _a[0], order = _a[1];
            return _this.createNextOrderActionFor(order, action.orderId, action.uuid);
        });
        this.loadAssetOnQuoteLoadSuccess = this.actions.ofType(QuoteEditActions.LoadSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state; }))
            .filter(function (_a) {
            var action = _a[0], state = _a[1];
            return !!state.asset.loadingUuid && state.asset.activeAssetType === 'quoteEdit';
        })
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.createNextQuoteEditActionFor(state.quoteEdit.data, state.asset.loadingUuid);
        });
        this.loadQuoteEditAsset = this.actions.ofType(AssetActions.LoadQuoteEditAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteEdit.data; }))
            .map(function (_a) {
            var action = _a[0], quote = _a[1];
            return _this.createNextQuoteEditActionFor(quote, action.uuid);
        });
        this.loadAssetOnQuoteShowLoadSuccess = this.actions.ofType(QuoteShowActions.LoadSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state; }))
            .filter(function (_a) {
            var action = _a[0], state = _a[1];
            return !!state.asset.loadingUuid && state.asset.activeAssetType === 'quoteShow';
        })
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.createNextQuoteShowActionFor(state.quoteShow.data, state.quoteShow.data.id, state.asset.loadingUuid);
        });
        this.loadQuoteShowAsset = this.actions.ofType(AssetActions.LoadQuoteShowAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.quoteShow.data; }))
            .map(function (_a) {
            var action = _a[0], quote = _a[1];
            return _this.createNextQuoteShowActionFor(quote, action.quoteId, action.uuid);
        });
        this.loadSearchAsset = this.actions.ofType(AssetActions.LoadSearchAsset.Type)
            .switchMap(function (action) {
            return _this.service.load(action.loadParameters, action.assetType)
                .mergeMap(function (asset) { return [
                _this.store.create(function (factory) { return factory.asset.loadSuccess(asset); }),
                _this.store.create(function (factory) { return factory.deliveryOptions.load(asset, action.loadParameters.share_key); })
            ]; })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.asset.loadFailure(error); })); });
        });
        this.load500Failure = this.actions.ofType(AssetActions.LoadFailure.Type)
            .filter(function (action) { return action.error.status === 500; })
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.error.handle(action.error); });
        });
        this.updateMarkersInUrl = this.actions.ofType(AssetActions.UpdateMarkersInUrl.Type)
            .map(function (action) {
            var duration = SubclipMarkersInterface.durationFrom(action.markers);
            var updatedTimeStart = duration.timeStart;
            var updatedTimeEnd = duration.timeEnd;
            if (updatedTimeEnd < 0)
                updatedTimeEnd = undefined;
            if (updatedTimeStart < 0)
                updatedTimeStart = undefined;
            return _this.store.create(function (factory) { return factory.router.addMarkersToUrl(action.assetId, updatedTimeStart, updatedTimeEnd); });
        });
    }
    AssetEffects.prototype.createNextQuoteShowActionFor = function (quote, requestedQuoteId, assetUuid) {
        return this.store.create(this.nextQuoteShowActionMapperFor(quote, requestedQuoteId, assetUuid));
    };
    AssetEffects.prototype.nextQuoteShowActionMapperFor = function (quote, requestedId, uuid) {
        if (quote.id !== requestedId)
            return function (factory) { return factory.quoteShow.load(requestedId); };
        var lineItem = this.lineItemIn(quote, uuid);
        if (lineItem) {
            var asset = lineItem.asset;
            return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'quoteShow', quote.id);
        }
        return function (factory) { return factory.asset.loadFailure({ status: 404 }); };
    };
    AssetEffects.prototype.createNextQuoteEditActionFor = function (quote, assetUuid) {
        return this.store.create(this.nextQuoteEditActionMapperFor(quote, assetUuid));
    };
    AssetEffects.prototype.nextQuoteEditActionMapperFor = function (quote, uuid) {
        if (quote.id === 0)
            return function (factory) { return factory.quoteEdit.load(); };
        var lineItem = this.lineItemIn(quote, uuid);
        if (lineItem) {
            var asset = lineItem.asset;
            return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'quoteEdit', quote.id);
        }
        return function (factory) { return factory.asset.loadFailure({ status: 404 }); };
    };
    AssetEffects.prototype.createNextOrderActionFor = function (order, requestedId, assetUuid) {
        return this.store.create(this.orderActionMapperFor(order, requestedId, assetUuid));
    };
    AssetEffects.prototype.orderActionMapperFor = function (order, requestedId, uuid) {
        if (order.id !== requestedId)
            return function (factory) { return factory.order.load(requestedId); };
        var lineItem = this.lineItemIn(order, uuid);
        if (lineItem) {
            var asset = lineItem.asset;
            return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'order', order.id);
        }
        return function (factory) { return factory.asset.loadFailure({ status: 404 }); };
    };
    AssetEffects.prototype.createNextCartActionFor = function (cart, assetUuid) {
        return this.store.create(this.nextCartActionMapperFor(cart, assetUuid));
    };
    AssetEffects.prototype.nextCartActionMapperFor = function (cart, uuid) {
        if (cart.id === null)
            return function (factory) { return factory.cart.load(); };
        var lineItem = this.lineItemIn(cart, uuid);
        if (lineItem) {
            var asset = lineItem.asset;
            return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'cart');
        }
        return function (factory) { return factory.asset.loadFailure({ status: 404 }); };
    };
    AssetEffects.prototype.createNextCollectionActionFor = function (collection, assetUuid) {
        return this.store.create(this.nextCollectionActionMapperFor(collection, assetUuid));
    };
    AssetEffects.prototype.nextCollectionActionMapperFor = function (collection, uuid) {
        if (collection.id === null)
            return function (factory) { return factory.activeCollection.load(); };
        var asset = collection.assets.items.find(function (asset) { return asset.uuid === uuid; });
        if (asset) {
            return this.loadAssetActionGenerator(asset.assetId, uuid, asset.timeStart, asset.timeEnd, 'collection', collection.id);
        }
        return function (factory) { return factory.asset.loadFailure({ status: 404 }); };
    };
    AssetEffects.prototype.lineItemIn = function (orderable, uuid) {
        return orderable.projects
            .filter(function (project) { return project.lineItems; })
            .reduce(function (allLineItems, project) { return allLineItems.concat(project.lineItems); }, [])
            .find(function (lineItem) { return lineItem.id === uuid; });
    };
    AssetEffects.prototype.loadAssetActionGenerator = function (id, uuid, timeStart, timeEnd, assetType, parentId) {
        return function (factory) { return factory.asset.loadAssetAfterParentIsAvailable({
            id: String(id),
            uuid: uuid,
            timeStart: String(timeStart),
            timeEnd: String(timeEnd)
        }, assetType, parentId); };
    };
    AssetEffects.decorators = [
        { type: core_1.Injectable },
    ];
    AssetEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: asset_service_1.AssetService, },
    ]; };
    AssetEffects.propDecorators = {
        'loadAfterParentIsAvailable': [{ type: effects_1.Effect },],
        'loadAssetOnCartLoadSuccess': [{ type: effects_1.Effect },],
        'loadCartAsset': [{ type: effects_1.Effect },],
        'loadAssetOnCollectionLoadSuccess': [{ type: effects_1.Effect },],
        'loadActiveCollectionAsset': [{ type: effects_1.Effect },],
        'loadAssetOnOrderLoadSuccess': [{ type: effects_1.Effect },],
        'loadOrderAsset': [{ type: effects_1.Effect },],
        'loadAssetOnQuoteLoadSuccess': [{ type: effects_1.Effect },],
        'loadQuoteEditAsset': [{ type: effects_1.Effect },],
        'loadAssetOnQuoteShowLoadSuccess': [{ type: effects_1.Effect },],
        'loadQuoteShowAsset': [{ type: effects_1.Effect },],
        'loadSearchAsset': [{ type: effects_1.Effect },],
        'load500Failure': [{ type: effects_1.Effect },],
        'updateMarkersInUrl': [{ type: effects_1.Effect },],
    };
    return AssetEffects;
}());
exports.AssetEffects = AssetEffects;
//# sourceMappingURL=asset.effects.js.map
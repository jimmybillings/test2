"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadAfterParentIsAvailable", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadAssetOnCartLoadSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadCartAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadAssetOnCollectionLoadSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadActiveCollectionAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadAssetOnOrderLoadSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadOrderAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadAssetOnQuoteLoadSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadQuoteEditAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadAssetOnQuoteShowLoadSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadQuoteShowAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "loadSearchAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "load500Failure", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], AssetEffects.prototype, "updateMarkersInUrl", void 0);
    AssetEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, asset_service_1.AssetService])
    ], AssetEffects);
    return AssetEffects;
}());
exports.AssetEffects = AssetEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUNoRCw4Q0FBNkM7QUFHN0MsNkNBQWtGO0FBRWxGLGlGQUFtRjtBQUluRixpREFBK0M7QUFHL0MsOENBQWdEO0FBQ2hELGtEQUFvRDtBQUNwRCxxREFBdUQ7QUFDdkQsbUVBQXFFO0FBQ3JFLG1FQUFxRTtBQUNyRSx3RkFBMEY7QUFHMUY7SUErSUUsc0JBQW9CLE9BQWdCLEVBQVUsS0FBZSxFQUFVLE9BQXFCO1FBQTVGLGlCQUFpRztRQUE3RSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWM7UUEzSXJGLCtCQUEwQixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDO2FBQzNILFNBQVMsQ0FBQyxVQUFDLE1BQW9EO1lBQzlELE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7aUJBQ3hFLFFBQVEsQ0FBQyxVQUFDLEtBQTRCO2dCQUNyQyxJQUFNLE9BQU8sR0FBa0I7b0JBQzdCLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQWhDLENBQWdDLENBQUM7aUJBQy9ELENBQUM7Z0JBRUYsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJ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QTZCLHVCQUFVO29FQU81QztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDYSx1QkFBVTt1REFJNUI7SUFLSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2dDLHVCQUFVOzBFQU8vQztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDeUIsdUJBQVU7bUVBSXhDO0lBSU07UUFBVCxnQkFBTSxFQUFFO2tDQUE4Qix1QkFBVTtxRUFPN0M7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2MsdUJBQVU7d0RBSTdCO0lBSU07UUFBVCxnQkFBTSxFQUFFO2tDQUE4Qix1QkFBVTtxRUFPN0M7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2tCLHVCQUFVOzREQUlqQztJQUlNO1FBQVQsZ0JBQU0sRUFBRTtrQ0FBa0MsdUJBQVU7eUVBT2pEO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNrQix1QkFBVTs0REFJakM7SUFLSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2UsdUJBQVU7eURBUTlCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNjLHVCQUFVO3dEQUk3QjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDa0IsdUJBQVU7NERBUWhDO0lBN0lNLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FnSmtCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLDRCQUFZO09BL0lqRixZQUFZLENBMlB4QjtJQUFELG1CQUFDO0NBM1BELEFBMlBDLElBQUE7QUEzUFksb0NBQVkiLCJmaWxlIjoiYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0LmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSwgQXBwU3RhdGUsIEludGVybmFsQWN0aW9uRmFjdG9yeU1hcHBlciB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBBc3NldFR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgKiBhcyBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0ICogYXMgQ29tbW9uSW50ZXJmYWNlIGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgQ29tbWVyY2UgZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBc3NldFNlcnZpY2UgfSBmcm9tICcuL2Fzc2V0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcblxuaW1wb3J0ICogYXMgQXNzZXRBY3Rpb25zIGZyb20gJy4vYXNzZXQuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBDYXJ0QWN0aW9ucyBmcm9tICcuLi9jYXJ0L2NhcnQuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBPcmRlckFjdGlvbnMgZnJvbSAnLi4vb3JkZXIvb3JkZXIuYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBRdW90ZUVkaXRBY3Rpb25zIGZyb20gJy4uL3F1b3RlLWVkaXQvcXVvdGUtZWRpdC5hY3Rpb25zJztcbmltcG9ydCAqIGFzIFF1b3RlU2hvd0FjdGlvbnMgZnJvbSAnLi4vcXVvdGUtc2hvdy9xdW90ZS1zaG93LmFjdGlvbnMnO1xuaW1wb3J0ICogYXMgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMgZnJvbSAnLi4vYWN0aXZlLWNvbGxlY3Rpb24vYWN0aXZlLWNvbGxlY3Rpb24uYWN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc3NldEVmZmVjdHMge1xuICAvKiogR2xvYmFsIEFzc2V0IEVmZmVjdHMgKi9cblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWRBZnRlclBhcmVudElzQXZhaWxhYmxlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFzc2V0QWN0aW9ucy5Mb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBBc3NldEFjdGlvbnMuTG9hZEFzc2V0QWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZSkgPT5cbiAgICAgIHRoaXMuc2VydmljZS5sb2FkKGFjdGlvbi5sb2FkUGFyYW1ldGVycywgYWN0aW9uLmFzc2V0VHlwZSwgYWN0aW9uLnBhcmVudElkKVxuICAgICAgICAubWVyZ2VNYXAoKGFzc2V0OiBDb21tb25JbnRlcmZhY2UuQXNzZXQpID0+IHtcbiAgICAgICAgICBjb25zdCBhY3Rpb25zOiBBcnJheTxBY3Rpb24+ID0gW1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmFzc2V0LmxvYWRTdWNjZXNzKGFzc2V0KSlcbiAgICAgICAgICBdO1xuXG4gICAgICAgICAgaWYgKGFjdGlvbi5hc3NldFR5cGUgIT09ICdvcmRlcicpIHtcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaCh0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZGVsaXZlcnlPcHRpb25zLmxvYWQoYXNzZXQpKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hc3NldC5sb2FkRmFpbHVyZShlcnJvcikpKSlcbiAgICApO1xuXG4gIC8qKiBDYXJ0IEFzc2V0IEVmZmVjdHMgKi9cblxuICBARWZmZWN0KCkgbG9hZEFzc2V0T25DYXJ0TG9hZFN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQ2FydEFjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUpKVxuICAgIC5maWx0ZXIoKFthY3Rpb24sIHN0YXRlXTogW0NhcnRBY3Rpb25zLkxvYWRTdWNjZXNzLCBBcHBTdGF0ZV0pID0+IHtcbiAgICAgIHJldHVybiAhIXN0YXRlLmFzc2V0LmxvYWRpbmdVdWlkICYmIHN0YXRlLmFzc2V0LmFjdGl2ZUFzc2V0VHlwZSA9PT0gJ2NhcnQnO1xuICAgIH0pXG4gICAgLm1hcCgoW2FjdGlvbiwgc3RhdGVdOiBbQ2FydEFjdGlvbnMuTG9hZFN1Y2Nlc3MsIEFwcFN0YXRlXSkgPT5cbiAgICAgIHRoaXMuY3JlYXRlTmV4dENhcnRBY3Rpb25Gb3Ioc3RhdGUuY2FydC5kYXRhLCBzdGF0ZS5hc3NldC5sb2FkaW5nVXVpZClcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZENhcnRBc3NldDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBc3NldEFjdGlvbnMuTG9hZENhcnRBc3NldC5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jYXJ0LmRhdGEpKVxuICAgIC5tYXAoKFthY3Rpb24sIGNhcnRdOiBbQXNzZXRBY3Rpb25zLkxvYWRDYXJ0QXNzZXQsIENvbW1lcmNlLkNhcnRdKSA9PlxuICAgICAgdGhpcy5jcmVhdGVOZXh0Q2FydEFjdGlvbkZvcihjYXJ0LCBhY3Rpb24udXVpZClcbiAgICApO1xuXG4gIC8qKiBBY3RpdmUgQ29sbGVjdGlvbiBBc3NldCBFZmZlY3RzICovXG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkQXNzZXRPbkNvbGxlY3Rpb25Mb2FkU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZSkpXG4gICAgLmZpbHRlcigoW2FjdGlvbiwgc3RhdGVdOiBbQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuTG9hZFN1Y2Nlc3MsIEFwcFN0YXRlXSkgPT4ge1xuICAgICAgcmV0dXJuICEhc3RhdGUuYXNzZXQubG9hZGluZ1V1aWQgJiYgc3RhdGUuYXNzZXQuYWN0aXZlQXNzZXRUeXBlID09PSAnY29sbGVjdGlvbic7XG4gICAgfSlcbiAgICAubWFwKChbYWN0aW9uLCBzdGF0ZV06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkU3VjY2VzcywgQXBwU3RhdGVdKSA9PlxuICAgICAgdGhpcy5jcmVhdGVOZXh0Q29sbGVjdGlvbkFjdGlvbkZvcihzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmNvbGxlY3Rpb24sIHN0YXRlLmFzc2V0LmxvYWRpbmdVdWlkKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFzc2V0QWN0aW9ucy5Mb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbikpXG4gICAgLm1hcCgoW2FjdGlvbiwgY29sbGVjdGlvbl06IFtBc3NldEFjdGlvbnMuTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldCwgQ29sbGVjdGlvbl0pID0+XG4gICAgICB0aGlzLmNyZWF0ZU5leHRDb2xsZWN0aW9uQWN0aW9uRm9yKGNvbGxlY3Rpb24sIGFjdGlvbi51dWlkKVxuICAgICk7XG5cbiAgLyoqIE9yZGVyIEFzc2V0IEVmZmVjdHMgKi9cblxuICBARWZmZWN0KCkgbG9hZEFzc2V0T25PcmRlckxvYWRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKE9yZGVyQWN0aW9ucy5Mb2FkU3VjY2Vzcy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZSkpXG4gICAgLmZpbHRlcigoW2FjdGlvbiwgc3RhdGVdOiBbT3JkZXJBY3Rpb25zLkxvYWRTdWNjZXNzLCBBcHBTdGF0ZV0pID0+IHtcbiAgICAgIHJldHVybiAhIXN0YXRlLmFzc2V0LmxvYWRpbmdVdWlkICYmIHN0YXRlLmFzc2V0LmFjdGl2ZUFzc2V0VHlwZSA9PT0gJ29yZGVyJztcbiAgICB9KVxuICAgIC5tYXAoKFthY3Rpb24sIHN0YXRlXTogW09yZGVyQWN0aW9ucy5Mb2FkU3VjY2VzcywgQXBwU3RhdGVdKSA9PlxuICAgICAgdGhpcy5jcmVhdGVOZXh0T3JkZXJBY3Rpb25Gb3Ioc3RhdGUub3JkZXIuYWN0aXZlT3JkZXIsIHN0YXRlLm9yZGVyLmFjdGl2ZU9yZGVyLmlkLCBzdGF0ZS5hc3NldC5sb2FkaW5nVXVpZClcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZE9yZGVyQXNzZXQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQXNzZXRBY3Rpb25zLkxvYWRPcmRlckFzc2V0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLm9yZGVyLmFjdGl2ZU9yZGVyKSlcbiAgICAubWFwKChbYWN0aW9uLCBvcmRlcl06IFtBc3NldEFjdGlvbnMuTG9hZE9yZGVyQXNzZXQsIENvbW1lcmNlLk9yZGVyXSkgPT5cbiAgICAgIHRoaXMuY3JlYXRlTmV4dE9yZGVyQWN0aW9uRm9yKG9yZGVyLCBhY3Rpb24ub3JkZXJJZCwgYWN0aW9uLnV1aWQpXG4gICAgKTtcblxuICAvKiogUXVvdGUgRWRpdCBBc3NldCBFZmZlY3QgKi9cblxuICBARWZmZWN0KCkgbG9hZEFzc2V0T25RdW90ZUxvYWRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlRWRpdEFjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUpKVxuICAgIC5maWx0ZXIoKFthY3Rpb24sIHN0YXRlXTogW1F1b3RlRWRpdEFjdGlvbnMuTG9hZFN1Y2Nlc3MsIEFwcFN0YXRlXSkgPT4ge1xuICAgICAgcmV0dXJuICEhc3RhdGUuYXNzZXQubG9hZGluZ1V1aWQgJiYgc3RhdGUuYXNzZXQuYWN0aXZlQXNzZXRUeXBlID09PSAncXVvdGVFZGl0JztcbiAgICB9KVxuICAgIC5tYXAoKFthY3Rpb24sIHN0YXRlXTogW1F1b3RlRWRpdEFjdGlvbnMuTG9hZFN1Y2Nlc3MsIEFwcFN0YXRlXSkgPT5cbiAgICAgIHRoaXMuY3JlYXRlTmV4dFF1b3RlRWRpdEFjdGlvbkZvcihzdGF0ZS5xdW90ZUVkaXQuZGF0YSwgc3RhdGUuYXNzZXQubG9hZGluZ1V1aWQpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWRRdW90ZUVkaXRBc3NldDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBc3NldEFjdGlvbnMuTG9hZFF1b3RlRWRpdEFzc2V0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhKSlcbiAgICAubWFwKChbYWN0aW9uLCBxdW90ZV06IFtBc3NldEFjdGlvbnMuTG9hZFF1b3RlRWRpdEFzc2V0LCBDb21tZXJjZS5RdW90ZV0pID0+XG4gICAgICB0aGlzLmNyZWF0ZU5leHRRdW90ZUVkaXRBY3Rpb25Gb3IocXVvdGUsIGFjdGlvbi51dWlkKVxuICAgICk7XG5cbiAgLyoqIFF1b3RlIFNob3cgQXNzZXQgRWZmZWN0cyAqL1xuXG4gIEBFZmZlY3QoKSBsb2FkQXNzZXRPblF1b3RlU2hvd0xvYWRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFF1b3RlU2hvd0FjdGlvbnMuTG9hZFN1Y2Nlc3MuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUpKVxuICAgIC5maWx0ZXIoKFthY3Rpb24sIHN0YXRlXTogW1F1b3RlU2hvd0FjdGlvbnMuTG9hZFN1Y2Nlc3MsIEFwcFN0YXRlXSkgPT4ge1xuICAgICAgcmV0dXJuICEhc3RhdGUuYXNzZXQubG9hZGluZ1V1aWQgJiYgc3RhdGUuYXNzZXQuYWN0aXZlQXNzZXRUeXBlID09PSAncXVvdGVTaG93JztcbiAgICB9KVxuICAgIC5tYXAoKFthY3Rpb24sIHN0YXRlXTogW1F1b3RlU2hvd0FjdGlvbnMuTG9hZFN1Y2Nlc3MsIEFwcFN0YXRlXSkgPT5cbiAgICAgIHRoaXMuY3JlYXRlTmV4dFF1b3RlU2hvd0FjdGlvbkZvcihzdGF0ZS5xdW90ZVNob3cuZGF0YSwgc3RhdGUucXVvdGVTaG93LmRhdGEuaWQsIHN0YXRlLmFzc2V0LmxvYWRpbmdVdWlkKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBsb2FkUXVvdGVTaG93QXNzZXQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQXNzZXRBY3Rpb25zLkxvYWRRdW90ZVNob3dBc3NldC5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZVNob3cuZGF0YSkpXG4gICAgLm1hcCgoW2FjdGlvbiwgcXVvdGVdOiBbQXNzZXRBY3Rpb25zLkxvYWRRdW90ZVNob3dBc3NldCwgQ29tbWVyY2UuUXVvdGVdKSA9PlxuICAgICAgdGhpcy5jcmVhdGVOZXh0UXVvdGVTaG93QWN0aW9uRm9yKHF1b3RlLCBhY3Rpb24ucXVvdGVJZCwgYWN0aW9uLnV1aWQpXG4gICAgKTtcblxuICAvKiogU2VhcmNoIEFzc2V0IEVmZmVjdHMgKi9cblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWRTZWFyY2hBc3NldDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBc3NldEFjdGlvbnMuTG9hZFNlYXJjaEFzc2V0LlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBBc3NldEFjdGlvbnMuTG9hZFNlYXJjaEFzc2V0KSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmxvYWQoYWN0aW9uLmxvYWRQYXJhbWV0ZXJzLCBhY3Rpb24uYXNzZXRUeXBlKVxuICAgICAgICAubWVyZ2VNYXAoKGFzc2V0OiBDb21tb25JbnRlcmZhY2UuQXNzZXQpID0+IFtcbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYXNzZXQubG9hZFN1Y2Nlc3MoYXNzZXQpKSxcbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZGVsaXZlcnlPcHRpb25zLmxvYWQoYXNzZXQsIGFjdGlvbi5sb2FkUGFyYW1ldGVycy5zaGFyZV9rZXkpKVxuICAgICAgICBdKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYXNzZXQubG9hZEZhaWx1cmUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWQ1MDBGYWlsdXJlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFzc2V0QWN0aW9ucy5Mb2FkRmFpbHVyZS5UeXBlKVxuICAgIC5maWx0ZXIoKGFjdGlvbjogQXNzZXRBY3Rpb25zLkxvYWRGYWlsdXJlKSA9PiBhY3Rpb24uZXJyb3Iuc3RhdHVzID09PSA1MDApXG4gICAgLm1hcCgoYWN0aW9uOiBBc3NldEFjdGlvbnMuTG9hZEZhaWx1cmUpID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGFjdGlvbi5lcnJvcikpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHVwZGF0ZU1hcmtlcnNJblVybDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBc3NldEFjdGlvbnMuVXBkYXRlTWFya2Vyc0luVXJsLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBBc3NldEFjdGlvbnMuVXBkYXRlTWFya2Vyc0luVXJsKSA9PiB7XG4gICAgICBjb25zdCBkdXJhdGlvbjogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuRHVyYXRpb24gPSBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5kdXJhdGlvbkZyb20oYWN0aW9uLm1hcmtlcnMpO1xuICAgICAgbGV0IHVwZGF0ZWRUaW1lU3RhcnQ6IG51bWJlciA9IGR1cmF0aW9uLnRpbWVTdGFydDtcbiAgICAgIGxldCB1cGRhdGVkVGltZUVuZDogbnVtYmVyID0gZHVyYXRpb24udGltZUVuZDtcbiAgICAgIGlmICh1cGRhdGVkVGltZUVuZCA8IDApIHVwZGF0ZWRUaW1lRW5kID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHVwZGF0ZWRUaW1lU3RhcnQgPCAwKSB1cGRhdGVkVGltZVN0YXJ0ID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5yb3V0ZXIuYWRkTWFya2Vyc1RvVXJsKGFjdGlvbi5hc3NldElkLCB1cGRhdGVkVGltZVN0YXJ0LCB1cGRhdGVkVGltZUVuZCkpO1xuICAgIH0pO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uczogQWN0aW9ucywgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgc2VydmljZTogQXNzZXRTZXJ2aWNlKSB7IH1cblxuICBwcml2YXRlIGNyZWF0ZU5leHRRdW90ZVNob3dBY3Rpb25Gb3IocXVvdGU6IENvbW1lcmNlLlF1b3RlLCByZXF1ZXN0ZWRRdW90ZUlkOiBudW1iZXIsIGFzc2V0VXVpZDogc3RyaW5nKTogQWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUodGhpcy5uZXh0UXVvdGVTaG93QWN0aW9uTWFwcGVyRm9yKHF1b3RlLCByZXF1ZXN0ZWRRdW90ZUlkLCBhc3NldFV1aWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dFF1b3RlU2hvd0FjdGlvbk1hcHBlckZvcihxdW90ZTogQ29tbWVyY2UuUXVvdGUsIHJlcXVlc3RlZElkOiBudW1iZXIsIHV1aWQ6IHN0cmluZyk6IEludGVybmFsQWN0aW9uRmFjdG9yeU1hcHBlciB7XG4gICAgaWYgKHF1b3RlLmlkICE9PSByZXF1ZXN0ZWRJZCkgcmV0dXJuIGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZVNob3cubG9hZChyZXF1ZXN0ZWRJZCk7XG5cbiAgICBjb25zdCBsaW5lSXRlbTogQ29tbWVyY2UuQXNzZXRMaW5lSXRlbSA9IHRoaXMubGluZUl0ZW1JbihxdW90ZSwgdXVpZCk7XG5cbiAgICBpZiAobGluZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGFzc2V0OiBDb21tZXJjZS5Bc3NldCA9IGxpbmVJdGVtLmFzc2V0O1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFzc2V0QWN0aW9uR2VuZXJhdG9yKGFzc2V0LmFzc2V0SWQsIHV1aWQsIGFzc2V0LnRpbWVTdGFydCwgYXNzZXQudGltZUVuZCwgJ3F1b3RlU2hvdycsIHF1b3RlLmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFjdG9yeSA9PiBmYWN0b3J5LmFzc2V0LmxvYWRGYWlsdXJlKHsgc3RhdHVzOiA0MDQgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU5leHRRdW90ZUVkaXRBY3Rpb25Gb3IocXVvdGU6IENvbW1lcmNlLlF1b3RlLCBhc3NldFV1aWQ6IHN0cmluZyk6IEFjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY3JlYXRlKHRoaXMubmV4dFF1b3RlRWRpdEFjdGlvbk1hcHBlckZvcihxdW90ZSwgYXNzZXRVdWlkKSk7XG4gIH1cblxuICBwcml2YXRlIG5leHRRdW90ZUVkaXRBY3Rpb25NYXBwZXJGb3IocXVvdGU6IENvbW1lcmNlLlF1b3RlLCB1dWlkOiBzdHJpbmcpOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnlNYXBwZXIge1xuICAgIGlmIChxdW90ZS5pZCA9PT0gMCkgcmV0dXJuIGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQubG9hZCgpO1xuXG4gICAgY29uc3QgbGluZUl0ZW06IENvbW1lcmNlLkFzc2V0TGluZUl0ZW0gPSB0aGlzLmxpbmVJdGVtSW4ocXVvdGUsIHV1aWQpO1xuXG4gICAgaWYgKGxpbmVJdGVtKSB7XG4gICAgICBjb25zdCBhc3NldDogQ29tbWVyY2UuQXNzZXQgPSBsaW5lSXRlbS5hc3NldDtcbiAgICAgIHJldHVybiB0aGlzLmxvYWRBc3NldEFjdGlvbkdlbmVyYXRvcihhc3NldC5hc3NldElkLCB1dWlkLCBhc3NldC50aW1lU3RhcnQsIGFzc2V0LnRpbWVFbmQsICdxdW90ZUVkaXQnLCBxdW90ZS5pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhY3RvcnkgPT4gZmFjdG9yeS5hc3NldC5sb2FkRmFpbHVyZSh7IHN0YXR1czogNDA0IH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVOZXh0T3JkZXJBY3Rpb25Gb3Iob3JkZXI6IENvbW1lcmNlLk9yZGVyLCByZXF1ZXN0ZWRJZDogbnVtYmVyLCBhc3NldFV1aWQ6IHN0cmluZyk6IEFjdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY3JlYXRlKHRoaXMub3JkZXJBY3Rpb25NYXBwZXJGb3Iob3JkZXIsIHJlcXVlc3RlZElkLCBhc3NldFV1aWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgb3JkZXJBY3Rpb25NYXBwZXJGb3Iob3JkZXI6IENvbW1lcmNlLk9yZGVyLCByZXF1ZXN0ZWRJZDogbnVtYmVyLCB1dWlkOiBzdHJpbmcpOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnlNYXBwZXIge1xuICAgIGlmIChvcmRlci5pZCAhPT0gcmVxdWVzdGVkSWQpIHJldHVybiBmYWN0b3J5ID0+IGZhY3Rvcnkub3JkZXIubG9hZChyZXF1ZXN0ZWRJZCk7XG5cbiAgICBjb25zdCBsaW5lSXRlbTogQ29tbWVyY2UuQXNzZXRMaW5lSXRlbSA9IHRoaXMubGluZUl0ZW1JbihvcmRlciwgdXVpZCk7XG5cbiAgICBpZiAobGluZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGFzc2V0OiBDb21tZXJjZS5Bc3NldCA9IGxpbmVJdGVtLmFzc2V0O1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFzc2V0QWN0aW9uR2VuZXJhdG9yKGFzc2V0LmFzc2V0SWQsIHV1aWQsIGFzc2V0LnRpbWVTdGFydCwgYXNzZXQudGltZUVuZCwgJ29yZGVyJywgb3JkZXIuaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWN0b3J5ID0+IGZhY3RvcnkuYXNzZXQubG9hZEZhaWx1cmUoeyBzdGF0dXM6IDQwNCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTmV4dENhcnRBY3Rpb25Gb3IoY2FydDogQ29tbWVyY2UuQ2FydCwgYXNzZXRVdWlkOiBzdHJpbmcpOiBBY3Rpb24ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmNyZWF0ZSh0aGlzLm5leHRDYXJ0QWN0aW9uTWFwcGVyRm9yKGNhcnQsIGFzc2V0VXVpZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBuZXh0Q2FydEFjdGlvbk1hcHBlckZvcihjYXJ0OiBDb21tZXJjZS5DYXJ0LCB1dWlkOiBzdHJpbmcpOiBJbnRlcm5hbEFjdGlvbkZhY3RvcnlNYXBwZXIge1xuICAgIGlmIChjYXJ0LmlkID09PSBudWxsKSByZXR1cm4gZmFjdG9yeSA9PiBmYWN0b3J5LmNhcnQubG9hZCgpO1xuXG4gICAgY29uc3QgbGluZUl0ZW06IENvbW1lcmNlLkFzc2V0TGluZUl0ZW0gPSB0aGlzLmxpbmVJdGVtSW4oY2FydCwgdXVpZCk7XG5cbiAgICBpZiAobGluZUl0ZW0pIHtcbiAgICAgIGNvbnN0IGFzc2V0OiBDb21tZXJjZS5Bc3NldCA9IGxpbmVJdGVtLmFzc2V0O1xuICAgICAgcmV0dXJuIHRoaXMubG9hZEFzc2V0QWN0aW9uR2VuZXJhdG9yKGFzc2V0LmFzc2V0SWQsIHV1aWQsIGFzc2V0LnRpbWVTdGFydCwgYXNzZXQudGltZUVuZCwgJ2NhcnQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFjdG9yeSA9PiBmYWN0b3J5LmFzc2V0LmxvYWRGYWlsdXJlKHsgc3RhdHVzOiA0MDQgfSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU5leHRDb2xsZWN0aW9uQWN0aW9uRm9yKGNvbGxlY3Rpb246IENvbGxlY3Rpb24sIGFzc2V0VXVpZDogc3RyaW5nKTogQWN0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUodGhpcy5uZXh0Q29sbGVjdGlvbkFjdGlvbk1hcHBlckZvcihjb2xsZWN0aW9uLCBhc3NldFV1aWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgbmV4dENvbGxlY3Rpb25BY3Rpb25NYXBwZXJGb3IoY29sbGVjdGlvbjogQ29sbGVjdGlvbiwgdXVpZDogc3RyaW5nKTogSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyIHtcbiAgICBpZiAoY29sbGVjdGlvbi5pZCA9PT0gbnVsbCkgcmV0dXJuIGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmxvYWQoKTtcblxuICAgIGNvbnN0IGFzc2V0OiBDb21tb25JbnRlcmZhY2UuQXNzZXQgPSBjb2xsZWN0aW9uLmFzc2V0cy5pdGVtcy5maW5kKGFzc2V0ID0+IGFzc2V0LnV1aWQgPT09IHV1aWQpO1xuXG4gICAgaWYgKGFzc2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkQXNzZXRBY3Rpb25HZW5lcmF0b3IoYXNzZXQuYXNzZXRJZCwgdXVpZCwgYXNzZXQudGltZVN0YXJ0LCBhc3NldC50aW1lRW5kLCAnY29sbGVjdGlvbicsIGNvbGxlY3Rpb24uaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWN0b3J5ID0+IGZhY3RvcnkuYXNzZXQubG9hZEZhaWx1cmUoeyBzdGF0dXM6IDQwNCB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGluZUl0ZW1JbihvcmRlcmFibGU6IENvbW1lcmNlLlF1b3RlIHwgQ29tbWVyY2UuQ2FydCB8IENvbW1lcmNlLk9yZGVyLCB1dWlkOiBzdHJpbmcpOiBDb21tZXJjZS5Bc3NldExpbmVJdGVtIHtcbiAgICByZXR1cm4gb3JkZXJhYmxlLnByb2plY3RzXG4gICAgICAuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC5saW5lSXRlbXMpXG4gICAgICAucmVkdWNlKChhbGxMaW5lSXRlbXMsIHByb2plY3QpID0+IGFsbExpbmVJdGVtcy5jb25jYXQocHJvamVjdC5saW5lSXRlbXMpLCBbXSlcbiAgICAgIC5maW5kKGxpbmVJdGVtID0+IGxpbmVJdGVtLmlkID09PSB1dWlkKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEFzc2V0QWN0aW9uR2VuZXJhdG9yKFxuICAgIGlkOiBudW1iZXIsXG4gICAgdXVpZDogc3RyaW5nLFxuICAgIHRpbWVTdGFydDogbnVtYmVyLFxuICAgIHRpbWVFbmQ6IG51bWJlcixcbiAgICBhc3NldFR5cGU6IEFzc2V0VHlwZSxcbiAgICBwYXJlbnRJZD86IG51bWJlcixcbiAgKTogSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyIHtcbiAgICByZXR1cm4gZmFjdG9yeSA9PiBmYWN0b3J5LmFzc2V0LmxvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUoe1xuICAgICAgaWQ6IFN0cmluZyhpZCksXG4gICAgICB1dWlkOiB1dWlkLFxuICAgICAgdGltZVN0YXJ0OiBTdHJpbmcodGltZVN0YXJ0KSxcbiAgICAgIHRpbWVFbmQ6IFN0cmluZyh0aW1lRW5kKVxuICAgIH0sIGFzc2V0VHlwZSwgcGFyZW50SWQpO1xuICB9XG59XG4iXX0=

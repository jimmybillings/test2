"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var collections_service_1 = require("./collections.service");
var CollectionsActions = require("./collections.actions");
var CollectionsEffects = (function () {
    function CollectionsEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.addAsset = this.actions.ofType(CollectionsActions.AddAssetToCollection.Type)
            .switchMap(function (action) {
            return _this.service.addAssetTo(action.collection, action.asset)
                .map(function (addAssetToCollectionResponse) {
                return addAssetToCollectionResponse.list
                    ? _this.store.create(function (factory) { return factory.snackbar.display('COLLECTION.SHOW.ASSET_ADDED', { collectionName: action.collection.name, assetId: action.asset.assetId }); })
                    : _this.store.create(function (factory) {
                        return factory.snackbar.display('COLLECTION.ALREADY_IN_COLLECTION_TOAST', { collectionName: action.collection.name });
                    });
            })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
    }
    CollectionsEffects.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionsEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: collections_service_1.FutureCollectionsService, },
    ]; };
    CollectionsEffects.propDecorators = {
        'addAsset': [{ type: effects_1.Effect },],
    };
    return CollectionsEffects;
}());
exports.CollectionsEffects = CollectionsEffects;
//# sourceMappingURL=collections.effects.js.map
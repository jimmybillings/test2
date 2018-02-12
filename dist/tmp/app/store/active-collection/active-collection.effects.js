"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var ActiveCollectionActions = require("./active-collection.actions");
var active_collection_service_1 = require("./active-collection.service");
var app_store_1 = require("../../app.store");
var user_preference_service_1 = require("../../shared/services/user-preference.service");
var ActiveCollectionEffects = (function () {
    function ActiveCollectionEffects(actions, store, service, userPreferenceService) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.userPreferenceService = userPreferenceService;
        this.load = this.actions.ofType(ActiveCollectionActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.pagination)
                .map(function (collection) { return _this.store.create(function (factory) { return factory.activeCollection.loadSuccess(collection); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.loadIfNeeded = this.actions.ofType(ActiveCollectionActions.LoadIfNeeded.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.id; }))
            .filter(function (_a) {
            var action = _a[0], collectionId = _a[1];
            return collectionId === null;
        })
            .map(function (_a) {
            var action = _a[0], collectionId = _a[1];
            return _this.store.create(function (factory) { return factory.activeCollection.load(action.pagination); });
        });
        this.set = this.actions.ofType(ActiveCollectionActions.Set.Type)
            .switchMap(function (action) {
            return _this.service.set(action.collectionId, action.pagination)
                .map(function (collection) { return _this.store.create(function (factory) { return factory.activeCollection.setSuccess(collection); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.loadPage = this.actions.ofType(ActiveCollectionActions.LoadPage.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.id; }))
            .switchMap(function (_a) {
            var action = _a[0], collectionId = _a[1];
            return _this.service.loadPage(collectionId, action.pagination)
                .map(function (assets) { return _this.store.create(function (factory) { return factory.activeCollection.loadPageSuccess(assets); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.openTrayOnAddOrRemove = this.actions.ofType(ActiveCollectionActions.AddAsset.Type, ActiveCollectionActions.RemoveAsset.Type)
            .do(function () { return _this.userPreferenceService.openCollectionTray(); });
        this.addAsset = this.actions.ofType(ActiveCollectionActions.AddAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection; }))
            .switchMap(function (_a) {
            var action = _a[0], collection = _a[1];
            return _this.service.addAssetTo(collection, action.asset, action.markers)
                .map(function (assets) { return assets.items.length > 0
                ? _this.store.create(function (factory) { return factory.activeCollection.addAssetSuccess(assets); })
                : _this.store.create(function (factory) {
                    return factory.snackbar.display('COLLECTION.ALREADY_IN_COLLECTION_TOAST', { collectionName: collection.name });
                }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.showSnackBarOnAddSuccess = this.actions.ofType(ActiveCollectionActions.AddAssetSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.name; }))
            .map(function (_a) {
            var action = _a[0], name = _a[1];
            return _this.store.create(function (factory) { return factory.snackbar.display('COLLECTION.ADD_TO_COLLECTION_TOAST', { collectionName: name }); });
        });
        this.removeAsset = this.actions.ofType(ActiveCollectionActions.RemoveAsset.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection; }))
            .switchMap(function (_a) {
            var action = _a[0], collection = _a[1];
            return _this.service.removeAssetFrom(collection, action.asset)
                .map(function (assets) { return _this.store.create(function (factory) { return factory.activeCollection.removeAssetSuccess(assets); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.showSnackBarOnRemoveSuccess = this.actions.ofType(ActiveCollectionActions.RemoveAssetSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.name; }))
            .map(function (_a) {
            var action = _a[0], name = _a[1];
            return _this.store.create(function (factory) { return factory.snackbar.display('COLLECTION.REMOVE_ASSET.SUCCESS', { collectionName: name }); });
        });
        this.changeRouteOnRemoveAssetSuccess = this.actions.ofType(ActiveCollectionActions.RemoveAssetSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.id; }))
            .map(function (_a) {
            var action = _a[0], collectionId = _a[1];
            return _this.store.create(function (factory) { return factory.router.goToCollection(collectionId); });
        });
        this.updateAssetMarkers = this.actions.ofType(ActiveCollectionActions.UpdateAssetMarkers.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection; }))
            .switchMap(function (_a) {
            var action = _a[0], collection = _a[1];
            return _this.service.updateAssetMarkers(collection, action.asset, action.markers)
                .map(function (assets) {
                return _this.store.create(function (factory) { return factory.activeCollection.updateAssetMarkersSuccess(assets); });
            })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.showSnackbarOnUpdateAssetMarkersSuccess = this.actions.ofType(ActiveCollectionActions.UpdateAssetMarkersSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.name; }))
            .map(function (_a) {
            var action = _a[0], name = _a[1];
            return _this.store.create(function (factory) { return factory.snackbar.display('COLLECTION.UPDATE_IN_COLLECTION_TOAST', { collectionName: name }); });
        });
        this.addPageOfSearchAssets = this.actions.ofType(ActiveCollectionActions.AddPageOfSearchAssets.Type)
            .withLatestFrom(this.store.select(function (state) { return state.search.results.items; }))
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.assets.pagination; }))
            .switchMap(function (_a) {
            var _b = _a[0], action = _b[0], items = _b[1], pagination = _a[1];
            return _this.service.addAssetsToFocusedCollection(items, pagination)
                .map(function (items) { return _this.store.create(function (factory) { return factory.activeCollection.addPageOfSearchAssetsSuccess(items); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.showToastOnAddPageSuccess = this.actions.ofType(ActiveCollectionActions.AddPageOfSearchAssetsSuccess.Type)
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.name; }))
            .map(function (_a) {
            var action = _a[0], collectionName = _a[1];
            return _this.store.create(function (factory) { return factory.snackbar.display('COLLECTION.ADD_ASSETS_SUCCESS_TOAST', { collectionName: collectionName }); });
        });
    }
    ActiveCollectionEffects.decorators = [
        { type: core_1.Injectable },
    ];
    ActiveCollectionEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: active_collection_service_1.ActiveCollectionService, },
        { type: user_preference_service_1.UserPreferenceService, },
    ]; };
    ActiveCollectionEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
        'loadIfNeeded': [{ type: effects_1.Effect },],
        'set': [{ type: effects_1.Effect },],
        'loadPage': [{ type: effects_1.Effect },],
        'openTrayOnAddOrRemove': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'addAsset': [{ type: effects_1.Effect },],
        'showSnackBarOnAddSuccess': [{ type: effects_1.Effect },],
        'removeAsset': [{ type: effects_1.Effect },],
        'showSnackBarOnRemoveSuccess': [{ type: effects_1.Effect },],
        'changeRouteOnRemoveAssetSuccess': [{ type: effects_1.Effect },],
        'updateAssetMarkers': [{ type: effects_1.Effect },],
        'showSnackbarOnUpdateAssetMarkersSuccess': [{ type: effects_1.Effect },],
        'addPageOfSearchAssets': [{ type: effects_1.Effect },],
        'showToastOnAddPageSuccess': [{ type: effects_1.Effect },],
    };
    return ActiveCollectionEffects;
}());
exports.ActiveCollectionEffects = ActiveCollectionEffects;
//# sourceMappingURL=active-collection.effects.js.map
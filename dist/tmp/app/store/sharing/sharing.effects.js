"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var sharing_service_1 = require("./sharing.service");
var SharingActions = require("./sharing.actions");
var collections_service_1 = require("../../shared/services/collections.service");
var SharingEffects = (function () {
    function SharingEffects(actions, store, service, collectionsService) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.collectionsService = collectionsService;
        this.createAssetShareLink = this.actions.ofType(SharingActions.CreateAssetShareLink.Type)
            .switchMap(function (action) {
            return _this.service.createAssetShareLink(action.assetId, action.markers)
                .map(function (link) { return _this.store.create(function (factory) { return factory.sharing.createAssetShareLinkSuccess(link); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.emailAssetShareLink = this.actions.ofType(SharingActions.EmailAssetShareLink.Type)
            .switchMap(function (action) {
            return _this.service.emailAssetShareLink(action.assetId, action.markers, action.parameters, action.properties)
                .map(function () { return _this.store.create(function (factory) { return factory.snackbar.display('ASSET.SHARING.SHARED_CONFIRMED_MESSAGE'); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.emailCollectionShareLink = this.actions.ofType(SharingActions.EmailCollectionShareLink.Type)
            .switchMap(function (action) {
            return _this.service.emailCollectionShareLink(action.collectionId, action.parameters)
                .map(function () { return _this.store.create(function (factory) { return factory.sharing.emailCollectionShareLinkSuccess(action.reloadType); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
        this.showToastOnCollectionEmailSuccess = this.actions.ofType(SharingActions.EmailCollectionShareLinkSuccess.Type)
            .map(function () { return _this.store.create(function (factory) { return factory.snackbar.display('ASSET.SHARING.SHARED_CONFIRMED_MESSAGE'); }); });
        this.reloadCollectionsOnCollectionEmailSuccess = this.actions.ofType(SharingActions.EmailCollectionShareLinkSuccess.Type)
            .filter(function (action) { return action.reloadType === 'collections'; })
            .do(function () { return _this.collectionsService.load(null, 'offAfterResponse').subscribe(); });
        this.reloadCollectionOnCollectionEmailSuccess = this.actions.ofType(SharingActions.EmailCollectionShareLinkSuccess.Type)
            .filter(function (action) { return action.reloadType === 'activeCollection'; })
            .withLatestFrom(this.store.select(function (state) { return state.activeCollection.collection.assets.pagination; }))
            .map(function (_a) {
            var action = _a[0], pagination = _a[1];
            return _this.store.create(function (factory) { return factory.activeCollection.load({
                pageSize: pagination.pageSize,
                currentPage: pagination.currentPage
            }); });
        });
    }
    SharingEffects.decorators = [
        { type: core_1.Injectable },
    ];
    SharingEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: sharing_service_1.SharingService, },
        { type: collections_service_1.CollectionsService, },
    ]; };
    SharingEffects.propDecorators = {
        'createAssetShareLink': [{ type: effects_1.Effect },],
        'emailAssetShareLink': [{ type: effects_1.Effect },],
        'emailCollectionShareLink': [{ type: effects_1.Effect },],
        'showToastOnCollectionEmailSuccess': [{ type: effects_1.Effect },],
        'reloadCollectionsOnCollectionEmailSuccess': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'reloadCollectionOnCollectionEmailSuccess': [{ type: effects_1.Effect },],
    };
    return SharingEffects;
}());
exports.SharingEffects = SharingEffects;
//# sourceMappingURL=sharing.effects.js.map
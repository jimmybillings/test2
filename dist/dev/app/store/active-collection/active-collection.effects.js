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
            return _this.store.create(function (factory) { return factory.snackbar.display('COLLECTION.ADD_ASSETS_SUCCESS_TOAST', { totalAssetsAdded: action.currentPageItems.totalAssetsAdded, collectionName: collectionName }); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "load", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "loadIfNeeded", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "set", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "loadPage", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "openTrayOnAddOrRemove", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "addAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "showSnackBarOnAddSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "removeAsset", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "showSnackBarOnRemoveSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "changeRouteOnRemoveAssetSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "updateAssetMarkers", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "showSnackbarOnUpdateAssetMarkersSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "addPageOfSearchAssets", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], ActiveCollectionEffects.prototype, "showToastOnAddPageSuccess", void 0);
    ActiveCollectionEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            active_collection_service_1.ActiveCollectionService,
            user_preference_service_1.UserPreferenceService])
    ], ActiveCollectionEffects);
    return ActiveCollectionEffects;
}());
exports.ActiveCollectionEffects = ActiveCollectionEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUVoRCw4Q0FBNkM7QUFFN0MscUVBQXVFO0FBRXZFLHlFQUFzRTtBQUN0RSw2Q0FBa0Y7QUFHbEYseUZBQXNGO0FBR3RGO0lBK0hFLGlDQUNVLE9BQWdCLEVBQ2hCLEtBQWUsRUFDZixPQUFnQyxFQUNoQyxxQkFBNEM7UUFKdEQsaUJBS0s7UUFKSyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBakkvQyxTQUFJLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDckYsU0FBUyxDQUFDLFVBQUMsTUFBb0M7WUFDOUMsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2lCQUNqQyxHQUFHLENBQUMsVUFBQyxVQUFzQixJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLEVBQTlFLENBQThFLENBQUM7aUJBQy9HLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxFQUF4RSxDQUF3RSxDQUFDO1FBRjNGLENBRTJGLENBQzVGLENBQUM7UUFHRyxpQkFBWSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2FBQ3JHLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFwQyxDQUFvQyxDQUFDLENBQUM7YUFDaEYsTUFBTSxDQUFDLFVBQUMsRUFBc0U7Z0JBQXJFLGNBQU0sRUFBRSxvQkFBWTtZQUM1QixPQUFBLFlBQVksS0FBSyxJQUFJO1FBQXJCLENBQXFCLENBQ3RCO2FBQ0EsR0FBRyxDQUFDLFVBQUMsRUFBc0U7Z0JBQXJFLGNBQU0sRUFBRSxvQkFBWTtZQUN6QixPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQWhELENBQWdELENBQUM7UUFBOUUsQ0FBOEUsQ0FDL0UsQ0FBQztRQUdHLFFBQUcsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQzthQUNuRixTQUFTLENBQUMsVUFBQyxNQUFtQztZQUM3QyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQztpQkFDckQsR0FBRyxDQUFDLFVBQUMsVUFBc0IsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxFQUE3RSxDQUE2RSxDQUFDO2lCQUM5RyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQztRQUYzRixDQUUyRixDQUM1RixDQUFDO1FBR0csYUFBUSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2FBQzdGLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFwQyxDQUFvQyxDQUFDLENBQUM7YUFDaEYsU0FBUyxDQUFDLFVBQUMsRUFBa0U7Z0JBQWpFLGNBQU0sRUFBRSxvQkFBWTtZQUMvQixPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDO2lCQUNuRCxHQUFHLENBQUMsVUFBQyxNQUF1QixJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFoRCxDQUFnRCxDQUFDLEVBQTlFLENBQThFLENBQUM7aUJBQ2hILEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxFQUF4RSxDQUF3RSxDQUFDO1FBRjNGLENBRTJGLENBQzVGLENBQUM7UUFJRywwQkFBcUIsR0FDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ2pHLEVBQUUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLEVBQS9DLENBQStDLENBQUMsQ0FBQztRQUd4RCxhQUFRLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDN0YsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO2FBQzdFLFNBQVMsQ0FBQyxVQUFDLEVBQW9FO2dCQUFuRSxjQUFNLEVBQUUsa0JBQVU7WUFDN0IsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO2lCQUM5RCxHQUFHLENBQUMsVUFBQyxNQUF1QixJQUFLLE9BQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQztnQkFDaEYsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTztvQkFDekIsT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx3Q0FBd0MsRUFBRSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQXZHLENBQXVHLENBQ3hHLEVBSitCLENBSS9CLENBQ0Y7aUJBQ0EsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLEVBQXhFLENBQXdFLENBQUM7UUFQM0YsQ0FPMkYsQ0FDNUYsQ0FBQztRQUdHLDZCQUF3QixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2FBQ3BILGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUF0QyxDQUFzQyxDQUFDLENBQUM7YUFDbEYsR0FBRyxDQUFDLFVBQUMsRUFBaUU7Z0JBQWhFLGNBQU0sRUFBRSxZQUFJO1lBQ2pCLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUF4RixDQUF3RixDQUFDO1FBQXRILENBQXNILENBQ3ZILENBQUM7UUFHRyxnQkFBVyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2FBQ25HLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQWpDLENBQWlDLENBQUMsQ0FBQzthQUM3RSxTQUFTLENBQUMsVUFBQyxFQUF1RTtnQkFBdEUsY0FBTSxFQUFFLGtCQUFVO1lBQzdCLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ25ELEdBQUcsQ0FBQyxVQUFDLE1BQXVCLElBQUssT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxFQUFqRixDQUFpRixDQUFDO2lCQUNuSCxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQztRQUYzRixDQUUyRixDQUM1RixDQUFDO1FBR0csZ0NBQTJCLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQzthQUMxSCxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLElBQUksRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO2FBQ2xGLEdBQUcsQ0FBQyxVQUFDLEVBQW9FO2dCQUFuRSxjQUFNLEVBQUUsWUFBSTtZQUNqQixPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBckYsQ0FBcUYsQ0FBQztRQUFuSCxDQUFtSCxDQUNwSCxDQUFDO1FBR0csb0NBQStCLEdBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQzthQUNqRSxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO2FBQ2hGLEdBQUcsQ0FBQyxVQUFDLEVBQTRFO2dCQUEzRSxjQUFNLEVBQUUsb0JBQVk7WUFDekIsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztRQUNuRixDQUFDLENBQUMsQ0FBQztRQUlBLHVCQUFrQixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7YUFDakgsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO2FBQzdFLFNBQVMsQ0FBQyxVQUFDLEVBQThFO2dCQUE3RSxjQUFNLEVBQUUsa0JBQVU7WUFDN0IsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQ3RFLEdBQUcsQ0FBQyxVQUFDLE1BQXVCO2dCQUMzQixPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLE1BQU0sQ0FBQyxFQUExRCxDQUEwRCxDQUFDO1lBQXhGLENBQXdGLENBQUM7aUJBQzFGLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxFQUF4RSxDQUF3RSxDQUFDO1FBSDNGLENBRzJGLENBQzVGLENBQUM7UUFHRyw0Q0FBdUMsR0FDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO2FBQ3hFLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUF0QyxDQUFzQyxDQUFDLENBQUM7YUFDbEYsR0FBRyxDQUFDLFVBQUMsRUFBMkU7Z0JBQTFFLGNBQU0sRUFBRSxZQUFJO1lBQ2pCLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUEzRixDQUEyRixDQUFDO1FBQXpILENBQXlILENBQzFILENBQUM7UUFHQywwQkFBcUIsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO2FBQ3ZILGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO2FBQ3RFLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO2FBQy9GLFNBQVMsQ0FBQyxVQUFDLEVBQXFHO2dCQUFwRyxVQUFlLEVBQWQsY0FBTSxFQUFFLGFBQUssRUFBRyxrQkFBVTtZQUN0QyxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztpQkFDekQsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDLEVBQTVELENBQTRELENBQUMsRUFBMUYsQ0FBMEYsQ0FBQztpQkFDeEcsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLEVBQXhFLENBQXdFLENBQUM7UUFGM0YsQ0FFMkYsQ0FDNUYsQ0FBQztRQUdHLDhCQUF5QixHQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7YUFDM0UsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQXRDLENBQXNDLENBQUMsQ0FBQzthQUNsRixHQUFHLENBQUMsVUFBQyxFQUF3RjtnQkFBdkYsY0FBTSxFQUFFLHNCQUFjO1lBQzNCLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDbkQscUNBQXFDLEVBQ3JDLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLGNBQWMsZ0JBQUEsRUFBRSxDQUFDLEVBRnBELENBRW9ELENBQ2hGO1FBSEQsQ0FHQyxDQUNGLENBQUM7SUFPRixDQUFDO0lBbElMO1FBREMsZ0JBQU0sRUFBRTtrQ0FDSSx1QkFBVTt5REFLbkI7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ1ksdUJBQVU7aUVBTzNCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNHLHVCQUFVO3dEQUtsQjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDUSx1QkFBVTs2REFNdkI7SUFJSjtRQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7a0NBQ0UsdUJBQVU7MEVBRXVCO0lBRy9EO1FBREMsZ0JBQU0sRUFBRTtrQ0FDUSx1QkFBVTs2REFXdkI7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ3dCLHVCQUFVOzZFQUl2QztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDVyx1QkFBVTtnRUFNMUI7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQzJCLHVCQUFVO2dGQUkxQztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDK0IsdUJBQVU7b0ZBSzNDO0lBSVA7UUFEQyxnQkFBTSxFQUFFO2tDQUNrQix1QkFBVTt1RUFPakM7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ3VDLHVCQUFVOzRGQUtwRDtJQUdOO1FBREMsZ0JBQU0sRUFBRTtrQ0FDcUIsdUJBQVU7MEVBT3BDO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUN5Qix1QkFBVTs4RUFRdEM7SUE3SEssdUJBQXVCO1FBRG5DLGlCQUFVLEVBQUU7eUNBaUlRLGlCQUFPO1lBQ1Qsb0JBQVE7WUFDTixtREFBdUI7WUFDVCwrQ0FBcUI7T0FuSTNDLHVCQUF1QixDQXFJbkM7SUFBRCw4QkFBQztDQXJJRCxBQXFJQyxJQUFBO0FBcklZLDBEQUF1QiIsImZpbGUiOiJhcHAvc3RvcmUvYWN0aXZlLWNvbGxlY3Rpb24vYWN0aXZlLWNvbGxlY3Rpb24uZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCAqIGFzIEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zIGZyb20gJy4vYWN0aXZlLWNvbGxlY3Rpb24uYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgQWN0aXZlQ29sbGVjdGlvblNlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1jb2xsZWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUsIEFwcFN0YXRlLCBJbnRlcm5hbEFjdGlvbkZhY3RvcnlNYXBwZXIgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQ29sbGVjdGlvbkl0ZW1zIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXQsIFBhZ2luYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFVzZXJQcmVmZXJlbmNlU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLXByZWZlcmVuY2Uuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3RpdmVDb2xsZWN0aW9uRWZmZWN0cyB7XG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmxvYWQoYWN0aW9uLnBhZ2luYXRpb24pXG4gICAgICAgIC5tYXAoKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmxvYWRTdWNjZXNzKGNvbGxlY3Rpb24pKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZElmTmVlZGVkOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRJZk5lZWRlZC5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmNvbGxlY3Rpb24uaWQpKVxuICAgIC5maWx0ZXIoKFthY3Rpb24sIGNvbGxlY3Rpb25JZF06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5Mb2FkSWZOZWVkZWQsIG51bWJlcl0pID0+XG4gICAgICBjb2xsZWN0aW9uSWQgPT09IG51bGxcbiAgICApXG4gICAgLm1hcCgoW2FjdGlvbiwgY29sbGVjdGlvbklkXTogW0FjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkxvYWRJZk5lZWRlZCwgbnVtYmVyXSkgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmxvYWQoYWN0aW9uLnBhZ2luYXRpb24pKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzZXQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuU2V0LlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5TZXQpID0+XG4gICAgICB0aGlzLnNlcnZpY2Uuc2V0KGFjdGlvbi5jb2xsZWN0aW9uSWQsIGFjdGlvbi5wYWdpbmF0aW9uKVxuICAgICAgICAubWFwKChjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5zZXRTdWNjZXNzKGNvbGxlY3Rpb24pKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgbG9hZFBhZ2U6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuTG9hZFBhZ2UuVHlwZSlcbiAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uLmlkKSlcbiAgICAuc3dpdGNoTWFwKChbYWN0aW9uLCBjb2xsZWN0aW9uSWRdOiBbQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuTG9hZFBhZ2UsIG51bWJlcl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UubG9hZFBhZ2UoY29sbGVjdGlvbklkLCBhY3Rpb24ucGFnaW5hdGlvbilcbiAgICAgICAgLm1hcCgoYXNzZXRzOiBDb2xsZWN0aW9uSXRlbXMpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmxvYWRQYWdlU3VjY2Vzcyhhc3NldHMpKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIC8vIFRPRE86IEFmdGVyIHVzZXIgcHJlZmVyZW5jZSBzZXJ2aWNlIGhhcyBiZWVuIHJlcGxhY2VkLCB0aGlzIHdpbGwgbWFwIHRvIGEgdXNlciBwcmVmZXJlbmNlIGFjdGlvbiBpbnN0ZWFkIG9mIGNhbGxpbmcgZG8oKS5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgb3BlblRyYXlPbkFkZE9yUmVtb3ZlOiBPYnNlcnZhYmxlPEFjdGlvbj4gPVxuICAgIHRoaXMuYWN0aW9ucy5vZlR5cGUoQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXQuVHlwZSwgQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuUmVtb3ZlQXNzZXQuVHlwZSlcbiAgICAgIC5kbygoKSA9PiB0aGlzLnVzZXJQcmVmZXJlbmNlU2VydmljZS5vcGVuQ29sbGVjdGlvblRyYXkoKSk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBhZGRBc3NldDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5BZGRBc3NldC5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmNvbGxlY3Rpb24pKVxuICAgIC5zd2l0Y2hNYXAoKFthY3Rpb24sIGNvbGxlY3Rpb25dOiBbQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkQXNzZXQsIENvbGxlY3Rpb25dKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmFkZEFzc2V0VG8oY29sbGVjdGlvbiwgYWN0aW9uLmFzc2V0LCBhY3Rpb24ubWFya2VycylcbiAgICAgICAgLm1hcCgoYXNzZXRzOiBDb2xsZWN0aW9uSXRlbXMpID0+IGFzc2V0cy5pdGVtcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5hZGRBc3NldFN1Y2Nlc3MoYXNzZXRzKSlcbiAgICAgICAgICA6IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICAgIGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQ09MTEVDVElPTi5BTFJFQURZX0lOX0NPTExFQ1RJT05fVE9BU1QnLCB7IGNvbGxlY3Rpb25OYW1lOiBjb2xsZWN0aW9uLm5hbWUgfSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgc2hvd1NuYWNrQmFyT25BZGRTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkFkZEFzc2V0U3VjY2Vzcy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmNvbGxlY3Rpb24ubmFtZSkpXG4gICAgLm1hcCgoW2FjdGlvbiwgbmFtZV06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5BZGRBc3NldFN1Y2Nlc3MsIHN0cmluZ10pID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQ09MTEVDVElPTi5BRERfVE9fQ09MTEVDVElPTl9UT0FTVCcsIHsgY29sbGVjdGlvbk5hbWU6IG5hbWUgfSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHJlbW92ZUFzc2V0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlbW92ZUFzc2V0LlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbikpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgY29sbGVjdGlvbl06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5SZW1vdmVBc3NldCwgQ29sbGVjdGlvbl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UucmVtb3ZlQXNzZXRGcm9tKGNvbGxlY3Rpb24sIGFjdGlvbi5hc3NldClcbiAgICAgICAgLm1hcCgoYXNzZXRzOiBDb2xsZWN0aW9uSXRlbXMpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLnJlbW92ZUFzc2V0U3VjY2Vzcyhhc3NldHMpKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgc2hvd1NuYWNrQmFyT25SZW1vdmVTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2Vzcy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmNvbGxlY3Rpb24ubmFtZSkpXG4gICAgLm1hcCgoW2FjdGlvbiwgbmFtZV06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MsIHN0cmluZ10pID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQ09MTEVDVElPTi5SRU1PVkVfQVNTRVQuU1VDQ0VTUycsIHsgY29sbGVjdGlvbk5hbWU6IG5hbWUgfSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGNoYW5nZVJvdXRlT25SZW1vdmVBc3NldFN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5SZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZSlcbiAgICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hY3RpdmVDb2xsZWN0aW9uLmNvbGxlY3Rpb24uaWQpKVxuICAgICAgLm1hcCgoW2FjdGlvbiwgY29sbGVjdGlvbklkXTogW0FjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLlJlbW92ZUFzc2V0U3VjY2VzcywgbnVtYmVyXSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQpKTtcbiAgICAgIH0pO1xuXG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyB1cGRhdGVBc3NldE1hcmtlcnM6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuVXBkYXRlQXNzZXRNYXJrZXJzLlR5cGUpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbikpXG4gICAgLnN3aXRjaE1hcCgoW2FjdGlvbiwgY29sbGVjdGlvbl06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5VcGRhdGVBc3NldE1hcmtlcnMsIENvbGxlY3Rpb25dKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLnVwZGF0ZUFzc2V0TWFya2Vycyhjb2xsZWN0aW9uLCBhY3Rpb24uYXNzZXQsIGFjdGlvbi5tYXJrZXJzKVxuICAgICAgICAubWFwKChhc3NldHM6IENvbGxlY3Rpb25JdGVtcykgPT5cbiAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi51cGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzKGFzc2V0cykpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBzaG93U25hY2tiYXJPblVwZGF0ZUFzc2V0TWFya2Vyc1N1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5VcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzLlR5cGUpXG4gICAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uLm5hbWUpKVxuICAgICAgLm1hcCgoW2FjdGlvbiwgbmFtZV06IFtBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5VcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzLCBzdHJpbmddKSA9PlxuICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQ09MTEVDVElPTi5VUERBVEVfSU5fQ09MTEVDVElPTl9UT0FTVCcsIHsgY29sbGVjdGlvbk5hbWU6IG5hbWUgfSkpXG4gICAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBwdWJsaWMgYWRkUGFnZU9mU2VhcmNoQXNzZXRzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKEFjdGl2ZUNvbGxlY3Rpb25BY3Rpb25zLkFkZFBhZ2VPZlNlYXJjaEFzc2V0cy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zZWFyY2gucmVzdWx0cy5pdGVtcykpXG4gICAgLndpdGhMYXRlc3RGcm9tKHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbi5hc3NldHMucGFnaW5hdGlvbikpXG4gICAgLnN3aXRjaE1hcCgoW1thY3Rpb24sIGl0ZW1zXSwgcGFnaW5hdGlvbl06IFtbQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkUGFnZU9mU2VhcmNoQXNzZXRzLCBBc3NldFtdXSwgUGFnaW5hdGlvbl0pID0+XG4gICAgICB0aGlzLnNlcnZpY2UuYWRkQXNzZXRzVG9Gb2N1c2VkQ29sbGVjdGlvbihpdGVtcywgcGFnaW5hdGlvbilcbiAgICAgICAgLm1hcChpdGVtcyA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5hZGRQYWdlT2ZTZWFyY2hBc3NldHNTdWNjZXNzKGl0ZW1zKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHNob3dUb2FzdE9uQWRkUGFnZVN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShBY3RpdmVDb2xsZWN0aW9uQWN0aW9ucy5BZGRQYWdlT2ZTZWFyY2hBc3NldHNTdWNjZXNzLlR5cGUpXG4gICAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uLm5hbWUpKVxuICAgICAgLm1hcCgoW2FjdGlvbiwgY29sbGVjdGlvbk5hbWVdOiBbQWN0aXZlQ29sbGVjdGlvbkFjdGlvbnMuQWRkUGFnZU9mU2VhcmNoQXNzZXRzU3VjY2Vzcywgc3RyaW5nXSkgPT5cbiAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoXG4gICAgICAgICAgJ0NPTExFQ1RJT04uQUREX0FTU0VUU19TVUNDRVNTX1RPQVNUJyxcbiAgICAgICAgICB7IHRvdGFsQXNzZXRzQWRkZWQ6IGFjdGlvbi5jdXJyZW50UGFnZUl0ZW1zLnRvdGFsQXNzZXRzQWRkZWQsIGNvbGxlY3Rpb25OYW1lIH0pXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgc2VydmljZTogQWN0aXZlQ29sbGVjdGlvblNlcnZpY2UsXG4gICAgcHJpdmF0ZSB1c2VyUHJlZmVyZW5jZVNlcnZpY2U6IFVzZXJQcmVmZXJlbmNlU2VydmljZSAgLy8gRm9yIG5vdywgdW50aWwgd2UgY2FuIGRpcmVjdGx5IG1hcCB0byB1c2VyIHByZWZlcmVuY2UgYWN0aW9ucy4uLlxuICApIHsgfVxufVxuIl19

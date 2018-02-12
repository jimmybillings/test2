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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], CollectionsEffects.prototype, "addAsset", void 0);
    CollectionsEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, collections_service_1.FutureCollectionsService])
    ], CollectionsEffects);
    return CollectionsEffects;
}());
exports.CollectionsEffects = CollectionsEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUE2QztBQUU3Qyx5Q0FBZ0Q7QUFFaEQsNkNBQTJDO0FBQzNDLDZEQUFpRTtBQUNqRSwwREFBNEQ7QUFJNUQ7SUFtQkUsNEJBQW9CLE9BQWdCLEVBQVUsS0FBZSxFQUFVLE9BQWlDO1FBQXhHLGlCQUE2RztRQUF6RixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBaEJqRyxhQUFRLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQzthQUNwRyxTQUFTLENBQUMsVUFBQyxNQUErQztZQUN6RCxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDckQsR0FBRyxDQUFDLFVBQUMsNEJBQTBEO2dCQUM5RCxNQUFNLENBQUMsNEJBQTRCLENBQUMsSUFBSTtvQkFDdEMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQ25GLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBRDdDLENBQzZDLENBQzNFO29CQUNELENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU87d0JBQ3pCLE9BQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsd0NBQXdDLEVBQy9ELEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBRDdDLENBQzZDLENBQzlDLENBQUM7WUFDTixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLEVBQXhFLENBQXdFLENBQUM7UUFYM0YsQ0FXMkYsQ0FDNUYsQ0FBQztJQUV3RyxDQUFDO0lBaEI3RztRQURDLGdCQUFNLEVBQUU7a0NBQ1EsdUJBQVU7d0RBY3ZCO0lBakJPLGtCQUFrQjtRQUQ5QixpQkFBVSxFQUFFO3lDQW9Ca0IsaUJBQU8sRUFBaUIsb0JBQVEsRUFBbUIsOENBQXdCO09BbkI3RixrQkFBa0IsQ0FvQjlCO0lBQUQseUJBQUM7Q0FwQkQsQUFvQkMsSUFBQTtBQXBCWSxnREFBa0IiLCJmaWxlIjoiYXBwL3N0b3JlL2NvbGxlY3Rpb25zL2NvbGxlY3Rpb25zLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBGdXR1cmVDb2xsZWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuL2NvbGxlY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgQ29sbGVjdGlvbnNBY3Rpb25zIGZyb20gJy4vY29sbGVjdGlvbnMuYWN0aW9ucyc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uLCBBZGRBc3NldFRvQ29sbGVjdGlvblJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbnNFZmZlY3RzIHtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGFkZEFzc2V0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKENvbGxlY3Rpb25zQWN0aW9ucy5BZGRBc3NldFRvQ29sbGVjdGlvbi5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogQ29sbGVjdGlvbnNBY3Rpb25zLkFkZEFzc2V0VG9Db2xsZWN0aW9uKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmFkZEFzc2V0VG8oYWN0aW9uLmNvbGxlY3Rpb24sIGFjdGlvbi5hc3NldClcbiAgICAgICAgLm1hcCgoYWRkQXNzZXRUb0NvbGxlY3Rpb25SZXNwb25zZTogQWRkQXNzZXRUb0NvbGxlY3Rpb25SZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBhZGRBc3NldFRvQ29sbGVjdGlvblJlc3BvbnNlLmxpc3RcbiAgICAgICAgICAgID8gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoJ0NPTExFQ1RJT04uU0hPVy5BU1NFVF9BRERFRCcsXG4gICAgICAgICAgICAgIHsgY29sbGVjdGlvbk5hbWU6IGFjdGlvbi5jb2xsZWN0aW9uLm5hbWUsIGFzc2V0SWQ6IGFjdGlvbi5hc3NldC5hc3NldElkIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICA6IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT5cbiAgICAgICAgICAgICAgZmFjdG9yeS5zbmFja2Jhci5kaXNwbGF5KCdDT0xMRUNUSU9OLkFMUkVBRFlfSU5fQ09MTEVDVElPTl9UT0FTVCcsXG4gICAgICAgICAgICAgICAgeyBjb2xsZWN0aW9uTmFtZTogYWN0aW9uLmNvbGxlY3Rpb24ubmFtZSB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uczogQWN0aW9ucywgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgc2VydmljZTogRnV0dXJlQ29sbGVjdGlvbnNTZXJ2aWNlKSB7IH1cbn1cbiJdfQ==

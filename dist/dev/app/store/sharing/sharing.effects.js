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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SharingEffects.prototype, "createAssetShareLink", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SharingEffects.prototype, "emailAssetShareLink", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SharingEffects.prototype, "emailCollectionShareLink", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SharingEffects.prototype, "showToastOnCollectionEmailSuccess", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], SharingEffects.prototype, "reloadCollectionsOnCollectionEmailSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SharingEffects.prototype, "reloadCollectionOnCollectionEmailSuccess", void 0);
    SharingEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            sharing_service_1.SharingService,
            collections_service_1.CollectionsService])
    ], SharingEffects);
    return SharingEffects;
}());
exports.SharingEffects = SharingEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zaGFyaW5nL3NoYXJpbmcuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUEyQztBQUMzQyw4Q0FBNkM7QUFFN0MseUNBQWdEO0FBRWhELDZDQUEyQztBQUMzQyxxREFBbUQ7QUFDbkQsa0RBQW9EO0FBQ3BELGlGQUErRTtBQUcvRTtJQWdERSx3QkFDVSxPQUFnQixFQUNoQixLQUFlLEVBQ2YsT0FBdUIsRUFDdkIsa0JBQXNDO1FBSmhELGlCQUtLO1FBSkssWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2YsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQWxEaEQseUJBQW9CLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUM7YUFDckcsU0FBUyxDQUFDLFVBQUMsTUFBMkM7WUFDckQsT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDOUQsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxFQUFqRCxDQUFpRCxDQUFDLEVBQS9FLENBQStFLENBQUM7aUJBQzVGLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLHVCQUFVLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxFQUF4RSxDQUF3RSxDQUFDO1FBRjNGLENBRTJGLENBQzVGLENBQUM7UUFHSix3QkFBbUIsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQzthQUNuRyxTQUFTLENBQUMsVUFBQyxNQUEwQztZQUNwRCxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQztpQkFDbkcsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLEVBQWxFLENBQWtFLENBQUMsRUFBaEcsQ0FBZ0csQ0FBQztpQkFDM0csS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLEVBQXhFLENBQXdFLENBQUM7UUFGM0YsQ0FFMkYsQ0FDNUYsQ0FBQztRQUdKLDZCQUF3QixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDO2FBQzdHLFNBQVMsQ0FBQyxVQUFDLE1BQStDO1lBQ3pELE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUM7aUJBQzFFLEdBQUcsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLCtCQUErQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBbEUsQ0FBa0UsQ0FBQyxFQUFoRyxDQUFnRyxDQUFDO2lCQUMzRyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQztRQUYzRixDQUUyRixDQUM1RixDQUFDO1FBR0csc0NBQWlDLEdBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUM7YUFDckUsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDLEVBQWxFLENBQWtFLENBQUMsRUFBaEcsQ0FBZ0csQ0FBQyxDQUFDO1FBRzFHLDhDQUF5QyxHQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDO2FBQ3JFLE1BQU0sQ0FBQyxVQUFDLE1BQXNELElBQUssT0FBQSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsRUFBbkMsQ0FBbUMsQ0FBQzthQUN2RyxFQUFFLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUMsU0FBUyxFQUFFLEVBQWxFLENBQWtFLENBQUMsQ0FBQztRQUczRSw2Q0FBd0MsR0FDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQzthQUNyRSxNQUFNLENBQUMsVUFBQyxNQUFzRCxJQUFLLE9BQUEsTUFBTSxDQUFDLFVBQVUsS0FBSyxrQkFBa0IsRUFBeEMsQ0FBd0MsQ0FBQzthQUM1RyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQW5ELENBQW1ELENBQUMsQ0FBQzthQUMvRixHQUFHLENBQUMsVUFBQyxFQUFrRjtnQkFBakYsY0FBTSxFQUFFLGtCQUFVO1lBQ3ZCLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO2dCQUN6RCxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7Z0JBQzdCLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVzthQUNwQyxDQUFDLEVBSDJCLENBRzNCLENBQUM7UUFISCxDQUdHLENBQ0osQ0FBQztJQU9GLENBQUM7SUFuREw7UUFEQyxnQkFBTSxFQUFFO2tDQUNhLHVCQUFVO2dFQUs1QjtJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDWSx1QkFBVTsrREFLM0I7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2lCLHVCQUFVO29FQUtoQztJQUdKO1FBREMsZ0JBQU0sRUFBRTtrQ0FDaUMsdUJBQVU7NkVBRTZEO0lBR2pIO1FBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztrQ0FDc0IsdUJBQVU7cUZBR3NCO0lBR2xGO1FBREMsZ0JBQU0sRUFBRTtrQ0FDd0MsdUJBQVU7b0ZBU3JEO0lBOUNLLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FrRFEsaUJBQU87WUFDVCxvQkFBUTtZQUNOLGdDQUFjO1lBQ0gsd0NBQWtCO09BcERyQyxjQUFjLENBc0QxQjtJQUFELHFCQUFDO0NBdERELEFBc0RDLElBQUE7QUF0RFksd0NBQWMiLCJmaWxlIjoiYXBwL3N0b3JlL3NoYXJpbmcvc2hhcmluZy5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgU2hhcmluZ1NlcnZpY2UgfSBmcm9tICcuL3NoYXJpbmcuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBTaGFyaW5nQWN0aW9ucyBmcm9tICcuL3NoYXJpbmcuYWN0aW9ucyc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY29sbGVjdGlvbnMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyaW5nRWZmZWN0cyB7XG4gIEBFZmZlY3QoKVxuICBjcmVhdGVBc3NldFNoYXJlTGluazogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShTaGFyaW5nQWN0aW9ucy5DcmVhdGVBc3NldFNoYXJlTGluay5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogU2hhcmluZ0FjdGlvbnMuQ3JlYXRlQXNzZXRTaGFyZUxpbmspID0+XG4gICAgICB0aGlzLnNlcnZpY2UuY3JlYXRlQXNzZXRTaGFyZUxpbmsoYWN0aW9uLmFzc2V0SWQsIGFjdGlvbi5tYXJrZXJzKVxuICAgICAgICAubWFwKGxpbmsgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNoYXJpbmcuY3JlYXRlQXNzZXRTaGFyZUxpbmtTdWNjZXNzKGxpbmspKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZShlcnJvcikpKSlcbiAgICApO1xuXG4gIEBFZmZlY3QoKVxuICBlbWFpbEFzc2V0U2hhcmVMaW5rOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFNoYXJpbmdBY3Rpb25zLkVtYWlsQXNzZXRTaGFyZUxpbmsuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IFNoYXJpbmdBY3Rpb25zLkVtYWlsQXNzZXRTaGFyZUxpbmspID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZW1haWxBc3NldFNoYXJlTGluayhhY3Rpb24uYXNzZXRJZCwgYWN0aW9uLm1hcmtlcnMsIGFjdGlvbi5wYXJhbWV0ZXJzLCBhY3Rpb24ucHJvcGVydGllcylcbiAgICAgICAgLm1hcCgoKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQVNTRVQuU0hBUklORy5TSEFSRURfQ09ORklSTUVEX01FU1NBR0UnKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgZW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFNoYXJpbmdBY3Rpb25zLkVtYWlsQ29sbGVjdGlvblNoYXJlTGluay5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogU2hhcmluZ0FjdGlvbnMuRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rKSA9PlxuICAgICAgdGhpcy5zZXJ2aWNlLmVtYWlsQ29sbGVjdGlvblNoYXJlTGluayhhY3Rpb24uY29sbGVjdGlvbklkLCBhY3Rpb24ucGFyYW1ldGVycylcbiAgICAgICAgLm1hcCgoKSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc2hhcmluZy5lbWFpbENvbGxlY3Rpb25TaGFyZUxpbmtTdWNjZXNzKGFjdGlvbi5yZWxvYWRUeXBlKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHNob3dUb2FzdE9uQ29sbGVjdGlvbkVtYWlsU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID1cbiAgICB0aGlzLmFjdGlvbnMub2ZUeXBlKFNoYXJpbmdBY3Rpb25zLkVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MuVHlwZSlcbiAgICAgIC5tYXAoKCkgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNuYWNrYmFyLmRpc3BsYXkoJ0FTU0VULlNIQVJJTkcuU0hBUkVEX0NPTkZJUk1FRF9NRVNTQUdFJykpKTtcblxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIHB1YmxpYyByZWxvYWRDb2xsZWN0aW9uc09uQ29sbGVjdGlvbkVtYWlsU3VjY2VzczogT2JzZXJ2YWJsZTxBY3Rpb24+ID1cbiAgICB0aGlzLmFjdGlvbnMub2ZUeXBlKFNoYXJpbmdBY3Rpb25zLkVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MuVHlwZSlcbiAgICAgIC5maWx0ZXIoKGFjdGlvbjogU2hhcmluZ0FjdGlvbnMuRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rU3VjY2VzcykgPT4gYWN0aW9uLnJlbG9hZFR5cGUgPT09ICdjb2xsZWN0aW9ucycpXG4gICAgICAuZG8oKCkgPT4gdGhpcy5jb2xsZWN0aW9uc1NlcnZpY2UubG9hZChudWxsLCAnb2ZmQWZ0ZXJSZXNwb25zZScpLnN1YnNjcmliZSgpKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIHJlbG9hZENvbGxlY3Rpb25PbkNvbGxlY3Rpb25FbWFpbFN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9XG4gICAgdGhpcy5hY3Rpb25zLm9mVHlwZShTaGFyaW5nQWN0aW9ucy5FbWFpbENvbGxlY3Rpb25TaGFyZUxpbmtTdWNjZXNzLlR5cGUpXG4gICAgICAuZmlsdGVyKChhY3Rpb246IFNoYXJpbmdBY3Rpb25zLkVtYWlsQ29sbGVjdGlvblNoYXJlTGlua1N1Y2Nlc3MpID0+IGFjdGlvbi5yZWxvYWRUeXBlID09PSAnYWN0aXZlQ29sbGVjdGlvbicpXG4gICAgICAud2l0aExhdGVzdEZyb20odGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uLmFzc2V0cy5wYWdpbmF0aW9uKSlcbiAgICAgIC5tYXAoKFthY3Rpb24sIHBhZ2luYXRpb25dOiBbU2hhcmluZ0FjdGlvbnMuRW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rU3VjY2VzcywgUGFnaW5hdGlvbl0pID0+XG4gICAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmxvYWQoe1xuICAgICAgICAgIHBhZ2VTaXplOiBwYWdpbmF0aW9uLnBhZ2VTaXplLFxuICAgICAgICAgIGN1cnJlbnRQYWdlOiBwYWdpbmF0aW9uLmN1cnJlbnRQYWdlXG4gICAgICAgIH0pKVxuICAgICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBTaGFyaW5nU2VydmljZSxcbiAgICBwcml2YXRlIGNvbGxlY3Rpb25zU2VydmljZTogQ29sbGVjdGlvbnNTZXJ2aWNlXG4gICkgeyB9XG59XG4iXX0=

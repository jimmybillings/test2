"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var collections_store_1 = require("../stores/collections.store");
var api_service_1 = require("../../shared/services/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var app_store_1 = require("../../app.store");
var CollectionsService = (function () {
    function CollectionsService(collectionsStore, api, store) {
        this.collectionsStore = collectionsStore;
        this.api = api;
        this.store = store;
        this.setSearchParams();
        this.staySyncedWithActiveCollection();
    }
    Object.defineProperty(CollectionsService.prototype, "data", {
        get: function () {
            return this.collectionsStore.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionsService.prototype, "state", {
        get: function () {
            return this.collectionsStore.state;
        },
        enumerable: true,
        configurable: true
    });
    CollectionsService.prototype.load = function (params, loadingIndicator) {
        var _this = this;
        if (loadingIndicator === void 0) { loadingIndicator = false; }
        if (params)
            this.params = Object.assign({}, this.params, params);
        return this.api.get(api_interface_1.Api.Assets, "collectionSummary/search", { parameters: this.params, loadingIndicator: loadingIndicator })
            .do(function (response) { return _this.collectionsStore.replaceAllCollectionsWith(response); });
    };
    CollectionsService.prototype.create = function (collection) {
        var _this = this;
        return this.api.post(api_interface_1.Api.Assets, 'collectionSummary', { body: collection, loadingIndicator: true })
            .do(function (response) { return _this.collectionsStore.add(response); });
    };
    CollectionsService.prototype.duplicate = function (collection) {
        return this.api.post(api_interface_1.Api.Identities, 'collection', { body: collection, loadingIndicator: true });
    };
    CollectionsService.prototype.getByIdAndDuplicate = function (id) {
        var _this = this;
        return this.api.get(api_interface_1.Api.Identities, "collection/" + id, { loadingIndicator: true })
            .map(function (response) { return _this.prepareForDuplication(response); });
    };
    CollectionsService.prototype.update = function (id, collectionUpdates) {
        var _this = this;
        var endpoint = "collection/" + id;
        return this.api.get(api_interface_1.Api.Identities, endpoint, { loadingIndicator: 'onBeforeRequest' })
            .switchMap(function (response) {
            return _this.api.put(api_interface_1.Api.Identities, endpoint, { body: __assign({}, response, collectionUpdates), loadingIndicator: 'offAfterResponse' });
        });
    };
    CollectionsService.prototype.delete = function (collectionId, loadingIndicator) {
        var _this = this;
        if (loadingIndicator === void 0) { loadingIndicator = 'onBeforeRequest'; }
        this.collectionsStore.deleteCollectionWith(collectionId);
        return this.api.delete(api_interface_1.Api.Identities, "collection/" + collectionId, { loadingIndicator: loadingIndicator })
            .switchMap(function (_) {
            if (_this.store.match(collectionId, function (state) { return state.activeCollection.collection.id; })) {
                _this.store.dispatch(function (factory) { return factory.activeCollection.load(); });
                return _this.store.blockUntil(function (state) { return !state.activeCollection.loading; }).switchMap(function () { return _this.load(); });
            }
            else {
                return _this.load();
            }
        });
    };
    CollectionsService.prototype.reset = function () {
        this.collectionsStore.deleteAllCollections();
    };
    CollectionsService.prototype.destroyAll = function () {
        this.collectionsStore.deleteAllCollections();
        this.store.dispatch(function (factory) { return factory.activeCollection.reset(); });
    };
    CollectionsService.prototype.getItems = function (collectionId) {
        return this.api.get(api_interface_1.Api.Assets, "collectionSummary/assets/" + collectionId, { parameters: { i: '0', n: '100' }, loadingIndicator: true });
    };
    CollectionsService.prototype.staySyncedWithActiveCollection = function () {
        var _this = this;
        this.store.select(function (state) { return state.activeCollection; }).subscribe(function (activeCollectionState) {
            if (_this.state.items && _this.state.items.length > 0 && !activeCollectionState.loading) {
                _this.collectionsStore.update(activeCollectionState.collection);
            }
        });
    };
    CollectionsService.prototype.setSearchParams = function () {
        this.params = { q: '', accessLevel: 'all', s: '', d: '', i: 0, n: 200 };
    };
    CollectionsService.prototype.prepareForDuplication = function (collection) {
        var collectionCopy = {
            name: collection.name,
            tags: collection.tags,
            siteName: collection.siteName,
        };
        if (collection.assets) {
            collectionCopy.assets = collection.assets.map(function (asset) { return ({
                assetId: asset.assetId,
                timeEnd: asset.timeEnd,
                timeStart: asset.timeStart
            }); });
        }
        return collectionCopy;
    };
    CollectionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [collections_store_1.CollectionsStore,
            api_service_1.ApiService,
            app_store_1.AppStore])
    ], CollectionsService);
    return CollectionsService;
}());
exports.CollectionsService = CollectionsService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY29sbGVjdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBSTNDLGlFQUErRDtBQUMvRCxpRUFBK0Q7QUFDL0QsdUVBQW9GO0FBQ3BGLDZDQUFrRTtBQUdsRTtJQUdFLDRCQUNVLGdCQUFrQyxFQUNsQyxHQUFlLEVBQ2YsS0FBZTtRQUZmLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVU7UUFFdkIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxzQkFBVyxvQ0FBSTthQUFmO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxxQ0FBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBRU0saUNBQUksR0FBWCxVQUFZLE1BQVksRUFBRSxnQkFBZ0Q7UUFBMUUsaUJBS0M7UUFMeUIsaUNBQUEsRUFBQSx3QkFBZ0Q7UUFDeEUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWpFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLENBQUM7YUFDekgsRUFBRSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxFQUF6RCxDQUF5RCxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLG1DQUFNLEdBQWIsVUFBYyxVQUFzQjtRQUFwQyxpQkFHQztRQUZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDaEcsRUFBRSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFzQixDQUFDLEVBQWpELENBQWlELENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU0sc0NBQVMsR0FBaEIsVUFBaUIsVUFBc0I7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRyxDQUFDO0lBRU0sZ0RBQW1CLEdBQTFCLFVBQTJCLEVBQVU7UUFBckMsaUJBR0M7UUFGQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsZ0JBQWMsRUFBSSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDaEYsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLG1DQUFNLEdBQWIsVUFBYyxFQUFVLEVBQUUsaUJBQTZCO1FBQXZELGlCQWtCQztRQVZDLElBQU0sUUFBUSxHQUFXLGdCQUFjLEVBQUksQ0FBQztRQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzthQUNuRixTQUFTLENBQUMsVUFBQSxRQUFRO1lBQ2pCLE9BQUEsS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ1YsbUJBQUcsQ0FBQyxVQUFVLEVBQ2QsUUFBUSxFQUNSLEVBQUUsSUFBSSxlQUFPLFFBQVEsRUFBSyxpQkFBaUIsQ0FBRSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixFQUFFLENBQ3RGO1FBSkQsQ0FJQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRU0sbUNBQU0sR0FBYixVQUFjLFlBQW9CLEVBQUUsZ0JBQTREO1FBQWhHLGlCQVlDO1FBWm1DLGlDQUFBLEVBQUEsb0NBQTREO1FBQzlGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsZ0JBQWMsWUFBYyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzthQUN6RyxTQUFTLENBQUMsVUFBQSxDQUFDO1lBQ1YsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQXBDLENBQW9DLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7Z0JBRWhFLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO1lBQ3RHLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxrQ0FBSyxHQUFaO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVNLHVDQUFVLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQWhDLENBQWdDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0scUNBQVEsR0FBZixVQUFnQixZQUFvQjtRQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ2pCLG1CQUFHLENBQUMsTUFBTSxFQUNWLDhCQUE0QixZQUFjLEVBQzFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQzdELENBQUM7SUFDSixDQUFDO0lBRU8sMkRBQThCLEdBQXRDO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLHFCQUE0QztZQUN4RyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDdEYsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNqRSxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sNENBQWUsR0FBdkI7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMxRSxDQUFDO0lBRU8sa0RBQXFCLEdBQTdCLFVBQThCLFVBQWdCO1FBQzVDLElBQUksY0FBYyxHQUFTO1lBQ3pCLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSTtZQUNyQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUk7WUFDckIsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRO1NBQzlCLENBQUM7UUFDRixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QixjQUFjLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBWSxJQUFLLE9BQUEsQ0FDOUQ7Z0JBQ0UsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ3RCLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUzthQUMzQixDQUNGLEVBTitELENBTS9ELENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxNQUFNLENBQUMsY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUF4SFUsa0JBQWtCO1FBRDlCLGlCQUFVLEVBQUU7eUNBS2lCLG9DQUFnQjtZQUM3Qix3QkFBVTtZQUNSLG9CQUFRO09BTmQsa0JBQWtCLENBeUg5QjtJQUFELHlCQUFDO0NBekhELEFBeUhDLElBQUE7QUF6SFksZ0RBQWtCIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvY29sbGVjdGlvbnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbGxlY3Rpb24sIENvbGxlY3Rpb25TdW1tYXJ5IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9qbywgQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbnNTdG9yZSB9IGZyb20gJy4uL3N0b3Jlcy9jb2xsZWN0aW9ucy5zdG9yZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSwgTG9hZGluZ0luZGljYXRvck9wdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUsIEFjdGl2ZUNvbGxlY3Rpb25TdGF0ZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uc1NlcnZpY2Uge1xuICBwcml2YXRlIHBhcmFtczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29sbGVjdGlvbnNTdG9yZTogQ29sbGVjdGlvbnNTdG9yZSxcbiAgICBwcml2YXRlIGFwaTogQXBpU2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZVxuICApIHtcbiAgICB0aGlzLnNldFNlYXJjaFBhcmFtcygpO1xuICAgIHRoaXMuc3RheVN5bmNlZFdpdGhBY3RpdmVDb2xsZWN0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGRhdGEoKTogT2JzZXJ2YWJsZTxDb2xsZWN0aW9uU3VtbWFyeT4ge1xuICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb25zU3RvcmUuZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uc1N0b3JlLnN0YXRlO1xuICB9XG5cbiAgcHVibGljIGxvYWQocGFyYW1zPzogYW55LCBsb2FkaW5nSW5kaWNhdG9yOiBMb2FkaW5nSW5kaWNhdG9yT3B0aW9uID0gZmFsc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmIChwYXJhbXMpIHRoaXMucGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbXMsIHBhcmFtcyk7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KEFwaS5Bc3NldHMsIGBjb2xsZWN0aW9uU3VtbWFyeS9zZWFyY2hgLCB7IHBhcmFtZXRlcnM6IHRoaXMucGFyYW1zLCBsb2FkaW5nSW5kaWNhdG9yOiBsb2FkaW5nSW5kaWNhdG9yIH0pXG4gICAgICAuZG8ocmVzcG9uc2UgPT4gdGhpcy5jb2xsZWN0aW9uc1N0b3JlLnJlcGxhY2VBbGxDb2xsZWN0aW9uc1dpdGgocmVzcG9uc2UpKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGUoY29sbGVjdGlvbjogQ29sbGVjdGlvbik6IE9ic2VydmFibGU8Q29sbGVjdGlvbj4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KEFwaS5Bc3NldHMsICdjb2xsZWN0aW9uU3VtbWFyeScsIHsgYm9keTogY29sbGVjdGlvbiwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KVxuICAgICAgLmRvKHJlc3BvbnNlID0+IHRoaXMuY29sbGVjdGlvbnNTdG9yZS5hZGQocmVzcG9uc2UgYXMgQ29sbGVjdGlvbikpO1xuICB9XG5cbiAgcHVibGljIGR1cGxpY2F0ZShjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKTogT2JzZXJ2YWJsZTxDb2xsZWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QoQXBpLklkZW50aXRpZXMsICdjb2xsZWN0aW9uJywgeyBib2R5OiBjb2xsZWN0aW9uLCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIGdldEJ5SWRBbmREdXBsaWNhdGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8UG9qbz4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLklkZW50aXRpZXMsIGBjb2xsZWN0aW9uLyR7aWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pXG4gICAgICAubWFwKHJlc3BvbnNlID0+IHRoaXMucHJlcGFyZUZvckR1cGxpY2F0aW9uKHJlc3BvbnNlKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGlkOiBudW1iZXIsIGNvbGxlY3Rpb25VcGRhdGVzOiBDb2xsZWN0aW9uKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAvLyBBTk5PWUFOQ0VTOlxuICAgIC8vIC0gSWYgdGhlIEFQSSBzdXBwb3J0ZWQgYSBQQVRDSCByZXF1ZXN0IGZvciB0aGlzIGVuZHBvaW50LCB3ZSBjb3VsZCBqdXN0IGNhbGwgaXQgd2l0aCB0aGUgaWQgYW5kIGNvbGxlY3Rpb25VcGRhdGVzLlxuICAgIC8vICAgQnV0IGl0IGRvZXNuJ3Qgc28gd2UgbXVzdCBHRVQsIG1vZGlmeSB0aGUgcmVzcG9uc2UsIGFuZCBQVVQgaXQgYmFjay5cbiAgICAvLyAtIFRoZSBHRVQgcmV0dXJucyBhbiBcImFzc2V0c1wiIHByb3BlcnR5LCB3aGljaCBpcyB1bmRvY3VtZW50ZWQgaW4gU3dhZ2dlci5cbiAgICAvLyAtIFRoZSBQVVQgYWNjZXB0cyB0aGUgXCJhc3NldHNcIiBwcm9wZXJ0eSwgYnV0IHNvbWVob3cgaWdub3JlcyBpdCAoYWxzbyB1bmRvY3VtZW50ZWQgaW4gU3dhZ2dlcikuICBUaGVyZWZvcmUsIHdlIGRvbid0XG4gICAgLy8gICBuZWVkIHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBib2R5IHNlbnQgd2l0aCB0aGUgUFVUIHJlcXVlc3QgaGVyZS5cblxuICAgIGNvbnN0IGVuZHBvaW50OiBzdHJpbmcgPSBgY29sbGVjdGlvbi8ke2lkfWA7XG5cbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KEFwaS5JZGVudGl0aWVzLCBlbmRwb2ludCwgeyBsb2FkaW5nSW5kaWNhdG9yOiAnb25CZWZvcmVSZXF1ZXN0JyB9KVxuICAgICAgLnN3aXRjaE1hcChyZXNwb25zZSA9PlxuICAgICAgICB0aGlzLmFwaS5wdXQoXG4gICAgICAgICAgQXBpLklkZW50aXRpZXMsXG4gICAgICAgICAgZW5kcG9pbnQsXG4gICAgICAgICAgeyBib2R5OiB7IC4uLnJlc3BvbnNlLCAuLi5jb2xsZWN0aW9uVXBkYXRlcyB9LCBsb2FkaW5nSW5kaWNhdG9yOiAnb2ZmQWZ0ZXJSZXNwb25zZScgfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIGRlbGV0ZShjb2xsZWN0aW9uSWQ6IG51bWJlciwgbG9hZGluZ0luZGljYXRvcjogTG9hZGluZ0luZGljYXRvck9wdGlvbiA9ICdvbkJlZm9yZVJlcXVlc3QnKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLmNvbGxlY3Rpb25zU3RvcmUuZGVsZXRlQ29sbGVjdGlvbldpdGgoY29sbGVjdGlvbklkKTtcbiAgICByZXR1cm4gdGhpcy5hcGkuZGVsZXRlKEFwaS5JZGVudGl0aWVzLCBgY29sbGVjdGlvbi8ke2NvbGxlY3Rpb25JZH1gLCB7IGxvYWRpbmdJbmRpY2F0b3I6IGxvYWRpbmdJbmRpY2F0b3IgfSlcbiAgICAgIC5zd2l0Y2hNYXAoXyA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0b3JlLm1hdGNoKGNvbGxlY3Rpb25JZCwgc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uLmlkKSkge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmFjdGl2ZUNvbGxlY3Rpb24ubG9hZCgpKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmJsb2NrVW50aWwoc3RhdGUgPT4gIXN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24ubG9hZGluZykuc3dpdGNoTWFwKCgpID0+IHRoaXMubG9hZCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGVjdGlvbnNTdG9yZS5kZWxldGVBbGxDb2xsZWN0aW9ucygpO1xuICB9XG5cbiAgcHVibGljIGRlc3Ryb3lBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsZWN0aW9uc1N0b3JlLmRlbGV0ZUFsbENvbGxlY3Rpb25zKCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5yZXNldCgpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVtcyhjb2xsZWN0aW9uSWQ6IG51bWJlcik6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcbiAgICAgIEFwaS5Bc3NldHMsXG4gICAgICBgY29sbGVjdGlvblN1bW1hcnkvYXNzZXRzLyR7Y29sbGVjdGlvbklkfWAsXG4gICAgICB7IHBhcmFtZXRlcnM6IHsgaTogJzAnLCBuOiAnMTAwJyB9LCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF5U3luY2VkV2l0aEFjdGl2ZUNvbGxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbikuc3Vic2NyaWJlKChhY3RpdmVDb2xsZWN0aW9uU3RhdGU6IEFjdGl2ZUNvbGxlY3Rpb25TdGF0ZSkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaXRlbXMgJiYgdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggPiAwICYmICFhY3RpdmVDb2xsZWN0aW9uU3RhdGUubG9hZGluZykge1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25zU3RvcmUudXBkYXRlKGFjdGl2ZUNvbGxlY3Rpb25TdGF0ZS5jb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0U2VhcmNoUGFyYW1zKCkge1xuICAgIHRoaXMucGFyYW1zID0geyBxOiAnJywgYWNjZXNzTGV2ZWw6ICdhbGwnLCBzOiAnJywgZDogJycsIGk6IDAsIG46IDIwMCB9O1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlRm9yRHVwbGljYXRpb24oY29sbGVjdGlvbjogUG9qbyk6IFBvam8ge1xuICAgIGxldCBjb2xsZWN0aW9uQ29weTogUG9qbyA9IHtcbiAgICAgIG5hbWU6IGNvbGxlY3Rpb24ubmFtZSxcbiAgICAgIHRhZ3M6IGNvbGxlY3Rpb24udGFncyxcbiAgICAgIHNpdGVOYW1lOiBjb2xsZWN0aW9uLnNpdGVOYW1lLFxuICAgIH07XG4gICAgaWYgKGNvbGxlY3Rpb24uYXNzZXRzKSB7XG4gICAgICBjb2xsZWN0aW9uQ29weS5hc3NldHMgPSBjb2xsZWN0aW9uLmFzc2V0cy5tYXAoKGFzc2V0OiBBc3NldCkgPT4gKFxuICAgICAgICB7XG4gICAgICAgICAgYXNzZXRJZDogYXNzZXQuYXNzZXRJZCxcbiAgICAgICAgICB0aW1lRW5kOiBhc3NldC50aW1lRW5kLFxuICAgICAgICAgIHRpbWVTdGFydDogYXNzZXQudGltZVN0YXJ0XG4gICAgICAgIH1cbiAgICAgICkpO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbkNvcHk7XG4gIH1cbn1cbiJdfQ==

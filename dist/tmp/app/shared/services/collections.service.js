"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
    CollectionsService.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionsService.ctorParameters = function () { return [
        { type: collections_store_1.CollectionsStore, },
        { type: api_service_1.ApiService, },
        { type: app_store_1.AppStore, },
    ]; };
    return CollectionsService;
}());
exports.CollectionsService = CollectionsService;
//# sourceMappingURL=collections.service.js.map
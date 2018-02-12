"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var feature_store_1 = require("../../shared/stores/feature.store");
var CollectionCapabilities = (function () {
    function CollectionCapabilities(currentUser, store, feature) {
        this.currentUser = currentUser;
        this.store = store;
        this.feature = feature;
    }
    CollectionCapabilities.prototype.haveCollections = function () {
        return this.feature.isAvailable('disableCollectionAccess');
    };
    CollectionCapabilities.prototype.viewCollections = function () {
        return this.haveCollections() && this.userHas('ViewCollections');
    };
    CollectionCapabilities.prototype.editCollections = function () {
        return this.haveCollections() && this.userHas('EditCollections');
    };
    CollectionCapabilities.prototype.viewCollectionTray = function () {
        return this.store.snapshot(function (state) { return state.headerDisplayOptions.canBeFixed; }) &&
            this.haveCollections() &&
            this.userHas('ViewCollections');
    };
    CollectionCapabilities.prototype.editCollection = function (collection) {
        return this.currentUser.data.map(function (user) {
            return (user.id === collection.owner) ||
                (user.editableCollections && user.editableCollections.includes(collection.id)) ||
                (collection.editors && collection.editors.map(function (editor) { return editor.id; }).includes(user.id)) ||
                (collection.userRole === 'editor' || collection.userRole === 'owner');
        });
    };
    CollectionCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    CollectionCapabilities.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionCapabilities.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: app_store_1.AppStore, },
        { type: feature_store_1.FeatureStore, },
    ]; };
    return CollectionCapabilities;
}());
exports.CollectionCapabilities = CollectionCapabilities;
//# sourceMappingURL=collection.capabilities.js.map
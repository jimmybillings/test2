"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var commerce_capabilities_1 = require("../../+commerce/services/commerce.capabilities");
var asset_capabilities_1 = require("../../+asset/services/asset.capabilities");
var collection_capabilities_1 = require("../../+collection/services/collection.capabilities");
var search_capabilities_1 = require("../../+search/services/search.capabilities");
var current_user_service_1 = require("./current-user.service");
var app_store_1 = require("../../app.store");
var feature_store_1 = require("../stores/feature.store");
var Capabilities = (function () {
    function Capabilities(currentUser, route, store, feature) {
        this.currentUser = currentUser;
        this.route = route;
        this.store = store;
        this.feature = feature;
        this.applyMixins(Capabilities, [
            commerce_capabilities_1.CommerceCapabilities,
            collection_capabilities_1.CollectionCapabilities,
            asset_capabilities_1.AssetCapabilities,
            search_capabilities_1.SearchCapabilities
        ]);
    }
    Capabilities.prototype.viewAll = function () {
        return this.userHas('Root');
    };
    Capabilities.prototype.default = function () {
        return this.currentUser.loggedIn();
    };
    Capabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    Capabilities.prototype.applyMixins = function (derivedCtor, baseCtors) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
    Capabilities.decorators = [
        { type: core_1.Injectable },
    ];
    Capabilities.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: router_1.Router, },
        { type: app_store_1.AppStore, },
        { type: feature_store_1.FeatureStore, },
    ]; };
    return Capabilities;
}());
exports.Capabilities = Capabilities;
//# sourceMappingURL=capabilities.service.js.map
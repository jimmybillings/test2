"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var feature_store_1 = require("../../shared/stores/feature.store");
var CommerceCapabilities = (function () {
    function CommerceCapabilities(currentUser, store, feature) {
        this.currentUser = currentUser;
        this.store = store;
        this.feature = feature;
    }
    CommerceCapabilities.prototype.haveCart = function () {
        return this.feature.isAvailable('disableCartAccess');
    };
    CommerceCapabilities.prototype.viewCartIcon = function () {
        return this.store.snapshot(function (state) { return state.headerDisplayOptions.canBeFixed; }) && this.haveCart() && this.addToCart();
    };
    CommerceCapabilities.prototype.addToCart = function () {
        return this.haveCart() && this.currentUser.loggedIn();
    };
    CommerceCapabilities.prototype.purchaseOnCredit = function () {
        return this.haveCart() && this.currentUser.hasPurchaseOnCredit();
    };
    CommerceCapabilities.prototype.editAddress = function (address) {
        return address.type === 'User' && !!address.address;
    };
    CommerceCapabilities.prototype.addAddress = function (address) {
        return address.type === 'User' && !address.address;
    };
    CommerceCapabilities.prototype.editAccountAddress = function (address) {
        return address.type === 'Account' && this.userHas('EditAccounts') && !!address.address;
    };
    CommerceCapabilities.prototype.addAccountAddress = function (address) {
        return address.type === 'Account' && this.userHas('EditAccounts') && !address.address;
    };
    CommerceCapabilities.prototype.administerQuotes = function () {
        return this.userHas('AdministerQuotes');
    };
    CommerceCapabilities.prototype.editClips = function () {
        return this.userHas('EditClips');
    };
    CommerceCapabilities.prototype.cloneQuote = function (quoteObservable) {
        var _this = this;
        return quoteObservable.map(function (quoteState) {
            var quote = quoteState.data;
            if (quote.projects) {
                return quote.projects
                    .filter(function (project) { return project.lineItems || project.feeLineItems; })
                    .length > 0 && _this.administerQuotes();
            }
            else {
                return false;
            }
        });
    };
    CommerceCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    CommerceCapabilities.prototype.createSubclips = function (asset) {
        return this.userHas('CreateSubclips') && typeof this.findMetadataValueFor('Format.FrameRate', asset) === 'string';
    };
    CommerceCapabilities.prototype.calculatePrice = function () {
        return this.userHas('ViewPriceAttributes');
    };
    CommerceCapabilities.prototype.findMetadataValueFor = function (metadataName, object) {
        if (object !== Object(object))
            return null;
        var keys = Object.keys(object);
        if (keys.length === 2 && keys.sort().join('|') === 'name|value' && object.name === metadataName) {
            return object.value;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var value = this.findMetadataValueFor(metadataName, object[key]);
            if (value)
                return value;
        }
        return null;
    };
    CommerceCapabilities.prototype.viewLicenseAgreementsButton = function (cartHasAssets) {
        var hasAssets;
        cartHasAssets.take(1).subscribe(function (has) { return hasAssets = has; });
        return this.feature.isAvailable('disableCommerceAgreements') && hasAssets;
    };
    CommerceCapabilities.decorators = [
        { type: core_1.Injectable },
    ];
    CommerceCapabilities.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: app_store_1.AppStore, },
        { type: feature_store_1.FeatureStore, },
    ]; };
    return CommerceCapabilities;
}());
exports.CommerceCapabilities = CommerceCapabilities;
//# sourceMappingURL=commerce.capabilities.js.map
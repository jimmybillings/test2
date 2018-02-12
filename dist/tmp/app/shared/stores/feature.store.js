"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var initState = {
    disableCartAccess: false,
    disableCollectionAccess: false,
    disableCommerceAgreements: false
};
function features(state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case 'FEATURE.SET_STATE':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.features = features;
;
var FeatureStore = (function () {
    function FeatureStore(store) {
        this.store = store;
        if (localStorage.getItem('siteFeatures')) {
            this.set(JSON.parse(localStorage.getItem('siteFeatures')));
        }
    }
    FeatureStore.prototype.isAvailable = function (feature) {
        return !this.state[feature];
    };
    FeatureStore.prototype.set = function (data) {
        this.setInLocalStorage(data);
        this.store.dispatch({ type: 'FEATURE.SET_STATE', payload: this.format(data) });
    };
    Object.defineProperty(FeatureStore.prototype, "data", {
        get: function () {
            return this.store.select('features');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureStore.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (state) { return s = state; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    FeatureStore.prototype.setInLocalStorage = function (data) {
        localStorage.setItem('siteFeatures', JSON.stringify(this.format(data)));
    };
    FeatureStore.prototype.format = function (data) {
        for (var key in data) {
            try {
                data[key] = JSON.parse(data[key]);
            }
            catch (error) {
                data[key] = data[key];
            }
        }
        return data;
    };
    FeatureStore.decorators = [
        { type: core_1.Injectable },
    ];
    FeatureStore.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return FeatureStore;
}());
exports.FeatureStore = FeatureStore;
//# sourceMappingURL=feature.store.js.map
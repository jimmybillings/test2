"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
function gallery(state, action) {
    if (state === void 0) { state = initialState(); }
    switch (action.type) {
        case 'REPLACE_GALLERY':
            return Object.assign({}, action.payload ? action.payload : initialState());
        default:
            return state;
    }
}
exports.gallery = gallery;
;
var GalleryViewStore = (function () {
    function GalleryViewStore(store) {
        this.store = store;
    }
    Object.defineProperty(GalleryViewStore.prototype, "data", {
        get: function () {
            return this.store.select('gallery');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GalleryViewStore.prototype, "state", {
        get: function () {
            var state;
            this.data.take(1).subscribe(function (galleryData) { return state = galleryData; });
            return state;
        },
        enumerable: true,
        configurable: true
    });
    GalleryViewStore.prototype.replaceWith = function (results, path) {
        this.store.dispatch({
            type: 'REPLACE_GALLERY',
            payload: { results: results, numberOfLevels: this.numberOfLevelsIn(results), path: path }
        });
    };
    GalleryViewStore.prototype.numberOfLevelsIn = function (results) {
        var _this = this;
        return results ? 1 + Math.max.apply(Math, results.map(function (result) { return _this.numberOfLevelsIn(result.children); })) : 0;
    };
    GalleryViewStore.decorators = [
        { type: core_1.Injectable },
    ];
    GalleryViewStore.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return GalleryViewStore;
}());
exports.GalleryViewStore = GalleryViewStore;
function initialState() {
    return {
        results: [],
        numberOfLevels: 0,
        path: []
    };
}
;
//# sourceMappingURL=gallery-view.store.js.map
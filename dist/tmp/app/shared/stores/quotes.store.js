"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var initState = {
    items: null,
    pagination: {
        totalCount: 0,
        currentPage: 1,
        pageSize: 20,
        hasNextPage: false,
        hasPreviousPage: false,
        numberOfPages: 0
    }
};
function quotes(state, action) {
    if (state === void 0) { state = initState; }
    switch (action.type) {
        case 'QUOTES.SET_QUOTES':
            return Object.assign({}, action.payload);
        case 'QUOTES.UPDATE_QUOTES':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.quotes = quotes;
;
var QuotesStore = (function () {
    function QuotesStore(store) {
        this.store = store;
    }
    Object.defineProperty(QuotesStore.prototype, "data", {
        get: function () {
            return this.store.select('quotes');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotesStore.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (quotes) { return s = quotes; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    QuotesStore.prototype.updateQuotes = function (payload) {
        this.store.dispatch({ type: 'QUOTES.UPDATE_QUOTES', payload: payload });
    };
    QuotesStore.prototype.setQuotes = function (payload) {
        this.store.dispatch({
            type: 'QUOTES.SET_QUOTES', payload: {
                'items': payload.items,
                'pagination': {
                    'totalCount': payload.totalCount,
                    'currentPage': payload.currentPage + 1,
                    'hasNextPage': payload.hasNextPage,
                    'hasPreviousPage': payload.hasPreviousPage,
                    'numberOfPages': payload.numberOfPages,
                    'pageSize': payload.pageSize
                }
            }
        });
    };
    QuotesStore.decorators = [
        { type: core_1.Injectable },
    ];
    QuotesStore.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return QuotesStore;
}());
exports.QuotesStore = QuotesStore;
//# sourceMappingURL=quotes.store.js.map
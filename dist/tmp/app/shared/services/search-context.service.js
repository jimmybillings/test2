"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var common_functions_1 = require("../utilities/common.functions");
var initSearchContext = {
    q: '',
    i: 1,
    n: 100,
    sortId: 0
};
function searchContext(state, action) {
    if (state === void 0) { state = initSearchContext; }
    switch (action.type) {
        case 'SEARCHCONTEXT.CREATE':
            return Object.assign({}, action.payload);
        case 'SEARCHCONTEXT.UPDATE':
            return Object.assign({}, state, action.payload);
        case 'SEARCHCONTEXT.RESET':
            return Object.assign({}, initSearchContext);
        case 'SEARCHCONTEXT.REMOVE':
            return Object.assign({}, Object.keys(state).reduce(function (result, key) {
                if (action.payload.indexOf(key) === -1)
                    result[key] = state[key];
                return result;
            }, {}));
        default:
            return state;
    }
}
exports.searchContext = searchContext;
;
var SearchContext = (function () {
    function SearchContext(router, store) {
        this.router = router;
        this.store = store;
        this.data = this.store.select('searchContext');
    }
    SearchContext.prototype.new = function (params) {
        this.create = params;
        this.go();
    };
    Object.defineProperty(SearchContext.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (state) { return s = state; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchContext.prototype, "remove", {
        set: function (param) {
            if (!Array.isArray(param))
                param = [param];
            this.store.dispatch({ type: 'SEARCHCONTEXT.REMOVE', payload: param });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchContext.prototype, "update", {
        set: function (params) {
            this.store.dispatch({ type: 'SEARCHCONTEXT.UPDATE', payload: this.decodeParams(params) });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchContext.prototype, "create", {
        set: function (params) {
            this.store.dispatch({ type: 'SEARCHCONTEXT.CREATE', payload: this.decodeParams(params) });
        },
        enumerable: true,
        configurable: true
    });
    SearchContext.prototype.go = function () {
        this.router.navigate(['/search', this.state]);
    };
    SearchContext.prototype.decodeParams = function (params) {
        var decodedParams = {};
        var d = common_functions_1.Common.clone(params);
        for (var param in d) {
            if (d[param] === '' || params[param] === 'true') {
                delete d[param];
                return d;
            }
            decodedParams[param] = decodeURIComponent(params[param]);
        }
        return decodedParams;
    };
    SearchContext.decorators = [
        { type: core_1.Injectable },
    ];
    SearchContext.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: store_1.Store, },
    ]; };
    return SearchContext;
}());
exports.SearchContext = SearchContext;
//# sourceMappingURL=search-context.service.js.map
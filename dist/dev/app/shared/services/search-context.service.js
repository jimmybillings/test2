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
    SearchContext = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.Router, store_1.Store])
    ], SearchContext);
    return SearchContext;
}());
exports.SearchContext = SearchContext;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvc2VhcmNoLWNvbnRleHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQywwQ0FBeUM7QUFDekMscUNBQW9DO0FBRXBDLGtFQUF1RDtBQUl2RCxJQUFNLGlCQUFpQixHQUFpQjtJQUN0QyxDQUFDLEVBQUUsRUFBRTtJQUNMLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLEdBQUc7SUFDTixNQUFNLEVBQUUsQ0FBQztDQUNWLENBQUM7QUFFRix1QkFBOEIsS0FBdUMsRUFBRSxNQUFvQjtJQUE3RCxzQkFBQSxFQUFBLHlCQUF1QztJQUNuRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLHNCQUFzQjtZQUN6QixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLEtBQUssc0JBQXNCO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xELEtBQUsscUJBQXFCO1lBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlDLEtBQUssc0JBQXNCO1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQVcsRUFBRSxHQUFRO2dCQUN2RSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdB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QUFFO3lDQUdnQixlQUFNLEVBQWdCLGFBQUs7T0FGM0MsYUFBYSxDQThDekI7SUFBRCxvQkFBQztDQTlDRCxBQThDQyxJQUFBO0FBOUNZLHNDQUFhIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvc2VhcmNoLWNvbnRleHQuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgTGVnYWN5QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaFBhcmFtcyB9IGZyb20gJy4uL2ludGVyZmFjZXMvc2VhcmNoLmludGVyZmFjZSc7XG5cbmNvbnN0IGluaXRTZWFyY2hDb250ZXh0OiBTZWFyY2hQYXJhbXMgPSB7XG4gIHE6ICcnLFxuICBpOiAxLFxuICBuOiAxMDAsXG4gIHNvcnRJZDogMFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlYXJjaENvbnRleHQoc3RhdGU6IFNlYXJjaFBhcmFtcyA9IGluaXRTZWFyY2hDb250ZXh0LCBhY3Rpb246IExlZ2FjeUFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnU0VBUkNIQ09OVEVYVC5DUkVBVEUnOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGFjdGlvbi5wYXlsb2FkKTtcbiAgICBjYXNlICdTRUFSQ0hDT05URVhULlVQREFURSc6XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGFjdGlvbi5wYXlsb2FkKTtcbiAgICBjYXNlICdTRUFSQ0hDT05URVhULlJFU0VUJzpcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBpbml0U2VhcmNoQ29udGV4dCk7XG4gICAgY2FzZSAnU0VBUkNIQ09OVEVYVC5SRU1PVkUnOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIE9iamVjdC5rZXlzKHN0YXRlKS5yZWR1Y2UoKHJlc3VsdDogYW55LCBrZXk6IGFueSkgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLnBheWxvYWQuaW5kZXhPZihrZXkpID09PSAtMSkgcmVzdWx0W2tleV0gPSBzdGF0ZVtrZXldO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSwge30pKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29udGV4dCB7XG4gIHB1YmxpYyBkYXRhOiBPYnNlcnZhYmxlPFNlYXJjaFBhcmFtcz47XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlciwgcHVibGljIHN0b3JlOiBTdG9yZTxhbnk+KSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5zdG9yZS5zZWxlY3QoJ3NlYXJjaENvbnRleHQnKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXcocGFyYW1zOiBPYmplY3QpOiB2b2lkIHtcbiAgICB0aGlzLmNyZWF0ZSA9IHBhcmFtcztcbiAgICB0aGlzLmdvKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFNlYXJjaFBhcmFtcyB7XG4gICAgbGV0IHM6IGFueTtcbiAgICB0aGlzLmRhdGEudGFrZSgxKS5zdWJzY3JpYmUoc3RhdGUgPT4gcyA9IHN0YXRlKTtcbiAgICByZXR1cm4gcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmVtb3ZlKHBhcmFtOiBzdHJpbmdbXSB8IHN0cmluZykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJhbSkpIHBhcmFtID0gW3BhcmFtXTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ1NFQVJDSENPTlRFWFQuUkVNT1ZFJywgcGF5bG9hZDogcGFyYW0gfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0IHVwZGF0ZShwYXJhbXM6IGFueSkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnU0VBUkNIQ09OVEVYVC5VUERBVEUnLCBwYXlsb2FkOiB0aGlzLmRlY29kZVBhcmFtcyhwYXJhbXMpIH0pO1xuICB9XG5cbiAgcHVibGljIHNldCBjcmVhdGUocGFyYW1zOiBhbnkpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHsgdHlwZTogJ1NFQVJDSENPTlRFWFQuQ1JFQVRFJywgcGF5bG9hZDogdGhpcy5kZWNvZGVQYXJhbXMocGFyYW1zKSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnbygpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy9zZWFyY2gnLCB0aGlzLnN0YXRlXSk7XG4gIH1cblxuICBwcml2YXRlIGRlY29kZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgIGxldCBkZWNvZGVkUGFyYW1zOiBhbnkgPSB7fTtcbiAgICBsZXQgZDogYW55ID0gQ29tbW9uLmNsb25lKHBhcmFtcyk7XG4gICAgZm9yIChsZXQgcGFyYW0gaW4gZCkge1xuICAgICAgaWYgKGRbcGFyYW1dID09PSAnJyB8fCBwYXJhbXNbcGFyYW1dID09PSAndHJ1ZScpIHtcbiAgICAgICAgZGVsZXRlIGRbcGFyYW1dO1xuICAgICAgICByZXR1cm4gZDtcbiAgICAgIH1cbiAgICAgIGRlY29kZWRQYXJhbXNbcGFyYW1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtc1twYXJhbV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZFBhcmFtcztcbiAgfVxufVxuIl19

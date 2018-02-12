"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var search_service_1 = require("./search.service");
var SearchActions = require("./search.actions");
var SearchEffects = (function () {
    function SearchEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.loadResults = this.actions.ofType(SearchActions.LoadResults.Type)
            .switchMap(function (action) {
            return _this.service.loadResults(action.params)
                .map(function (results) { return _this.store.create(function (factory) { return factory.search.loadResultsSuccess(results); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
    }
    SearchEffects.decorators = [
        { type: core_1.Injectable },
    ];
    SearchEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: search_service_1.SearchService, },
    ]; };
    SearchEffects.propDecorators = {
        'loadResults': [{ type: effects_1.Effect },],
    };
    return SearchEffects;
}());
exports.SearchEffects = SearchEffects;
//# sourceMappingURL=search.effects.js.map
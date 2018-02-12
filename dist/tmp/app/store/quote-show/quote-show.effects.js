"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var core_1 = require("@angular/core");
var QuoteShowActions = require("./quote-show.actions");
var quote_show_service_1 = require("./quote-show.service");
var app_store_1 = require("../../app.store");
var QuoteShowEffects = (function () {
    function QuoteShowEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(QuoteShowActions.Load.Type)
            .switchMap(function (action) {
            return _this.service.load(action.quoteId)
                .map(function (quote) { return _this.store.create(function (factory) { return factory.quoteShow.loadSuccess(quote); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.quoteShow.loadFailure(error); })); });
        });
    }
    QuoteShowEffects.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteShowEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: quote_show_service_1.FutureQuoteShowService, },
    ]; };
    QuoteShowEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
    };
    return QuoteShowEffects;
}());
exports.QuoteShowEffects = QuoteShowEffects;
//# sourceMappingURL=quote-show.effects.js.map
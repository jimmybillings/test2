"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var page_data_service_1 = require("./page-data.service");
var PageDataActions = require("./page-data.actions");
var PageDataEffects = (function () {
    function PageDataEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.updateTitle = this.actions.ofType(PageDataActions.UpdateTitle.Type)
            .do(function (action) { return _this.service.updateTitle(action.trKey, action.trParams); });
    }
    PageDataEffects.decorators = [
        { type: core_1.Injectable },
    ];
    PageDataEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: page_data_service_1.PageDataService, },
    ]; };
    PageDataEffects.propDecorators = {
        'updateTitle': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return PageDataEffects;
}());
exports.PageDataEffects = PageDataEffects;
//# sourceMappingURL=page-data.effects.js.map
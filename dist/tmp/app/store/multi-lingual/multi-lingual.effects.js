"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var MultiLingualActions = require("./multi-lingual.actions");
var app_store_1 = require("../../app.store");
var core_2 = require("@ngx-translate/core");
var api_config_1 = require("../../shared/services/api.config");
var MultiLingualEffects = (function () {
    function MultiLingualEffects(actions, store, translate, apiConfig) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.translate = translate;
        this.apiConfig = apiConfig;
        this.setLanguage = this.actions.ofType(MultiLingualActions.SetLanguage.Type)
            .do(function (action) {
            _this.translate.use(_this.apiConfig.baseUrl.split(':/')[1] + "identities-api/v1/translation/" + _this.apiConfig.portal + "/" + action.lang);
        });
    }
    MultiLingualEffects.decorators = [
        { type: core_1.Injectable },
    ];
    MultiLingualEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: core_2.TranslateService, },
        { type: api_config_1.ApiConfig, },
    ]; };
    MultiLingualEffects.propDecorators = {
        'setLanguage': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return MultiLingualEffects;
}());
exports.MultiLingualEffects = MultiLingualEffects;
//# sourceMappingURL=multi-lingual.effects.js.map
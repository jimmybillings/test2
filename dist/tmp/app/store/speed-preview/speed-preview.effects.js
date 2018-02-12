"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var SpeedPreviewActions = require("./speed-preview.actions");
var speed_preview_service_1 = require("./speed-preview.service");
var app_store_1 = require("../../app.store");
var SpeedPreviewEffects = (function () {
    function SpeedPreviewEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(SpeedPreviewActions.Load.Type)
            .filter(function (action) {
            return !_this.store.snapshot(function (state) { return state.speedPreview[action.asset.assetId]; });
        })
            .switchMap(function (action) {
            return _this.service.load(action.asset)
                .map(function (speedPreviewData) {
                return _this.store.create(function (factory) { return factory.speedPreview.loadSuccess(speedPreviewData, action.asset.assetId); });
            })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.speedPreview.loadFailure(action.asset.assetId); })); });
        });
    }
    SpeedPreviewEffects.decorators = [
        { type: core_1.Injectable },
    ];
    SpeedPreviewEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: speed_preview_service_1.SpeedPreviewService, },
    ]; };
    SpeedPreviewEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
    };
    return SpeedPreviewEffects;
}());
exports.SpeedPreviewEffects = SpeedPreviewEffects;
//# sourceMappingURL=speed-preview.effects.js.map
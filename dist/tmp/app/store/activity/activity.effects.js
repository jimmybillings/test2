"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var activity_service_1 = require("./activity.service");
var ActivityActions = require("./activity.actions");
var ActivityEffects = (function () {
    function ActivityEffects(actions, service) {
        var _this = this;
        this.actions = actions;
        this.service = service;
        this.record = this.actions.ofType(ActivityActions.Record.Type)
            .do(function (action) { return _this.service.record(action.options); });
    }
    ActivityEffects.decorators = [
        { type: core_1.Injectable },
    ];
    ActivityEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: activity_service_1.ActivityService, },
    ]; };
    ActivityEffects.propDecorators = {
        'record': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return ActivityEffects;
}());
exports.ActivityEffects = ActivityEffects;
//# sourceMappingURL=activity.effects.js.map
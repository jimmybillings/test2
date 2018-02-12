"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var ActivityService = (function () {
    function ActivityService(apiService, currentUserService) {
        this.apiService = apiService;
        this.currentUserService = currentUserService;
    }
    ActivityService.prototype.record = function (activityOptions) {
        var body = __assign({}, activityOptions, { userId: this.currentUserService.state.id });
        this.apiService.post(api_interface_1.Api.Identities, 'activityAudit', { body: body }).subscribe();
    };
    ActivityService.decorators = [
        { type: core_1.Injectable },
    ];
    ActivityService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return ActivityService;
}());
exports.ActivityService = ActivityService;
;
//# sourceMappingURL=activity.service.js.map
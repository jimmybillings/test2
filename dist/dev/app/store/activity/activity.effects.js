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
var Observable_1 = require("rxjs/Observable");
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
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], ActivityEffects.prototype, "record", void 0);
    ActivityEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, activity_service_1.ActivityService])
    ], ActivityEffects);
    return ActivityEffects;
}());
exports.ActivityEffects = ActivityEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3Rpdml0eS9hY3Rpdml0eS5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUE2QztBQUU3Qyx5Q0FBZ0Q7QUFFaEQsdURBQXFEO0FBQ3JELG9EQUFzRDtBQUd0RDtJQUtFLHlCQUFvQixPQUFnQixFQUFVLE9BQXdCO1FBQXRFLGlCQUEyRTtRQUF2RCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFIL0QsV0FBTSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNqRixFQUFFLENBQUMsVUFBQyxNQUE4QixJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFuQyxDQUFtQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBSDNFO1FBREMsZ0JBQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQztrQ0FDYix1QkFBVTttREFDc0Q7SUFIcEUsZUFBZTtRQUQzQixpQkFBVSxFQUFFO3lDQU1rQixpQkFBTyxFQUFtQixrQ0FBZTtPQUwzRCxlQUFlLENBTTNCO0lBQUQsc0JBQUM7Q0FORCxBQU1DLElBQUE7QUFOWSwwQ0FBZSIsImZpbGUiOiJhcHAvc3RvcmUvYWN0aXZpdHkvYWN0aXZpdHkuZWZmZWN0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5cbmltcG9ydCB7IEFjdGl2aXR5U2VydmljZSB9IGZyb20gJy4vYWN0aXZpdHkuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBBY3Rpdml0eUFjdGlvbnMgZnJvbSAnLi9hY3Rpdml0eS5hY3Rpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFjdGl2aXR5RWZmZWN0cyB7XG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIHJlY29yZDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShBY3Rpdml0eUFjdGlvbnMuUmVjb3JkLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IEFjdGl2aXR5QWN0aW9ucy5SZWNvcmQpID0+IHRoaXMuc2VydmljZS5yZWNvcmQoYWN0aW9uLm9wdGlvbnMpKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc2VydmljZTogQWN0aXZpdHlTZXJ2aWNlKSB7IH1cbn1cbiJdfQ==

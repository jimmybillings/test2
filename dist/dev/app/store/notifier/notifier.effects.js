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
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var NotifierActions = require("./notifier.actions");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var NotifierEffects = (function () {
    function NotifierEffects(actions, dialogService) {
        var _this = this;
        this.actions = actions;
        this.dialogService = dialogService;
        this.notify = this.actions.ofType(NotifierActions.Notify.Type)
            .do(function (action) {
            return _this.dialogService.openNotificationDialog(action.options).subscribe(function () { return action.onClose(); });
        });
    }
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], NotifierEffects.prototype, "notify", void 0);
    NotifierEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, wz_dialog_service_1.WzDialogService])
    ], NotifierEffects);
    return NotifierEffects;
}());
exports.NotifierEffects = NotifierEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9ub3RpZmllci9ub3RpZmllci5lZmZlY3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLHlDQUFnRDtBQUNoRCw4Q0FBNkM7QUFHN0Msb0RBQXNEO0FBQ3RELCtGQUE0RjtBQUk1RjtJQU9FLHlCQUFvQixPQUFnQixFQUFVLGFBQThCO1FBQTVFLGlCQUFpRjtRQUE3RCxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBTHJFLFdBQU0sR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDakYsRUFBRSxDQUFDLFVBQUMsTUFBOEI7WUFDakMsT0FBQSxLQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQztRQUEzRixDQUEyRixDQUM1RixDQUFDO0lBRTRFLENBQUM7SUFMakY7UUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2tDQUNiLHVCQUFVO21EQUdyQjtJQUxPLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FRa0IsaUJBQU8sRUFBeUIsbUNBQWU7T0FQakUsZUFBZSxDQVEzQjtJQUFELHNCQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksMENBQWUiLCJmaWxlIjoiYXBwL3N0b3JlL25vdGlmaWVyL25vdGlmaWVyLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgKiBhcyBOb3RpZmllckFjdGlvbnMgZnJvbSAnLi9ub3RpZmllci5hY3Rpb25zJztcbmltcG9ydCB7IFd6RGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9zZXJ2aWNlcy93ei5kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25EaWFsb2dPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL2ludGVyZmFjZXMvd3ouZGlhbG9nLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOb3RpZmllckVmZmVjdHMge1xuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIHB1YmxpYyBub3RpZnk6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoTm90aWZpZXJBY3Rpb25zLk5vdGlmeS5UeXBlKVxuICAgIC5kbygoYWN0aW9uOiBOb3RpZmllckFjdGlvbnMuTm90aWZ5KSA9PlxuICAgICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Ob3RpZmljYXRpb25EaWFsb2coYWN0aW9uLm9wdGlvbnMpLnN1YnNjcmliZSgoKSA9PiBhY3Rpb24ub25DbG9zZSgpKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLCBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSkgeyB9XG59XG4iXX0=

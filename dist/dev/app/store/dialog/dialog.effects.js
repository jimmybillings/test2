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
var DialogActions = require("./dialog.actions");
var app_store_1 = require("../../app.store");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var DialogEffects = (function () {
    function DialogEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.showConfirmation = this.actions.ofType(DialogActions.ShowConfirmation.Type)
            .switchMap(function (action) {
            return _this.service.openConfirmationDialog(action.confirmationDialogOptions, action.onAccept, action.onDecline)
                .map(function () { return _this.store.create(function (factory) { return factory.dialog.showConfirmationSuccess(); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
    }
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], DialogEffects.prototype, "showConfirmation", void 0);
    DialogEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, wz_dialog_service_1.WzDialogService])
    ], DialogEffects);
    return DialogEffects;
}());
exports.DialogEffects = DialogEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MseUNBQWdEO0FBQ2hELDhDQUE2QztBQUc3QyxnREFBa0Q7QUFDbEQsNkNBQTJDO0FBQzNDLCtGQUE0RjtBQUc1RjtJQVNFLHVCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUF3QjtRQUEvRixpQkFBb0c7UUFBaEYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQVB4RixxQkFBZ0IsR0FBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQzthQUNuRyxTQUFTLENBQUMsVUFBQyxNQUFzQztZQUNoRCxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDckcsR0FBRyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQXVCLEVBQUUsRUFBeEMsQ0FBd0MsQ0FBQyxFQUF0RSxDQUFzRSxDQUFDO2lCQUNqRixLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsRUFBeEUsQ0FBd0UsQ0FBQztRQUYzRixDQUUyRixDQUM1RixDQUFDO0lBRStGLENBQUM7SUFQcEc7UUFEQyxnQkFBTSxFQUFFO2tDQUNnQix1QkFBVTsyREFLL0I7SUFQTyxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBVWtCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLG1DQUFlO09BVHBGLGFBQWEsQ0FVekI7SUFBRCxvQkFBQztDQVZELEFBVUMsSUFBQTtBQVZZLHNDQUFhIiwiZmlsZSI6ImFwcC9zdG9yZS9kaWFsb2cvZGlhbG9nLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgKiBhcyBEaWFsb2dBY3Rpb25zIGZyb20gJy4vZGlhbG9nLmFjdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ0VmZmVjdHMge1xuICBARWZmZWN0KClcbiAgcHVibGljIHNob3dDb25maXJtYXRpb246IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoRGlhbG9nQWN0aW9ucy5TaG93Q29uZmlybWF0aW9uLlR5cGUpXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBEaWFsb2dBY3Rpb25zLlNob3dDb25maXJtYXRpb24pID0+XG4gICAgICB0aGlzLnNlcnZpY2Uub3BlbkNvbmZpcm1hdGlvbkRpYWxvZyhhY3Rpb24uY29uZmlybWF0aW9uRGlhbG9nT3B0aW9ucywgYWN0aW9uLm9uQWNjZXB0LCBhY3Rpb24ub25EZWNsaW5lKVxuICAgICAgICAubWFwKCgpID0+IHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5kaWFsb2cuc2hvd0NvbmZpcm1hdGlvblN1Y2Nlc3MoKSkpXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBPYnNlcnZhYmxlLm9mKHRoaXMuc3RvcmUuY3JlYXRlKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLCBwcml2YXRlIHNlcnZpY2U6IFd6RGlhbG9nU2VydmljZSkgeyB9XG59XG4iXX0=

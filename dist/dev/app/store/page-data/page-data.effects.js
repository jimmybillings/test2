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
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], PageDataEffects.prototype, "updateTitle", void 0);
    PageDataEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, app_store_1.AppStore, page_data_service_1.PageDataService])
    ], PageDataEffects);
    return PageDataEffects;
}());
exports.PageDataEffects = PageDataEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQTZDO0FBRTdDLHlDQUFnRDtBQUVoRCw2Q0FBMkM7QUFDM0MseURBQXNEO0FBQ3RELHFEQUF1RDtBQUd2RDtJQUtFLHlCQUFvQixPQUFnQixFQUFVLEtBQWUsRUFBVSxPQUF3QjtRQUEvRixpQkFBb0c7UUFBaEYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUgvRixnQkFBVyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQzthQUNwRixFQUFFLENBQUMsVUFBQyxNQUFtQyxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQXZELENBQXVELENBQUMsQ0FBQztJQUVMLENBQUM7SUFIcEc7UUFEQyxnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO2tDQUNmLHVCQUFVO3dEQUNpRjtJQUg3RixlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBTWtCLGlCQUFPLEVBQWlCLG9CQUFRLEVBQW1CLG1DQUFlO09BTHBGLGVBQWUsQ0FNM0I7SUFBRCxzQkFBQztDQU5ELEFBTUMsSUFBQTtBQU5ZLDBDQUFlIiwiZmlsZSI6ImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEVmZmVjdCwgQWN0aW9ucyB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBQYWdlRGF0YVNlcnZpY2UgfSBmcm9tICcuL3BhZ2UtZGF0YS5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIFBhZ2VEYXRhQWN0aW9ucyBmcm9tICcuL3BhZ2UtZGF0YS5hY3Rpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2VEYXRhRWZmZWN0cyB7XG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgdXBkYXRlVGl0bGU6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUGFnZURhdGFBY3Rpb25zLlVwZGF0ZVRpdGxlLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IFBhZ2VEYXRhQWN0aW9ucy5VcGRhdGVUaXRsZSkgPT4gdGhpcy5zZXJ2aWNlLnVwZGF0ZVRpdGxlKGFjdGlvbi50cktleSwgYWN0aW9uLnRyUGFyYW1zKSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLCBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBzZXJ2aWNlOiBQYWdlRGF0YVNlcnZpY2UpIHsgfVxufVxuIl19

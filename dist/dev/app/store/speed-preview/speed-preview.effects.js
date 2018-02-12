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
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], SpeedPreviewEffects.prototype, "load", void 0);
    SpeedPreviewEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            speed_preview_service_1.SpeedPreviewService])
    ], SpeedPreviewEffects);
    return SpeedPreviewEffects;
}());
exports.SpeedPreviewEffects = SpeedPreviewEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyx5Q0FBZ0Q7QUFDaEQsOENBQTZDO0FBRzdDLDZEQUErRDtBQUMvRCxpRUFBOEQ7QUFFOUQsNkNBQTJDO0FBSTNDO0lBZ0JFLDZCQUNVLE9BQWdCLEVBQ2hCLEtBQWUsRUFDZixPQUE0QjtRQUh0QyxpQkFJSztRQUhLLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQXFCO1FBaEIvQixTQUFJLEdBQXVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFFakYsTUFBTSxDQUFDLFVBQUMsTUFBZ0M7WUFDdkMsT0FBQSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO1FBQXZFLENBQXVFLENBQUM7YUFFekUsU0FBUyxDQUFDLFVBQUMsTUFBZ0M7WUFDMUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ25DLEdBQUcsQ0FBQyxVQUFDLGdCQUErQjtnQkFDbkMsT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQXhFLENBQXdFLENBQUM7WUFBdEcsQ0FBc0csQ0FBQztpQkFDeEcsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsdUJBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUF0RCxDQUFzRCxDQUNoSCxDQUFDLEVBRGMsQ0FDZCxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQU1ELENBQUM7SUFqQkw7UUFEQyxnQkFBTSxFQUFFO2tDQUNJLHVCQUFVO3FEQVdsQjtJQWRNLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQWtCUSxpQkFBTztZQUNULG9CQUFRO1lBQ04sMkNBQW1CO09BbkIzQixtQkFBbUIsQ0FxQi9CO0lBQUQsMEJBQUM7Q0FyQkQsQUFxQkMsSUFBQTtBQXJCWSxrREFBbUIiLCJmaWxlIjoiYXBwL3N0b3JlL3NwZWVkLXByZXZpZXcvc3BlZWQtcHJldmlldy5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0LCBBY3Rpb25zIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0ICogYXMgU3BlZWRQcmV2aWV3QWN0aW9ucyBmcm9tICcuL3NwZWVkLXByZXZpZXcuYWN0aW9ucyc7XG5pbXBvcnQgeyBTcGVlZFByZXZpZXdTZXJ2aWNlIH0gZnJvbSAnLi9zcGVlZC1wcmV2aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tICcuL3NwZWVkLXByZXZpZXcuc3RhdGUnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgU3BlZWR2aWV3RGF0YSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Fzc2V0LmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTcGVlZFByZXZpZXdFZmZlY3RzIHtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGxvYWQ6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoU3BlZWRQcmV2aWV3QWN0aW9ucy5Mb2FkLlR5cGUpXG5cbiAgICAuZmlsdGVyKChhY3Rpb246IFNwZWVkUHJldmlld0FjdGlvbnMuTG9hZCkgPT5cbiAgICAgICF0aGlzLnN0b3JlLnNuYXBzaG90KHN0YXRlID0+IHN0YXRlLnNwZWVkUHJldmlld1thY3Rpb24uYXNzZXQuYXNzZXRJZF0pKVxuXG4gICAgLnN3aXRjaE1hcCgoYWN0aW9uOiBTcGVlZFByZXZpZXdBY3Rpb25zLkxvYWQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UubG9hZChhY3Rpb24uYXNzZXQpXG4gICAgICAgIC5tYXAoKHNwZWVkUHJldmlld0RhdGE6IFNwZWVkdmlld0RhdGEpID0+XG4gICAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnNwZWVkUHJldmlldy5sb2FkU3VjY2VzcyhzcGVlZFByZXZpZXdEYXRhLCBhY3Rpb24uYXNzZXQuYXNzZXRJZCkpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gT2JzZXJ2YWJsZS5vZih0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3Rvcnkuc3BlZWRQcmV2aWV3LmxvYWRGYWlsdXJlKGFjdGlvbi5hc3NldC5hc3NldElkKVxuICAgICAgICApKSk7XG4gICAgfSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgc2VydmljZTogU3BlZWRQcmV2aWV3U2VydmljZVxuICApIHsgfVxufVxuIl19

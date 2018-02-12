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
var app_store_1 = require("../../app.store");
var AppLoadingIndicatorComponent = (function () {
    function AppLoadingIndicatorComponent(store) {
        this.store = store;
    }
    Object.defineProperty(AppLoadingIndicatorComponent.prototype, "showLoadingIndicator", {
        get: function () {
            return this.store.select(function (state) { return state.loadingIndicator.show; });
        },
        enumerable: true,
        configurable: true
    });
    AppLoadingIndicatorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-loading-indicator',
            template: "<mat-progress-bar mode=\"indeterminate\" color=\"accent\" *ngIf=\"showLoadingIndicator | async\"></mat-progress-bar>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], AppLoadingIndicatorComponent);
    return AppLoadingIndicatorComponent;
}());
exports.AppLoadingIndicatorComponent = AppLoadingIndicatorComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9hcHAtbG9hZGluZy1pbmRpY2F0b3IvYXBwLWxvYWRpbmctaW5kaWNhdG9yLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUFtRTtBQUNuRSw2Q0FBMkM7QUFRM0M7SUFDRSxzQ0FBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRXhDLHNCQUFXLDhEQUFvQjthQUEvQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQTNCLENBQTJCLENBQUMsQ0FBQztRQUNqRSxDQUFDOzs7T0FBQTtJQUxVLDRCQUE0QjtRQU54QyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSx1QkFBdUI7WUFDakMsUUFBUSxFQUFFLHNIQUFnSDtZQUMxSCxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUUyQixvQkFBUTtPQUR4Qiw0QkFBNEIsQ0FNeEM7SUFBRCxtQ0FBQztDQU5ELEFBTUMsSUFBQTtBQU5ZLG9FQUE0QiIsImZpbGUiOiJhcHAvYXBwbGljYXRpb24vYXBwLWxvYWRpbmctaW5kaWNhdG9yL2FwcC1sb2FkaW5nLWluZGljYXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnYXBwLWxvYWRpbmctaW5kaWNhdG9yJyxcbiAgdGVtcGxhdGU6IGA8bWF0LXByb2dyZXNzLWJhciBtb2RlPVwiaW5kZXRlcm1pbmF0ZVwiIGNvbG9yPVwiYWNjZW50XCIgKm5nSWY9XCJzaG93TG9hZGluZ0luZGljYXRvciB8IGFzeW5jXCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFwcExvYWRpbmdJbmRpY2F0b3JDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgcHVibGljIGdldCBzaG93TG9hZGluZ0luZGljYXRvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUubG9hZGluZ0luZGljYXRvci5zaG93KTtcbiAgfVxufVxuIl19

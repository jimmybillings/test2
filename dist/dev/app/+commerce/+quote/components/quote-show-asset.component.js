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
var app_store_1 = require("../../../app.store");
var QuoteShowAssetComponent = (function () {
    function QuoteShowAssetComponent(store) {
        this.store = store;
    }
    QuoteShowAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
    };
    QuoteShowAssetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-show-asset',
            template: "\n  <asset-component \n    [assetType]=\"'quoteShow'\"\n    [commentFormConfig]=\"commentFormConfig\">\n  </asset-component>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], QuoteShowAssetComponent);
    return QuoteShowAssetComponent;
}());
exports.QuoteShowAssetComponent = QuoteShowAssetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtc2hvdy1hc3NldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkU7QUFFM0UsZ0RBQTJEO0FBYzNEO0lBR0UsaUNBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUV4QywwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUF4RCxDQUF3RCxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQVBVLHVCQUF1QjtRQVhuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLGtJQUtUO1lBQ0QsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FJMkIsb0JBQVE7T0FIeEIsdUJBQXVCLENBUW5DO0lBQUQsOEJBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rcXVvdGUvY29tcG9uZW50cy9xdW90ZS1zaG93LWFzc2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdGF0ZU1hcHBlciwgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncXVvdGUtc2hvdy1hc3NldCcsXG4gIHRlbXBsYXRlOiBgXG4gIDxhc3NldC1jb21wb25lbnQgXG4gICAgW2Fzc2V0VHlwZV09XCIncXVvdGVTaG93J1wiXG4gICAgW2NvbW1lbnRGb3JtQ29uZmlnXT1cImNvbW1lbnRGb3JtQ29uZmlnXCI+XG4gIDwvYXNzZXQtY29tcG9uZW50PlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBRdW90ZVNob3dBc3NldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBjb21tZW50Rm9ybUNvbmZpZzogRm9ybUZpZWxkcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb21tZW50Rm9ybUNvbmZpZyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5xdW90ZUNvbW1lbnQuY29uZmlnLmZvcm0uaXRlbXMpO1xuICB9XG59XG4iXX0=

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
var QuoteEditAssetComponent = (function () {
    function QuoteEditAssetComponent(store) {
        this.store = store;
    }
    QuoteEditAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
    };
    QuoteEditAssetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-asset',
            template: "\n    <asset-component \n      [assetType]=\"'quoteEdit'\"\n      [commentFormConfig]=\"commentFormConfig\">\n    </asset-component>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], QuoteEditAssetComponent);
    return QuoteEditAssetComponent;
}());
exports.QuoteEditAssetComponent = QuoteEditAssetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL2NvbXBvbmVudHMvcXVvdGUtZWRpdC1hc3NldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkU7QUFFM0UsZ0RBQTJEO0FBYzNEO0lBR0UsaUNBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUV4QywwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUF4RCxDQUF3RCxDQUFDLENBQUM7SUFDeEgsQ0FBQztJQVBVLHVCQUF1QjtRQVhuQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxzSUFJVztZQUNyQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUsyQixvQkFBUTtPQUh4Qix1QkFBdUIsQ0FRbkM7SUFBRCw4QkFBQztDQVJELEFBUUMsSUFBQTtBQVJZLDBEQUF1QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9jb21wb25lbnRzL3F1b3RlLWVkaXQtYXNzZXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN0YXRlTWFwcGVyLCBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBBc3NldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1hc3NldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGFzc2V0LWNvbXBvbmVudCBcbiAgICAgIFthc3NldFR5cGVdPVwiJ3F1b3RlRWRpdCdcIlxuICAgICAgW2NvbW1lbnRGb3JtQ29uZmlnXT1cImNvbW1lbnRGb3JtQ29uZmlnXCI+XG4gICAgPC9hc3NldC1jb21wb25lbnQ+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBRdW90ZUVkaXRBc3NldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBjb21tZW50Rm9ybUNvbmZpZzogRm9ybUZpZWxkcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb21tZW50Rm9ybUNvbmZpZyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5xdW90ZUNvbW1lbnQuY29uZmlnLmZvcm0uaXRlbXMpO1xuICB9XG59XG4iXX0=

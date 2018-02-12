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
var CollectionShareMembersComponent = (function () {
    function CollectionShareMembersComponent() {
        this.close = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionShareMembersComponent.prototype, "collection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CollectionShareMembersComponent.prototype, "close", void 0);
    CollectionShareMembersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-share-members-component',
            templateUrl: 'collection-share-members.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CollectionShareMembersComponent);
    return CollectionShareMembersComponent;
}());
exports.CollectionShareMembersComponent = CollectionShareMembersComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tc2hhcmUtbWVtYmVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFVaEc7SUFQQTtRQVNZLFVBQUssR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUZVO1FBQVIsWUFBSyxFQUFFOzt1RUFBd0I7SUFDdEI7UUFBVCxhQUFNLEVBQUU7a0NBQVEsbUJBQVk7a0VBQTRCO0lBRjlDLCtCQUErQjtRQVAzQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxvQ0FBb0M7WUFDOUMsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO09BRVcsK0JBQStCLENBRzNDO0lBQUQsc0NBQUM7Q0FIRCxBQUdDLElBQUE7QUFIWSwwRUFBK0IiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1zaGFyZS1tZW1iZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY29sbGVjdGlvbi1zaGFyZS1tZW1iZXJzLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnY29sbGVjdGlvbi1zaGFyZS1tZW1iZXJzLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25TaGFyZU1lbWJlcnNDb21wb25lbnQge1xuICBASW5wdXQoKSBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICBAT3V0cHV0KCkgY2xvc2U6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==

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
var OneLevelViewComponent = (function () {
    function OneLevelViewComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    OneLevelViewComponent.prototype.onClick = function (result) {
        this.navigate.emit({
            pathSegment: { ids: [result.id], names: [result.name] },
            method: result.hasMore ? 'nextLevel' : 'search'
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], OneLevelViewComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], OneLevelViewComponent.prototype, "navigate", void 0);
    OneLevelViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'one-level-view',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'one-level-view.html'
        })
    ], OneLevelViewComponent);
    return OneLevelViewComponent;
}());
exports.OneLevelViewComponent = OneLevelViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L2NvbXBvbmVudHMvb25lLWxldmVsLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBVWhHO0lBTkE7UUFRbUIsYUFBUSxHQUF5QyxJQUFJLG1CQUFZLEVBQTBCLENBQUM7SUFRL0csQ0FBQztJQU5RLHVDQUFPLEdBQWQsVUFBZSxNQUFxQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNqQixXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZELE1BQU0sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVE7U0FDaEQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQVJRO1FBQVIsWUFBSyxFQUFFOzt1REFBc0I7SUFDcEI7UUFBVCxhQUFNLEVBQUU7a0NBQWtCLG1CQUFZOzJEQUFzRTtJQUZsRyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFdBQVcsRUFBRSxxQkFBcUI7U0FDbkMsQ0FBQztPQUNXLHFCQUFxQixDQVVqQztJQUFELDRCQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksc0RBQXFCIiwiZmlsZSI6ImFwcC8rZ2FsbGVyeS12aWV3L2NvbXBvbmVudHMvb25lLWxldmVsLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEdhbGxlcnksIEdhbGxlcnlSZXN1bHQsIEdhbGxlcnlOYXZpZ2F0aW9uRXZlbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9nYWxsZXJ5LXZpZXcuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnb25lLWxldmVsLXZpZXcnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICdvbmUtbGV2ZWwtdmlldy5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBPbmVMZXZlbFZpZXdDb21wb25lbnQge1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogR2FsbGVyeTtcbiAgQE91dHB1dCgpIHB1YmxpYyBuYXZpZ2F0ZTogRXZlbnRFbWl0dGVyPEdhbGxlcnlOYXZpZ2F0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5TmF2aWdhdGlvbkV2ZW50PigpO1xuXG4gIHB1YmxpYyBvbkNsaWNrKHJlc3VsdDogR2FsbGVyeVJlc3VsdCkge1xuICAgIHRoaXMubmF2aWdhdGUuZW1pdCh7XG4gICAgICBwYXRoU2VnbWVudDogeyBpZHM6IFtyZXN1bHQuaWRdLCBuYW1lczogW3Jlc3VsdC5uYW1lXSB9LFxuICAgICAgbWV0aG9kOiByZXN1bHQuaGFzTW9yZSA/ICduZXh0TGV2ZWwnIDogJ3NlYXJjaCdcbiAgICB9KTtcbiAgfVxufVxuIl19

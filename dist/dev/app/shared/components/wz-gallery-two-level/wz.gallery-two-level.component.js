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
var WzGalleryTwoLevelComponent = (function () {
    function WzGalleryTwoLevelComponent() {
        this.navigate = new core_1.EventEmitter();
        this.activeItemHovered = false;
    }
    WzGalleryTwoLevelComponent.prototype.onClick = function (result, child) {
        this.navigate.emit({
            pathSegment: { ids: [result.id, child.id], names: [result.name, child.name] },
            method: child.hasMore ? 'nextLevel' : 'search'
        });
    };
    WzGalleryTwoLevelComponent.prototype.onMouseOver = function (child, index) {
        this.activeItemHovered = child.resultCount > 0 ? true : false;
        this.activeRow = index;
    };
    WzGalleryTwoLevelComponent.prototype.onMouseOut = function (child) {
        this.activeItemHovered = false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzGalleryTwoLevelComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzGalleryTwoLevelComponent.prototype, "navigate", void 0);
    WzGalleryTwoLevelComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'two-level-view',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'wz.gallery-two-level.html'
        })
    ], WzGalleryTwoLevelComponent);
    return WzGalleryTwoLevelComponent;
}());
exports.WzGalleryTwoLevelComponent = WzGalleryTwoLevelComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1nYWxsZXJ5LXR3by1sZXZlbC93ei5nYWxsZXJ5LXR3by1sZXZlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFTaEc7SUFOQTtRQVFtQixhQUFRLEdBQXlDLElBQUksbUJBQVksRUFBMEIsQ0FBQztRQUN0RyxzQkFBaUIsR0FBWSxLQUFLLENBQUM7SUFnQjVDLENBQUM7SUFiUSw0Q0FBTyxHQUFkLFVBQWUsTUFBcUIsRUFBRSxLQUFvQjtRQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNqQixXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3RSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRO1NBQy9DLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDTSxnREFBVyxHQUFsQixVQUFtQixLQUFvQixFQUFFLEtBQWE7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUM5RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBQ00sK0NBQVUsR0FBakIsVUFBa0IsS0FBb0I7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO0lBakJRO1FBQVIsWUFBSyxFQUFFOzs0REFBc0I7SUFDcEI7UUFBVCxhQUFNLEVBQUU7a0NBQWtCLG1CQUFZO2dFQUFzRTtJQUZsRywwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFdBQVcsRUFBRSwyQkFBMkI7U0FDekMsQ0FBQztPQUNXLDBCQUEwQixDQW1CdEM7SUFBRCxpQ0FBQztDQW5CRCxBQW1CQyxJQUFBO0FBbkJZLGdFQUEwQiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otZ2FsbGVyeS10d28tbGV2ZWwvd3ouZ2FsbGVyeS10d28tbGV2ZWwuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHYWxsZXJ5LCBHYWxsZXJ5UmVzdWx0LCBHYWxsZXJ5TmF2aWdhdGlvbkV2ZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZ2FsbGVyeS12aWV3LmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3R3by1sZXZlbC12aWV3JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlVXJsOiAnd3ouZ2FsbGVyeS10d28tbGV2ZWwuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3pHYWxsZXJ5VHdvTGV2ZWxDb21wb25lbnQge1xuICBASW5wdXQoKSBwdWJsaWMgZGF0YTogR2FsbGVyeTtcbiAgQE91dHB1dCgpIHB1YmxpYyBuYXZpZ2F0ZTogRXZlbnRFbWl0dGVyPEdhbGxlcnlOYXZpZ2F0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5TmF2aWdhdGlvbkV2ZW50PigpO1xuICBwdWJsaWMgYWN0aXZlSXRlbUhvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGFjdGl2ZVJvdzogbnVtYmVyO1xuXG4gIHB1YmxpYyBvbkNsaWNrKHJlc3VsdDogR2FsbGVyeVJlc3VsdCwgY2hpbGQ6IEdhbGxlcnlSZXN1bHQpIHtcbiAgICB0aGlzLm5hdmlnYXRlLmVtaXQoe1xuICAgICAgcGF0aFNlZ21lbnQ6IHsgaWRzOiBbcmVzdWx0LmlkLCBjaGlsZC5pZF0sIG5hbWVzOiBbcmVzdWx0Lm5hbWUsIGNoaWxkLm5hbWVdIH0sXG4gICAgICBtZXRob2Q6IGNoaWxkLmhhc01vcmUgPyAnbmV4dExldmVsJyA6ICdzZWFyY2gnXG4gICAgfSk7XG4gIH1cbiAgcHVibGljIG9uTW91c2VPdmVyKGNoaWxkOiBHYWxsZXJ5UmVzdWx0LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVJdGVtSG92ZXJlZCA9IGNoaWxkLnJlc3VsdENvdW50ID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLmFjdGl2ZVJvdyA9IGluZGV4O1xuICB9XG4gIHB1YmxpYyBvbk1vdXNlT3V0KGNoaWxkOiBHYWxsZXJ5UmVzdWx0KTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVJdGVtSG92ZXJlZCA9IGZhbHNlO1xuICB9XG59XG4iXX0=

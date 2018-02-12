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
var CommerceHeaderComponent = (function () {
    function CommerceHeaderComponent() {
        this.search = new core_1.EventEmitter();
        this.onSortResults = new core_1.EventEmitter();
        this.onFilterResults = new core_1.EventEmitter();
        this.itemSearchIsShowing = false;
    }
    CommerceHeaderComponent.prototype.toggleSearch = function () {
        this.itemSearchIsShowing = !this.itemSearchIsShowing;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CommerceHeaderComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommerceHeaderComponent.prototype, "sortOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CommerceHeaderComponent.prototype, "filterOptions", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommerceHeaderComponent.prototype, "currentSort", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CommerceHeaderComponent.prototype, "currentFilter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceHeaderComponent.prototype, "search", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceHeaderComponent.prototype, "onSortResults", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceHeaderComponent.prototype, "onFilterResults", void 0);
    CommerceHeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'commerce-header',
            templateUrl: 'commerce-header.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], CommerceHeaderComponent);
    return CommerceHeaderComponent;
}());
exports.CommerceHeaderComponent = CommerceHeaderComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1oZWFkZXIvY29tbWVyY2UtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQVFoRztJQU5BO1FBWVksV0FBTSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMvQyxrQkFBYSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN0RCxvQkFBZSxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUMzRCx3QkFBbUIsR0FBWSxLQUFLLENBQUM7SUFLOUMsQ0FBQztJQUhRLDhDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3ZELENBQUM7SUFaUTtRQUFSLFlBQUssRUFBRTs7eURBQXlCO0lBQ3hCO1FBQVIsWUFBSyxFQUFFOztnRUFBb0I7SUFDbkI7UUFBUixZQUFLLEVBQUU7O2tFQUFzQjtJQUNyQjtRQUFSLFlBQUssRUFBRTs7Z0VBQWtCO0lBQ2pCO1FBQVIsWUFBSyxFQUFFOztrRUFBb0I7SUFDbEI7UUFBVCxhQUFNLEVBQUU7a0NBQVMsbUJBQVk7MkRBQTJCO0lBQy9DO1FBQVQsYUFBTSxFQUFFO2tDQUFnQixtQkFBWTtrRUFBMkI7SUFDdEQ7UUFBVCxhQUFNLEVBQUU7a0NBQWtCLG1CQUFZO29FQUEyQjtJQVJ2RCx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLHVCQUF1QixDQWNuQztJQUFELDhCQUFDO0NBZEQsQUFjQyxJQUFBO0FBZFksMERBQXVCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9jb21tZXJjZS1oZWFkZXIvY29tbWVyY2UtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjb21tZXJjZS1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJ2NvbW1lcmNlLWhlYWRlci5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQ29tbWVyY2VIZWFkZXJDb21wb25lbnQge1xuICBASW5wdXQoKSB0eXBlOiAnUVVPVEUnIHwgJ09SREVSJztcbiAgQElucHV0KCkgc29ydE9wdGlvbnM6IGFueVtdO1xuICBASW5wdXQoKSBmaWx0ZXJPcHRpb25zOiBhbnlbXTtcbiAgQElucHV0KCkgY3VycmVudFNvcnQ6IGFueTtcbiAgQElucHV0KCkgY3VycmVudEZpbHRlcjogYW55O1xuICBAT3V0cHV0KCkgc2VhcmNoOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU29ydFJlc3VsdHM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25GaWx0ZXJSZXN1bHRzOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIGl0ZW1TZWFyY2hJc1Nob3dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgdG9nZ2xlU2VhcmNoKCkge1xuICAgIHRoaXMuaXRlbVNlYXJjaElzU2hvd2luZyA9ICF0aGlzLml0ZW1TZWFyY2hJc1Nob3dpbmc7XG4gIH1cbn1cbiJdfQ==

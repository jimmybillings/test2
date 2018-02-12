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
var SubclipControlbarComponent = (function () {
    function SubclipControlbarComponent() {
        this.displayAllControls = true;
        this.request = new core_1.EventEmitter();
    }
    SubclipControlbarComponent.prototype.forward = function (request) {
        this.request.emit(request);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SubclipControlbarComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], SubclipControlbarComponent.prototype, "displayAllControls", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], SubclipControlbarComponent.prototype, "request", void 0);
    SubclipControlbarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-subclip-controlbar',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: './subclip-controlbar.html'
        })
    ], SubclipControlbarComponent);
    return SubclipControlbarComponent;
}());
exports.SubclipControlbarComponent = SubclipControlbarComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbGJhcnMvc3ViY2xpcC1jb250cm9sYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQVdoRztJQVBBO1FBU1csdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLFlBQU8sR0FBZ0MsSUFBSSxtQkFBWSxFQUFpQixDQUFDO0lBVXJGLENBQUM7SUFSUSw0Q0FBTyxHQUFkLFVBQWUsT0FBc0I7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQU5RO1FBQVIsWUFBSyxFQUFFOzttRUFBMEI7SUFDekI7UUFBUixZQUFLLEVBQUU7OzBFQUFvQztJQUNsQztRQUFULGFBQU0sRUFBRTtrQ0FBVSxtQkFBWTsrREFBb0Q7SUFIeEUsMEJBQTBCO1FBUHRDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxXQUFXLEVBQUUsMkJBQTJCO1NBQ3pDLENBQUM7T0FFVywwQkFBMEIsQ0FhdEM7SUFBRCxpQ0FBQztDQWJELEFBYUMsSUFBQTtBQWJZLGdFQUEwQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xiYXJzL3N1YmNsaXAtY29udHJvbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGxheWVyU3RhdGUsIFBsYXllclJlcXVlc3QgfSBmcm9tICcuLi8uLi8uLi9pbnRlcmZhY2VzL3BsYXllci5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1zdWJjbGlwLWNvbnRyb2xiYXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICcuL3N1YmNsaXAtY29udHJvbGJhci5odG1sJ1xufSlcblxuZXhwb3J0IGNsYXNzIFN1YmNsaXBDb250cm9sYmFyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcGxheWVyU3RhdGU6IFBsYXllclN0YXRlO1xuICBASW5wdXQoKSBkaXNwbGF5QWxsQ29udHJvbHM6IGJvb2xlYW4gPSB0cnVlO1xuICBAT3V0cHV0KCkgcmVxdWVzdDogRXZlbnRFbWl0dGVyPFBsYXllclJlcXVlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxQbGF5ZXJSZXF1ZXN0PigpO1xuXG4gIHB1YmxpYyBmb3J3YXJkKHJlcXVlc3Q6IFBsYXllclJlcXVlc3QpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3QuZW1pdChyZXF1ZXN0KTtcbiAgfVxuXG4gIC8vIFRPRE86IE1vdmUgdGhpcyBpbnRvIHN0YXRlIGNsYXNzLlxuICAvLyBwcml2YXRlIGdldCBjb25zdHJhaW5lZEN1cnJlbnRUaW1lKCkge1xuICAvLyAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCgwLCB0aGlzLnBsYXllclN0YXRlLmN1cnJlbnRGcmFtZSksIHRoaXMucGxheWVyU3RhdGUuZHVyYXRpb24pO1xuICAvLyB9XG59XG4iXX0=

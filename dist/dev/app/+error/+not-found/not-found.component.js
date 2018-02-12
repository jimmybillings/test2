"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var core_1 = require("@angular/core");
var error_base_1 = require("../error.base");
var NotFoundComponent = (function (_super) {
    __extends(NotFoundComponent, _super);
    function NotFoundComponent(userCan) {
        var _this = _super.call(this, userCan) || this;
        _this.userCan = userCan;
        return _this;
    }
    NotFoundComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'not-found-component',
            templateUrl: "./not-found.html",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities])
    ], NotFoundComponent);
    return NotFoundComponent;
}(error_base_1.ErrorBase));
exports.NotFoundComponent = NotFoundComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZXJyb3IvK25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1GQUEwRTtBQUMxRSxzQ0FBbUU7QUFDbkUsNENBQTBDO0FBUTFDO0lBQXVDLHFDQUFTO0lBQzlDLDJCQUFzQixPQUFxQjtRQUEzQyxZQUNFLGtCQUFNLE9BQU8sQ0FBQyxTQUNmO1FBRnFCLGFBQU8sR0FBUCxPQUFPLENBQWM7O0lBRTNDLENBQUM7SUFIVSxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FFK0IsbUNBQVk7T0FEaEMsaUJBQWlCLENBSTdCO0lBQUQsd0JBQUM7Q0FKRCxBQUlDLENBSnNDLHNCQUFTLEdBSS9DO0FBSlksOENBQWlCIiwiZmlsZSI6ImFwcC8rZXJyb3IvK25vdC1mb3VuZC9ub3QtZm91bmQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVycm9yQmFzZSB9IGZyb20gJy4uL2Vycm9yLmJhc2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdub3QtZm91bmQtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6IGAuL25vdC1mb3VuZC5odG1sYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTm90Rm91bmRDb21wb25lbnQgZXh0ZW5kcyBFcnJvckJhc2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgdXNlckNhbjogQ2FwYWJpbGl0aWVzKSB7XG4gICAgc3VwZXIodXNlckNhbik7XG4gIH1cbn1cbiJdfQ==

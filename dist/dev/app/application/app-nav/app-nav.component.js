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
var material_1 = require("@angular/material");
var router_1 = require("@angular/router");
var app_store_1 = require("../../app.store");
var AppNavComponent = (function () {
    function AppNavComponent(store, router) {
        this.store = store;
        this.router = router;
        this.onLogOut = new core_1.EventEmitter();
        this.onChangeLang = new core_1.EventEmitter();
        this.onOpenSidenav = new core_1.EventEmitter();
        this.headerCanBeFixed = this._headerCanBeFixed();
        this.headerIsFixed = this._headerIsFixed();
    }
    AppNavComponent.prototype.logOut = function (event) {
        this.onLogOut.emit(event);
        this.trigger.closeMenu();
        this.router.navigate(['/']);
    };
    AppNavComponent.prototype.toggleSearch = function () {
        this.userPreference.toggleSearch();
    };
    AppNavComponent.prototype.toggleCollectionTray = function () {
        this.userPreference.toggleCollectionTray();
    };
    AppNavComponent.prototype.formatBadgeNumber = function (size) {
        return (size > 99) ? '99+' : size.toString();
    };
    AppNavComponent.prototype.navigateTo = function (path) {
        this.router.navigate([path]);
    };
    AppNavComponent.prototype._headerIsFixed = function () {
        return this.store.select(function (state) { return state.headerDisplayOptions.isFixed; });
    };
    AppNavComponent.prototype._headerCanBeFixed = function () {
        return this.store.select(function (state) { return state.headerDisplayOptions.canBeFixed; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "currentUser", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "supportedLanguages", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "userPreference", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "cartSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "userCan", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "onLogOut", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "onChangeLang", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AppNavComponent.prototype, "onOpenSidenav", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatMenuTrigger),
        __metadata("design:type", material_1.MatMenuTrigger)
    ], AppNavComponent.prototype, "trigger", void 0);
    AppNavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-nav',
            templateUrl: 'app-nav.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore, router_1.Router])
    ], AppNavComponent);
    return AppNavComponent;
}());
exports.AppNavComponent = AppNavComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9hcHAtbmF2L2FwcC1uYXYuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQTJHO0FBQzNHLDhDQUFtRDtBQUNuRCwwQ0FBeUM7QUFDekMsNkNBQTJDO0FBUzNDO0lBY0UseUJBQW9CLEtBQWUsRUFBVSxNQUFjO1FBQXZDLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBUGpELGFBQVEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM5QixpQkFBWSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFNM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFTSxnQ0FBTSxHQUFiLFVBQWMsS0FBWTtRQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sc0NBQVksR0FBbkI7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSw4Q0FBb0IsR0FBM0I7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVNLDJDQUFpQixHQUF4QixVQUF5QixJQUFTO1FBQ2hDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVNLG9DQUFVLEdBQWpCLFVBQWtCLElBQVk7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyx3Q0FBYyxHQUF0QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQWxDLENBQWtDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU8sMkNBQWlCLEdBQXpCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLG9CQUFvQixDQUFDLFVBQVUsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUE5Q1E7UUFBUixZQUFLLEVBQUU7O3dEQUFrQjtJQUNqQjtRQUFSLFlBQUssRUFBRTs7bURBQWE7SUFDWjtRQUFSLFlBQUssRUFBRTs7K0RBQXlCO0lBQ3hCO1FBQVIsWUFBSyxFQUFFOzsyREFBcUI7SUFDcEI7UUFBUixZQUFLLEVBQUU7O3FEQUFlO0lBQ2Q7UUFBUixZQUFLLEVBQUU7O29EQUFjO0lBQ1o7UUFBVCxhQUFNLEVBQUU7O3FEQUErQjtJQUM5QjtRQUFULGFBQU0sRUFBRTs7eURBQW1DO0lBQ2xDO1FBQVQsYUFBTSxFQUFFOzswREFBb0M7SUFDbEI7UUFBMUIsZ0JBQVMsQ0FBQyx5QkFBYyxDQUFDO2tDQUFVLHlCQUFjO29EQUFDO0lBVnhDLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsY0FBYztZQUMzQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQWdCMkIsb0JBQVEsRUFBa0IsZUFBTTtPQWRoRCxlQUFlLENBZ0QzQjtJQUFELHNCQUFDO0NBaERELEFBZ0RDLElBQUE7QUFoRFksMENBQWUiLCJmaWxlIjoiYXBwL2FwcGxpY2F0aW9uL2FwcC1uYXYvYXBwLW5hdi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1uYXYnLFxuICB0ZW1wbGF0ZVVybDogJ2FwcC1uYXYuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwTmF2Q29tcG9uZW50IHtcbiAgQElucHV0KCkgY3VycmVudFVzZXI6IGFueTtcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBJbnB1dCgpIHN1cHBvcnRlZExhbmd1YWdlczogYW55O1xuICBASW5wdXQoKSB1c2VyUHJlZmVyZW5jZTogYW55O1xuICBASW5wdXQoKSBjYXJ0U2l6ZTogYW55O1xuICBASW5wdXQoKSB1c2VyQ2FuOiBhbnk7XG4gIEBPdXRwdXQoKSBvbkxvZ091dCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQ2hhbmdlTGFuZyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uT3BlblNpZGVuYXYgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBWaWV3Q2hpbGQoTWF0TWVudVRyaWdnZXIpIHRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBwdWJsaWMgaGVhZGVyQ2FuQmVGaXhlZDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHVibGljIGhlYWRlcklzRml4ZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcbiAgICB0aGlzLmhlYWRlckNhbkJlRml4ZWQgPSB0aGlzLl9oZWFkZXJDYW5CZUZpeGVkKCk7XG4gICAgdGhpcy5oZWFkZXJJc0ZpeGVkID0gdGhpcy5faGVhZGVySXNGaXhlZCgpO1xuICB9XG5cbiAgcHVibGljIGxvZ091dChldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLm9uTG9nT3V0LmVtaXQoZXZlbnQpO1xuICAgIHRoaXMudHJpZ2dlci5jbG9zZU1lbnUoKTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlU2VhcmNoKCkge1xuICAgIHRoaXMudXNlclByZWZlcmVuY2UudG9nZ2xlU2VhcmNoKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ29sbGVjdGlvblRyYXkoKSB7XG4gICAgdGhpcy51c2VyUHJlZmVyZW5jZS50b2dnbGVDb2xsZWN0aW9uVHJheSgpO1xuICB9XG5cbiAgcHVibGljIGZvcm1hdEJhZGdlTnVtYmVyKHNpemU6IGFueSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChzaXplID4gOTkpID8gJzk5KycgOiBzaXplLnRvU3RyaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgbmF2aWdhdGVUbyhwYXRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbcGF0aF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGVhZGVySXNGaXhlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaGVhZGVyRGlzcGxheU9wdGlvbnMuaXNGaXhlZCk7XG4gIH1cblxuICBwcml2YXRlIF9oZWFkZXJDYW5CZUZpeGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5oZWFkZXJEaXNwbGF5T3B0aW9ucy5jYW5CZUZpeGVkKTtcbiAgfVxufVxuIl19

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
var PrivacyPolicyGuard = (function () {
    function PrivacyPolicyGuard(store) {
        this.store = store;
    }
    PrivacyPolicyGuard.prototype.canActivate = function () {
        if (this.store.snapshot(function (state) { return !state.uiConfig.components.footer.config.privacyPolicyId; })) {
            this.store.dispatch(function (factory) { return factory.router.goToPageNotFound(); });
            return false;
        }
        return true;
    };
    PrivacyPolicyGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], PrivacyPolicyGuard);
    return PrivacyPolicyGuard;
}());
exports.PrivacyPolicyGuard = PrivacyPolicyGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvc2VydmljZXMvcHJpdmFjeS1wb2xpY3kuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFHM0MsNkNBQTJDO0FBRzNDO0lBQ0UsNEJBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUVqQyx3Q0FBVyxHQUFsQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFUVSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTt5Q0FFZ0Isb0JBQVE7T0FEeEIsa0JBQWtCLENBVTlCO0lBQUQseUJBQUM7Q0FWRCxBQVVDLElBQUE7QUFWWSxnREFBa0IiLCJmaWxlIjoiYXBwLytwcml2YWN5LXBvbGljeS9zZXJ2aWNlcy9wcml2YWN5LXBvbGljeS5ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUHJpdmFjeVBvbGljeUd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgcHVibGljIGNhbkFjdGl2YXRlKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnN0b3JlLnNuYXBzaG90KHN0YXRlID0+ICFzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmZvb3Rlci5jb25maWcucHJpdmFjeVBvbGljeUlkKSkge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkucm91dGVyLmdvVG9QYWdlTm90Rm91bmQoKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iXX0=

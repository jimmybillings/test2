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
var InvoiceResolver = (function () {
    function InvoiceResolver(store) {
        this.store = store;
    }
    InvoiceResolver.prototype.resolve = function (route) {
        var orderId = Number(route.params['id']);
        var shareKey = route.params['share_key'];
        var actionMapper = shareKey ?
            function (factory) { return factory.invoice.load(orderId, shareKey); } :
            function (factory) { return factory.invoice.load(orderId); };
        this.store.dispatch(actionMapper);
        return this.store.blockUntil(function (state) { return !state.invoice.loading; });
    };
    InvoiceResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], InvoiceResolver);
    return InvoiceResolver;
}());
exports.InvoiceResolver = InvoiceResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL2ludm9pY2UucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFJM0MsZ0RBQW1FO0FBR25FO0lBQ0UseUJBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUVqQyxpQ0FBTyxHQUFkLFVBQWUsS0FBNkI7UUFDMUMsSUFBTSxPQUFPLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFNLFFBQVEsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRW5ELElBQU0sWUFBWSxHQUF3QixRQUFRLENBQUMsQ0FBQztZQUNsRCxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFBdkMsQ0FBdUMsQ0FBQyxDQUFDO1lBQ3BELFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQTdCLENBQTZCLENBQUM7UUFFM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFkVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBRWdCLG9CQUFRO09BRHhCLGVBQWUsQ0FlM0I7SUFBRCxzQkFBQztDQWZELEFBZUMsSUFBQTtBQWZZLDBDQUFlIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL2ludm9pY2UucmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvbHZlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBBY3Rpb25GYWN0b3J5TWFwcGVyLCBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJbnZvaWNlUmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPGJvb2xlYW4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgY29uc3Qgb3JkZXJJZDogbnVtYmVyID0gTnVtYmVyKHJvdXRlLnBhcmFtc1snaWQnXSk7XG4gICAgY29uc3Qgc2hhcmVLZXk6IHN0cmluZyA9IHJvdXRlLnBhcmFtc1snc2hhcmVfa2V5J107XG5cbiAgICBjb25zdCBhY3Rpb25NYXBwZXI6IEFjdGlvbkZhY3RvcnlNYXBwZXIgPSBzaGFyZUtleSA/XG4gICAgICBmYWN0b3J5ID0+IGZhY3RvcnkuaW52b2ljZS5sb2FkKG9yZGVySWQsIHNoYXJlS2V5KSA6XG4gICAgICBmYWN0b3J5ID0+IGZhY3RvcnkuaW52b2ljZS5sb2FkKG9yZGVySWQpO1xuXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChhY3Rpb25NYXBwZXIpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYmxvY2tVbnRpbChzdGF0ZSA9PiAhc3RhdGUuaW52b2ljZS5sb2FkaW5nKTtcbiAgfVxufVxuIl19

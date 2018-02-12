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
var PrivacyPolicyResolver = (function () {
    function PrivacyPolicyResolver(store) {
        this.store = store;
    }
    PrivacyPolicyResolver.prototype.resolve = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.privacyPolicy.load(_this.store.snapshot(function (state) { return state.uiConfig.components.footer.config.privacyPolicyId.value; })); });
        return this.store.blockUntil(function (state) { return state.privacyPolicy.document !== null; });
    };
    PrivacyPolicyResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], PrivacyPolicyResolver);
    return PrivacyPolicyResolver;
}());
exports.PrivacyPolicyResolver = PrivacyPolicyResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvc2VydmljZXMvcHJpdmFjeS1wb2xpY3kucmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBMkM7QUFFM0MsNkNBQTJDO0FBRzNDO0lBQ0UsK0JBQW9CLEtBQWU7UUFBZixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUVqQyx1Q0FBTyxHQUFkO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUN2RCxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBN0QsQ0FBNkQsQ0FBQyxDQUM1RixFQUY4QixDQUU5QixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBVFUscUJBQXFCO1FBRGpDLGlCQUFVLEVBQUU7eUNBRWdCLG9CQUFRO09BRHhCLHFCQUFxQixDQVVqQztJQUFELDRCQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksc0RBQXFCIiwiZmlsZSI6ImFwcC8rcHJpdmFjeS1wb2xpY3kvc2VydmljZXMvcHJpdmFjeS1wb2xpY3kucmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFJlc29sdmUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcml2YWN5UG9saWN5UmVzb2x2ZXIgaW1wbGVtZW50cyBSZXNvbHZlPGJvb2xlYW4+IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyByZXNvbHZlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnByaXZhY3lQb2xpY3kubG9hZChcbiAgICAgIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5mb290ZXIuY29uZmlnLnByaXZhY3lQb2xpY3lJZC52YWx1ZSlcbiAgICApKTtcblxuICAgIHJldHVybiB0aGlzLnN0b3JlLmJsb2NrVW50aWwoc3RhdGUgPT4gc3RhdGUucHJpdmFjeVBvbGljeS5kb2N1bWVudCAhPT0gbnVsbCk7XG4gIH1cbn1cbiJdfQ==

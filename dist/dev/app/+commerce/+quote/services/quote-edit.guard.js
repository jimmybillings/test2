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
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var app_store_1 = require("../../../app.store");
var QuoteEditGuard = (function () {
    function QuoteEditGuard(userCan, store) {
        this.userCan = userCan;
        this.store = store;
    }
    QuoteEditGuard.prototype.canActivate = function (route, state) {
        if (this.userCan.administerQuotes()) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            return false;
        }
    };
    QuoteEditGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            app_store_1.AppStore])
    ], QuoteEditGuard);
    return QuoteEditGuard;
}());
exports.QuoteEditGuard = QuoteEditGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlL3NlcnZpY2VzL3F1b3RlLWVkaXQuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0MsOEVBQTRFO0FBQzVFLGdEQUE4QztBQUc5QztJQUNFLHdCQUNVLE9BQTZCLEVBQzdCLEtBQWU7UUFEZixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUM3QixVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUU5QixvQ0FBVyxHQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUNuRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQVpVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FHUSw0Q0FBb0I7WUFDdEIsb0JBQVE7T0FIZCxjQUFjLENBYTFCO0lBQUQscUJBQUM7Q0FiRCxBQWFDLElBQUE7QUFiWSx3Q0FBYyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytxdW90ZS9zZXJ2aWNlcy9xdW90ZS1lZGl0Lmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29tbWVyY2VDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb21tZXJjZS5jYXBhYmlsaXRpZXMnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVvdGVFZGl0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIGlmICh0aGlzLnVzZXJDYW4uYWRtaW5pc3RlclF1b3RlcygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlNDAzRm9yYmlkZGVuKCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19

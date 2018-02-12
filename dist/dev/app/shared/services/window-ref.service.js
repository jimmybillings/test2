"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
function _window() {
    return window;
}
var WindowRef = (function () {
    function WindowRef() {
    }
    Object.defineProperty(WindowRef.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowRef = __decorate([
        core_1.Injectable()
    ], WindowRef);
    return WindowRef;
}());
exports.WindowRef = WindowRef;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDO0lBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBR0Q7SUFBQTtJQUlBLENBQUM7SUFIQyxzQkFBSSxtQ0FBWTthQUFoQjtZQUNFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUhVLFNBQVM7UUFEckIsaUJBQVUsRUFBRTtPQUNBLFNBQVMsQ0FJckI7SUFBRCxnQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDhCQUFTIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5mdW5jdGlvbiBfd2luZG93KCk6IGFueSB7XG4gIHJldHVybiB3aW5kb3c7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXaW5kb3dSZWYge1xuICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XG4gICAgcmV0dXJuIF93aW5kb3coKTtcbiAgfVxufVxuIl19

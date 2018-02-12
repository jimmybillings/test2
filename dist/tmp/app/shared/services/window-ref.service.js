"use strict";
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
    WindowRef.decorators = [
        { type: core_1.Injectable },
    ];
    WindowRef.ctorParameters = function () { return []; };
    return WindowRef;
}());
exports.WindowRef = WindowRef;
//# sourceMappingURL=window-ref.service.js.map
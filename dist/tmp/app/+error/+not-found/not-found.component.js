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
    NotFoundComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'not-found-component',
                    templateUrl: "./not-found.html",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    NotFoundComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
    ]; };
    return NotFoundComponent;
}(error_base_1.ErrorBase));
exports.NotFoundComponent = NotFoundComponent;
//# sourceMappingURL=not-found.component.js.map
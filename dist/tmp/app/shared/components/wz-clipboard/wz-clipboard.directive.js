"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzClipBoardDirective = (function () {
    function WzClipBoardDirective(element) {
        this.element = element;
        new Clipboard(this.element.nativeElement);
    }
    WzClipBoardDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[wzClipboard]'
                },] },
    ];
    WzClipBoardDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    return WzClipBoardDirective;
}());
exports.WzClipBoardDirective = WzClipBoardDirective;
//# sourceMappingURL=wz-clipboard.directive.js.map
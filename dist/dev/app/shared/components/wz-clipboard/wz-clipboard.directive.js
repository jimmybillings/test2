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
var WzClipBoardDirective = (function () {
    function WzClipBoardDirective(element) {
        this.element = element;
        new Clipboard(this.element.nativeElement);
    }
    WzClipBoardDirective = __decorate([
        core_1.Directive({
            selector: '[wzClipboard]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], WzClipBoardDirective);
    return WzClipBoardDirective;
}());
exports.WzClipBoardDirective = WzClipBoardDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1jbGlwYm9hcmQvd3otY2xpcGJvYXJkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzRDtBQU90RDtJQUNFLDhCQUFtQixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ3BDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUhVLG9CQUFvQjtRQUpoQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGVBQWU7U0FDMUIsQ0FBQzt5Q0FHNEIsaUJBQVU7T0FEM0Isb0JBQW9CLENBSWhDO0lBQUQsMkJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxvREFBb0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LWNsaXBib2FyZC93ei1jbGlwYm9hcmQuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5kZWNsYXJlIHZhciBDbGlwYm9hcmQ6IGFueTtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3d6Q2xpcGJvYXJkXSdcbn0pXG5cbmV4cG9ydCBjbGFzcyBXekNsaXBCb2FyZERpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgbmV3IENsaXBib2FyZCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gIH1cbn1cbiJdfQ==

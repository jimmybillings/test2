"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GalleryViewGuard = (function () {
    function GalleryViewGuard() {
    }
    GalleryViewGuard.prototype.canActivate = function () {
        return true;
    };
    GalleryViewGuard = __decorate([
        core_1.Injectable()
    ], GalleryViewGuard);
    return GalleryViewGuard;
}());
exports.GalleryViewGuard = GalleryViewGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L3NlcnZpY2VzL2dhbGxlcnktdmlldy5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQztJQUFBO0lBSUEsQ0FBQztJQUhDLHNDQUFXLEdBQVg7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUhVLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO09BQ0EsZ0JBQWdCLENBSTVCO0lBQUQsdUJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwLytnYWxsZXJ5LXZpZXcvc2VydmljZXMvZ2FsbGVyeS12aWV3Lmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgR2FsbGVyeVZpZXdHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY2FuQWN0aXZhdGUoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiJdfQ==

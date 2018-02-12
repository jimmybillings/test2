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
var HomeCallToActionComponent = (function () {
    function HomeCallToActionComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HomeCallToActionComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HomeCallToActionComponent.prototype, "currentUser", void 0);
    HomeCallToActionComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-call-to-action',
            template: "\n    <section class=\"mrkt-call-to-action\">\n      <div layout=\"row\" layout-align=\"center start\" layout-padding=\"\">\n        <div flex-gt-lg=\"60\" flex-gt-md=\"70\" flex=\"95\" layout-align=\"center start\">\n          <h2 class=\"mat-display-1\">{{ 'HOME.DESCRIPTION' | translate}}</h2>\n          <button *ngIf=\"!currentUser.loggedIn()\" mat-button [routerLink]=\"['/user/register']\" class=\"mat-block conversion\">\n            {{'HOME.START_PROJECT' | translate }}\n          </button>\n          <button *ngIf=\"currentUser.loggedIn()\" mat-button [routerLink]=\"['/user']\" class=\"mat-block conversion\">\n            {{'HOME.START_PROJECT' | translate }}\n          </button>\n        </div>\n      </div>\n    </section>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], HomeCallToActionComponent);
    return HomeCallToActionComponent;
}());
exports.HomeCallToActionComponent = HomeCallToActionComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtY2FsbC10by1hY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBFO0FBdUIxRTtJQUFBO0lBR0EsQ0FBQztJQUZVO1FBQVIsWUFBSyxFQUFFOzs2REFBYTtJQUNaO1FBQVIsWUFBSyxFQUFFOztrRUFBa0I7SUFGZix5QkFBeUI7UUFyQnJDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixRQUFRLEVBQUUsMHVCQWNUO1lBQ0QsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLHlCQUF5QixDQUdyQztJQUFELGdDQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksOERBQXlCIiwiZmlsZSI6ImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtY2FsbC10by1hY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnaG9tZS1jYWxsLXRvLWFjdGlvbicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJtcmt0LWNhbGwtdG8tYWN0aW9uXCI+XG4gICAgICA8ZGl2IGxheW91dD1cInJvd1wiIGxheW91dC1hbGlnbj1cImNlbnRlciBzdGFydFwiIGxheW91dC1wYWRkaW5nPVwiXCI+XG4gICAgICAgIDxkaXYgZmxleC1ndC1sZz1cIjYwXCIgZmxleC1ndC1tZD1cIjcwXCIgZmxleD1cIjk1XCIgbGF5b3V0LWFsaWduPVwiY2VudGVyIHN0YXJ0XCI+XG4gICAgICAgICAgPGgyIGNsYXNzPVwibWF0LWRpc3BsYXktMVwiPnt7ICdIT01FLkRFU0NSSVBUSU9OJyB8IHRyYW5zbGF0ZX19PC9oMj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiIWN1cnJlbnRVc2VyLmxvZ2dlZEluKClcIiBtYXQtYnV0dG9uIFtyb3V0ZXJMaW5rXT1cIlsnL3VzZXIvcmVnaXN0ZXInXVwiIGNsYXNzPVwibWF0LWJsb2NrIGNvbnZlcnNpb25cIj5cbiAgICAgICAgICAgIHt7J0hPTUUuU1RBUlRfUFJPSkVDVCcgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiY3VycmVudFVzZXIubG9nZ2VkSW4oKVwiIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiWycvdXNlciddXCIgY2xhc3M9XCJtYXQtYmxvY2sgY29udmVyc2lvblwiPlxuICAgICAgICAgICAge3snSE9NRS5TVEFSVF9QUk9KRUNUJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ2FsbFRvQWN0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBJbnB1dCgpIGN1cnJlbnRVc2VyOiBhbnk7XG59XG4iXX0=

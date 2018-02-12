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
var HomeVendorMarqueeComponent = (function () {
    function HomeVendorMarqueeComponent() {
        this.vendors = ['dimoc', 'usta', 'AFV', 'discovery', 'ncaa', 'paramount'];
        this.vendors2 = ['natgeo', 'pac12', 'usga', 'sony', 'big10', 'wpt'];
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HomeVendorMarqueeComponent.prototype, "config", void 0);
    HomeVendorMarqueeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-vendor-marquee',
            template: "\n    <section hide-xs=\"\" layout=\"column\" class=\"vendor-marquee\">\n      <ul>\n        <li>\n          <img \n            *ngFor=\"let vendor of vendors; let i = index\" \n            src=\"assets/img/client-marquee/client_{{vendor}}.png\"/>\n        </li>\n        <li>\n          <img \n            *ngFor=\"let vendor2 of vendors2; let i = index\" \n            src=\"assets/img/client-marquee/client_{{vendor2}}.png\"/>\n        </li>\n        <li>\n          <img \n            *ngFor=\"let vendor of vendors; let i = index\" \n            src=\"assets/img/client-marquee/client_{{vendor}}.png\"/>\n        </li>\n      </ul>\n    </section>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], HomeVendorMarqueeComponent);
    return HomeVendorMarqueeComponent;
}());
exports.HomeVendorMarqueeComponent = HomeVendorMarqueeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtdmVuZG9yLW1hcnF1ZWUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTBFO0FBNkIxRTtJQTNCQTtRQThCUyxZQUFPLEdBQVEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLGFBQVEsR0FBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUpVO1FBQVIsWUFBSyxFQUFFOzs4REFBYTtJQURWLDBCQUEwQjtRQTNCdEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFFBQVEsRUFBRSxrcEJBb0JUO1lBQ0QsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUVXLDBCQUEwQixDQUt0QztJQUFELGlDQUFDO0NBTEQsQUFLQyxJQUFBO0FBTFksZ0VBQTBCIiwiZmlsZSI6ImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtdmVuZG9yLW1hcnF1ZWUuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnaG9tZS12ZW5kb3ItbWFycXVlZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHNlY3Rpb24gaGlkZS14cz1cIlwiIGxheW91dD1cImNvbHVtblwiIGNsYXNzPVwidmVuZG9yLW1hcnF1ZWVcIj5cbiAgICAgIDx1bD5cbiAgICAgICAgPGxpPlxuICAgICAgICAgIDxpbWcgXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdmVuZG9yIG9mIHZlbmRvcnM7IGxldCBpID0gaW5kZXhcIiBcbiAgICAgICAgICAgIHNyYz1cImFzc2V0cy9pbWcvY2xpZW50LW1hcnF1ZWUvY2xpZW50X3t7dmVuZG9yfX0ucG5nXCIvPlxuICAgICAgICA8L2xpPlxuICAgICAgICA8bGk+XG4gICAgICAgICAgPGltZyBcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCB2ZW5kb3IyIG9mIHZlbmRvcnMyOyBsZXQgaSA9IGluZGV4XCIgXG4gICAgICAgICAgICBzcmM9XCJhc3NldHMvaW1nL2NsaWVudC1tYXJxdWVlL2NsaWVudF97e3ZlbmRvcjJ9fS5wbmdcIi8+XG4gICAgICAgIDwvbGk+XG4gICAgICAgIDxsaT5cbiAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IHZlbmRvciBvZiB2ZW5kb3JzOyBsZXQgaSA9IGluZGV4XCIgXG4gICAgICAgICAgICBzcmM9XCJhc3NldHMvaW1nL2NsaWVudC1tYXJxdWVlL2NsaWVudF97e3ZlbmRvcn19LnBuZ1wiLz5cbiAgICAgICAgPC9saT5cbiAgICAgIDwvdWw+XG4gICAgPC9zZWN0aW9uPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVWZW5kb3JNYXJxdWVlQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG5cbiAgcHVibGljIHZlbmRvcnM6IGFueSA9IFsnZGltb2MnLCAndXN0YScsICdBRlYnLCAnZGlzY292ZXJ5JywgJ25jYWEnLCAncGFyYW1vdW50J107XG4gIHB1YmxpYyB2ZW5kb3JzMjogYW55ID0gWyduYXRnZW8nLCAncGFjMTInLCAndXNnYScsICdzb255JywgJ2JpZzEwJywgJ3dwdCddO1xufVxuIl19

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeVendorMarqueeComponent = (function () {
    function HomeVendorMarqueeComponent() {
        this.vendors = ['dimoc', 'usta', 'AFV', 'discovery', 'ncaa', 'paramount'];
        this.vendors2 = ['natgeo', 'pac12', 'usga', 'sony', 'big10', 'wpt'];
    }
    HomeVendorMarqueeComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'home-vendor-marquee',
                    template: "\n    <section hide-xs=\"\" layout=\"column\" class=\"vendor-marquee\">\n      <ul>\n        <li>\n          <img \n            *ngFor=\"let vendor of vendors; let i = index\" \n            src=\"assets/img/client-marquee/client_{{vendor}}.png\"/>\n        </li>\n        <li>\n          <img \n            *ngFor=\"let vendor2 of vendors2; let i = index\" \n            src=\"assets/img/client-marquee/client_{{vendor2}}.png\"/>\n        </li>\n        <li>\n          <img \n            *ngFor=\"let vendor of vendors; let i = index\" \n            src=\"assets/img/client-marquee/client_{{vendor}}.png\"/>\n        </li>\n      </ul>\n    </section>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    HomeVendorMarqueeComponent.ctorParameters = function () { return []; };
    HomeVendorMarqueeComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
    };
    return HomeVendorMarqueeComponent;
}());
exports.HomeVendorMarqueeComponent = HomeVendorMarqueeComponent;
//# sourceMappingURL=home-vendor-marquee.component.js.map
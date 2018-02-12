"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeHighlightsComponent = (function () {
    function HomeHighlightsComponent() {
    }
    HomeHighlightsComponent.prototype.buildSearchContext = function (context) {
        context = JSON.parse(context);
        for (var param in context) {
            if (context[param] === '')
                delete (context[param]);
        }
        return context;
    };
    HomeHighlightsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'home-highlights',
                    template: "\n    <section layout=\"row\" layout-align=\"center start\" class=\"mrkt-collections\">\n      <div flex-gt-lg=\"70\" flex-lg=\"70\" flex-gt-md=\"80\" flex-gt-sm=\"90\" flex=\"100\" layout=\"row\" layout-wrap=\"\">\n        <div *ngFor=\"let highlight of config.highlights.items; let i = index\" \n          flex-gt-xs=\"33\" flex=\"100\" \n          class=\"mrkt-collections__highlight\"\n        >\n          <a *ngIf=\"config\" [routerLink]=\"['/search', buildSearchContext(highlight.searchContext)]\">\n            <div class=\"mrkt-collections__highlight_img\"></div>\n            <div class=\"mrkt-collections__highlight_content\">\n              <h5 class=\"mat-title\">{{ 'HOME.HIGHLIGHT.'+(i+1) | translate }}</h5>\n            </div>\n          </a>\n        </div>\n      </div>\n    </section>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    HomeHighlightsComponent.ctorParameters = function () { return []; };
    HomeHighlightsComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
    };
    return HomeHighlightsComponent;
}());
exports.HomeHighlightsComponent = HomeHighlightsComponent;
//# sourceMappingURL=home-highlights.component.js.map
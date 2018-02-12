"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzSiteChangerComponent = (function () {
    function WzSiteChangerComponent() {
        this.sites = [
            'commerce', 'usopen', 'cnn', 'usta-usopen',
            'bbcws', 'hbo-boxing', 'wpt', 'dvids', 'augusta',
            'laac', 'cfp', 'sony', 'nab', 'amblin'
        ];
        this.currentSite = localStorage.getItem('currentSite') || 'commerce';
    }
    WzSiteChangerComponent.prototype.selectSite = function (site) {
        localStorage.clear();
        localStorage.setItem('currentSite', site.value);
        location.reload();
    };
    WzSiteChangerComponent.prototype.isPocNineTeen = function () {
        return location.host.indexOf('poc19') > -1 || location.host.indexOf('localhost') > -1;
    };
    WzSiteChangerComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-site-changer-component',
                    template: "\n      <form *ngIf=\"isPocNineTeen()\" class=\"language-selector\">\n        <mat-form-field>\n          <mat-select [(ngModel)]=\"currentSite\" name=\"currentSite\" (change)=\"selectSite($event)\">\n            <mat-option *ngFor=\"let site of sites\" [value]=\"site\">\n              {{site}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </form>",
                    styles: ["\n    mat-form-field {width: 175px; font-size: 16px;},\n    form {padding:0;}\n  "],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzSiteChangerComponent.ctorParameters = function () { return []; };
    return WzSiteChangerComponent;
}());
exports.WzSiteChangerComponent = WzSiteChangerComponent;
//# sourceMappingURL=wz-site-changer.component.js.map
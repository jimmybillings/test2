"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    WzSiteChangerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-site-changer-component',
            template: "\n      <form *ngIf=\"isPocNineTeen()\" class=\"language-selector\">\n        <mat-form-field>\n          <mat-select [(ngModel)]=\"currentSite\" name=\"currentSite\" (change)=\"selectSite($event)\">\n            <mat-option *ngFor=\"let site of sites\" [value]=\"site\">\n              {{site}}\n            </mat-option>\n          </mat-select>\n        </mat-form-field>\n      </form>",
            styles: ["\n    mat-form-field {width: 175px; font-size: 16px;},\n    form {padding:0;}\n  "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], WzSiteChangerComponent);
    return WzSiteChangerComponent;
}());
exports.WzSiteChangerComponent = WzSiteChangerComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaXRlLWNoYW5nZXIvd3otc2l0ZS1jaGFuZ2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUFnRztBQXNCaEc7SUFwQkE7UUFxQlMsVUFBSyxHQUFhO1lBQ3ZCLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLGFBQWE7WUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVM7WUFDaEQsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVE7U0FDdkMsQ0FBQztRQUNLLGdCQUFXLEdBQVcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxVQUFVLENBQUM7SUFXakYsQ0FBQztJQVRRLDJDQUFVLEdBQWpCLFVBQWtCLElBQVM7UUFDekIsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLFlBQVksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLDhDQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFoQlUsc0JBQXNCO1FBcEJsQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsUUFBUSxFQUFFLHVZQVNFO1lBQ1osTUFBTSxFQUFFLENBQUMsbUZBR1IsQ0FBQztZQUNGLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FFVyxzQkFBc0IsQ0FpQmxDO0lBQUQsNkJBQUM7Q0FqQkQsQUFpQkMsSUFBQTtBQWpCWSx3REFBc0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXNpdGUtY2hhbmdlci93ei1zaXRlLWNoYW5nZXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXNpdGUtY2hhbmdlci1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPGZvcm0gKm5nSWY9XCJpc1BvY05pbmVUZWVuKClcIiBjbGFzcz1cImxhbmd1YWdlLXNlbGVjdG9yXCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICA8bWF0LXNlbGVjdCBbKG5nTW9kZWwpXT1cImN1cnJlbnRTaXRlXCIgbmFtZT1cImN1cnJlbnRTaXRlXCIgKGNoYW5nZSk9XCJzZWxlY3RTaXRlKCRldmVudClcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBzaXRlIG9mIHNpdGVzXCIgW3ZhbHVlXT1cInNpdGVcIj5cbiAgICAgICAgICAgICAge3tzaXRlfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICA8L2Zvcm0+YCxcbiAgc3R5bGVzOiBbYFxuICAgIG1hdC1mb3JtLWZpZWxkIHt3aWR0aDogMTc1cHg7IGZvbnQtc2l6ZTogMTZweDt9LFxuICAgIGZvcm0ge3BhZGRpbmc6MDt9XG4gIGBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFd6U2l0ZUNoYW5nZXJDb21wb25lbnQge1xuICBwdWJsaWMgc2l0ZXM6IHN0cmluZ1tdID0gW1xuICAgICdjb21tZXJjZScsICd1c29wZW4nLCAnY25uJywgJ3VzdGEtdXNvcGVuJyxcbiAgICAnYmJjd3MnLCAnaGJvLWJveGluZycsICd3cHQnLCAnZHZpZHMnLCAnYXVndXN0YScsXG4gICAgJ2xhYWMnLCAnY2ZwJywgJ3NvbnknLCAnbmFiJywgJ2FtYmxpbidcbiAgXTtcbiAgcHVibGljIGN1cnJlbnRTaXRlOiBzdHJpbmcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFNpdGUnKSB8fCAnY29tbWVyY2UnO1xuXG4gIHB1YmxpYyBzZWxlY3RTaXRlKHNpdGU6IGFueSkge1xuICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW50U2l0ZScsIHNpdGUudmFsdWUpO1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgcHVibGljIGlzUG9jTmluZVRlZW4oKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhvc3QuaW5kZXhPZigncG9jMTknKSA+IC0xIHx8IGxvY2F0aW9uLmhvc3QuaW5kZXhPZignbG9jYWxob3N0JykgPiAtMTtcbiAgfVxufVxuIl19

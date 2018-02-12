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
var HomeHeroComponent = (function () {
    function HomeHeroComponent(_zone, changeDetector) {
        this._zone = _zone;
        this.changeDetector = changeDetector;
        this.searchContext = new core_1.EventEmitter();
        this.isVideoHidden = true;
    }
    Object.defineProperty(HomeHeroComponent.prototype, "playlist", {
        set: function (value) {
            if (value !== null)
                this.setUpVideo(value, 'hero-video');
        },
        enumerable: true,
        configurable: true
    });
    HomeHeroComponent.prototype.setUpVideo = function (video, elementId) {
        var _this = this;
        this.heroVideo = jwplayer(elementId).setup({
            autostart: true,
            controls: false,
            playlist: video,
            androidhls: false,
            mute: true,
            repeat: false,
            stretching: 'fill',
            height: '100%',
            width: '100%'
        }).on('play', function () {
            _this._zone.run(function () {
                _this.isVideoHidden = false;
                _this.changeDetector.markForCheck();
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HomeHeroComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], HomeHeroComponent.prototype, "currentUser", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], HomeHeroComponent.prototype, "isVideo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], HomeHeroComponent.prototype, "playlist", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], HomeHeroComponent.prototype, "searchContext", void 0);
    HomeHeroComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-hero',
            template: "\n    <div *ngIf=\"isVideo\" class=\"hero-video-container\" [ngClass]=\"{'fade-in' : !isVideoHidden}\">\n      <div id=\"hero-video\"></div>\n    </div>\n    <div class=\"hero-image-container\" *ngIf=\"!isVideo\">\n      <div class=\"hero-image\"></div>\n    </div>\n    <header class=\"hero\">\n      <div layout=\"row\" mat-scroll-y=\"\" layout-align=\"center start\" layout-padding>\n        <div flex-gt-lg=\"35\" flex-lg=\"40\" flex-md=\"50\" flex-gt-sm=\"55\" flex-gt-xs=\"70\" flex=\"100\">\n          <div layout=\"column\" layout-align=\"center\">\n            <div class=\"logo-wrapper\">\n              <div class=\"logo\"></div>\n            </div>\n            <wz-autocomplete-search\n              [config]=\"config\"\n              [currentUser]=\"currentUser\" \n              (searchContext)=\"searchContext.emit($event)\">\n            </wz-autocomplete-search>\n            <h4 class=\"mat-headline\">{{ 'HOME.SEARCH_HEADING' | translate }}</h4>\n          </div>\n        </div>\n      </div>\n    </header>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            core_1.ChangeDetectorRef])
    ], HomeHeroComponent);
    return HomeHeroComponent;
}());
exports.HomeHeroComponent = HomeHeroComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtaGVyby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkg7QUFtQzNIO0lBYUUsMkJBQ1UsS0FBYSxFQUNiLGNBQWlDO1FBRGpDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFQakMsa0JBQWEsR0FBUSxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUUzQyxrQkFBYSxHQUFZLElBQUksQ0FBQztJQU1yQyxDQUFDO0lBWEQsc0JBQUksdUNBQVE7YUFBWixVQUFhLEtBQVU7WUFDckIsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQztnQkFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQVdPLHNDQUFVLEdBQWxCLFVBQW1CLEtBQVUsRUFBRSxTQUFpQjtRQUFoRCxpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ3pDLFNBQVMsRUFBRSxJQUFJO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsTUFBTSxFQUFFLEtBQUs7WUFDYixVQUFVLEVBQUUsTUFBTTtZQUNsQixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxNQUFNO1NBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUU7WUFDWixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDYixLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDM0IsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWxDUTtRQUFSLFlBQUssRUFBRTs7cURBQWE7SUFDWjtRQUFSLFlBQUssRUFBRTs7MERBQWtCO0lBQ2pCO1FBQVIsWUFBSyxFQUFFOztzREFBa0I7SUFFMUI7UUFEQyxZQUFLLEVBQUU7OztxREFHUDtJQUNTO1FBQVQsYUFBTSxFQUFFOzs0REFBeUM7SUFSdkMsaUJBQWlCO1FBL0I3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSwwZ0NBd0JUO1lBQ0QsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FnQmlCLGFBQU07WUFDRyx3QkFBaUI7T0FmaEMsaUJBQWlCLENBb0M3QjtJQUFELHdCQUFDO0NBcENELEFBb0NDLElBQUE7QUFwQ1ksOENBQWlCIiwiZmlsZSI6ImFwcC8raG9tZS9jb21wb25lbnRzL2hvbWUtaGVyby5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgTmdab25lLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZGVjbGFyZSB2YXIgandwbGF5ZXI6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnaG9tZS1oZXJvJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwiaXNWaWRlb1wiIGNsYXNzPVwiaGVyby12aWRlby1jb250YWluZXJcIiBbbmdDbGFzc109XCJ7J2ZhZGUtaW4nIDogIWlzVmlkZW9IaWRkZW59XCI+XG4gICAgICA8ZGl2IGlkPVwiaGVyby12aWRlb1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJoZXJvLWltYWdlLWNvbnRhaW5lclwiICpuZ0lmPVwiIWlzVmlkZW9cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJoZXJvLWltYWdlXCI+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGhlYWRlciBjbGFzcz1cImhlcm9cIj5cbiAgICAgIDxkaXYgbGF5b3V0PVwicm93XCIgbWF0LXNjcm9sbC15PVwiXCIgbGF5b3V0LWFsaWduPVwiY2VudGVyIHN0YXJ0XCIgbGF5b3V0LXBhZGRpbmc+XG4gICAgICAgIDxkaXYgZmxleC1ndC1sZz1cIjM1XCIgZmxleC1sZz1cIjQwXCIgZmxleC1tZD1cIjUwXCIgZmxleC1ndC1zbT1cIjU1XCIgZmxleC1ndC14cz1cIjcwXCIgZmxleD1cIjEwMFwiPlxuICAgICAgICAgIDxkaXYgbGF5b3V0PVwiY29sdW1uXCIgbGF5b3V0LWFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibG9nby13cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dvXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx3ei1hdXRvY29tcGxldGUtc2VhcmNoXG4gICAgICAgICAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgW2N1cnJlbnRVc2VyXT1cImN1cnJlbnRVc2VyXCIgXG4gICAgICAgICAgICAgIChzZWFyY2hDb250ZXh0KT1cInNlYXJjaENvbnRleHQuZW1pdCgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8L3d6LWF1dG9jb21wbGV0ZS1zZWFyY2g+XG4gICAgICAgICAgICA8aDQgY2xhc3M9XCJtYXQtaGVhZGxpbmVcIj57eyAnSE9NRS5TRUFSQ0hfSEVBRElORycgfCB0cmFuc2xhdGUgfX08L2g0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEhvbWVIZXJvQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBJbnB1dCgpIGN1cnJlbnRVc2VyOiBhbnk7XG4gIEBJbnB1dCgpIGlzVmlkZW86IGJvb2xlYW47XG4gIEBJbnB1dCgpXG4gIHNldCBwbGF5bGlzdCh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB0aGlzLnNldFVwVmlkZW8odmFsdWUsICdoZXJvLXZpZGVvJyk7XG4gIH1cbiAgQE91dHB1dCgpIHNlYXJjaENvbnRleHQ6IGFueSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMgaXNWaWRlb0hpZGRlbjogYm9vbGVhbiA9IHRydWU7XG4gIHB1YmxpYyBoZXJvVmlkZW86IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgfVxuXG4gIHByaXZhdGUgc2V0VXBWaWRlbyh2aWRlbzogYW55LCBlbGVtZW50SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaGVyb1ZpZGVvID0gandwbGF5ZXIoZWxlbWVudElkKS5zZXR1cCh7XG4gICAgICBhdXRvc3RhcnQ6IHRydWUsXG4gICAgICBjb250cm9sczogZmFsc2UsXG4gICAgICBwbGF5bGlzdDogdmlkZW8sXG4gICAgICBhbmRyb2lkaGxzOiBmYWxzZSxcbiAgICAgIG11dGU6IHRydWUsXG4gICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgc3RyZXRjaGluZzogJ2ZpbGwnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICB3aWR0aDogJzEwMCUnXG4gICAgfSkub24oJ3BsYXknLCAoKSA9PiB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNWaWRlb0hpZGRlbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==

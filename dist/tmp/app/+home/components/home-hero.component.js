"use strict";
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
    HomeHeroComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'home-hero',
                    template: "\n    <div *ngIf=\"isVideo\" class=\"hero-video-container\" [ngClass]=\"{'fade-in' : !isVideoHidden}\">\n      <div id=\"hero-video\"></div>\n    </div>\n    <div class=\"hero-image-container\" *ngIf=\"!isVideo\">\n      <div class=\"hero-image\"></div>\n    </div>\n    <header class=\"hero\">\n      <div layout=\"row\" mat-scroll-y=\"\" layout-align=\"center start\" layout-padding>\n        <div flex-gt-lg=\"35\" flex-lg=\"40\" flex-md=\"50\" flex-gt-sm=\"55\" flex-gt-xs=\"70\" flex=\"100\">\n          <div layout=\"column\" layout-align=\"center\">\n            <div class=\"logo-wrapper\">\n              <div class=\"logo\"></div>\n            </div>\n            <wz-autocomplete-search\n              [config]=\"config\"\n              [currentUser]=\"currentUser\" \n              (searchContext)=\"searchContext.emit($event)\">\n            </wz-autocomplete-search>\n            <h4 class=\"mat-headline\">{{ 'HOME.SEARCH_HEADING' | translate }}</h4>\n          </div>\n        </div>\n      </div>\n    </header>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    HomeHeroComponent.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    HomeHeroComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'currentUser': [{ type: core_1.Input },],
        'isVideo': [{ type: core_1.Input },],
        'playlist': [{ type: core_1.Input },],
        'searchContext': [{ type: core_1.Output },],
    };
    return HomeHeroComponent;
}());
exports.HomeHeroComponent = HomeHeroComponent;
//# sourceMappingURL=home-hero.component.js.map
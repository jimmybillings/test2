"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var WzSpeedviewComponent = (function () {
    function WzSpeedviewComponent() {
        this.speedviewAssetInfo = new BehaviorSubject_1.BehaviorSubject({
            values: [],
            url: '',
            price: 0,
            imageQuickView: false,
            pricingType: ''
        });
        this.visibility = new BehaviorSubject_1.BehaviorSubject('hidden');
    }
    WzSpeedviewComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    WzSpeedviewComponent.prototype.merge = function (data) {
        var speedviewAssetInfo;
        this.speedviewAssetInfo.take(1).subscribe(function (currentData) {
            speedviewAssetInfo = currentData;
        });
        if (data.noData) {
            var tempData = { posterUrl: speedviewAssetInfo.posterUrl };
            speedviewAssetInfo = __assign({}, tempData, data);
        }
        else if (data.posterUrl) {
            speedviewAssetInfo.posterUrl = data.posterUrl;
        }
        else {
            if (speedviewAssetInfo.noData)
                delete speedviewAssetInfo.noData;
            speedviewAssetInfo = __assign({}, speedviewAssetInfo, data);
        }
        this.speedviewAssetInfo.next(speedviewAssetInfo);
    };
    WzSpeedviewComponent.prototype.show = function () {
        var _this = this;
        setTimeout(function () {
            _this.visibility.next('visible');
        }, 300);
    };
    WzSpeedviewComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-speedview',
                    templateUrl: 'wz.speedview.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations_1.trigger('state', [
                            animations_1.state('hidden', animations_1.style({
                                opacity: '0',
                                transform: 'scale(0)'
                            })),
                            animations_1.state('visible', animations_1.style({
                                opacity: '1',
                                transform: 'scale(1)'
                            })),
                            animations_1.transition('hidden => visible', animations_1.animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
                            animations_1.transition('visible => hidden', animations_1.animate('150ms cubic-bezier(0.4, 0.0, 1, 1)'))
                        ])
                    ],
                },] },
    ];
    WzSpeedviewComponent.ctorParameters = function () { return []; };
    return WzSpeedviewComponent;
}());
exports.WzSpeedviewComponent = WzSpeedviewComponent;
//# sourceMappingURL=wz.speedview.component.js.map
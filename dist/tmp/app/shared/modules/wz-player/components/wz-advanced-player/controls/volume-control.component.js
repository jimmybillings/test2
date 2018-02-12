"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var VolumeControlComponent = (function () {
    function VolumeControlComponent() {
        this.request = new core_1.EventEmitter();
        this.volumeState = 'inactive';
        this.buttonTitle = 'ASSET.ADV_PLAYER.SOUND_BTN_TITLE';
    }
    Object.defineProperty(VolumeControlComponent.prototype, "iconName", {
        get: function () {
            var volume = this.playerState.volume;
            if (volume > 66)
                return 'volume_up';
            if (volume > 33)
                return 'volume_down';
            if (volume > 0)
                return 'volume_mute';
            return 'volume_off';
        },
        enumerable: true,
        configurable: true
    });
    VolumeControlComponent.prototype.onMouseOver = function () {
        this.volumeState = 'active';
    };
    VolumeControlComponent.prototype.onMouseLeave = function () {
        this.volumeState = 'inactive';
    };
    VolumeControlComponent.prototype.onSliderInput = function (event) {
        this.request.emit({ type: 'SET_VOLUME', volume: event.value });
    };
    VolumeControlComponent.prototype.onButtonClick = function () {
        this.request.emit({ type: 'TOGGLE_MUTE' });
    };
    VolumeControlComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-volume-control',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button *ngIf=\"volumeState ==='inactive'\" title=\"{{ buttonTitle | translate }}\" (mouseover)=\"onMouseOver()\">\n      <mat-icon>{{ iconName }}</mat-icon>\n    </button>\n    <div class=\"volume-control\" [@volumeState]=\"volumeState\" (mouseleave)=\"onMouseLeave()\">\n      <mat-slider vertical min=\"0\" max=\"100\" value=\"{{ playerState.volume }}\" (input)=\"onSliderInput($event)\"></mat-slider>\n      <button mat-icon-button title=\"{{ buttonTitle | translate }}\" (click)=\"onButtonClick()\">\n        <mat-icon>{{ iconName }}</mat-icon>\n      </button>\n    </div>\n  ",
                    animations: [
                        core_1.trigger('volumeState', [
                            core_1.state('inactive', core_1.style({
                                opacity: '0',
                                zIndex: '-1'
                            })),
                            core_1.state('active', core_1.style({
                                opacity: '1',
                                zIndex: '1'
                            })),
                            core_1.transition('inactive => active', core_1.animate('250ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')),
                            core_1.transition('active => inactive', core_1.animate('360ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
                        ])
                    ]
                },] },
    ];
    VolumeControlComponent.ctorParameters = function () { return []; };
    VolumeControlComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return VolumeControlComponent;
}());
exports.VolumeControlComponent = VolumeControlComponent;
//# sourceMappingURL=volume-control.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var subclip_markers_1 = require("../../interfaces/subclip-markers");
var WzSubclipEditorComponent = (function () {
    function WzSubclipEditorComponent() {
        this.alreadyUsedMarkersList = [];
        this.cancel = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
        this.playerMarkers = { in: undefined, out: undefined };
    }
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersAreRemovable", {
        get: function () {
            return this.enhancedAsset.isSubclipped && subclip_markers_1.neitherMarkersAreSet(this.playerMarkers);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersAreSavable", {
        get: function () {
            return subclip_markers_1.bothMarkersAreSet(this.playerMarkers) && this.markersAreChanged && !this.markersAreAlreadyUsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersAreAlreadyUsed", {
        get: function () {
            var _this = this;
            return this.alreadyUsedMarkersList
                .some(function (alreadyUsedMarkers) { return subclip_markers_1.markersMatch(_this.playerMarkers, alreadyUsedMarkers); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "cancelButtonHoverTextKey", {
        get: function () {
            return this.enhancedAsset.isSubclipped
                ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.UPDATE'
                : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.TITLE.ADD';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersSaveButtonLabelKey", {
        get: function () {
            return this.enhancedAsset.isSubclipped
                ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.UPDATE'
                : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.LABEL.ADD';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersSaveButtonHoverTextKey", {
        get: function () {
            if (!subclip_markers_1.bothMarkersAreSet(this.playerMarkers))
                return this.enhancedAsset.isSubclipped
                    ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.NOT_READY'
                    : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.NOT_READY';
            if (!this.markersAreChanged)
                return 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.NOT_CHANGED';
            if (this.markersAreAlreadyUsed)
                return 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ALREADY_USED';
            return this.enhancedAsset.isSubclipped
                ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.UPDATE.READY'
                : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.SAVE.TITLE.ADD.READY';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersRemoveButtonHoverTextKey", {
        get: function () {
            return this.markersAreAlreadyUsed
                ? 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.ALREADY_USED'
                : 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.TITLE.READY';
        },
        enumerable: true,
        configurable: true
    });
    WzSubclipEditorComponent.prototype.onPlayerMarkerChange = function (newMarkers) {
        this.playerMarkers = newMarkers;
    };
    WzSubclipEditorComponent.prototype.onCancelButtonClick = function () {
        this.cancel.emit();
    };
    WzSubclipEditorComponent.prototype.onSaveButtonClick = function () {
        this.emitSaveEvent();
    };
    WzSubclipEditorComponent.prototype.onRemoveButtonClick = function () {
        this.emitSaveEvent();
    };
    Object.defineProperty(WzSubclipEditorComponent.prototype, "assetHasMarkers", {
        get: function () {
            return this.enhancedAsset.isSubclipped;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "assetInMarker", {
        get: function () {
            return this.enhancedAsset.subclipMarkers.in;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "assetOutMarker", {
        get: function () {
            return this.enhancedAsset.subclipMarkers.out;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "playerInMarker", {
        get: function () {
            return this.playerMarkers.in;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzSubclipEditorComponent.prototype, "playerOutMarker", {
        get: function () {
            return this.playerMarkers.out;
        },
        enumerable: true,
        configurable: true
    });
    WzSubclipEditorComponent.prototype.emitSaveEvent = function () {
        this.save.emit(this.playerMarkers);
    };
    Object.defineProperty(WzSubclipEditorComponent.prototype, "markersAreChanged", {
        get: function () {
            return !subclip_markers_1.markersMatch(this.enhancedAsset.subclipMarkers, this.playerMarkers);
        },
        enumerable: true,
        configurable: true
    });
    WzSubclipEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-subclip-editor',
                    template: "\n    <wz-advanced-player\n      [window]=\"window\"\n      [asset]=\"enhancedAsset\"\n      [displayAllControls]=\"false\"\n      (markersInitialization)=\"onPlayerMarkerChange($event)\"\n      (markerChange)=\"onPlayerMarkerChange($event)\">\n    </wz-advanced-player>\n\n    <section *ngIf=\"assetHasMarkers\" layout=\"row\" layout-align=\"start center\" class=\"current-in-out-markers\">\n      <div layout=\"row\" layout-align=\"start\">\n        <span>{{ 'ASSET.SAVE_SUBCLIP.CURRENT_MARKERS.LABEL' | translate }}</span>\n        <span>\n          {{ 'ASSET.SAVE_SUBCLIP.CURRENT_MARKERS.VALUE' | \n            translate:{ in: assetInMarker | timecode, out: assetOutMarker | timecode } }}\n        </span>\n      </div>\n    </section>\n    \n    <section layout=\"row\" layout-align=\"end\">\n\n      <section layout=\"row\" layout-align=\"end\">\n        <button mat-button color=\"primary\"\n          title=\"{{ cancelButtonHoverTextKey | translate }}\"\n          (click)=\"onCancelButtonClick()\">\n          {{ 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.LABEL' | translate }}\n        </button>\n\n        <button mat-button class=\"is-outlined\" color=\"primary\"\n          *ngIf=\"!markersAreRemovable\"\n          [disabled]=\"!markersAreSavable\"\n          title=\"{{ markersSaveButtonHoverTextKey |\n            translate:{ in: playerInMarker | timecode, out: playerOutMarker | timecode } }}\"\n          (click)=\"onSaveButtonClick()\">\n          {{ markersSaveButtonLabelKey | translate }}\n        </button>\n        \n        <button mat-button class=\"is-outlined\" color=\"accent\"\n          *ngIf=\"markersAreRemovable\"\n          [disabled]=\"markersAreAlreadyUsed\"\n          title=\"{{ markersRemoveButtonHoverTextKey | translate }}\"\n          (click)=\"onRemoveButtonClick()\">\n          {{ 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.LABEL' | translate }}\n        </button>\n      </section>\n    </section>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzSubclipEditorComponent.ctorParameters = function () { return []; };
    WzSubclipEditorComponent.propDecorators = {
        'window': [{ type: core_1.Input },],
        'enhancedAsset': [{ type: core_1.Input },],
        'alreadyUsedMarkersList': [{ type: core_1.Input },],
        'cancel': [{ type: core_1.Output },],
        'save': [{ type: core_1.Output },],
    };
    return WzSubclipEditorComponent;
}());
exports.WzSubclipEditorComponent = WzSubclipEditorComponent;
//# sourceMappingURL=wz.subclip-editor.component.js.map
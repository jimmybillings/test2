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
var subclip_markers_1 = require("../../interfaces/subclip-markers");
var enhanced_asset_1 = require("../../interfaces/enhanced-asset");
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzSubclipEditorComponent.prototype, "window", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", enhanced_asset_1.EnhancedAsset)
    ], WzSubclipEditorComponent.prototype, "enhancedAsset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzSubclipEditorComponent.prototype, "alreadyUsedMarkersList", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzSubclipEditorComponent.prototype, "cancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzSubclipEditorComponent.prototype, "save", void 0);
    WzSubclipEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-subclip-editor',
            template: "\n    <wz-advanced-player\n      [window]=\"window\"\n      [asset]=\"enhancedAsset\"\n      [displayAllControls]=\"false\"\n      (markersInitialization)=\"onPlayerMarkerChange($event)\"\n      (markerChange)=\"onPlayerMarkerChange($event)\">\n    </wz-advanced-player>\n\n    <section *ngIf=\"assetHasMarkers\" layout=\"row\" layout-align=\"start center\" class=\"current-in-out-markers\">\n      <div layout=\"row\" layout-align=\"start\">\n        <span>{{ 'ASSET.SAVE_SUBCLIP.CURRENT_MARKERS.LABEL' | translate }}</span>\n        <span>\n          {{ 'ASSET.SAVE_SUBCLIP.CURRENT_MARKERS.VALUE' | \n            translate:{ in: assetInMarker | timecode, out: assetOutMarker | timecode } }}\n        </span>\n      </div>\n    </section>\n    \n    <section layout=\"row\" layout-align=\"end\">\n\n      <section layout=\"row\" layout-align=\"end\">\n        <button mat-button color=\"primary\"\n          title=\"{{ cancelButtonHoverTextKey | translate }}\"\n          (click)=\"onCancelButtonClick()\">\n          {{ 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.CANCEL.LABEL' | translate }}\n        </button>\n\n        <button mat-button class=\"is-outlined\" color=\"primary\"\n          *ngIf=\"!markersAreRemovable\"\n          [disabled]=\"!markersAreSavable\"\n          title=\"{{ markersSaveButtonHoverTextKey |\n            translate:{ in: playerInMarker | timecode, out: playerOutMarker | timecode } }}\"\n          (click)=\"onSaveButtonClick()\">\n          {{ markersSaveButtonLabelKey | translate }}\n        </button>\n        \n        <button mat-button class=\"is-outlined\" color=\"accent\"\n          *ngIf=\"markersAreRemovable\"\n          [disabled]=\"markersAreAlreadyUsed\"\n          title=\"{{ markersRemoveButtonHoverTextKey | translate }}\"\n          (click)=\"onRemoveButtonClick()\">\n          {{ 'ASSET.SAVE_SUBCLIP.ACTION_BUTTON.REMOVE.LABEL' | translate }}\n        </button>\n      </section>\n    </section>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], WzSubclipEditorComponent);
    return WzSubclipEditorComponent;
}());
exports.WzSubclipEditorComponent = WzSubclipEditorComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zdWJjbGlwLWVkaXRvci93ei5zdWJjbGlwLWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFFaEcsb0VBQXlIO0FBQ3pILGtFQUFnRTtBQXdEaEU7SUFyREE7UUF3RFcsMkJBQXNCLEdBQXFCLEVBQUUsQ0FBQztRQUM3QyxXQUFNLEdBQXVCLElBQUksbUJBQVksRUFBUSxDQUFDO1FBQ3RELFNBQUksR0FBaUMsSUFBSSxtQkFBWSxFQUFrQixDQUFDO1FBRTFFLGtCQUFhLEdBQW1CLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7SUEwRjVFLENBQUM7SUF4RkMsc0JBQVcseURBQW1CO2FBQTlCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxJQUFJLHNDQUFvQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHVEQUFpQjthQUE1QjtZQUNFLE1BQU0sQ0FBQyxtQ0FBaUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3hHLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMkRBQXFCO2FBQWhDO1lBQUEsaUJBR0M7WUFGQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQjtpQkFDL0IsSUFBSSxDQUFDLFVBQUEsa0JBQWtCLElBQUksT0FBQSw4QkFBWSxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsRUFBcEQsQ0FBb0QsQ0FBQyxDQUFDO1FBQ3RGLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOERBQXdCO2FBQW5DO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWTtnQkFDcEMsQ0FB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QUFNLEVBQUU7a0NBQVMsbUJBQVk7NERBQWtDO0lBQ3REO1FBQVQsYUFBTSxFQUFFO2tDQUFPLG1CQUFZOzBEQUFzRDtJQUx2RSx3QkFBd0I7UUFyRHBDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixRQUFRLEVBQUUsMDVEQThDVDtZQUNELGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FFVyx3QkFBd0IsQ0FpR3BDO0lBQUQsK0JBQUM7Q0FqR0QsQUFpR0MsSUFBQTtBQWpHWSw0REFBd0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXN1YmNsaXAtZWRpdG9yL3d6LnN1YmNsaXAtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycywgYm90aE1hcmtlcnNBcmVTZXQsIG5laXRoZXJNYXJrZXJzQXJlU2V0LCBtYXJrZXJzTWF0Y2ggfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otc3ViY2xpcC1lZGl0b3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx3ei1hZHZhbmNlZC1wbGF5ZXJcbiAgICAgIFt3aW5kb3ddPVwid2luZG93XCJcbiAgICAgIFthc3NldF09XCJlbmhhbmNlZEFzc2V0XCJcbiAgICAgIFtkaXNwbGF5QWxsQ29udHJvbHNdPVwiZmFsc2VcIlxuICAgICAgKG1hcmtlcnNJbml0aWFsaXphdGlvbik9XCJvblBsYXllck1hcmtlckNoYW5nZSgkZXZlbnQpXCJcbiAgICAgIChtYXJrZXJDaGFuZ2UpPVwib25QbGF5ZXJNYXJrZXJDaGFuZ2UoJGV2ZW50KVwiPlxuICAgIDwvd3otYWR2YW5jZWQtcGxheWVyPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJhc3NldEhhc01hcmtlcnNcIiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJzdGFydCBjZW50ZXJcIiBjbGFzcz1cImN1cnJlbnQtaW4tb3V0LW1hcmtlcnNcIj5cbiAgICAgIDxkaXYgbGF5b3V0PVwicm93XCIgbGF5b3V0LWFsaWduPVwic3RhcnRcIj5cbiAgICAgICAgPHNwYW4+e3sgJ0FTU0VULlNBVkVfU1VCQ0xJUC5DVVJSRU5UX01BUktFUlMuTEFCRUwnIHwgdHJhbnNsYXRlIH19PC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICB7eyAnQVNTRVQuU0FWRV9TVUJDTElQLkNVUlJFTlRfTUFSS0VSUy5WQUxVRScgfCBcbiAgICAgICAgICAgIHRyYW5zbGF0ZTp7IGluOiBhc3NldEluTWFya2VyIHwgdGltZWNvZGUsIG91dDogYXNzZXRPdXRNYXJrZXIgfCB0aW1lY29kZSB9IH19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgICBcbiAgICA8c2VjdGlvbiBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJlbmRcIj5cblxuICAgICAgPHNlY3Rpb24gbGF5b3V0PVwicm93XCIgbGF5b3V0LWFsaWduPVwiZW5kXCI+XG4gICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgIHRpdGxlPVwie3sgY2FuY2VsQnV0dG9uSG92ZXJUZXh0S2V5IHwgdHJhbnNsYXRlIH19XCJcbiAgICAgICAgICAoY2xpY2spPVwib25DYW5jZWxCdXR0b25DbGljaygpXCI+XG4gICAgICAgICAge3sgJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLkNBTkNFTC5MQUJFTCcgfCB0cmFuc2xhdGUgfX1cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwiaXMtb3V0bGluZWRcIiBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICAgICpuZ0lmPVwiIW1hcmtlcnNBcmVSZW1vdmFibGVcIlxuICAgICAgICAgIFtkaXNhYmxlZF09XCIhbWFya2Vyc0FyZVNhdmFibGVcIlxuICAgICAgICAgIHRpdGxlPVwie3sgbWFya2Vyc1NhdmVCdXR0b25Ib3ZlclRleHRLZXkgfFxuICAgICAgICAgICAgdHJhbnNsYXRlOnsgaW46IHBsYXllckluTWFya2VyIHwgdGltZWNvZGUsIG91dDogcGxheWVyT3V0TWFya2VyIHwgdGltZWNvZGUgfSB9fVwiXG4gICAgICAgICAgKGNsaWNrKT1cIm9uU2F2ZUJ1dHRvbkNsaWNrKClcIj5cbiAgICAgICAgICB7eyBtYXJrZXJzU2F2ZUJ1dHRvbkxhYmVsS2V5IHwgdHJhbnNsYXRlIH19XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBcbiAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNsYXNzPVwiaXMtb3V0bGluZWRcIiBjb2xvcj1cImFjY2VudFwiXG4gICAgICAgICAgKm5nSWY9XCJtYXJrZXJzQXJlUmVtb3ZhYmxlXCJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwibWFya2Vyc0FyZUFscmVhZHlVc2VkXCJcbiAgICAgICAgICB0aXRsZT1cInt7IG1hcmtlcnNSZW1vdmVCdXR0b25Ib3ZlclRleHRLZXkgfCB0cmFuc2xhdGUgfX1cIlxuICAgICAgICAgIChjbGljayk9XCJvblJlbW92ZUJ1dHRvbkNsaWNrKClcIj5cbiAgICAgICAgICB7eyAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uUkVNT1ZFLkxBQkVMJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L3NlY3Rpb24+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgV3pTdWJjbGlwRWRpdG9yQ29tcG9uZW50IHtcbiAgQElucHV0KCkgd2luZG93OiBhbnk7XG4gIEBJbnB1dCgpIGVuaGFuY2VkQXNzZXQ6IEVuaGFuY2VkQXNzZXQ7XG4gIEBJbnB1dCgpIGFscmVhZHlVc2VkTWFya2Vyc0xpc3Q6IFN1YmNsaXBNYXJrZXJzW10gPSBbXTtcbiAgQE91dHB1dCgpIGNhbmNlbDogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xuICBAT3V0cHV0KCkgc2F2ZTogRXZlbnRFbWl0dGVyPFN1YmNsaXBNYXJrZXJzPiA9IG5ldyBFdmVudEVtaXR0ZXI8U3ViY2xpcE1hcmtlcnM+KCk7XG5cbiAgcHJpdmF0ZSBwbGF5ZXJNYXJrZXJzOiBTdWJjbGlwTWFya2VycyA9IHsgaW46IHVuZGVmaW5lZCwgb3V0OiB1bmRlZmluZWQgfTtcblxuICBwdWJsaWMgZ2V0IG1hcmtlcnNBcmVSZW1vdmFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRBc3NldC5pc1N1YmNsaXBwZWQgJiYgbmVpdGhlck1hcmtlcnNBcmVTZXQodGhpcy5wbGF5ZXJNYXJrZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWFya2Vyc0FyZVNhdmFibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJvdGhNYXJrZXJzQXJlU2V0KHRoaXMucGxheWVyTWFya2VycykgJiYgdGhpcy5tYXJrZXJzQXJlQ2hhbmdlZCAmJiAhdGhpcy5tYXJrZXJzQXJlQWxyZWFkeVVzZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcmtlcnNBcmVBbHJlYWR5VXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hbHJlYWR5VXNlZE1hcmtlcnNMaXN0XG4gICAgICAuc29tZShhbHJlYWR5VXNlZE1hcmtlcnMgPT4gbWFya2Vyc01hdGNoKHRoaXMucGxheWVyTWFya2VycywgYWxyZWFkeVVzZWRNYXJrZXJzKSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbmNlbEJ1dHRvbkhvdmVyVGV4dEtleSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmVuaGFuY2VkQXNzZXQuaXNTdWJjbGlwcGVkXG4gICAgICA/ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5DQU5DRUwuVElUTEUuVVBEQVRFJ1xuICAgICAgOiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uQ0FOQ0VMLlRJVExFLkFERCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcmtlcnNTYXZlQnV0dG9uTGFiZWxLZXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LmlzU3ViY2xpcHBlZFxuICAgICAgPyAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5MQUJFTC5VUERBVEUnXG4gICAgICA6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLkxBQkVMLkFERCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcmtlcnNTYXZlQnV0dG9uSG92ZXJUZXh0S2V5KCk6IHN0cmluZyB7XG4gICAgaWYgKCFib3RoTWFya2Vyc0FyZVNldCh0aGlzLnBsYXllck1hcmtlcnMpKSByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LmlzU3ViY2xpcHBlZFxuICAgICAgPyAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuTk9UX1JFQURZJ1xuICAgICAgOiAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5BREQuTk9UX1JFQURZJztcblxuICAgIGlmICghdGhpcy5tYXJrZXJzQXJlQ2hhbmdlZCkgcmV0dXJuICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLk5PVF9DSEFOR0VEJztcblxuICAgIGlmICh0aGlzLm1hcmtlcnNBcmVBbHJlYWR5VXNlZCkgcmV0dXJuICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFMUkVBRFlfVVNFRCc7XG5cbiAgICByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LmlzU3ViY2xpcHBlZFxuICAgICAgPyAnQVNTRVQuU0FWRV9TVUJDTElQLkFDVElPTl9CVVRUT04uU0FWRS5USVRMRS5VUERBVEUuUkVBRFknXG4gICAgICA6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5TQVZFLlRJVExFLkFERC5SRUFEWSc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1hcmtlcnNSZW1vdmVCdXR0b25Ib3ZlclRleHRLZXkoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZXJzQXJlQWxyZWFkeVVzZWRcbiAgICAgID8gJ0FTU0VULlNBVkVfU1VCQ0xJUC5BQ1RJT05fQlVUVE9OLlJFTU9WRS5USVRMRS5BTFJFQURZX1VTRUQnXG4gICAgICA6ICdBU1NFVC5TQVZFX1NVQkNMSVAuQUNUSU9OX0JVVFRPTi5SRU1PVkUuVElUTEUuUkVBRFknO1xuICB9XG5cbiAgcHVibGljIG9uUGxheWVyTWFya2VyQ2hhbmdlKG5ld01hcmtlcnM6IFN1YmNsaXBNYXJrZXJzKTogdm9pZCB7XG4gICAgdGhpcy5wbGF5ZXJNYXJrZXJzID0gbmV3TWFya2VycztcbiAgfVxuXG4gIHB1YmxpYyBvbkNhbmNlbEJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuY2FuY2VsLmVtaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNhdmVCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRTYXZlRXZlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvblJlbW92ZUJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuZW1pdFNhdmVFdmVudCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBhc3NldEhhc01hcmtlcnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZW5oYW5jZWRBc3NldC5pc1N1YmNsaXBwZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFzc2V0SW5NYXJrZXIoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLmVuaGFuY2VkQXNzZXQuc3ViY2xpcE1hcmtlcnMuaW47XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFzc2V0T3V0TWFya2VyKCk6IEZyYW1lIHtcbiAgICByZXR1cm4gdGhpcy5lbmhhbmNlZEFzc2V0LnN1YmNsaXBNYXJrZXJzLm91dDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGxheWVySW5NYXJrZXIoKTogRnJhbWUge1xuICAgIHJldHVybiB0aGlzLnBsYXllck1hcmtlcnMuaW47XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBsYXllck91dE1hcmtlcigpOiBGcmFtZSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyTWFya2Vycy5vdXQ7XG4gIH1cblxuICBwcml2YXRlIGVtaXRTYXZlRXZlbnQoKTogdm9pZCB7XG4gICAgdGhpcy5zYXZlLmVtaXQodGhpcy5wbGF5ZXJNYXJrZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG1hcmtlcnNBcmVDaGFuZ2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhbWFya2Vyc01hdGNoKHRoaXMuZW5oYW5jZWRBc3NldC5zdWJjbGlwTWFya2VycywgdGhpcy5wbGF5ZXJNYXJrZXJzKTtcbiAgfVxufVxuIl19

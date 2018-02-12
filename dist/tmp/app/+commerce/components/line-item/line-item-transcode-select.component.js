"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LineItemTranscodeSelectComponent = (function () {
    function LineItemTranscodeSelectComponent() {
        this.readOnly = false;
        this.selectTarget = new core_1.EventEmitter();
    }
    LineItemTranscodeSelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'line-item-transcode-select-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <mat-form-field *ngIf=\"!readOnly\" class=\"delivery-format\">\n      <mat-select\n        placeholder=\"{{ 'ASSET.TRANSCODE_TARGETS.FORM_PLACEHOLDER' | translate }}\"\n        [(ngModel)]=\"selectedTarget\"\n        (change)=\"selectTarget.emit($event.value)\">\n          <mat-option\n            *ngFor=\"let target of transcodeTargets\"\n            [value]=\"target\">{{ 'ASSET.TRANSCODE_TARGETS.' + target | translate }}\n          </mat-option>\n      </mat-select>\n    </mat-form-field>\n    <div *ngIf=\"readOnly\" class=\"read-only-transcode\">\n      <span class=\"cart-asset-metadata mat-caption\">\n        <strong>{{ 'ASSET.TRANSCODE_TARGETS.FORM_PLACEHOLDER' | translate }}: </strong>\n        {{ 'ASSET.TRANSCODE_TARGETS.' + selectedTarget | translate }}\n      </span>\n    </div>\n  "
                },] },
    ];
    LineItemTranscodeSelectComponent.ctorParameters = function () { return []; };
    LineItemTranscodeSelectComponent.propDecorators = {
        'transcodeTargets': [{ type: core_1.Input },],
        'selectedTarget': [{ type: core_1.Input },],
        'readOnly': [{ type: core_1.Input },],
        'selectTarget': [{ type: core_1.Output },],
    };
    return LineItemTranscodeSelectComponent;
}());
exports.LineItemTranscodeSelectComponent = LineItemTranscodeSelectComponent;
//# sourceMappingURL=line-item-transcode-select.component.js.map
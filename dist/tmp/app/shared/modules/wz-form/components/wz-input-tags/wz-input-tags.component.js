"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzInputTagsComponent = (function () {
    function WzInputTagsComponent(ref) {
        this.ref = ref;
        this.tags = [];
        this.finalDelete = false;
    }
    WzInputTagsComponent.prototype.submit = function (e) {
        switch (e.code) {
            case 'Enter':
                var tag = e.target.value;
                if (!this.find(tag) && tag !== '' && this.tags.length <= 10) {
                    this.create(tag);
                }
                e.target.value = '';
                e.preventDefault();
                this.ref.markForCheck();
                return;
            case 'Backspace':
                if (e.target.value === '') {
                    if (this.finalDelete) {
                        this.delete(false, this.tags[this.tags.length - 1]);
                    }
                    else {
                        this.finalDelete = true;
                    }
                }
                this.ref.markForCheck();
                return;
            default:
                this.finalDelete = false;
                this.ref.markForCheck();
                return;
        }
    };
    WzInputTagsComponent.prototype.checkBeforeDelete = function (tag) {
        return (this.finalDelete && this.tags[this.tags.length - 1] === tag);
    };
    WzInputTagsComponent.prototype.delete = function ($event, tagForDelete) {
        if ($event === void 0) { $event = false; }
        this.tags = this.tags.filter(function (tag) { return tag !== tagForDelete; });
        this.fControl.setValue(this.tags.toString());
        this.finalDelete = false;
    };
    WzInputTagsComponent.prototype.create = function (tag) {
        this.tags = this.tags.concat(tag);
        this.fControl.setValue(this.tags.toString());
    };
    WzInputTagsComponent.prototype.find = function (tagCandidate) {
        return this.tags.filter(function (tag) { return tag === tagCandidate; }).length > 0;
    };
    WzInputTagsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-input-tags',
                    template: "<div class=\"mat-input-wrapper wz-tags\">\n                <ul *ngIf=\"tags.length > 0\">\n                  <li [ngClass]=\"{'ready-delete': checkBeforeDelete(tag)}\" *ngFor=\"let tag of tags;\">\n                    {{tag}}\n                    <a class=\"button delete\" mat-icon-button (click)=\"delete($event, tag)\">\n                      <mat-icon>cancel</mat-icon>\n                    </a>\n                  </li>\n                </ul>\n                <ng-content></ng-content>\n             </div>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    WzInputTagsComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
    ]; };
    WzInputTagsComponent.propDecorators = {
        'fControl': [{ type: core_1.Input },],
        'tags': [{ type: core_1.Input },],
    };
    return WzInputTagsComponent;
}());
exports.WzInputTagsComponent = WzInputTagsComponent;
//# sourceMappingURL=wz-input-tags.component.js.map
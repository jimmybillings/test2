"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AdministerQuoteComponent = (function () {
    function AdministerQuoteComponent() {
        this.notify = new core_1.EventEmitter();
    }
    AdministerQuoteComponent.prototype.onSaveAndNew = function () {
        this.notify.emit({ type: 'SAVE_AND_NEW' });
    };
    AdministerQuoteComponent.prototype.onOpenDeleteDialog = function () {
        this.notify.emit({ type: 'OPEN_DELETE_DIALOG' });
    };
    AdministerQuoteComponent.prototype.onClickCloneQuoteButton = function () {
        this.notify.emit({ type: 'CLONE_QUOTE' });
    };
    AdministerQuoteComponent.prototype.goToNextTab = function () {
        this.notify.emit({ type: 'GO_TO_NEXT_TAB' });
    };
    AdministerQuoteComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'administer-quote-component',
                    template: "\n    <div flex=\"100\" layout-gt-xs=\"row\" layout=\"column\" layout-align=\"space-between end\" layout-align-xs=\"end end\">\n      <div class=\"reject-quote\" flex-gt-xs=\"auto\" flex=\"100\" flex-order-xs=\"2\">\t\n        <button mat-button color=\"primary\" (click)=\"onOpenDeleteDialog()\">\n          <mat-icon>delete</mat-icon>{{ 'QUOTE.DELETE_BTN' | translate }}\n        </button>\n      </div>\n      <section flex-gt-xs=\"65\" flex=\"100\" class=\"action-items\" flex-order-xs=\"-1\">\n        <button\n        mat-button\n        color=\"primary\"\n        [disabled]=\"!shouldShowCloneButton\"\n        (click)=\"onClickCloneQuoteButton()\">\n        {{ 'QUOTE.CLONE_QUOTE' | translate }}\n        </button>\n        <button\n        mat-button\n        color=\"primary\"\n        (click)=\"onSaveAndNew()\">\n        {{ 'QUOTE.SAVE_AND_NEW' | translate }}\n        </button>\n        <button\n          [disabled]=\"!userCanProceed\"\n          mat-raised-button\n          color=\"primary\"\n          (click)=\"goToNextTab()\">\n          {{ 'QUOTE.EDIT.TO_RECIPIENT_TAB_BTN' | translate }}\n        </button>\n      </section>\n    </div>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    AdministerQuoteComponent.ctorParameters = function () { return []; };
    AdministerQuoteComponent.propDecorators = {
        'userCanProceed': [{ type: core_1.Input },],
        'shouldShowCloneButton': [{ type: core_1.Input },],
        'notify': [{ type: core_1.Output },],
    };
    return AdministerQuoteComponent;
}());
exports.AdministerQuoteComponent = AdministerQuoteComponent;
//# sourceMappingURL=administer-quote.component.js.map
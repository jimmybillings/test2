"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var WzShareLinkComponent = (function () {
    function WzShareLinkComponent(store) {
        this.store = store;
        this.closeRequest = new core_1.EventEmitter();
    }
    WzShareLinkComponent.prototype.selectInputForCopy = function (event) {
        event.target.select();
    };
    WzShareLinkComponent.prototype.onCopyShareLinkButtonClick = function () {
        this.store.dispatch(function (factory) { return factory.snackbar.display('SHARING.SHARE_LINK.COPIED_CONFIRMED_MESSAGE'); });
    };
    WzShareLinkComponent.prototype.onPreviousButtonClick = function () {
        this.requestClose();
    };
    WzShareLinkComponent.prototype.onCloseButtonClick = function () {
        this.requestClose();
    };
    WzShareLinkComponent.prototype.onOutsideClick = function () {
        this.requestClose();
    };
    WzShareLinkComponent.prototype.requestClose = function () {
        this.closeRequest.emit();
    };
    WzShareLinkComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-share-link',
                    templateUrl: 'wz.share-link.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzShareLinkComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    WzShareLinkComponent.propDecorators = {
        'shareLink': [{ type: core_1.Input },],
        'closeRequest': [{ type: core_1.Output },],
    };
    return WzShareLinkComponent;
}());
exports.WzShareLinkComponent = WzShareLinkComponent;
//# sourceMappingURL=wz.share-link.component.js.map
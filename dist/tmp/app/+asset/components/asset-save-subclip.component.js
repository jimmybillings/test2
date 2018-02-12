"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wz_form_component_1 = require("../../shared/modules/wz-form/wz.form.component");
var app_store_1 = require("../../app.store");
var AssetSaveSubclipComponent = (function () {
    function AssetSaveSubclipComponent(store, changeDetector) {
        this.store = store;
        this.changeDetector = changeDetector;
        this.onAddSubclipToCart = new core_1.EventEmitter();
        this.ontoggleSubclipPanel = new core_1.EventEmitter();
        this.formItems = [];
    }
    AssetSaveSubclipComponent.prototype.addSubclipToActiveCollection = function (comment) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.activeCollection.addAsset(_this.asset, _this.subclipMarkers); });
        this.clearAndClose();
    };
    AssetSaveSubclipComponent.prototype.addSubclipToCart = function () {
        this.onAddSubclipToCart.emit();
        this.clearAndClose();
    };
    AssetSaveSubclipComponent.prototype.clearAndClose = function () {
        this.formItems = this.clearForm();
        this.wzForm.resetForm();
        this.changeDetector.markForCheck();
        this.ontoggleSubclipPanel.emit();
    };
    AssetSaveSubclipComponent.prototype.clearForm = function () {
        return this.formItems
            .map(function (field) {
            field.value = '';
            return field;
        });
    };
    AssetSaveSubclipComponent.prototype.error = function (error) {
        this.serverErrors = error.json();
        this.changeDetector.markForCheck();
    };
    AssetSaveSubclipComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-save-subclip',
                    templateUrl: 'asset-save-subclip.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AssetSaveSubclipComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    AssetSaveSubclipComponent.propDecorators = {
        'config': [{ type: core_1.Input },],
        'userCan': [{ type: core_1.Input },],
        'asset': [{ type: core_1.Input },],
        'activeCollectionName': [{ type: core_1.Input },],
        'subclipMarkers': [{ type: core_1.Input },],
        'onAddSubclipToCart': [{ type: core_1.Output },],
        'ontoggleSubclipPanel': [{ type: core_1.Output },],
        'wzForm': [{ type: core_1.ViewChild, args: [wz_form_component_1.WzFormComponent,] },],
    };
    return AssetSaveSubclipComponent;
}());
exports.AssetSaveSubclipComponent = AssetSaveSubclipComponent;
//# sourceMappingURL=asset-save-subclip.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var LicenseAgreementComponent = (function () {
    function LicenseAgreementComponent() {
        this.close = new core_1.EventEmitter();
    }
    Object.defineProperty(LicenseAgreementComponent.prototype, "licenses", {
        set: function (licenses) {
            var _this = this;
            this._licenses = licenses.items.map(function (license) {
                license.matchingAssets = license.matchingAssets.map(function (asset) {
                    return enhanced_asset_1.enhanceAsset(Object.assign(asset, { uuid: asset.assetLineItemId }), _this.assetType, _this.parentId);
                });
                return license;
            });
        },
        enumerable: true,
        configurable: true
    });
    LicenseAgreementComponent.prototype.onClickLink = function () {
        this.close.emit();
    };
    LicenseAgreementComponent.prototype.labelForLicense = function (license) {
        return (!license.projectType || license.rights !== 'Rights Managed')
            ? license.rights
            : license.projectType;
    };
    LicenseAgreementComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'license-agreement-component',
                    templateUrl: 'license-agreement.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    LicenseAgreementComponent.ctorParameters = function () { return []; };
    LicenseAgreementComponent.propDecorators = {
        'assetType': [{ type: core_1.Input },],
        'parentId': [{ type: core_1.Input },],
        'licenses': [{ type: core_1.Input },],
        'close': [{ type: core_1.Output },],
    };
    return LicenseAgreementComponent;
}());
exports.LicenseAgreementComponent = LicenseAgreementComponent;
//# sourceMappingURL=license-agreement.component.js.map
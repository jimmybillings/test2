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
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LicenseAgreementComponent.prototype, "assetType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], LicenseAgreementComponent.prototype, "parentId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], LicenseAgreementComponent.prototype, "licenses", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LicenseAgreementComponent.prototype, "close", void 0);
    LicenseAgreementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'license-agreement-component',
            templateUrl: 'license-agreement.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], LicenseAgreementComponent);
    return LicenseAgreementComponent;
}());
exports.LicenseAgreementComponent = LicenseAgreementComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saWNlbnNlLWFncmVlbWVudC9saWNlbnNlLWFncmVlbWVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFFaEcsNEVBQW9GO0FBVXBGO0lBUEE7UUF1QlksVUFBSyxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQVczRCxDQUFDO0lBckJDLHNCQUFJLCtDQUFRO2FBQVosVUFBYSxRQUEyQjtZQUR4QyxpQkFTQztZQVBDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUF5QjtnQkFDNUQsT0FBTyxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQW1CO29CQUN0RSxNQUFNLENBQUMsNkJBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDNUcsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7OztPQUFBO0lBSU0sK0NBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxtREFBZSxHQUF0QixVQUF1QixPQUF5QjtRQUM5QyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxnQkFBZ0IsQ0FBQztZQUNsRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDaEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQXZCUTtRQUFSLFlBQUssRUFBRTs7Z0VBQXNCO0lBQ3JCO1FBQVIsWUFBSyxFQUFFOzsrREFBa0I7SUFFMUI7UUFEQyxZQUFLLEVBQUU7Ozs2REFTUDtJQUVTO1FBQVQsYUFBTSxFQUFFO2tDQUFRLG1CQUFZOzREQUE0QjtJQWhCOUMseUJBQXlCO1FBUHJDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDZCQUE2QjtZQUN2QyxXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7T0FFVyx5QkFBeUIsQ0EyQnJDO0lBQUQsZ0NBQUM7Q0EzQkQsQUEyQkMsSUFBQTtBQTNCWSw4REFBeUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL2xpY2Vuc2UtYWdyZWVtZW50L2xpY2Vuc2UtYWdyZWVtZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGljZW5zZUFncmVlbWVudCwgTGljZW5zZUFncmVlbWVudHMsIExpY2Vuc2VBc3NldCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBlbmhhbmNlQXNzZXQsIEFzc2V0VHlwZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2xpY2Vuc2UtYWdyZWVtZW50LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnbGljZW5zZS1hZ3JlZW1lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgTGljZW5zZUFncmVlbWVudENvbXBvbmVudCB7XG4gIHB1YmxpYyBfbGljZW5zZXM6IExpY2Vuc2VBZ3JlZW1lbnRbXTtcblxuICBASW5wdXQoKSBhc3NldFR5cGU6IEFzc2V0VHlwZTtcbiAgQElucHV0KCkgcGFyZW50SWQ6IG51bWJlcjtcbiAgQElucHV0KClcbiAgc2V0IGxpY2Vuc2VzKGxpY2Vuc2VzOiBMaWNlbnNlQWdyZWVtZW50cykge1xuICAgIHRoaXMuX2xpY2Vuc2VzID0gbGljZW5zZXMuaXRlbXMubWFwKChsaWNlbnNlOiBMaWNlbnNlQWdyZWVtZW50KSA9PiB7XG4gICAgICBsaWNlbnNlLm1hdGNoaW5nQXNzZXRzID0gbGljZW5zZS5tYXRjaGluZ0Fzc2V0cy5tYXAoKGFzc2V0OiBMaWNlbnNlQXNzZXQpID0+IHtcbiAgICAgICAgcmV0dXJuIGVuaGFuY2VBc3NldChPYmplY3QuYXNzaWduKGFzc2V0LCB7IHV1aWQ6IGFzc2V0LmFzc2V0TGluZUl0ZW1JZCB9KSwgdGhpcy5hc3NldFR5cGUsIHRoaXMucGFyZW50SWQpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBsaWNlbnNlO1xuICAgIH0pO1xuICB9XG5cbiAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIG9uQ2xpY2tMaW5rKCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2UuZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIGxhYmVsRm9yTGljZW5zZShsaWNlbnNlOiBMaWNlbnNlQWdyZWVtZW50KTogc3RyaW5nIHtcbiAgICByZXR1cm4gKCFsaWNlbnNlLnByb2plY3RUeXBlIHx8IGxpY2Vuc2UucmlnaHRzICE9PSAnUmlnaHRzIE1hbmFnZWQnKVxuICAgICAgPyBsaWNlbnNlLnJpZ2h0c1xuICAgICAgOiBsaWNlbnNlLnByb2plY3RUeXBlO1xuICB9XG59XG4iXX0=

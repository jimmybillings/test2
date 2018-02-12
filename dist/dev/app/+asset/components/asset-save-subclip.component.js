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
var wz_form_component_1 = require("../../shared/modules/wz-form/wz.form.component");
var capabilities_service_1 = require("../../shared/services/capabilities.service");
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetSaveSubclipComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", capabilities_service_1.Capabilities)
    ], AssetSaveSubclipComponent.prototype, "userCan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetSaveSubclipComponent.prototype, "asset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AssetSaveSubclipComponent.prototype, "activeCollectionName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetSaveSubclipComponent.prototype, "subclipMarkers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetSaveSubclipComponent.prototype, "onAddSubclipToCart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetSaveSubclipComponent.prototype, "ontoggleSubclipPanel", void 0);
    __decorate([
        core_1.ViewChild(wz_form_component_1.WzFormComponent),
        __metadata("design:type", wz_form_component_1.WzFormComponent)
    ], AssetSaveSubclipComponent.prototype, "wzForm", void 0);
    AssetSaveSubclipComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-save-subclip',
            templateUrl: 'asset-save-subclip.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore, core_1.ChangeDetectorRef])
    ], AssetSaveSubclipComponent);
    return AssetSaveSubclipComponent;
}());
exports.AssetSaveSubclipComponent = AssetSaveSubclipComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvY29tcG9uZW50cy9hc3NldC1zYXZlLXN1YmNsaXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBR3VCO0FBRXZCLG9GQUFpRjtBQUNqRixtRkFBMEU7QUFFMUUsNkNBQTJDO0FBVTNDO0lBZUUsbUNBQW9CLEtBQWUsRUFBVSxjQUFpQztRQUExRCxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBVHBFLHVCQUFrQixHQUF1QixJQUFJLG1CQUFZLEVBQVEsQ0FBQztRQUNsRSx5QkFBb0IsR0FBdUIsSUFBSSxtQkFBWSxFQUFRLENBQUM7UUFJdkUsY0FBUyxHQUFlLEVBQUUsQ0FBQztJQUlnRCxDQUFDO0lBRTVFLGdFQUE0QixHQUFuQyxVQUFvQyxPQUFZO1FBQWhELGlCQUdDO1FBRkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxFQUFsRSxDQUFrRSxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxvREFBZ0IsR0FBdkI7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxpREFBYSxHQUFwQjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVPLDZDQUFTLEdBQWpCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2FBQ2xCLEdBQUcsQ0FBQyxVQUFDLEtBQWlCO1lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyx5Q0FBSyxHQUFiLFVBQWMsS0FBVTtRQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUE1Q1E7UUFBUixZQUFLLEVBQUU7OzZEQUFhO0lBQ1o7UUFBUixZQUFLLEVBQUU7a0NBQWlCLG1DQUFZOzhEQUFDO0lBQzdCO1FBQVIsWUFBSyxFQUFFOzs0REFBYztJQUNiO1FBQVIsWUFBSyxFQUFFOzsyRUFBOEI7SUFDN0I7UUFBUixZQUFLLEVBQUU7O3FFQUFnQztJQUM5QjtRQUFULGFBQU0sRUFBRTtrQ0FBcUIsbUJBQVk7eUVBQWtDO0lBQ2xFO1FBQVQsYUFBTSxFQUFFO2tDQUF1QixtQkFBWTsyRUFBa0M7SUFNbEQ7UUFBM0IsZ0JBQVMsQ0FBQyxtQ0FBZSxDQUFDO2tDQUFpQixtQ0FBZTs2REFBQztJQWJqRCx5QkFBeUI7UUFQckMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FpQjJCLG9CQUFRLEVBQTBCLHdCQUFpQjtPQWZuRSx5QkFBeUIsQ0E4Q3JDO0lBQUQsZ0NBQUM7Q0E5Q0QsQUE4Q0MsSUFBQTtBQTlDWSw4REFBeUIiLCJmaWxlIjoiYXBwLythc3NldC9jb21wb25lbnRzL2Fzc2V0LXNhdmUtc3ViY2xpcC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFZpZXdDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IFd6Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vd3ouZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2Fzc2V0LXNhdmUtc3ViY2xpcCcsXG4gIHRlbXBsYXRlVXJsOiAnYXNzZXQtc2F2ZS1zdWJjbGlwLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEFzc2V0U2F2ZVN1YmNsaXBDb21wb25lbnQge1xuICBASW5wdXQoKSBjb25maWc6IGFueTtcbiAgQElucHV0KCkgcHVibGljIHVzZXJDYW46IENhcGFiaWxpdGllcztcbiAgQElucHV0KCkgYXNzZXQ6IEFzc2V0O1xuICBASW5wdXQoKSBhY3RpdmVDb2xsZWN0aW9uTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBzdWJjbGlwTWFya2VyczogU3ViY2xpcE1hcmtlcnM7XG4gIEBPdXRwdXQoKSBvbkFkZFN1YmNsaXBUb0NhcnQ6IEV2ZW50RW1pdHRlcjxudWxsPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcbiAgQE91dHB1dCgpIG9udG9nZ2xlU3ViY2xpcFBhbmVsOiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XG5cbiAgcHVibGljIHNob3dBc3NldFNhdmVTdWJjbGlwOiBib29sZWFuO1xuICBwdWJsaWMgc2VydmVyRXJyb3JzOiBhbnk7XG4gIHB1YmxpYyBmb3JtSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcblxuICBAVmlld0NoaWxkKFd6Rm9ybUNvbXBvbmVudCkgcHJpdmF0ZSB3ekZvcm06IFd6Rm9ybUNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSwgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gIHB1YmxpYyBhZGRTdWJjbGlwVG9BY3RpdmVDb2xsZWN0aW9uKGNvbW1lbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmFjdGl2ZUNvbGxlY3Rpb24uYWRkQXNzZXQodGhpcy5hc3NldCwgdGhpcy5zdWJjbGlwTWFya2VycykpO1xuICAgIHRoaXMuY2xlYXJBbmRDbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIGFkZFN1YmNsaXBUb0NhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5vbkFkZFN1YmNsaXBUb0NhcnQuZW1pdCgpO1xuICAgIHRoaXMuY2xlYXJBbmRDbG9zZSgpO1xuICB9XG5cbiAgcHVibGljIGNsZWFyQW5kQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtSXRlbXMgPSB0aGlzLmNsZWFyRm9ybSgpO1xuICAgIHRoaXMud3pGb3JtLnJlc2V0Rm9ybSgpO1xuICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5vbnRvZ2dsZVN1YmNsaXBQYW5lbC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtSXRlbXNcbiAgICAgIC5tYXAoKGZpZWxkOiBGb3JtRmllbGRzKSA9PiB7XG4gICAgICAgIGZpZWxkLnZhbHVlID0gJyc7XG4gICAgICAgIHJldHVybiBmaWVsZDtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBlcnJvcihlcnJvcjogYW55KSB7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvcnMgPSBlcnJvci5qc29uKCk7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19

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
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var pricing_service_1 = require("./pricing.service");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var PricingActions = require("./pricing.actions");
var PricingEffects = (function () {
    function PricingEffects(actions, store, service, dialogService) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.dialogService = dialogService;
        this.initializePricing = this.actions.ofType(PricingActions.InitializePricing.Type)
            .withLatestFrom(this.store.select(function (state) { return state.pricing; }))
            .map(function (_a) {
            var action = _a[0], state = _a[1];
            return _this.store.create(_this.nextActionFor(action, state.attributes));
        });
        this.getAttributes = this.actions.ofType(PricingActions.GetAttributes.Type)
            .switchMap(function (action) { return _this.service.getPriceAttributes(action.rightsReproduction)
            .map(function (attributes) { return _this.store.create(function (factory) { return factory.pricing.getAttributesSuccess(attributes, action.rightsReproduction, action.dialogOptions); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.pricing.getAttributesFailure(error); })); }); });
        this.getAttributesSuccess = this.actions.ofType(PricingActions.GetAttributesSuccess.Type)
            .map(function (action) { return _this.store.create(function (factory) {
            return factory.pricing.openDialog(action.dialogOptions);
        }); });
        this.calculatePrice = this.actions.ofType(PricingActions.CalculatePrice.Type)
            .switchMap(function (action) {
            return _this.service.getPrice(action.selectedAttributes, action.assetId, action.subclipMarkers)
                .map(function (price) { return _this.store.create(function (factory) { return factory.pricing.calculatePriceSuccess(price); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.pricing.calculatePriceFailure(error); })); });
        });
        this.calculatePriceSuccess = this.actions.ofType(PricingActions.CalculatePriceSuccess.Type)
            .map(function (action) {
            return _this.store.create(function (factory) { return factory.pricing.setPriceForDialog(action.price); });
        });
        this.openDialog = this.actions.ofType(PricingActions.OpenDialog.Type)
            .do(function (action) { return _this.dialogService.openComponentInDialog(action.dialogOptions); });
    }
    PricingEffects.prototype.nextActionFor = function (action, attributes) {
        if (attributes === null) {
            return function (factory) { return factory.pricing.getAttributes(action.rightsReproduction, action.dialogOptions); };
        }
        return function (factory) { return factory.pricing.openDialog(action.dialogOptions); };
    };
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], PricingEffects.prototype, "initializePricing", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], PricingEffects.prototype, "getAttributes", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], PricingEffects.prototype, "getAttributesSuccess", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], PricingEffects.prototype, "calculatePrice", void 0);
    __decorate([
        effects_1.Effect(),
        __metadata("design:type", Observable_1.Observable)
    ], PricingEffects.prototype, "calculatePriceSuccess", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], PricingEffects.prototype, "openDialog", void 0);
    PricingEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions,
            app_store_1.AppStore,
            pricing_service_1.PricingService,
            wz_dialog_service_1.WzDialogService])
    ], PricingEffects);
    return PricingEffects;
}());
exports.PricingEffects = PricingEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuZWZmZWN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhDQUE2QztBQUM3QyxzQ0FBMkM7QUFDM0MseUNBQWdEO0FBR2hELDZDQUFzRjtBQUV0RixxREFBbUQ7QUFDbkQsK0ZBQTRGO0FBQzVGLGtEQUFvRDtBQUdwRDtJQTJDRSx3QkFDVSxPQUFnQixFQUNoQixLQUFlLEVBQ2YsT0FBdUIsRUFDdkIsYUFBOEI7UUFKeEMsaUJBS0s7UUFKSyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUE3Q2pDLHNCQUFpQixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO2FBQ3RHLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxPQUFPLEVBQWIsQ0FBYSxDQUFDLENBQUM7YUFDekQsR0FBRyxDQUFDLFVBQUMsRUFBaUU7Z0JBQWhFLGNBQU0sRUFBRSxhQUFLO1lBQ2xCLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQS9ELENBQStELENBQ2hFLENBQUM7UUFHRyxrQkFBYSxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzthQUM5RixTQUFTLENBQUMsVUFBQyxNQUFvQyxJQUFLLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7YUFDNUcsR0FBRyxDQUFDLFVB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QyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUM3QyxNQUFNLENBQUMsa0JBQWtCLEVBQ3pCLE1BQU0sQ0FBQyxhQUFhLENBQ3JCLEVBSGlCLENBR2pCLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFoRCxDQUFnRCxDQUFDO0lBQ3JFLENBQUM7SUF6REQ7UUFEQyxnQkFBTSxFQUFFO2tDQUNpQix1QkFBVTs2REFJaEM7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2EsdUJBQVU7eURBUTVCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNvQix1QkFBVTtnRUFHbkM7SUFHSjtRQURDLGdCQUFNLEVBQUU7a0NBQ2MsdUJBQVU7MERBSzdCO0lBR0o7UUFEQyxnQkFBTSxFQUFFO2tDQUNxQix1QkFBVTtpRUFHcEM7SUFHSjtRQURDLGdCQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7a0NBQ1QsdUJBQVU7c0RBQ2dGO0lBekNsRyxjQUFjO1FBRDFCLGlCQUFVLEVBQUU7eUNBNkNRLGlCQUFPO1lBQ1Qsb0JBQVE7WUFDTixnQ0FBYztZQUNSLG1DQUFlO09BL0M3QixjQUFjLENBNEQxQjtJQUFELHFCQUFDO0NBNURELEFBNERDLElBQUE7QUE1RFksd0NBQWMiLCJmaWxlIjoiYXBwL3N0b3JlL3ByaWNpbmcvcHJpY2luZy5lZmZlY3RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgQXBwU3RvcmUsIFByaWNpbmdTdGF0ZSwgSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFByaWNlQXR0cmlidXRlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IFByaWNpbmdTZXJ2aWNlIH0gZnJvbSAnLi9wcmljaW5nLnNlcnZpY2UnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIFByaWNpbmdBY3Rpb25zIGZyb20gJy4vcHJpY2luZy5hY3Rpb25zJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByaWNpbmdFZmZlY3RzIHtcbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBpbml0aWFsaXplUHJpY2luZzogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShQcmljaW5nQWN0aW9ucy5Jbml0aWFsaXplUHJpY2luZy5UeXBlKVxuICAgIC53aXRoTGF0ZXN0RnJvbSh0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5wcmljaW5nKSlcbiAgICAubWFwKChbYWN0aW9uLCBzdGF0ZV06IFtQcmljaW5nQWN0aW9ucy5Jbml0aWFsaXplUHJpY2luZywgUHJpY2luZ1N0YXRlXSkgPT5cbiAgICAgIHRoaXMuc3RvcmUuY3JlYXRlKHRoaXMubmV4dEFjdGlvbkZvcihhY3Rpb24sIHN0YXRlLmF0dHJpYnV0ZXMpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBnZXRBdHRyaWJ1dGVzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFByaWNpbmdBY3Rpb25zLkdldEF0dHJpYnV0ZXMuVHlwZSlcbiAgICAuc3dpdGNoTWFwKChhY3Rpb246IFByaWNpbmdBY3Rpb25zLkdldEF0dHJpYnV0ZXMpID0+IHRoaXMuc2VydmljZS5nZXRQcmljZUF0dHJpYnV0ZXMoYWN0aW9uLnJpZ2h0c1JlcHJvZHVjdGlvbilcbiAgICAgIC5tYXAoYXR0cmlidXRlcyA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5nZXRBdHRyaWJ1dGVzU3VjY2VzcyhcbiAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgYWN0aW9uLnJpZ2h0c1JlcHJvZHVjdGlvbixcbiAgICAgICAgYWN0aW9uLmRpYWxvZ09wdGlvbnNcbiAgICAgICkpKVxuICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnByaWNpbmcuZ2V0QXR0cmlidXRlc0ZhaWx1cmUoZXJyb3IpKSkpXG4gICAgKTtcblxuICBARWZmZWN0KClcbiAgcHVibGljIGdldEF0dHJpYnV0ZXNTdWNjZXNzOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFByaWNpbmdBY3Rpb25zLkdldEF0dHJpYnV0ZXNTdWNjZXNzLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBQcmljaW5nQWN0aW9ucy5HZXRBdHRyaWJ1dGVzU3VjY2VzcykgPT4gdGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PlxuICAgICAgZmFjdG9yeS5wcmljaW5nLm9wZW5EaWFsb2coYWN0aW9uLmRpYWxvZ09wdGlvbnMpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBjYWxjdWxhdGVQcmljZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShQcmljaW5nQWN0aW9ucy5DYWxjdWxhdGVQcmljZS5UeXBlKVxuICAgIC5zd2l0Y2hNYXAoKGFjdGlvbjogUHJpY2luZ0FjdGlvbnMuQ2FsY3VsYXRlUHJpY2UpID0+XG4gICAgICB0aGlzLnNlcnZpY2UuZ2V0UHJpY2UoYWN0aW9uLnNlbGVjdGVkQXR0cmlidXRlcywgYWN0aW9uLmFzc2V0SWQsIGFjdGlvbi5zdWJjbGlwTWFya2VycylcbiAgICAgICAgLm1hcChwcmljZSA9PiB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5jYWxjdWxhdGVQcmljZVN1Y2Nlc3MocHJpY2UpKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IE9ic2VydmFibGUub2YodGhpcy5zdG9yZS5jcmVhdGUoZmFjdG9yeSA9PiBmYWN0b3J5LnByaWNpbmcuY2FsY3VsYXRlUHJpY2VGYWlsdXJlKGVycm9yKSkpKVxuICAgICk7XG5cbiAgQEVmZmVjdCgpXG4gIHB1YmxpYyBjYWxjdWxhdGVQcmljZVN1Y2Nlc3M6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUHJpY2luZ0FjdGlvbnMuQ2FsY3VsYXRlUHJpY2VTdWNjZXNzLlR5cGUpXG4gICAgLm1hcCgoYWN0aW9uOiBQcmljaW5nQWN0aW9ucy5DYWxjdWxhdGVQcmljZVN1Y2Nlc3MpID0+XG4gICAgICB0aGlzLnN0b3JlLmNyZWF0ZShmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5zZXRQcmljZUZvckRpYWxvZyhhY3Rpb24ucHJpY2UpKVxuICAgICk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgb3BlbkRpYWxvZzogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShQcmljaW5nQWN0aW9ucy5PcGVuRGlhbG9nLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IFByaWNpbmdBY3Rpb25zLk9wZW5EaWFsb2cpID0+IHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coYWN0aW9uLmRpYWxvZ09wdGlvbnMpKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnM6IEFjdGlvbnMsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSBzZXJ2aWNlOiBQcmljaW5nU2VydmljZSxcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZVxuICApIHsgfVxuXG4gIHByaXZhdGUgbmV4dEFjdGlvbkZvcihhY3Rpb246IFByaWNpbmdBY3Rpb25zLkluaXRpYWxpemVQcmljaW5nLCBhdHRyaWJ1dGVzOiBQcmljZUF0dHJpYnV0ZVtdKTogSW50ZXJuYWxBY3Rpb25GYWN0b3J5TWFwcGVyIHtcbiAgICBpZiAoYXR0cmlidXRlcyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLmdldEF0dHJpYnV0ZXMoXG4gICAgICAgIGFjdGlvbi5yaWdodHNSZXByb2R1Y3Rpb24sXG4gICAgICAgIGFjdGlvbi5kaWFsb2dPcHRpb25zXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5vcGVuRGlhbG9nKGFjdGlvbi5kaWFsb2dPcHRpb25zKTtcbiAgfVxufVxuIl19

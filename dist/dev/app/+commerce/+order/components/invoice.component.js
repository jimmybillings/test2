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
var router_1 = require("@angular/router");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var wz_dialog_service_1 = require("../../../shared/modules/wz-dialog/services/wz.dialog.service");
var license_agreement_component_1 = require("../../components/license-agreement/license-agreement.component");
var InvoiceComponent = (function () {
    function InvoiceComponent(store, route, dialogService) {
        this.store = store;
        this.route = route;
        this.dialogService = dialogService;
        this.isShared = this.route.params.map(function (params) { return !!params['share_key']; });
        this.invoiceObservable = this.store.select(function (state) { return state.invoice.invoice; })
            .map(function (currentInvoice) {
            var invoice = common_functions_1.Common.clone(currentInvoice);
            invoice.order.projects = invoice.order.projects.map(function (project) {
                if (project.lineItems) {
                    project.lineItems = project.lineItems.map(function (lineItem) {
                        lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'order', invoice.order.id);
                        return lineItem;
                    });
                }
                return project;
            });
            return invoice;
        });
    }
    InvoiceComponent.prototype.hasProp = function (obj) {
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        if (props.length > 0) {
            if (obj && obj.hasOwnProperty(props[0])) {
                if (obj[props[0]] === '' || obj[props[0]] === 0 || JSON.stringify(obj[props[0]]) === JSON.stringify({})) {
                    return false;
                }
                else {
                    var prop = props.shift();
                    return this.hasProp.apply(this, [obj[prop]].concat(props));
                }
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    };
    InvoiceComponent.prototype.shouldDisplayRights = function (lineItem, invoice) {
        return lineItem.rightsManaged === 'Rights Managed' && !commerce_interface_1.quotesWithoutPricing.includes(invoice.order.orderType);
    };
    InvoiceComponent.prototype.shouldShowLicenseDetailsBtn = function (licenseAgreements) {
        return !!licenseAgreements.items;
    };
    InvoiceComponent.prototype.showLicenseAgreements = function (licenseAgreements) {
        this.dialogService.openComponentInDialog({
            componentType: license_agreement_component_1.LicenseAgreementComponent,
            dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
            inputOptions: {
                assetType: 'order',
                licenses: licenseAgreements
            },
            outputOptions: [
                {
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }
            ]
        });
    };
    InvoiceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'invoice-component',
            templateUrl: 'invoice.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore,
            router_1.ActivatedRoute,
            wz_dialog_service_1.WzDialogService])
    ], InvoiceComponent);
    return InvoiceComponent;
}());
exports.InvoiceComponent = InvoiceComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL2NvbXBvbmVudHMvaW52b2ljZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUU7QUFDbkUsMENBQWlEO0FBRWpELG9GQUF5STtBQUN6SSw0RUFBeUU7QUFFekUsZ0RBQThDO0FBRTlDLCtFQUFvRTtBQUNwRSxrR0FBK0Y7QUFDL0YsOEdBQTJHO0FBUzNHO0lBSUUsMEJBQ1UsS0FBZSxFQUNmLEtBQXFCLEVBQ3JCLGFBQThCO1FBRjlCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQXJCLENBQXFCLENBQUM7YUFDdkUsR0FBRyxDQUFDLFVBQUMsY0FBYztZQUNsQixJQUFNLE9BQU8sR0FBWSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQyxPQUFnQjtnQkFDbkUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUF1Qjt3QkFDaEUsUUFB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Q1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLGNBQWM7WUFDM0IsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FPaUIsb0JBQVE7WUFDUix1QkFBYztZQUNOLG1DQUFlO09BUDdCLGdCQUFnQixDQXVFNUI7SUFBRCx1QkFBQztDQXZFRCxBQXVFQyxJQUFBO0FBdkVZLDRDQUFnQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytvcmRlci9jb21wb25lbnRzL2ludm9pY2UuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBJbnZvaWNlLCBQcm9qZWN0LCBBc3NldExpbmVJdGVtLCBxdW90ZXNXaXRob3V0UHJpY2luZywgTGljZW5zZUFncmVlbWVudHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZW5oYW5jZUFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xpY2Vuc2UtYWdyZWVtZW50L2xpY2Vuc2UtYWdyZWVtZW50LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2ludm9pY2UtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdpbnZvaWNlLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIEludm9pY2VDb21wb25lbnQge1xuICBwdWJsaWMgaXNTaGFyZWQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHB1YmxpYyBpbnZvaWNlT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxJbnZvaWNlPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSkge1xuICAgIHRoaXMuaXNTaGFyZWQgPSB0aGlzLnJvdXRlLnBhcmFtcy5tYXAocGFyYW1zID0+ICEhcGFyYW1zWydzaGFyZV9rZXknXSk7XG4gICAgdGhpcy5pbnZvaWNlT2JzZXJ2YWJsZSA9IHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmludm9pY2UuaW52b2ljZSlcbiAgICAgIC5tYXAoKGN1cnJlbnRJbnZvaWNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGludm9pY2U6IEludm9pY2UgPSBDb21tb24uY2xvbmUoY3VycmVudEludm9pY2UpO1xuICAgICAgICBpbnZvaWNlLm9yZGVyLnByb2plY3RzID0gaW52b2ljZS5vcmRlci5wcm9qZWN0cy5tYXAoKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvamVjdC5saW5lSXRlbXMpIHtcbiAgICAgICAgICAgIHByb2plY3QubGluZUl0ZW1zID0gcHJvamVjdC5saW5lSXRlbXMubWFwKChsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkgPT4ge1xuICAgICAgICAgICAgICBsaW5lSXRlbS5hc3NldCA9IGVuaGFuY2VBc3NldChcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGxpbmVJdGVtLmFzc2V0LCB7IHV1aWQ6IGxpbmVJdGVtLmlkIH0pLCAnb3JkZXInLCBpbnZvaWNlLm9yZGVyLmlkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiBsaW5lSXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbnZvaWNlO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFzUHJvcChvYmo6IFBvam8sIC4uLnByb3BzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIGlmIChwcm9wcy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAob2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wc1swXSkpIHtcbiAgICAgICAgaWYgKG9ialtwcm9wc1swXV0gPT09ICcnIHx8IG9ialtwcm9wc1swXV0gPT09IDAgfHwgSlNPTi5zdHJpbmdpZnkob2JqW3Byb3BzWzBdXSkgPT09IEpTT04uc3RyaW5naWZ5KHt9KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBwcm9wID0gcHJvcHMuc2hpZnQoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYXNQcm9wKG9ialtwcm9wXSwgLi4ucHJvcHMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzaG91bGREaXNwbGF5UmlnaHRzKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtLCBpbnZvaWNlOiBJbnZvaWNlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxpbmVJdGVtLnJpZ2h0c01hbmFnZWQgPT09ICdSaWdodHMgTWFuYWdlZCcgJiYgIXF1b3Rlc1dpdGhvdXRQcmljaW5nLmluY2x1ZGVzKGludm9pY2Uub3JkZXIub3JkZXJUeXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRTaG93TGljZW5zZURldGFpbHNCdG4obGljZW5zZUFncmVlbWVudHM6IExpY2Vuc2VBZ3JlZW1lbnRzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhbGljZW5zZUFncmVlbWVudHMuaXRlbXM7XG4gIH1cblxuICBwdWJsaWMgc2hvd0xpY2Vuc2VBZ3JlZW1lbnRzKGxpY2Vuc2VBZ3JlZW1lbnRzOiBMaWNlbnNlQWdyZWVtZW50cyk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICB7XG4gICAgICAgIGNvbXBvbmVudFR5cGU6IExpY2Vuc2VBZ3JlZW1lbnRDb21wb25lbnQsXG4gICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwYW5lbENsYXNzOiAnbGljZW5zZS1wYW5lJywgcG9zaXRpb246IHsgdG9wOiAnMTAlJyB9IH0sXG4gICAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICAgIGFzc2V0VHlwZTogJ29yZGVyJyxcbiAgICAgICAgICBsaWNlbnNlczogbGljZW5zZUFncmVlbWVudHNcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0T3B0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGV2ZW50OiAnY2xvc2UnLFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRydWUsXG4gICAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=

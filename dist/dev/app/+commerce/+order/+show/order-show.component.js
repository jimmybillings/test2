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
var window_ref_service_1 = require("../../../shared/services/window-ref.service");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var OrderShowComponent = (function () {
    function OrderShowComponent(window, store) {
        this.window = window;
        this.store = store;
        this.noteVisibilityMap = {};
        this.orderObservable = this.store.select(function (state) { return state.order.activeOrder; })
            .map(function (currentOrder) {
            var order = common_functions_1.Common.clone(currentOrder);
            order.projects = order.projects.map(function (project) {
                if (project.lineItems) {
                    project.lineItems = project.lineItems.map(function (lineItem) {
                        lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'order', order.id);
                        return lineItem;
                    });
                }
                return project;
            });
            return order;
        });
    }
    OrderShowComponent.prototype.download = function (url) {
        this.window.nativeWindow.location.href = url;
    };
    OrderShowComponent.prototype.assetCountLabelKeyFor = function (count) {
        switch (count) {
            case 0: return 'ORDER.SHOW.PROJECTS.NO_ASSETS';
            case 1: return 'ORDER.SHOW.PROJECTS.ONLY_ONE_ASSET';
            default: return 'ORDER.SHOW.PROJECTS.MORE_THAN_ONE_ASSET';
        }
    };
    OrderShowComponent.prototype.isRefundedLineItem = function (lineItem) {
        return lineItem.price < 0;
    };
    OrderShowComponent.prototype.isRefundedProject = function (project) {
        return !!project.creditMemoForProjectId;
    };
    OrderShowComponent.prototype.isRefundedOrder = function (order) {
        return !!order.creditMemoForOrderId;
    };
    OrderShowComponent.prototype.shouldShowPaymentBalanceFor = function (item) {
        return !!item.paymentDueDate && !!item.paymentBalance && item.paymentBalance > 0;
    };
    OrderShowComponent.prototype.shouldShowDiscountFor = function (order) {
        return (order.discount || 0) > 0 && !order.creditMemoForOrderId;
    };
    OrderShowComponent.prototype.offlineAgreementIdsFor = function (order) {
        var ids = [];
        order.projects.forEach(function (project) { return project.lineItems.forEach(function (lineItem) {
            if (lineItem.externalAgreementIds)
                lineItem.externalAgreementIds.forEach(function (id) { return ids.push(id); });
        }); });
        return ids.filter(function (id, index, ids) { return id !== ids[index - 1]; }).join(', ');
    };
    OrderShowComponent.prototype.shouldDisplayRights = function (lineItem, order) {
        return lineItem.rightsManaged === 'Rights Managed' && !commerce_interface_1.quotesWithoutPricing.includes(order.orderType);
    };
    OrderShowComponent.prototype.showDownloadButtonFor = function (lineItem) {
        return !!lineItem.downloadUrl && lineItem.transcodeStatus !== 'Failed';
    };
    OrderShowComponent.prototype.nothingToDownload = function (lineItem) {
        return !lineItem.downloadUrl && lineItem.transcodeStatus === 'Completed';
    };
    OrderShowComponent.prototype.showSpinnerIcon = function (lineItem) {
        return lineItem.transcodeStatus === 'Submitted';
    };
    OrderShowComponent.prototype.showAsperaButtonFor = function (lineItem) {
        return lineItem.transcodeStatus === 'Completed' && !!lineItem.asperaSpec;
    };
    OrderShowComponent.prototype.iconForNotesButton = function (lineItem) {
        return this.noteVisibilityMap[lineItem.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    };
    OrderShowComponent.prototype.toggleNotesVisibilityFor = function (lineItem) {
        this.noteVisibilityMap[lineItem.id] = !this.noteVisibilityMap[lineItem.id];
    };
    OrderShowComponent.prototype.hasNotes = function (lineItem) {
        return lineItem.hasOwnProperty('notes') &&
            lineItem.notes.length > 0 &&
            lineItem.notes[0].hasOwnProperty('notes') &&
            lineItem.notes[0].notes.length > 0;
    };
    OrderShowComponent.prototype.shouldShowNoteFor = function (lineItem) {
        return this.hasNotes(lineItem) && !!this.noteVisibilityMap[lineItem.id];
    };
    OrderShowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order-show-component',
            templateUrl: 'order-show.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [window_ref_service_1.WindowRef, app_store_1.AppStore])
    ], OrderShowComponent);
    return OrderShowComponent;
}());
exports.OrderShowComponent = OrderShowComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyLytzaG93L29yZGVyLXNob3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1FO0FBSW5FLGtGQUF3RTtBQUN4RSxvRkFBb0g7QUFDcEgsNEVBQXlFO0FBQ3pFLGdEQUE4QztBQUM5QywrRUFBb0U7QUFRcEU7SUFJRSw0QkFBb0IsTUFBaUIsRUFBVSxLQUFlO1FBQTFDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBRnZELHNCQUFpQixHQUFpQyxFQUFFLENBQUM7UUFHMUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUF2QixDQUF1QixDQUFDO2FBQ3ZFLEdBQUcsQ0FBQyxVQUFDLFlBQVk7WUFDaEIsSUFBTSxLQUFLLEdBQVUseUJBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEQsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQWdCO2dCQUNuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQXVCO3dCQUNoRSxRQUFRLENBQUMsS0FBSyxHQUFHLDZCQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3ZHLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQ2xCLENBQUMsQ0FBQyxDQUFDO2dC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LENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFsR1Usa0JBQWtCO1FBTjlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBSzRCLDhCQUFTLEVBQWlCLG9CQUFRO09BSm5ELGtCQUFrQixDQW1HOUI7SUFBRCx5QkFBQztDQW5HRCxBQW1HQyxJQUFBO0FBbkdZLGdEQUFrQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytvcmRlci8rc2hvdy9vcmRlci1zaG93LmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuXG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvd2luZG93LXJlZi5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyLCBBc3NldExpbmVJdGVtLCBQcm9qZWN0LCBxdW90ZXNXaXRob3V0UHJpY2luZyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBlbmhhbmNlQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdvcmRlci1zaG93LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnb3JkZXItc2hvdy5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJTaG93Q29tcG9uZW50IHtcbiAgcHVibGljIG9yZGVyT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxPcmRlcj47XG4gIHB1YmxpYyBub3RlVmlzaWJpbGl0eU1hcDogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgd2luZG93OiBXaW5kb3dSZWYsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7XG4gICAgdGhpcy5vcmRlck9ic2VydmFibGUgPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5vcmRlci5hY3RpdmVPcmRlcilcbiAgICAgIC5tYXAoKGN1cnJlbnRPcmRlcikgPT4ge1xuICAgICAgICBjb25zdCBvcmRlcjogT3JkZXIgPSBDb21tb24uY2xvbmUoY3VycmVudE9yZGVyKTtcbiAgICAgICAgb3JkZXIucHJvamVjdHMgPSBvcmRlci5wcm9qZWN0cy5tYXAoKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgICBpZiAocHJvamVjdC5saW5lSXRlbXMpIHtcbiAgICAgICAgICAgIHByb2plY3QubGluZUl0ZW1zID0gcHJvamVjdC5saW5lSXRlbXMubWFwKChsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkgPT4ge1xuICAgICAgICAgICAgICBsaW5lSXRlbS5hc3NldCA9IGVuaGFuY2VBc3NldChPYmplY3QuYXNzaWduKGxpbmVJdGVtLmFzc2V0LCB7IHV1aWQ6IGxpbmVJdGVtLmlkIH0pLCAnb3JkZXInLCBvcmRlci5pZCk7XG4gICAgICAgICAgICAgIHJldHVybiBsaW5lSXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBvcmRlcjtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRvd25sb2FkKHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy53aW5kb3cubmF0aXZlV2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cblxuICBwdWJsaWMgYXNzZXRDb3VudExhYmVsS2V5Rm9yKGNvdW50OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoY291bnQpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuICdPUkRFUi5TSE9XLlBST0pFQ1RTLk5PX0FTU0VUUyc7XG4gICAgICBjYXNlIDE6IHJldHVybiAnT1JERVIuU0hPVy5QUk9KRUNUUy5PTkxZX09ORV9BU1NFVCc7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gJ09SREVSLlNIT1cuUFJPSkVDVFMuTU9SRV9USEFOX09ORV9BU1NFVCc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGlzUmVmdW5kZWRMaW5lSXRlbShsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5lSXRlbS5wcmljZSA8IDA7XG4gIH1cblxuICBwdWJsaWMgaXNSZWZ1bmRlZFByb2plY3QocHJvamVjdDogUHJvamVjdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXByb2plY3QuY3JlZGl0TWVtb0ZvclByb2plY3RJZDtcbiAgfVxuXG4gIHB1YmxpYyBpc1JlZnVuZGVkT3JkZXIob3JkZXI6IE9yZGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhb3JkZXIuY3JlZGl0TWVtb0Zvck9yZGVySWQ7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd1BheW1lbnRCYWxhbmNlRm9yKGl0ZW06IE9yZGVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhaXRlbS5wYXltZW50RHVlRGF0ZSAmJiAhIWl0ZW0ucGF5bWVudEJhbGFuY2UgJiYgaXRlbS5wYXltZW50QmFsYW5jZSA+IDA7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd0Rpc2NvdW50Rm9yKG9yZGVyOiBPcmRlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAob3JkZXIuZGlzY291bnQgfHwgMCkgPiAwICYmICFvcmRlci5jcmVkaXRNZW1vRm9yT3JkZXJJZDtcbiAgfVxuXG4gIHB1YmxpYyBvZmZsaW5lQWdyZWVtZW50SWRzRm9yKG9yZGVyOiBPcmRlcik6IHN0cmluZyB7XG4gICAgbGV0IGlkczogc3RyaW5nW10gPSBbXTtcbiAgICBvcmRlci5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4gcHJvamVjdC5saW5lSXRlbXMuZm9yRWFjaCgobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pID0+IHtcbiAgICAgIGlmIChsaW5lSXRlbS5leHRlcm5hbEFncmVlbWVudElkcykgbGluZUl0ZW0uZXh0ZXJuYWxBZ3JlZW1lbnRJZHMuZm9yRWFjaChpZCA9PiBpZHMucHVzaChpZCkpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gaWRzLmZpbHRlcigoaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlciwgaWRzOiBzdHJpbmdbXSkgPT4gaWQgIT09IGlkc1tpbmRleCAtIDFdKS5qb2luKCcsICcpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZERpc3BsYXlSaWdodHMobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0sIG9yZGVyOiBPcmRlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5lSXRlbS5yaWdodHNNYW5hZ2VkID09PSAnUmlnaHRzIE1hbmFnZWQnICYmICFxdW90ZXNXaXRob3V0UHJpY2luZy5pbmNsdWRlcyhvcmRlci5vcmRlclR5cGUpO1xuICB9XG5cbiAgcHVibGljIHNob3dEb3dubG9hZEJ1dHRvbkZvcihsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWxpbmVJdGVtLmRvd25sb2FkVXJsICYmIGxpbmVJdGVtLnRyYW5zY29kZVN0YXR1cyAhPT0gJ0ZhaWxlZCc7XG4gIH1cblxuICBwdWJsaWMgbm90aGluZ1RvRG93bmxvYWQobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWxpbmVJdGVtLmRvd25sb2FkVXJsICYmIGxpbmVJdGVtLnRyYW5zY29kZVN0YXR1cyA9PT0gJ0NvbXBsZXRlZCc7XG4gIH1cblxuICBwdWJsaWMgc2hvd1NwaW5uZXJJY29uKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGxpbmVJdGVtLnRyYW5zY29kZVN0YXR1cyA9PT0gJ1N1Ym1pdHRlZCc7XG4gIH1cblxuICBwdWJsaWMgc2hvd0FzcGVyYUJ1dHRvbkZvcihsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5lSXRlbS50cmFuc2NvZGVTdGF0dXMgPT09ICdDb21wbGV0ZWQnICYmICEhbGluZUl0ZW0uYXNwZXJhU3BlYztcbiAgfVxuXG4gIHB1YmxpYyBpY29uRm9yTm90ZXNCdXR0b24obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm5vdGVWaXNpYmlsaXR5TWFwW2xpbmVJdGVtLmlkXSA/ICdrZXlib2FyZF9hcnJvd191cCcgOiAna2V5Ym9hcmRfYXJyb3dfZG93bic7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlTm90ZXNWaXNpYmlsaXR5Rm9yKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5ub3RlVmlzaWJpbGl0eU1hcFtsaW5lSXRlbS5pZF0gPSAhdGhpcy5ub3RlVmlzaWJpbGl0eU1hcFtsaW5lSXRlbS5pZF07XG4gIH1cblxuICBwdWJsaWMgaGFzTm90ZXMobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGluZUl0ZW0uaGFzT3duUHJvcGVydHkoJ25vdGVzJykgJiZcbiAgICAgIGxpbmVJdGVtLm5vdGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgIGxpbmVJdGVtLm5vdGVzWzBdLmhhc093blByb3BlcnR5KCdub3RlcycpICYmXG4gICAgICBsaW5lSXRlbS5ub3Rlc1swXS5ub3Rlcy5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dOb3RlRm9yKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGFzTm90ZXMobGluZUl0ZW0pICYmICEhdGhpcy5ub3RlVmlzaWJpbGl0eU1hcFtsaW5lSXRlbS5pZF07XG4gIH1cbn1cbiJdfQ==

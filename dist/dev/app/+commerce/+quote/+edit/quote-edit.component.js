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
var enhanced_asset_1 = require("../../../shared/interfaces/enhanced-asset");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var core_1 = require("@angular/core");
var wz_dialog_service_1 = require("../../../shared/modules/wz-dialog/services/wz.dialog.service");
var capabilities_service_1 = require("../../../shared/services/capabilities.service");
var app_store_1 = require("../../../app.store");
var QuoteEditComponent = (function () {
    function QuoteEditComponent(userCan, dialogService, store, detector) {
        var _this = this;
        this.userCan = userCan;
        this.dialogService = dialogService;
        this.store = store;
        this.detector = detector;
        this.showComments = null;
        this.updateQuoteField = function (options) {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.updateQuoteField(options); });
        };
        this.deleteQuote = function () {
            _this.store.dispatch(function (factory) { return factory.quoteEdit.delete(); });
        };
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.quoteComment.config.form.items; });
        this.commentParentObject = { objectType: 'quote', objectId: this.store.snapshot(function (state) { return state.quoteEdit.data.id; }) };
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cart.config; });
    }
    QuoteEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tabLabelKeys = ['quote', 'recipient', 'confirm'];
        this.tabEnabled = this.tabLabelKeys.map(function (_, index) { return index === 0; });
        this.selectedTabIndex = 0;
        this.projectSubscription = this.store.select(function (state) { return state.quoteEdit.data.projects; })
            .subscribe(function (projects) { return _this.projects = _this.enhanceAssetsInProjects(projects); });
    };
    QuoteEditComponent.prototype.ngOnDestroy = function () {
        this.projectSubscription.unsubscribe();
    };
    QuoteEditComponent.prototype.onNotification = function (message) {
        switch (message.type) {
            case 'OPEN_DELETE_DIALOG':
                this.onOpenDeleteQuoteDialog();
                break;
            case 'SAVE_AND_NEW':
                this.onCreateQuote();
                break;
            case 'CLONE_QUOTE':
                this.onCloneQuote();
                break;
            case 'GO_TO_NEXT_TAB': {
                this.goToNextTab();
                break;
            }
            case 'GO_TO_PREVIOUS_TAB': {
                this.goToPreviousTab();
                break;
            }
            case 'GO_TO_TAB': {
                this.goToTab(message.payload);
                break;
            }
            case 'DISABLE_TAB': {
                this.disableTab(message.payload);
            }
        }
    };
    Object.defineProperty(QuoteEditComponent.prototype, "hasBulkOrderId", {
        get: function () {
            return this.store.select(function (state) { return state.quoteEdit.data; })
                .map(function (quote) { return (quote.bulkOrderId) ? quote.bulkOrderId : false; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "bulkOrderIdActionLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.bulkOrderId; }) ?
                'QUOTE.EDIT_BULK_ORDER_ID_TITLE' : 'QUOTE.ADD_BULK_ORDER_ID_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "discountActionLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.discount; }) ?
                'QUOTE.EDIT_DISCOUNT_TITLE' : 'QUOTE.ADD_DISCOUNT_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "bulkOrderIdSubmitLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.bulkOrderId; }) ?
                'QUOTE.EDIT_BULK_ORDER_FORM_SUBMIT' : 'QUOTE.ADD_BULK_ORDER_FORM_SUBMIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "discountSubmitLabel", {
        get: function () {
            return this.store.snapshot(function (factory) { return factory.quoteEdit.data.discount; }) ?
                'QUOTE.EDIT_DISCOUNT_FORM_SUBMIT' : 'QUOTE.ADD_DISCOUNT_FORM_SUBMIT';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteEditComponent.prototype, "shouldShowCloneButton", {
        get: function () {
            return this.userCan.cloneQuote(this.store.select(function (state) { return state.quoteEdit; }));
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(QuoteEditComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment.quote.pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    QuoteEditComponent.prototype.addBulkOrderId = function () {
        this.dialogService.openFormDialog(this.mergeFormValues(this.config.addBulkOrderId.items, 'bulkOrderId'), {
            title: this.bulkOrderIdActionLabel,
            submitLabel: this.bulkOrderIdSubmitLabel,
            autocomplete: 'off'
        }, this.updateQuoteField);
    };
    QuoteEditComponent.prototype.editDiscount = function () {
        this.dialogService.openFormDialog(this.mergeFormValues(this.config.addDiscount.items, 'discount'), {
            title: this.discountActionLabel,
            submitLabel: this.discountSubmitLabel,
            autocomplete: 'off'
        }, this.updateQuoteField);
    };
    QuoteEditComponent.prototype.onOpenDeleteQuoteDialog = function () {
        this.dialogService.openConfirmationDialog({
            title: 'QUOTE.DELETE.TITLE',
            message: 'QUOTE.DELETE.MESSAGE',
            accept: 'QUOTE.DELETE.ACCEPT',
            decline: 'QUOTE.DELETE.DECLINE'
        }, this.deleteQuote);
    };
    QuoteEditComponent.prototype.onCloneQuote = function () {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.quoteEdit.cloneQuote(_this.store.snapshotCloned(function (state) { return state.quoteEdit.data; }));
        });
    };
    QuoteEditComponent.prototype.onCreateQuote = function () {
        this.store.dispatch(function (factory) { return factory.quoteEdit.createQuote(); });
    };
    QuoteEditComponent.prototype.enhanceAssetsInProjects = function (projects) {
        if (!projects)
            return [];
        var clonedProjects = common_functions_1.Common.clone(projects);
        return clonedProjects.map(function (project) {
            if (project.lineItems) {
                project.lineItems = project.lineItems.map(function (lineItem) {
                    lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'quoteEdit');
                    return lineItem;
                });
            }
            return project;
        });
    };
    QuoteEditComponent.prototype.goToNextTab = function () {
        var nextSelectedTabIndex = this.selectedTabIndex + 1;
        if (nextSelectedTabIndex >= this.tabLabelKeys.length)
            return;
        this.tabEnabled[nextSelectedTabIndex] = true;
        this.selectedTabIndex = nextSelectedTabIndex;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.goToPreviousTab = function () {
        if (this.selectedTabIndex === 0)
            return;
        this.selectedTabIndex -= 1;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.disableTab = function (tabIndex) {
        this.tabEnabled[tabIndex] = false;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.goToTab = function (tabIndex) {
        this.selectedTabIndex = tabIndex;
        this.detector.markForCheck();
    };
    QuoteEditComponent.prototype.mergeFormValues = function (fields, property) {
        var _this = this;
        return fields.map(function (item) {
            var value = _this.store.snapshot(function (factory) { return factory.quoteEdit.data; });
            item.value = value[property] ? value[property] : '';
            return item;
        });
    };
    QuoteEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'quote-edit-component',
            templateUrl: 'quote-edit.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            wz_dialog_service_1.WzDialogService,
            app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], QuoteEditComponent);
    return QuoteEditComponent;
}());
exports.QuoteEditComponent = QuoteEditComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L3F1b3RlLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXlFO0FBQ3pFLCtFQUFvRTtBQUdwRSxzQ0FBeUc7QUFDekcsa0dBQStGO0FBQy9GLHNGQUE2RTtBQUk3RSxnREFBOEM7QUFVOUM7SUFXRSw0QkFDUyxPQUFxQixFQUNyQixhQUE4QixFQUM3QixLQUFlLEVBQ2YsUUFBMkI7UUFKckMsaUJBU0M7UUFSUSxZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ3JCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtRQUM3QixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBbUI7UUFQOUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFpSzVCLHFCQUFnQixHQUFHLFVBQUMsT0FBYTtZQUN2QyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQTNDLENBQTJDLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUE7UUFtQ08sZ0JBQVcsR0FBRztZQUNwQixLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUE7UUEvTEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUF4RCxDQUF3RCxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsVUFBVSxF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USxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVPLDRDQUFlLEdBQXZCLFVBQXdCLE1BQVcsRUFBRSxRQUFnQjtRQUFyRCxpQkFNQztRQUxDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUztZQUMxQixJQUFJLEtBQUssR0FBUSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUF0QixDQUFzQixDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE1TVUsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBY2tCLG1DQUFZO1lBQ04sbUNBQWU7WUFDdEIsb0JBQVE7WUFDTCx3QkFBaUI7T0FmMUIsa0JBQWtCLENBa045QjtJQUFELHlCQUFDO0NBbE5ELEFBa05DLElBQUE7QUFsTlksZ0RBQWtCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L3F1b3RlLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZW5oYW5jZUFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV3pEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL3NlcnZpY2VzL3d6LmRpYWxvZy5zZXJ2aWNlJztcbmltcG9ydCB7IENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBBc3NldExpbmVJdGVtLCBDb21tZXJjZU1lc3NhZ2UsIFByb2plY3QsIFF1b3RlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbWVudFBhcmVudE9iamVjdCB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdxdW90ZS1lZGl0LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAncXVvdGUtZWRpdC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBRdW90ZUVkaXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBwcm9qZWN0czogUHJvamVjdFtdO1xuICBwdWJsaWMgdGFiTGFiZWxLZXlzOiBzdHJpbmdbXTtcbiAgcHVibGljIHRhYkVuYWJsZWQ6IGJvb2xlYW5bXTtcbiAgcHVibGljIHNlbGVjdGVkVGFiSW5kZXg6IG51bWJlcjtcbiAgcHVibGljIGNvbmZpZzogYW55O1xuICBwdWJsaWMgY29tbWVudEZvcm1Db25maWc6IEFycmF5PEZvcm1GaWVsZHM+O1xuICBwdWJsaWMgY29tbWVudFBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdDtcbiAgcHVibGljIHNob3dDb21tZW50czogYm9vbGVhbiA9IG51bGw7XG4gIHByaXZhdGUgcHJvamVjdFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1c2VyQ2FuOiBDYXBhYmlsaXRpZXMsXG4gICAgcHVibGljIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmNvbW1lbnRGb3JtQ29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLnF1b3RlQ29tbWVudC5jb25maWcuZm9ybS5pdGVtcyk7XG4gICAgdGhpcy5jb21tZW50UGFyZW50T2JqZWN0ID0geyBvYmplY3RUeXBlOiAncXVvdGUnLCBvYmplY3RJZDogdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5pZCkgfTtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5jYXJ0LmNvbmZpZyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBXZSBjb3VsZCBpbml0aWFsaXplIGEgc3Vic2V0IG9mIHRoZXNlIGluc3RlYWQsIGJhc2VkIG9uIHNvbWUgY29uZGl0aW9uLlxuICAgIC8vIEZvciBleGFtcGxlLCBkb24ndCBpbmNsdWRlICdiaWxsaW5nJyBhbmQgJ3BheW1lbnQnIGlmIHRoZSBjYXJ0IHRvdGFsIGlzIDAuXG4gICAgLy8gdGhpcy50YWJMYWJlbEtleXMgPSBbJ2NhcnQnLCAnYmlsbGluZycsICdwYXltZW50JywgJ2NvbmZpcm0nXTtcbiAgICAvLyBJIHRoaW5rIHRoZSBjb25maXJtIHRhYiBzaG91bGQgYmUgcGxhY2Ugb3JkZXJcbiAgICB0aGlzLnRhYkxhYmVsS2V5cyA9IFsncXVvdGUnLCAncmVjaXBpZW50JywgJ2NvbmZpcm0nXTtcblxuICAgIC8vIEVuYWJsZSB0aGUgZmlyc3QgdGFiIGFuZCBkaXNhYmxlIHRoZSByZXN0LlxuICAgIHRoaXMudGFiRW5hYmxlZCA9IHRoaXMudGFiTGFiZWxLZXlzLm1hcCgoXywgaW5kZXgpID0+IGluZGV4ID09PSAwKTtcblxuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IDA7XG5cbiAgICB0aGlzLnByb2plY3RTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YS5wcm9qZWN0cylcbiAgICAgIC5zdWJzY3JpYmUocHJvamVjdHMgPT4gdGhpcy5wcm9qZWN0cyA9IHRoaXMuZW5oYW5jZUFzc2V0c0luUHJvamVjdHMocHJvamVjdHMpKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnByb2plY3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcblxuICB9XG5cbiAgcHVibGljIG9uTm90aWZpY2F0aW9uKG1lc3NhZ2U6IENvbW1lcmNlTWVzc2FnZSk6IHZvaWQge1xuICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XG4gICAgICBjYXNlICdPUEVOX0RFTEVURV9ESUFMT0cnOlxuICAgICAgICB0aGlzLm9uT3BlbkRlbGV0ZVF1b3RlRGlhbG9nKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdTQVZFX0FORF9ORVcnOlxuICAgICAgICB0aGlzLm9uQ3JlYXRlUXVvdGUoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0NMT05FX1FVT1RFJzpcbiAgICAgICAgdGhpcy5vbkNsb25lUXVvdGUoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ0dPX1RPX05FWFRfVEFCJzoge1xuICAgICAgICB0aGlzLmdvVG9OZXh0VGFiKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnR09fVE9fUFJFVklPVVNfVEFCJzoge1xuICAgICAgICB0aGlzLmdvVG9QcmV2aW91c1RhYigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ0dPX1RPX1RBQic6IHtcbiAgICAgICAgdGhpcy5nb1RvVGFiKG1lc3NhZ2UucGF5bG9hZCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnRElTQUJMRV9UQUInOiB7XG4gICAgICAgIHRoaXMuZGlzYWJsZVRhYihtZXNzYWdlLnBheWxvYWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGFzQnVsa09yZGVySWQoKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhKVxuICAgICAgLm1hcChxdW90ZSA9PiAocXVvdGUuYnVsa09yZGVySWQpID8gcXVvdGUuYnVsa09yZGVySWQgOiBmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJ1bGtPcmRlcklkQWN0aW9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmRhdGEuYnVsa09yZGVySWQpID9cbiAgICAgICdRVU9URS5FRElUX0JVTEtfT1JERVJfSURfVElUTEUnIDogJ1FVT1RFLkFERF9CVUxLX09SREVSX0lEX1RJVExFJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzY291bnRBY3Rpb25MYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNuYXBzaG90KGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuZGF0YS5kaXNjb3VudCkgP1xuICAgICAgJ1FVT1RFLkVESVRfRElTQ09VTlRfVElUTEUnIDogJ1FVT1RFLkFERF9ESVNDT1VOVF9USVRMRSc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJ1bGtPcmRlcklkU3VibWl0TGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmRhdGEuYnVsa09yZGVySWQpID9cbiAgICAgICdRVU9URS5FRElUX0JVTEtfT1JERVJfRk9STV9TVUJNSVQnIDogJ1FVT1RFLkFERF9CVUxLX09SREVSX0ZPUk1fU1VCTUlUJztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgZGlzY291bnRTdWJtaXRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNuYXBzaG90KGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuZGF0YS5kaXNjb3VudCkgP1xuICAgICAgJ1FVT1RFLkVESVRfRElTQ09VTlRfRk9STV9TVUJNSVQnIDogJ1FVT1RFLkFERF9ESVNDT1VOVF9GT1JNX1NVQk1JVCc7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3VsZFNob3dDbG9uZUJ1dHRvbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmNsb25lUXVvdGUodGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucXVvdGVFZGl0KSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQ29tbWVudHNWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0NvbW1lbnRzID0gIXRoaXMuc2hvd0NvbW1lbnRzO1xuICB9XG5cbiAgcHVibGljIGdldCBjb21tZW50Q291bnQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY29tbWVudC5xdW90ZS5wYWdpbmF0aW9uLnRvdGFsQ291bnQpO1xuICB9XG5cbiAgcHVibGljIGFkZEJ1bGtPcmRlcklkKCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgIHRoaXMubWVyZ2VGb3JtVmFsdWVzKHRoaXMuY29uZmlnLmFkZEJ1bGtPcmRlcklkLml0ZW1zLCAnYnVsa09yZGVySWQnKSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuYnVsa09yZGVySWRBY3Rpb25MYWJlbCxcbiAgICAgICAgc3VibWl0TGFiZWw6IHRoaXMuYnVsa09yZGVySWRTdWJtaXRMYWJlbCxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJ1xuICAgICAgfSxcbiAgICAgIHRoaXMudXBkYXRlUXVvdGVGaWVsZFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZWRpdERpc2NvdW50KCk6IHZvaWQge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgIHRoaXMubWVyZ2VGb3JtVmFsdWVzKHRoaXMuY29uZmlnLmFkZERpc2NvdW50Lml0ZW1zLCAnZGlzY291bnQnKSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IHRoaXMuZGlzY291bnRBY3Rpb25MYWJlbCxcbiAgICAgICAgc3VibWl0TGFiZWw6IHRoaXMuZGlzY291bnRTdWJtaXRMYWJlbCxcbiAgICAgICAgYXV0b2NvbXBsZXRlOiAnb2ZmJ1xuICAgICAgfSxcbiAgICAgIHRoaXMudXBkYXRlUXVvdGVGaWVsZFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb25PcGVuRGVsZXRlUXVvdGVEaWFsb2coKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db25maXJtYXRpb25EaWFsb2coe1xuICAgICAgdGl0bGU6ICdRVU9URS5ERUxFVEUuVElUTEUnLFxuICAgICAgbWVzc2FnZTogJ1FVT1RFLkRFTEVURS5NRVNTQUdFJyxcbiAgICAgIGFjY2VwdDogJ1FVT1RFLkRFTEVURS5BQ0NFUFQnLFxuICAgICAgZGVjbGluZTogJ1FVT1RFLkRFTEVURS5ERUNMSU5FJ1xuICAgIH0sIHRoaXMuZGVsZXRlUXVvdGUpO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvbmVRdW90ZSgpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT5cbiAgICAgIGZhY3RvcnkucXVvdGVFZGl0LmNsb25lUXVvdGUodGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS5xdW90ZUVkaXQuZGF0YSkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNyZWF0ZVF1b3RlKCkge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5jcmVhdGVRdW90ZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZW5oYW5jZUFzc2V0c0luUHJvamVjdHMocHJvamVjdHM6IFByb2plY3RbXSk6IFByb2plY3RbXSB7XG4gICAgaWYgKCFwcm9qZWN0cykgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGNsb25lZFByb2plY3RzOiBQcm9qZWN0W10gPSBDb21tb24uY2xvbmUocHJvamVjdHMpO1xuXG4gICAgcmV0dXJuIGNsb25lZFByb2plY3RzLm1hcCgocHJvamVjdDogUHJvamVjdCkgPT4ge1xuICAgICAgaWYgKHByb2plY3QubGluZUl0ZW1zKSB7XG4gICAgICAgIHByb2plY3QubGluZUl0ZW1zID0gcHJvamVjdC5saW5lSXRlbXMubWFwKChsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSkgPT4ge1xuICAgICAgICAgIGxpbmVJdGVtLmFzc2V0ID0gZW5oYW5jZUFzc2V0KE9iamVjdC5hc3NpZ24obGluZUl0ZW0uYXNzZXQsIHsgdXVpZDogbGluZUl0ZW0uaWQgfSksICdxdW90ZUVkaXQnKTtcbiAgICAgICAgICByZXR1cm4gbGluZUl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVF1b3RlRmllbGQgPSAob3B0aW9uczogUG9qbyk6IHZvaWQgPT4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC51cGRhdGVRdW90ZUZpZWxkKG9wdGlvbnMpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ29Ub05leHRUYWIoKTogdm9pZCB7XG4gICAgbGV0IG5leHRTZWxlY3RlZFRhYkluZGV4OiBudW1iZXIgPSB0aGlzLnNlbGVjdGVkVGFiSW5kZXggKyAxO1xuICAgIGlmIChuZXh0U2VsZWN0ZWRUYWJJbmRleCA+PSB0aGlzLnRhYkxhYmVsS2V5cy5sZW5ndGgpIHJldHVybjtcblxuICAgIHRoaXMudGFiRW5hYmxlZFtuZXh0U2VsZWN0ZWRUYWJJbmRleF0gPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IG5leHRTZWxlY3RlZFRhYkluZGV4O1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9QcmV2aW91c1RhYigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRhYkluZGV4ID09PSAwKSByZXR1cm47XG4gICAgdGhpcy5zZWxlY3RlZFRhYkluZGV4IC09IDE7XG4gICAgdGhpcy5kZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzYWJsZVRhYih0YWJJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy50YWJFbmFibGVkW3RhYkluZGV4XSA9IGZhbHNlO1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIGdvVG9UYWIodGFiSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRUYWJJbmRleCA9IHRhYkluZGV4O1xuICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIG1lcmdlRm9ybVZhbHVlcyhmaWVsZHM6IGFueSwgcHJvcGVydHk6IHN0cmluZyk6IEFycmF5PEZvcm1GaWVsZHM+IHtcbiAgICByZXR1cm4gZmllbGRzLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBsZXQgdmFsdWU6IGFueSA9IHRoaXMuc3RvcmUuc25hcHNob3QoZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5kYXRhKTtcbiAgICAgIGl0ZW0udmFsdWUgPSB2YWx1ZVtwcm9wZXJ0eV0gPyB2YWx1ZVtwcm9wZXJ0eV0gOiAnJztcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWxldGVRdW90ZSA9ICgpOiB2b2lkID0+IHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuZGVsZXRlKCkpO1xuICB9XG5cbn1cbiJdfQ==

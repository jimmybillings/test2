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
var app_store_1 = require("../../../app.store");
var core_1 = require("@angular/core");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var capabilities_service_1 = require("../../../shared/services/capabilities.service");
var wz_dialog_service_1 = require("../../../shared/modules/wz-dialog/services/wz.dialog.service");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var ProjectsComponent = (function () {
    function ProjectsComponent(dialogService, store) {
        this.dialogService = dialogService;
        this.store = store;
        this.readOnly = false;
        this.allRMAssetsHaveAttributes = true;
        this.projectsNotify = new core_1.EventEmitter();
        this.formatFeeConfigItemAmount = function (configItem) {
            return ("" + (configItem.amount || 0) * 100)
                .replace(/(\d\d)$/, '.$1')
                .replace(/^\./, '0.')
                .replace(/^0$/, '0.00');
        };
    }
    ProjectsComponent.prototype.projectsOtherThan = function (currentProject) {
        return this.projects.filter(function (project) { return project.id !== currentProject.id; });
    };
    ProjectsComponent.prototype.lineItemCountFor = function (project) {
        return (project.lineItems || []).length;
    };
    ProjectsComponent.prototype.editProjectPrice = function (message, payload) {
        this.projectsNotify.emit(Object.assign(message, { payload: payload }));
    };
    ProjectsComponent.prototype.addProject = function () {
        this.projectsNotify.emit({ type: 'ADD_PROJECT' });
    };
    ProjectsComponent.prototype.onRemove = function (project) {
        this.projectsNotify.emit({ type: 'REMOVE_PROJECT', payload: project });
    };
    ProjectsComponent.prototype.onEdit = function (project) {
        if (!this.readOnly) {
            this.selectProject(project);
            this.projectsNotify.emit({
                type: 'UPDATE_PROJECT',
                payload: Object.assign({ project: project, items: this.config.form.items })
            });
        }
    };
    ProjectsComponent.prototype.onClickAddFeeButtonFor = function (project) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.feeConfig.loadFeeConfig(); });
        this.store.blockUntil(function (state) { return state.feeConfig.initialized; }).subscribe(function () {
            _this.dialogService.openFormDialog(_this.initializeQuoteFeeFieldsFrom(_this.store.snapshotCloned(function (state) { return state.feeConfig.feeConfig; })), { title: 'QUOTE.ADD_FEE.HEADER', submitLabel: 'QUOTE.ADD_FEE.SUBMIT' }, function (result) { return _this.addFeeTo(project, result); });
        });
    };
    ProjectsComponent.prototype.delegate = function (message) {
        this.projectsNotify.emit(message);
    };
    ProjectsComponent.prototype.selectProject = function (project) {
        var _this = this;
        this.selectedProject = project;
        this.config.form.items = this.config.form.items.map(function (item) {
            item.value = _this.selectedProject[item.name];
            return item;
        });
    };
    ProjectsComponent.prototype.rmAssetsHaveAttributes = function (project) {
        if (!project.lineItems || project.lineItems.length === 0)
            return true;
        var validAssets = [];
        if (project.lineItems) {
            project.lineItems.forEach(function (lineItem) {
                validAssets.push(lineItem.rightsManaged === 'Rights Managed' ? !!lineItem.attributes : true);
            });
        }
        return validAssets.indexOf(false) === -1;
    };
    ProjectsComponent.prototype.projectHasRmAssets = function (project) {
        if (!project.lineItems || project.lineItems.length === 0)
            return false;
        var validAssets = [];
        if (project.lineItems) {
            project.lineItems.forEach(function (lineItem) {
                validAssets.push(lineItem.rightsManaged === 'Rights Managed' ? true : false);
            });
        }
        return validAssets.indexOf(true) !== -1;
    };
    ProjectsComponent.prototype.onClickBulkImportButton = function (project) {
        this.projectsNotify.emit({ type: 'OPEN_BULK_IMPORT_DIALOG', payload: project.id });
    };
    Object.defineProperty(ProjectsComponent.prototype, "showPricing", {
        get: function () {
            return !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType) && this.allRMAssetsHaveAttributes;
        },
        enumerable: true,
        configurable: true
    });
    ProjectsComponent.prototype.initializeQuoteFeeFieldsFrom = function (feeConfig) {
        var fields = common_functions_1.Common.clone(this.config.addQuoteFee.items);
        var feeTypeField = fields.find(function (field) { return field.name === 'feeType'; });
        if (feeTypeField) {
            var options = feeConfig.items.map(function (configItem) { return configItem.name; });
            feeTypeField.options = options.join(',');
            feeTypeField.value = options[0];
            var amountField = fields.find(function (field) { return field.name === 'amount'; });
            if (amountField) {
                feeTypeField.slaveFieldName = 'amount';
                feeTypeField.slaveFieldValues = feeConfig.items.map(this.formatFeeConfigItemAmount);
                amountField.value = feeTypeField.slaveFieldValues[0];
            }
        }
        return fields;
    };
    ProjectsComponent.prototype.addFeeTo = function (project, fee) {
        this.projectsNotify.emit({
            type: 'ADD_QUOTE_FEE',
            payload: { project: project, fee: fee }
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProjectsComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ProjectsComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ProjectsComponent.prototype, "projects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", capabilities_service_1.Capabilities)
    ], ProjectsComponent.prototype, "userCan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectsComponent.prototype, "quoteType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProjectsComponent.prototype, "allRMAssetsHaveAttributes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ProjectsComponent.prototype, "projectsNotify", void 0);
    ProjectsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'projects-component',
            templateUrl: 'projects.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [wz_dialog_service_1.WzDialogService, app_store_1.AppStore])
    ], ProjectsComponent);
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3RzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGdEQUE4QztBQUM5QyxzQ0FBZ0c7QUFDaEcsb0ZBRXVEO0FBQ3ZELHNGQUE2RTtBQUM3RSxrR0FBK0Y7QUFHL0YsK0VBQW9FO0FBUXBFO0lBVUUsMkJBQW9CLGFBQThCLEVBQVUsS0FBZTtRQUF2RCxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBVGxFLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFLMUIsOEJBQXlCLEdBQVksSUFBSSxDQUFDO1FBQ3pDLG1CQUFjLEdBQXlCLElBQUksbUJBQVksRUFBVSxDQUFDO1FBaUhwRSw4QkFBeUIsR0FBRyxVQUFDLFVBQXlCO1lBRTVELE1BQU0sQ0FBQyxDQUFBLEtBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUssQ0FBQTtpQkFDdkMsT0FBTyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7aUJBQ3pCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO2lCQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQTtJQXBIOEUsQ0FBQztJQUV6RSw2Q0FBaUIsR0FBeEIsVUFBeUIsY0FBdUI7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsS0FBSyxjQUFjLENBQUMsRUFBRSxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVNLDRDQUFnQixHQUF2QixVQUF3QixPQUFnQjtRQUN0QyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0lBRU0s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ZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUHJvamVjdCwgUHVyY2hhc2VUeXBlLCBGZWVMaW5lSXRlbSwgRmVlQ29uZmlnLCBGZWVDb25maWdJdGVtLCBBc3NldExpbmVJdGVtLCBxdW90ZXNXaXRob3V0UHJpY2luZ1xufSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IFd6RGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9zZXJ2aWNlcy93ei5kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IFd6RXZlbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3Byb2plY3RzLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAncHJvamVjdHMuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgY29uZmlnOiBhbnk7XG4gIEBJbnB1dCgpIHByb2plY3RzOiBBcnJheTxQcm9qZWN0PjtcbiAgQElucHV0KCkgdXNlckNhbjogQ2FwYWJpbGl0aWVzO1xuICBASW5wdXQoKSBxdW90ZVR5cGU6IFB1cmNoYXNlVHlwZTtcbiAgQElucHV0KCkgYWxsUk1Bc3NldHNIYXZlQXR0cmlidXRlczogYm9vbGVhbiA9IHRydWU7XG4gIEBPdXRwdXQoKSBwcm9qZWN0c05vdGlmeTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcbiAgcHJpdmF0ZSBzZWxlY3RlZFByb2plY3Q6IFByb2plY3Q7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2dTZXJ2aWNlOiBXekRpYWxvZ1NlcnZpY2UsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgcHJvamVjdHNPdGhlclRoYW4oY3VycmVudFByb2plY3Q6IFByb2plY3QpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LmlkICE9PSBjdXJyZW50UHJvamVjdC5pZCk7XG4gIH1cblxuICBwdWJsaWMgbGluZUl0ZW1Db3VudEZvcihwcm9qZWN0OiBQcm9qZWN0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHByb2plY3QubGluZUl0ZW1zIHx8IFtdKS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZWRpdFByb2plY3RQcmljZShtZXNzYWdlOiBXekV2ZW50LCBwYXlsb2FkOiBhbnkpIHtcbiAgICB0aGlzLnByb2plY3RzTm90aWZ5LmVtaXQoT2JqZWN0LmFzc2lnbihtZXNzYWdlLCB7IHBheWxvYWQ6IHBheWxvYWQgfSkpO1xuICB9XG5cbiAgcHVibGljIGFkZFByb2plY3QoKTogdm9pZCB7XG4gICAgdGhpcy5wcm9qZWN0c05vdGlmeS5lbWl0KHsgdHlwZTogJ0FERF9QUk9KRUNUJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblJlbW92ZShwcm9qZWN0OiBQcm9qZWN0KTogdm9pZCB7XG4gICAgdGhpcy5wcm9qZWN0c05vdGlmeS5lbWl0KHsgdHlwZTogJ1JFTU9WRV9QUk9KRUNUJywgcGF5bG9hZDogcHJvamVjdCB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbkVkaXQocHJvamVjdDogUHJvamVjdCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkT25seSkge1xuICAgICAgdGhpcy5zZWxlY3RQcm9qZWN0KHByb2plY3QpO1xuICAgICAgdGhpcy5wcm9qZWN0c05vdGlmeS5lbWl0KHtcbiAgICAgICAgdHlwZTogJ1VQREFURV9QUk9KRUNUJyxcbiAgICAgICAgcGF5bG9hZDogT2JqZWN0LmFzc2lnbih7IHByb2plY3Q6IHByb2plY3QsIGl0ZW1zOiB0aGlzLmNvbmZpZy5mb3JtLml0ZW1zIH0pXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25DbGlja0FkZEZlZUJ1dHRvbkZvcihwcm9qZWN0OiBQcm9qZWN0KTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuZmVlQ29uZmlnLmxvYWRGZWVDb25maWcoKSk7XG4gICAgdGhpcy5zdG9yZS5ibG9ja1VudGlsKHN0YXRlID0+IHN0YXRlLmZlZUNvbmZpZy5pbml0aWFsaXplZCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuRm9ybURpYWxvZyhcbiAgICAgICAgdGhpcy5pbml0aWFsaXplUXVvdGVGZWVGaWVsZHNGcm9tKHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUuZmVlQ29uZmlnLmZlZUNvbmZpZykpLFxuICAgICAgICB7IHRpdGxlOiAnUVVPVEUuQUREX0ZFRS5IRUFERVInLCBzdWJtaXRMYWJlbDogJ1FVT1RFLkFERF9GRUUuU1VCTUlUJyB9LFxuICAgICAgICAocmVzdWx0OiBGZWVMaW5lSXRlbSkgPT4gdGhpcy5hZGRGZWVUbyhwcm9qZWN0LCByZXN1bHQpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlbGVnYXRlKG1lc3NhZ2U6IFd6RXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnByb2plY3RzTm90aWZ5LmVtaXQobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0UHJvamVjdChwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgdGhpcy5zZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0O1xuICAgIHRoaXMuY29uZmlnLmZvcm0uaXRlbXMgPSB0aGlzLmNvbmZpZy5mb3JtLml0ZW1zLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBpdGVtLnZhbHVlID0gdGhpcy5zZWxlY3RlZFByb2plY3RbaXRlbS5uYW1lXTtcbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJtQXNzZXRzSGF2ZUF0dHJpYnV0ZXMocHJvamVjdDogUHJvamVjdCk6IGJvb2xlYW4ge1xuICAgIGlmICghcHJvamVjdC5saW5lSXRlbXMgfHwgcHJvamVjdC5saW5lSXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBsZXQgdmFsaWRBc3NldHM6IGJvb2xlYW5bXSA9IFtdO1xuICAgIGlmIChwcm9qZWN0LmxpbmVJdGVtcykge1xuICAgICAgcHJvamVjdC5saW5lSXRlbXMuZm9yRWFjaCgobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pID0+IHtcbiAgICAgICAgdmFsaWRBc3NldHMucHVzaChsaW5lSXRlbS5yaWdodHNNYW5hZ2VkID09PSAnUmlnaHRzIE1hbmFnZWQnID8gISFsaW5lSXRlbS5hdHRyaWJ1dGVzIDogdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkQXNzZXRzLmluZGV4T2YoZmFsc2UpID09PSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBwcm9qZWN0SGFzUm1Bc3NldHMocHJvamVjdDogUHJvamVjdCk6IGJvb2xlYW4ge1xuICAgIGlmICghcHJvamVjdC5saW5lSXRlbXMgfHwgcHJvamVjdC5saW5lSXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IHZhbGlkQXNzZXRzOiBib29sZWFuW10gPSBbXTtcbiAgICBpZiAocHJvamVjdC5saW5lSXRlbXMpIHtcbiAgICAgIHByb2plY3QubGluZUl0ZW1zLmZvckVhY2goKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSA9PiB7XG4gICAgICAgIHZhbGlkQXNzZXRzLnB1c2gobGluZUl0ZW0ucmlnaHRzTWFuYWdlZCA9PT0gJ1JpZ2h0cyBNYW5hZ2VkJyA/IHRydWUgOiBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbGlkQXNzZXRzLmluZGV4T2YodHJ1ZSkgIT09IC0xO1xuICB9XG5cbiAgcHVibGljIG9uQ2xpY2tCdWxrSW1wb3J0QnV0dG9uKHByb2plY3Q6IFByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLnByb2plY3RzTm90aWZ5LmVtaXQoeyB0eXBlOiAnT1BFTl9CVUxLX0lNUE9SVF9ESUFMT0cnLCBwYXlsb2FkOiBwcm9qZWN0LmlkIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93UHJpY2luZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXF1b3Rlc1dpdGhvdXRQcmljaW5nLmluY2x1ZGVzKHRoaXMucXVvdGVUeXBlKSAmJiB0aGlzLmFsbFJNQXNzZXRzSGF2ZUF0dHJpYnV0ZXM7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemVRdW90ZUZlZUZpZWxkc0Zyb20oZmVlQ29uZmlnOiBGZWVDb25maWcpOiBGb3JtRmllbGRzW10ge1xuICAgIC8vIFRoaXMgaXMgc29ydCBvZiBib2d1cywgYmVjYXVzZSB0aGUgZmllbGRzIGFyZSBjb21wbGV0ZWx5IGRlcGVuZGVudCBvbiBVSSBjb25maWcgdG8gYmUgXCJjb3JyZWN0XCIuXG4gICAgLy8gKFRob3VnaCBpdCdzIG5vIG1vcmUgYm9ndXMgdGhhbiBleHBlY3RpbmcgXCJ0aGlzLmNvbmZpZy5hZGRRdW90ZUZlZS5pdGVtc1wiIHRvIGJlIHByZXNlbnQuLi4pXG4gICAgLy8gV2UnbGwgYXQgbGVhc3QgY2hlY2sgdG8gbWFrZSBzdXJlIHRoZSBmaWVsZHMgYXJlIGZvdW5kIGJlZm9yZSB3ZSB0cnkgdG8gbWFuaXB1bGF0ZSB0aGVtLlxuXG4gICAgY29uc3QgZmllbGRzOiBGb3JtRmllbGRzW10gPSBDb21tb24uY2xvbmUodGhpcy5jb25maWcuYWRkUXVvdGVGZWUuaXRlbXMpO1xuICAgIGNvbnN0IGZlZVR5cGVGaWVsZDogRm9ybUZpZWxkcyA9IGZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLm5hbWUgPT09ICdmZWVUeXBlJyk7XG5cbiAgICBpZiAoZmVlVHlwZUZpZWxkKSB7XG4gICAgICBjb25zdCBvcHRpb25zOiBzdHJpbmdbXSA9IGZlZUNvbmZpZy5pdGVtcy5tYXAoY29uZmlnSXRlbSA9PiBjb25maWdJdGVtLm5hbWUpO1xuICAgICAgZmVlVHlwZUZpZWxkLm9wdGlvbnMgPSBvcHRpb25zLmpvaW4oJywnKTtcbiAgICAgIGZlZVR5cGVGaWVsZC52YWx1ZSA9IG9wdGlvbnNbMF07XG5cbiAgICAgIGNvbnN0IGFtb3VudEZpZWxkOiBGb3JtRmllbGRzID0gZmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQubmFtZSA9PT0gJ2Ftb3VudCcpO1xuXG4gICAgICBpZiAoYW1vdW50RmllbGQpIHtcbiAgICAgICAgZmVlVHlwZUZpZWxkLnNsYXZlRmllbGROYW1lID0gJ2Ftb3VudCc7XG4gICAgICAgIGZlZVR5cGVGaWVsZC5zbGF2ZUZpZWxkVmFsdWVzID0gZmVlQ29uZmlnLml0ZW1zLm1hcCh0aGlzLmZvcm1hdEZlZUNvbmZpZ0l0ZW1BbW91bnQpO1xuICAgICAgICBhbW91bnRGaWVsZC52YWx1ZSA9IGZlZVR5cGVGaWVsZC5zbGF2ZUZpZWxkVmFsdWVzWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZHM7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdEZlZUNvbmZpZ0l0ZW1BbW91bnQgPSAoY29uZmlnSXRlbTogRmVlQ29uZmlnSXRlbSkgPT4ge1xuICAgIC8vIFVwZGF0ZSB0aGlzIGlmIHdlIGV2ZXIgdXNlIGFueXRoaW5nIGJ1dCBVUyBkb2xsYXJzLlxuICAgIHJldHVybiBgJHsoY29uZmlnSXRlbS5hbW91bnQgfHwgMCkgKiAxMDB9YCAvLyAxMDAgPT4gJzEwMDAwJywgLjUwID0+ICc1MCcsIDAgPT4gJzAnLCB1bmRlZmluZWQgPT4gJzAnXG4gICAgICAucmVwbGFjZSgvKFxcZFxcZCkkLywgJy4kMScpICAgICAgICAgICAgICAgLy8gMTAwMDAgPT4gJzEwMC4wMCcsICc1MCcgPT4gJy41MCcsICcwJyA9PiAnMCdcbiAgICAgIC5yZXBsYWNlKC9eXFwuLywgJzAuJykgICAgICAgICAgICAgICAgICAgIC8vICcxMDAuMDAnID0+ICcxMDAuMDAnLCAnLjUwJyA9PiAnMC41MCwgJzAnID0+ICcwJ1xuICAgICAgLnJlcGxhY2UoL14wJC8sICcwLjAwJyk7ICAgICAgICAgICAgICAgICAvLyAnMTAwLjAwJyA9PiAnMTAwLjAwJywgJzAuNTAnID0+ICcwLjUwJywgJzAnID0+ICcwLjAwJ1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRGZWVUbyhwcm9qZWN0OiBQcm9qZWN0LCBmZWU6IEZlZUxpbmVJdGVtKSB7XG4gICAgdGhpcy5wcm9qZWN0c05vdGlmeS5lbWl0KHtcbiAgICAgIHR5cGU6ICdBRERfUVVPVEVfRkVFJyxcbiAgICAgIHBheWxvYWQ6IHsgcHJvamVjdDogcHJvamVjdCwgZmVlOiBmZWUgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=

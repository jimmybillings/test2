"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_store_1 = require("../../../app.store");
var core_1 = require("@angular/core");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
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
    ProjectsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'projects-component',
                    templateUrl: 'projects.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    ProjectsComponent.ctorParameters = function () { return [
        { type: wz_dialog_service_1.WzDialogService, },
        { type: app_store_1.AppStore, },
    ]; };
    ProjectsComponent.propDecorators = {
        'readOnly': [{ type: core_1.Input },],
        'config': [{ type: core_1.Input },],
        'projects': [{ type: core_1.Input },],
        'userCan': [{ type: core_1.Input },],
        'quoteType': [{ type: core_1.Input },],
        'allRMAssetsHaveAttributes': [{ type: core_1.Input },],
        'projectsNotify': [{ type: core_1.Output },],
    };
    return ProjectsComponent;
}());
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map
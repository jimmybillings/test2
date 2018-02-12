"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var LineItemsComponent = (function () {
    function LineItemsComponent() {
        this.targets = {};
        this.enhancedAssets = {};
        this.readOnly = false;
        this.lineItemsNotify = new core_1.EventEmitter();
        this.noteVisibilityMap = {};
    }
    Object.defineProperty(LineItemsComponent.prototype, "lineItems", {
        set: function (items) {
            var _this = this;
            if (items) {
                this.items = items;
                items.forEach(function (item) {
                    _this.noteVisibilityMap[item.id] = _this.hasNotes(item);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    LineItemsComponent.prototype.onMoveTo = function (otherProject, lineItem) {
        this.lineItemsNotify.emit({
            type: 'MOVE_LINE_ITEM', payload: { lineItem: lineItem, otherProject: otherProject }
        });
    };
    LineItemsComponent.prototype.onClone = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'CLONE_LINE_ITEM', payload: lineItem });
    };
    LineItemsComponent.prototype.onRemove = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'REMOVE_LINE_ITEM', payload: lineItem });
    };
    LineItemsComponent.prototype.onEditMarkers = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'EDIT_LINE_ITEM_MARKERS', payload: lineItem });
    };
    LineItemsComponent.prototype.delegate = function (message) {
        this.lineItemsNotify.emit(message);
    };
    LineItemsComponent.prototype.selectLineItem = function (lineItem) {
        this.selectedLineItem = lineItem;
    };
    LineItemsComponent.prototype.onShowPricingDialog = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'SHOW_PRICING_DIALOG', payload: lineItem });
    };
    LineItemsComponent.prototype.onSelectTarget = function (newTarget, currentlySelected, lineItem) {
        if (currentlySelected !== newTarget) {
            this.lineItemsNotify.emit({
                type: 'EDIT_LINE_ITEM', payload: { lineItem: lineItem, fieldToEdit: { selectedTranscodeTarget: newTarget } }
            });
        }
    };
    LineItemsComponent.prototype.shouldDisplayRights = function (lineItem) {
        return lineItem.rightsManaged === 'Rights Managed' && !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType);
    };
    LineItemsComponent.prototype.shouldShowTargets = function (lineItem) {
        return lineItem.transcodeTargets && lineItem.transcodeTargets.length > 0;
    };
    LineItemsComponent.prototype.shouldDisplayPricing = function (lineItem) {
        return !commerce_interface_1.quotesWithoutPricing.includes(this.quoteType) &&
            (this.rmAssetHasAttributes(lineItem) || lineItem.rightsManaged === 'Royalty Free');
    };
    LineItemsComponent.prototype.onOpenCostMultiplierForm = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'SHOW_COST_MULTIPLIER_DIALOG', payload: lineItem });
    };
    LineItemsComponent.prototype.onRemoveCostMultiplier = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'REMOVE_COST_MULTIPLIER', payload: lineItem });
    };
    LineItemsComponent.prototype.isSubclipped = function (asset) {
        return asset.isSubclipped;
    };
    LineItemsComponent.prototype.onAddCustomPrice = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'ADD_CUSTOM_PRICE', payload: lineItem });
    };
    LineItemsComponent.prototype.iconForNotesButton = function (lineItem) {
        return this.noteVisibilityMap[lineItem.id] ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    };
    LineItemsComponent.prototype.toggleNotesVisibilityFor = function (lineItem) {
        this.noteVisibilityMap[lineItem.id] = !this.noteVisibilityMap[lineItem.id];
    };
    LineItemsComponent.prototype.hasNotes = function (lineItem) {
        return lineItem.hasOwnProperty('notes') &&
            lineItem.notes.length > 0 &&
            lineItem.notes[0].hasOwnProperty('notes') &&
            lineItem.notes[0].notes.length > 0;
    };
    LineItemsComponent.prototype.shouldShowNoteFor = function (lineItem) {
        return this.hasNotes(lineItem) && !!this.noteVisibilityMap[lineItem.id];
    };
    LineItemsComponent.prototype.onAddNote = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'ADD_NOTE', payload: lineItem });
    };
    LineItemsComponent.prototype.removeNotesFrom = function (lineItem) {
        this.lineItemsNotify.emit({ type: 'REMOVE_NOTE', payload: lineItem });
    };
    LineItemsComponent.prototype.rmAssetHasAttributes = function (lineItem) {
        return lineItem.rightsManaged === 'Rights Managed' && !!lineItem.attributes;
    };
    LineItemsComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'line-items-component',
                    templateUrl: './line-items.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    LineItemsComponent.ctorParameters = function () { return []; };
    LineItemsComponent.propDecorators = {
        'lineItems': [{ type: core_1.Input },],
        'quoteType': [{ type: core_1.Input },],
        'otherProjects': [{ type: core_1.Input },],
        'userCan': [{ type: core_1.Input },],
        'readOnly': [{ type: core_1.Input },],
        'rmAssetsHaveAttributes': [{ type: core_1.Input },],
        'lineItemsNotify': [{ type: core_1.Output },],
    };
    return LineItemsComponent;
}());
exports.LineItemsComponent = LineItemsComponent;
//# sourceMappingURL=line-items.component.js.map
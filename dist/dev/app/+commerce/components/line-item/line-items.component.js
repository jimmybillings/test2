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
var commerce_interface_1 = require("../../../shared/interfaces/commerce.interface");
var capabilities_service_1 = require("../../../shared/services/capabilities.service");
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
            (this.rmAssetHasAttributes(lineItem) || lineItem.rightsManaged === 'Royalty Free') || !!lineItem.overrideGrossAssetPrice;
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], LineItemsComponent.prototype, "lineItems", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LineItemsComponent.prototype, "quoteType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], LineItemsComponent.prototype, "otherProjects", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", capabilities_service_1.Capabilities)
    ], LineItemsComponent.prototype, "userCan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemsComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], LineItemsComponent.prototype, "rmAssetsHaveAttributes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LineItemsComponent.prototype, "lineItemsNotify", void 0);
    LineItemsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'line-items-component',
            templateUrl: './line-items.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], LineItemsComponent);
    return LineItemsComponent;
}());
exports.LineItemsComponent = LineItemsComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9saW5lLWl0ZW0vbGluZS1pdGVtcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFDaEcsb0ZBQTJIO0FBQzNILHNGQUE2RTtBQVM3RTtJQU5BO1FBT1MsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixtQkFBYyxHQUE0QyxFQUFFLENBQUM7UUFjM0QsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUV6QixvQkFBZSxHQUF5QixJQUFJLG1CQUFZLEVBQVUsQ0FBQztRQUV0RSxzQkFBaUIsR0FBaUMsRUFBRSxDQUFDO0lBb0c5RCxDQUFDO0lBbkhVLHNCQUFJLHlDQUFTO2FBQWIsVUFBYyxLQUFzQjtZQUE3QyxpQkFPQztZQU5DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUNoQixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUNILENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQVVLLHFDQUFRLEdBQWYsVUFBZ0IsWUFBcUIsRUFBRSxRQUF1QjtRQUM1RCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztZQUN4QixJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFO1NBQ3BGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxvQ0FBTyxHQUFkLFVBQWUsUUFBdUI7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJB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dEIsVUFBdUIsUUFBdUI7UUFDNUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTyxpREFBb0IsR0FBNUIsVUFBNkIsUUFBdUI7UUFDbEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUUsQ0FBQztJQWxIUTtRQUFSLFlBQUssRUFBRTs7O3VEQU9QO0lBQ1E7UUFBUixZQUFLLEVBQUU7O3lEQUF5QjtJQUN4QjtRQUFSLFlBQUssRUFBRTs7NkRBQTBCO0lBQ3pCO1FBQVIsWUFBSyxFQUFFO2tDQUFVLG1DQUFZO3VEQUFDO0lBQ3RCO1FBQVIsWUFBSyxFQUFFOzt3REFBMkI7SUFDMUI7UUFBUixZQUFLLEVBQUU7O3NFQUFpQztJQUMvQjtRQUFULGFBQU0sRUFBRTtrQ0FBa0IsbUJBQVk7K0RBQXNDO0lBbEJsRSxrQkFBa0I7UUFOOUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLGtCQUFrQixDQXdIOUI7SUFBRCx5QkFBQztDQXhIRCxBQXdIQyxJQUFBO0FBeEhZLGdEQUFrQiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvbGluZS1pdGVtL2xpbmUtaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9qZWN0LCBBc3NldExpbmVJdGVtLCBQdXJjaGFzZVR5cGUsIHF1b3Rlc1dpdGhvdXRQcmljaW5nIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdsaW5lLWl0ZW1zLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5lLWl0ZW1zLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lSXRlbXNDb21wb25lbnQge1xuICBwdWJsaWMgdGFyZ2V0czogYW55ID0ge307XG4gIHB1YmxpYyBlbmhhbmNlZEFzc2V0czogeyBbbGluZUl0ZW1JZDogc3RyaW5nXTogRW5oYW5jZWRBc3NldCB9ID0ge307XG4gIHB1YmxpYyBpdGVtczogQXNzZXRMaW5lSXRlbVtdO1xuXG4gIEBJbnB1dCgpIHNldCBsaW5lSXRlbXMoaXRlbXM6IEFzc2V0TGluZUl0ZW1bXSkge1xuICAgIGlmIChpdGVtcykge1xuICAgICAgdGhpcy5pdGVtcyA9IGl0ZW1zO1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgdGhpcy5ub3RlVmlzaWJpbGl0eU1hcFtpdGVtLmlkXSA9IHRoaXMuaGFzTm90ZXMoaXRlbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIEBJbnB1dCgpIHF1b3RlVHlwZTogUHVyY2hhc2VUeXBlO1xuICBASW5wdXQoKSBvdGhlclByb2plY3RzOiBQcm9qZWN0W107XG4gIEBJbnB1dCgpIHVzZXJDYW46IENhcGFiaWxpdGllcztcbiAgQElucHV0KCkgcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcm1Bc3NldHNIYXZlQXR0cmlidXRlczogYm9vbGVhbjtcbiAgQE91dHB1dCgpIGxpbmVJdGVtc05vdGlmeTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSBuZXcgRXZlbnRFbWl0dGVyPE9iamVjdD4oKTtcbiAgcHVibGljIHNlbGVjdGVkTGluZUl0ZW06IEFzc2V0TGluZUl0ZW07XG4gIHB1YmxpYyBub3RlVmlzaWJpbGl0eU1hcDogeyBbaW5kZXg6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuXG4gIHB1YmxpYyBvbk1vdmVUbyhvdGhlclByb2plY3Q6IFByb2plY3QsIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5saW5lSXRlbXNOb3RpZnkuZW1pdCh7XG4gICAgICB0eXBlOiAnTU9WRV9MSU5FX0lURU0nLCBwYXlsb2FkOiB7IGxpbmVJdGVtOiBsaW5lSXRlbSwgb3RoZXJQcm9qZWN0OiBvdGhlclByb2plY3QgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvbmUobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmxpbmVJdGVtc05vdGlmeS5lbWl0KHsgdHlwZTogJ0NMT05FX0xJTkVfSVRFTScsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICB9XG5cbiAgcHVibGljIG9uUmVtb3ZlKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5saW5lSXRlbXNOb3RpZnkuZW1pdCh7IHR5cGU6ICdSRU1PVkVfTElORV9JVEVNJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gIH1cblxuICBwdWJsaWMgb25FZGl0TWFya2VycyhsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHZvaWQge1xuICAgIHRoaXMubGluZUl0ZW1zTm90aWZ5LmVtaXQoeyB0eXBlOiAnRURJVF9MSU5FX0lURU1fTUFSS0VSUycsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICB9XG5cbiAgcHVibGljIGRlbGVnYXRlKG1lc3NhZ2U6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubGluZUl0ZW1zTm90aWZ5LmVtaXQobWVzc2FnZSk7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0TGluZUl0ZW0obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkTGluZUl0ZW0gPSBsaW5lSXRlbTtcbiAgfVxuXG4gIHB1YmxpYyBvblNob3dQcmljaW5nRGlhbG9nKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5saW5lSXRlbXNOb3RpZnkuZW1pdCh7IHR5cGU6ICdTSE9XX1BSSUNJTkdfRElBTE9HJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3RUYXJnZXQobmV3VGFyZ2V0OiBzdHJpbmcsIGN1cnJlbnRseVNlbGVjdGVkOiBzdHJpbmcsIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgaWYgKGN1cnJlbnRseVNlbGVjdGVkICE9PSBuZXdUYXJnZXQpIHtcbiAgICAgIHRoaXMubGluZUl0ZW1zTm90aWZ5LmVtaXQoe1xuICAgICAgICB0eXBlOiAnRURJVF9MSU5FX0lURU0nLCBwYXlsb2FkOlxuICAgICAgICAgIHsgbGluZUl0ZW0sIGZpZWxkVG9FZGl0OiB7IHNlbGVjdGVkVHJhbnNjb2RlVGFyZ2V0OiBuZXdUYXJnZXQgfSB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkRGlzcGxheVJpZ2h0cyhsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5lSXRlbS5yaWdodHNNYW5hZ2VkID09PSAnUmlnaHRzIE1hbmFnZWQnICYmICFxdW90ZXNXaXRob3V0UHJpY2luZy5pbmNsdWRlcyh0aGlzLnF1b3RlVHlwZSk7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd1RhcmdldHMobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gbGluZUl0ZW0udHJhbnNjb2RlVGFyZ2V0cyAmJiBsaW5lSXRlbS50cmFuc2NvZGVUYXJnZXRzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkRGlzcGxheVByaWNpbmcobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXF1b3Rlc1dpdGhvdXRQcmljaW5nLmluY2x1ZGVzKHRoaXMucXVvdGVUeXBlKSAmJlxuICAgICAgKHRoaXMucm1Bc3NldEhhc0F0dHJpYnV0ZXMobGluZUl0ZW0pIHx8IGxpbmVJdGVtLnJpZ2h0c01hbmFnZWQgPT09ICdSb3lhbHR5IEZyZWUnKSB8fCAhIWxpbmVJdGVtLm92ZXJyaWRlR3Jvc3NBc3NldFByaWNlO1xuICB9XG5cbiAgcHVibGljIG9uT3BlbkNvc3RNdWx0aXBsaWVyRm9ybShsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHZvaWQge1xuICAgIHRoaXMubGluZUl0ZW1zTm90aWZ5LmVtaXQoeyB0eXBlOiAnU0hPV19DT1NUX01VTFRJUExJRVJfRElBTE9HJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gIH1cblxuICBwdWJsaWMgb25SZW1vdmVDb3N0TXVsdGlwbGllcihsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHZvaWQge1xuICAgIHRoaXMubGluZUl0ZW1zTm90aWZ5LmVtaXQoeyB0eXBlOiAnUkVNT1ZFX0NPU1RfTVVMVElQTElFUicsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICB9XG5cbiAgcHVibGljIGlzU3ViY2xpcHBlZChhc3NldDogRW5oYW5jZWRBc3NldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBhc3NldC5pc1N1YmNsaXBwZWQ7XG4gIH1cblxuICBwdWJsaWMgb25BZGRDdXN0b21QcmljZShsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHZvaWQge1xuICAgIHRoaXMubGluZUl0ZW1zTm90aWZ5LmVtaXQoeyB0eXBlOiAnQUREX0NVU1RPTV9QUklDRScsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICB9XG5cbiAgcHVibGljIGljb25Gb3JOb3Rlc0J1dHRvbihsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubm90ZVZpc2liaWxpdHlNYXBbbGluZUl0ZW0uaWRdID8gJ2tleWJvYXJkX2Fycm93X3VwJyA6ICdrZXlib2FyZF9hcnJvd19kb3duJztcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVOb3Rlc1Zpc2liaWxpdHlGb3IobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLm5vdGVWaXNpYmlsaXR5TWFwW2xpbmVJdGVtLmlkXSA9ICF0aGlzLm5vdGVWaXNpYmlsaXR5TWFwW2xpbmVJdGVtLmlkXTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNOb3RlcyhsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5lSXRlbS5oYXNPd25Qcm9wZXJ0eSgnbm90ZXMnKSAmJlxuICAgICAgbGluZUl0ZW0ubm90ZXMubGVuZ3RoID4gMCAmJlxuICAgICAgbGluZUl0ZW0ubm90ZXNbMF0uaGFzT3duUHJvcGVydHkoJ25vdGVzJykgJiZcbiAgICAgIGxpbmVJdGVtLm5vdGVzWzBdLm5vdGVzLmxlbmd0aCA+IDA7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkU2hvd05vdGVGb3IobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5oYXNOb3RlcyhsaW5lSXRlbSkgJiYgISF0aGlzLm5vdGVWaXNpYmlsaXR5TWFwW2xpbmVJdGVtLmlkXTtcbiAgfVxuXG4gIHB1YmxpYyBvbkFkZE5vdGUobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmxpbmVJdGVtc05vdGlmeS5lbWl0KHsgdHlwZTogJ0FERF9OT1RFJywgcGF5bG9hZDogbGluZUl0ZW0gfSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlTm90ZXNGcm9tKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5saW5lSXRlbXNOb3RpZnkuZW1pdCh7IHR5cGU6ICdSRU1PVkVfTk9URScsIHBheWxvYWQ6IGxpbmVJdGVtIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBybUFzc2V0SGFzQXR0cmlidXRlcyhsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBsaW5lSXRlbS5yaWdodHNNYW5hZ2VkID09PSAnUmlnaHRzIE1hbmFnZWQnICYmICEhbGluZUl0ZW0uYXR0cmlidXRlcztcbiAgfVxufVxuIl19

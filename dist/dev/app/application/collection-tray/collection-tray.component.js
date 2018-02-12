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
var collection_link_component_1 = require("../../+collection/components/collection-link.component");
var collection_form_component_1 = require("./components/collection-form.component");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var enhanced_asset_1 = require("../../shared/interfaces/enhanced-asset");
var app_store_1 = require("../../app.store");
var common_functions_1 = require("../../shared/utilities/common.functions");
var collections_list_dd_component_1 = require("./components/collections-list-dd.component");
var CollectionTrayComponent = (function () {
    function CollectionTrayComponent(dialogService, store, detector) {
        this.dialogService = dialogService;
        this.store = store;
        this.detector = detector;
        this.enhancedAssets = {};
    }
    CollectionTrayComponent.prototype.ngOnInit = function () {
        this.store.dispatch(function (factory) { return factory.activeCollection.loadIfNeeded(); });
        this.collectionSubscription = this.setCollection();
        var config = this.store.snapshotCloned(function (state) { return state.uiConfig.components; });
        this.collectionFormConfig = config.collection.config;
    };
    CollectionTrayComponent.prototype.ngOnDestroy = function () {
        this.collectionSubscription.unsubscribe();
    };
    CollectionTrayComponent.prototype.toggleCollectionTray = function () {
        this.userPreference.toggleCollectionTray();
    };
    CollectionTrayComponent.prototype.hasId = function (asset) {
        return !!asset && !!(asset.assetId);
    };
    CollectionTrayComponent.prototype.routerLinkFor = function (asset) {
        return asset.routerLink;
    };
    CollectionTrayComponent.prototype.hasThumbnail = function (asset) {
        return !!asset.thumbnailUrl;
    };
    CollectionTrayComponent.prototype.thumbnailUrlFor = function (asset) {
        return asset.thumbnailUrl;
    };
    CollectionTrayComponent.prototype.getAssetsForLink = function () {
        this.dialogService.openComponentInDialog({
            componentType: collection_link_component_1.CollectionLinkComponent,
            inputOptions: { assets: this.collection.assets.items }
        });
    };
    CollectionTrayComponent.prototype.createCollectionlistDialog = function () {
        var focusedCollection;
        this.dialogService.openComponentInDialog({
            componentType: collections_list_dd_component_1.CollectionListDdComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
            inputOptions: {
                focusedCollection: this.collection
            },
            outputOptions: [{
                    event: 'close',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    CollectionTrayComponent.prototype.createCollection = function () {
        var _this = this;
        this.dialogService.openComponentInDialog({
            componentType: collection_form_component_1.CollectionFormComponent,
            dialogConfig: { position: { top: '10%' } },
            inputOptions: {
                fields: this.collectionFormConfig,
                collectionActionType: 'create'
            },
            outputOptions: [{
                    event: 'collectionSaved',
                    callback: function (event) {
                        if (_this.urlPath.includes('/collections/')) {
                            _this.store.dispatch(function (factory) { return factory.router.goToCollection(event.collectionId); });
                        }
                        else {
                            _this.store.dispatch(function (factory) { return factory.snackbar.display('COLLECTION.COLLECTION_CREATED'); });
                        }
                    },
                    closeOnEvent: true
                }]
        });
    };
    CollectionTrayComponent.prototype.setCollection = function () {
        var _this = this;
        return this.store.select(function (state) { return state.activeCollection; })
            .filter(function (state) { return state.collection !== undefined; })
            .map(function (state) {
            var collection = common_functions_1.Common.clone(state.collection);
            if (collection.assets && collection.assets.items) {
                collection.assets.items = collection.assets.items
                    .map(function (item) { return enhanced_asset_1.enhanceAsset(item, 'collection', collection.id); });
            }
            return collection;
        }).subscribe(function (collection) {
            _this.collection = collection;
            _this.detector.markForCheck();
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionTrayComponent.prototype, "userPreference", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CollectionTrayComponent.prototype, "urlPath", void 0);
    CollectionTrayComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-tray',
            templateUrl: 'collection-tray.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }),
        __metadata("design:paramtypes", [wz_dialog_service_1.WzDialogService,
            app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], CollectionTrayComponent);
    return CollectionTrayComponent;
}());
exports.CollectionTrayComponent = CollectionTrayComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29sbGVjdGlvbi10cmF5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnSDtBQUVoSCxvR0FBaUc7QUFDakcsb0ZBQWlGO0FBQ2pGLCtGQUE0RjtBQUc1Rix5RUFBcUY7QUFDckYsNkNBQTJDO0FBQzNDLDRFQUFpRTtBQUNqRSw0RkFBdUY7QUFTdkY7SUFPRSxpQ0FDVSxhQUE4QixFQUM5QixLQUFlLEVBQ2YsUUFBMkI7UUFGM0Isa0JBQWEsR0FBYixhQUFhLENBQWlCO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUw3QixtQkFBYyxHQUFzQyxFQUFFLENBQUM7SUFLdEIsQ0FBQztJQUUxQywwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEVBQXZDLENBQXVDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25ELElBQU0sTUFBTSxHQUF1QixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUF6QixDQUF5QixDQUFDLENBQUM7UUFDakcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3ZELENBQUM7SUFFRCw2Q0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTSxzREFBb0IsR0FBM0I7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVN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cGxpY2F0aW9uL2NvbGxlY3Rpb24tdHJheS9jb2xsZWN0aW9uLXRyYXkuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkxpbmtDb21wb25lbnQgfSBmcm9tICcuLi8uLi8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tbGluay5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvY29sbGVjdGlvbi1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXNzZXQsIFd6RXZlbnQsIFVpQ29uZmlnQ29tcG9uZW50cyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQ29sbGVjdGlvbkZvcm1FdmVudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQsIGVuaGFuY2VBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2NvbGxlY3Rpb25zLWxpc3QtZGQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY29sbGVjdGlvbi10cmF5JyxcbiAgdGVtcGxhdGVVcmw6ICdjb2xsZWN0aW9uLXRyYXkuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcblxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25UcmF5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB1c2VyUHJlZmVyZW5jZTogYW55O1xuICBASW5wdXQoKSB1cmxQYXRoOiBzdHJpbmc7XG4gIHB1YmxpYyBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICBwdWJsaWMgY29sbGVjdGlvbkZvcm1Db25maWc6IGFueTtcbiAgcHJpdmF0ZSBlbmhhbmNlZEFzc2V0czogeyBbdXVpZDogc3RyaW5nXTogRW5oYW5jZWRBc3NldCB9ID0ge307XG4gIHByaXZhdGUgY29sbGVjdGlvblN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIGRldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5sb2FkSWZOZWVkZWQoKSk7XG4gICAgdGhpcy5jb2xsZWN0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5zZXRDb2xsZWN0aW9uKCk7XG4gICAgY29uc3QgY29uZmlnOiBVaUNvbmZpZ0NvbXBvbmVudHMgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMpO1xuICAgIHRoaXMuY29sbGVjdGlvbkZvcm1Db25maWcgPSBjb25maWcuY29sbGVjdGlvbi5jb25maWc7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbGxlY3Rpb25TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVDb2xsZWN0aW9uVHJheSgpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJQcmVmZXJlbmNlLnRvZ2dsZUNvbGxlY3Rpb25UcmF5KCk7XG4gIH1cblxuICBwdWJsaWMgaGFzSWQoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFhc3NldCAmJiAhIShhc3NldC5hc3NldElkKTtcbiAgfVxuXG4gIHB1YmxpYyByb3V0ZXJMaW5rRm9yKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYW55W10ge1xuICAgIHJldHVybiBhc3NldC5yb3V0ZXJMaW5rO1xuICB9XG5cbiAgcHVibGljIGhhc1RodW1ibmFpbChhc3NldDogRW5oYW5jZWRBc3NldCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWFzc2V0LnRodW1ibmFpbFVybDtcbiAgfVxuXG4gIHB1YmxpYyB0aHVtYm5haWxVcmxGb3IoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpOiBzdHJpbmcge1xuICAgIHJldHVybiBhc3NldC50aHVtYm5haWxVcmw7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXNzZXRzRm9yTGluaygpOiB2b2lkIHtcbiAgICB0aGlzLmRpYWxvZ1NlcnZpY2Uub3BlbkNvbXBvbmVudEluRGlhbG9nKHtcbiAgICAgIGNvbXBvbmVudFR5cGU6IENvbGxlY3Rpb25MaW5rQ29tcG9uZW50LFxuICAgICAgaW5wdXRPcHRpb25zOiB7IGFzc2V0czogdGhpcy5jb2xsZWN0aW9uLmFzc2V0cy5pdGVtcyB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlQ29sbGVjdGlvbmxpc3REaWFsb2coKSB7XG4gICAgbGV0IGZvY3VzZWRDb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coe1xuICAgICAgY29tcG9uZW50VHlwZTogQ29sbGVjdGlvbkxpc3REZENvbXBvbmVudCxcbiAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICczJScgfSwgcGFuZWxDbGFzczogJ2NvbGxlY3Rpb24tbGlzdC1kZC1jb21wb25lbnQnIH0sXG4gICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgZm9jdXNlZENvbGxlY3Rpb246IHRoaXMuY29sbGVjdGlvblxuICAgICAgfSxcbiAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgIGV2ZW50OiAnY2xvc2UnLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4gdHJ1ZSxcbiAgICAgICAgY2xvc2VPbkV2ZW50OiB0cnVlXG4gICAgICB9XVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUNvbGxlY3Rpb24oKSB7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyh7XG4gICAgICBjb21wb25lbnRUeXBlOiBDb2xsZWN0aW9uRm9ybUNvbXBvbmVudCxcbiAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICcxMCUnIH0gfSxcbiAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICBmaWVsZHM6IHRoaXMuY29sbGVjdGlvbkZvcm1Db25maWcsXG4gICAgICAgIGNvbGxlY3Rpb25BY3Rpb25UeXBlOiAnY3JlYXRlJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dE9wdGlvbnM6IFt7XG4gICAgICAgIGV2ZW50OiAnY29sbGVjdGlvblNhdmVkJyxcbiAgICAgICAgY2FsbGJhY2s6IChldmVudDogQ29sbGVjdGlvbkZvcm1FdmVudCkgPT4ge1xuICAgICAgICAgIC8vIE9ubHkgcmVkaXJlY3RzIGlmIG9uIHRoZSBjb2xsZWN0aW9uIHNob3cgcGFnZS5cbiAgICAgICAgICBpZiAodGhpcy51cmxQYXRoLmluY2x1ZGVzKCcvY29sbGVjdGlvbnMvJykpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnJvdXRlci5nb1RvQ29sbGVjdGlvbihldmVudC5jb2xsZWN0aW9uSWQpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQ09MTEVDVElPTi5DT0xMRUNUSU9OX0NSRUFURUQnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgIH1dXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldENvbGxlY3Rpb24oKTogU3Vic2NyaXB0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbilcbiAgICAgIC5maWx0ZXIoc3RhdGUgPT4gc3RhdGUuY29sbGVjdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgLm1hcChzdGF0ZSA9PiB7XG4gICAgICAgIGxldCBjb2xsZWN0aW9uOiBDb2xsZWN0aW9uID0gQ29tbW9uLmNsb25lKHN0YXRlLmNvbGxlY3Rpb24pO1xuICAgICAgICBpZiAoY29sbGVjdGlvbi5hc3NldHMgJiYgY29sbGVjdGlvbi5hc3NldHMuaXRlbXMpIHtcbiAgICAgICAgICBjb2xsZWN0aW9uLmFzc2V0cy5pdGVtcyA9IGNvbGxlY3Rpb24uYXNzZXRzLml0ZW1zXG4gICAgICAgICAgICAubWFwKGl0ZW0gPT4gZW5oYW5jZUFzc2V0KGl0ZW0sICdjb2xsZWN0aW9uJywgY29sbGVjdGlvbi5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfSkuc3Vic2NyaWJlKChjb2xsZWN0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgfVxufVxuIl19

"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var collections_service_1 = require("../../../shared/services/collections.service");
var collection_context_service_1 = require("../../../shared/services/collection-context.service");
var app_store_1 = require("../../../app.store");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var CollectionFormComponent = (function () {
    function CollectionFormComponent(collectionsService, detector, collectionContext, store) {
        this.collectionsService = collectionsService;
        this.detector = detector;
        this.collectionContext = collectionContext;
        this.store = store;
        this.collection = null;
        this.collectionActionType = 'create';
        this.collectionSaved = new core_1.EventEmitter();
        this.formItems = [];
        this.defaultCollectionParams = {
            q: '',
            accessLevel: 'all',
            s: '',
            d: '',
            i: 0,
            n: 200
        };
    }
    CollectionFormComponent.prototype.ngOnInit = function () {
        this.formItems = this.setForm();
        switch (this.collectionActionType) {
            case 'create':
                this.tr = {
                    title: 'COLLECTION.NEW_TITLE',
                    submitLabel: 'COLLECTION.FORM.SUBMIT_LABEL'
                };
                break;
            case 'edit':
                this.tr = {
                    title: 'COLLECTION.EDIT.TITLE',
                    submitLabel: 'COLLECTION.EDIT.SUBMIT_LABEL'
                };
                break;
            case 'duplicate':
                this.tr = {
                    title: 'COLLECTION.DUPLICATE.TITLE',
                    submitLabel: 'COLLECTION.DUPLICATE.SUBMIT_LABEL'
                };
                break;
        }
        this.tr.close = 'COLLECTION.FORM.CLOSE_HOVER_TITLE';
    };
    CollectionFormComponent.prototype.collectionAction = function (collection) {
        switch (this.collectionActionType) {
            case 'create':
                this.createCollection(collection);
                break;
            case 'edit':
                this.editCollection(collection);
                break;
            case 'duplicate':
                this.duplicateCollection(collection);
                break;
        }
    };
    CollectionFormComponent.prototype.createCollection = function (collection) {
        var _this = this;
        collection.tags = collection.tags.split(/\s*,\s*/).filter(function (tag) { return tag !== ''; });
        this.collectionsService.create(collection).subscribe(function (collection) {
            _this.collectionSaved.emit({ collectionId: collection.id });
            _this.refreshCollections();
        }, this.error.bind(this));
    };
    CollectionFormComponent.prototype.editCollection = function (collectionUpdates) {
        var _this = this;
        var backEndReadyCollectionUpdates = __assign({}, collectionUpdates, { tags: collectionUpdates.tags.split(/\s*,\s*/).filter(function (tag) { return tag !== ''; }) });
        this.collectionsService.update(this.collection.id, backEndReadyCollectionUpdates)
            .subscribe(function () {
            _this.collectionSaved.emit({ collectionId: _this.collection.id });
            _this.loadCollections();
            if (_this.store.match(_this.collection.id, function (state) { return state.activeCollection.collection.id; })) {
                _this.getActiveCollection();
            }
        }, this.error.bind(this));
    };
    CollectionFormComponent.prototype.duplicateCollection = function (collection) {
        var _this = this;
        collection = Object.assign({}, this.collection, collection, {
            tags: collection.tags.split(/\s*,\s*/).filter(function (tag) { return tag !== ''; })
        });
        this.collectionsService.duplicate(collection)
            .subscribe(function (collection) {
            _this.refreshCollections();
            _this.collectionSaved.emit({ collectionId: collection.id });
        }, this.error.bind(this));
    };
    CollectionFormComponent.prototype.loadCollections = function () {
        this.collectionsService.load(this.defaultCollectionParams).subscribe();
    };
    CollectionFormComponent.prototype.getActiveCollection = function () {
        this.store.dispatch(function (factory) { return factory.activeCollection.load(); });
    };
    CollectionFormComponent.prototype.error = function (error) {
        this.serverErrors = error.json();
        this.detector.markForCheck();
    };
    CollectionFormComponent.prototype.refreshCollections = function () {
        this.collectionContext.resetCollectionOptions();
        this.getActiveCollection();
        this.loadCollections();
    };
    CollectionFormComponent.prototype.setForm = function () {
        var _this = this;
        this.fields = common_functions_1.Common.clone(this.fields);
        return this.fields.form.items.map(function (item) {
            if (item.name === 'name' && _this.collection) {
                item.value = _this.collection.name;
                if (_this.collectionActionType === 'duplicate') {
                    item.value = "Copy - " + item.value;
                }
            }
            if (item.type === 'tags') {
                item.tags = (_this.collection && _this.collection.tags)
                    ? _this.collection.tags.filter(function (tag) { return tag !== ''; }) : [];
                item.value = (_this.collection && _this.collection.tags)
                    ? _this.collection.tags.toString() : '';
            }
            return item;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionFormComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionFormComponent.prototype, "collection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CollectionFormComponent.prototype, "collectionActionType", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CollectionFormComponent.prototype, "collectionSaved", void 0);
    CollectionFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-form',
            templateUrl: 'collection-form.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [collections_service_1.CollectionsService,
            core_1.ChangeDetectorRef,
            collection_context_service_1.CollectionContextService,
            app_store_1.AppStore])
    ], CollectionFormComponent);
    return CollectionFormComponent;
}());
exports.CollectionFormComponent = CollectionFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9uLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FFdUI7QUFPdkIsb0ZBQWtGO0FBQ2xGLGtHQUErRjtBQUMvRixnREFBOEM7QUFDOUMsK0VBQW9FO0FBUXBFO0lBaUJFLGlDQUNTLGtCQUFzQyxFQUNyQyxRQUEyQixFQUMzQixpQkFBMkMsRUFDM0MsS0FBZTtRQUhoQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBQzNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBMEI7UUFDM0MsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQW5CVCxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBQzlCLHlCQUFvQixHQUF5QixRQUFRLENBQUM7UUFDckQsb0JBQWUsR0FBRyxJQUFJLG1CQUFZLEVBQXVCLENBQUM7UUFDcEUsY0FBUyxHQUFpQixFQUFFLENBQUM7UUFHNUIsNEJBQXVCLEdBQVM7WUFDdEMsQ0FBQyxFQUFFLEVBQUU7WUFDTCxXQUFXLEVBQUUsS0FBSztZQUNsQixDQUFDLEVBQUUsRUFBRTtZQUNMLENBQUMsRUFBRSxFQUFFO1lBQ0wsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsR0FBRztTQUNQLENBQUM7SUFPRSxDQUFDO0lBRUwsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDbEMsS0FBSyxRQUFRO2dCQUNYLElBQUksQ0FBQyxFQUFFLEdBQUc7b0JBQ1IsS0FBSyxFQUFFLHNCQUFzQjtvQkFDN0IsV0FBVyxFQUFFLDhCQUE4QjtpQkFDNUMsQ0FBQztnQkFDRixLQUFLLENBQUM7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LFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQ3BELENBQUMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzNDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBeElRO1FBQVIsWUFBSyxFQUFFOzsyREFBa0Q7SUFDakQ7UUFBUixZQUFLLEVBQUU7OytEQUFzQztJQUNyQztRQUFSLFlBQUssRUFBRTs7eUVBQThEO0lBQzVEO1FBQVQsYUFBTSxFQUFFOztvRUFBa0U7SUFKaEUsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBbUI2Qix3Q0FBa0I7WUFDM0Isd0JBQWlCO1lBQ1IscURBQXdCO1lBQ3BDLG9CQUFRO09BckJkLHVCQUF1QixDQTBJbkM7SUFBRCw4QkFBQztDQTFJRCxBQTBJQyxJQUFBO0FBMUlZLDBEQUF1QiIsImZpbGUiOiJhcHAvYXBwbGljYXRpb24vY29sbGVjdGlvbi10cmF5L2NvbXBvbmVudHMvY29sbGVjdGlvbi1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQ29sbGVjdGlvbkFjdGlvblR5cGUsIENvbGxlY3Rpb25Gb3JtRXZlbnQgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzLCBTZXJ2ZXJFcnJvcnMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXQsIFBvam8gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuaW1wb3J0IHsgQ29sbGVjdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NvbGxlY3Rpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbnRleHRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2NvbGxlY3Rpb24tY29udGV4dC5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2NvbGxlY3Rpb24tZm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnY29sbGVjdGlvbi1mb3JtLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBmaWVsZHM6IHsgZm9ybTogeyBpdGVtczogRm9ybUZpZWxkc1tdIH0gfTtcbiAgQElucHV0KCkgcHVibGljIGNvbGxlY3Rpb246IENvbGxlY3Rpb24gPSBudWxsO1xuICBASW5wdXQoKSBwdWJsaWMgY29sbGVjdGlvbkFjdGlvblR5cGU6IENvbGxlY3Rpb25BY3Rpb25UeXBlID0gJ2NyZWF0ZSc7XG4gIEBPdXRwdXQoKSBwdWJsaWMgY29sbGVjdGlvblNhdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxDb2xsZWN0aW9uRm9ybUV2ZW50PigpO1xuICBwdWJsaWMgZm9ybUl0ZW1zOiBGb3JtRmllbGRzW10gPSBbXTtcbiAgcHVibGljIHNlcnZlckVycm9yczogU2VydmVyRXJyb3JzO1xuICBwdWJsaWMgdHI6IHsgdGl0bGU6IHN0cmluZzsgc3VibWl0TGFiZWw6IHN0cmluZywgY2xvc2U/OiBzdHJpbmcgfTtcbiAgcHJpdmF0ZSBkZWZhdWx0Q29sbGVjdGlvblBhcmFtczogUG9qbyA9IHtcbiAgICBxOiAnJyxcbiAgICBhY2Nlc3NMZXZlbDogJ2FsbCcsXG4gICAgczogJycsXG4gICAgZDogJycsXG4gICAgaTogMCxcbiAgICBuOiAyMDBcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29sbGVjdGlvbnNTZXJ2aWNlOiBDb2xsZWN0aW9uc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBkZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBjb2xsZWN0aW9uQ29udGV4dDogQ29sbGVjdGlvbkNvbnRleHRTZXJ2aWNlLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mb3JtSXRlbXMgPSB0aGlzLnNldEZvcm0oKTtcbiAgICBzd2l0Y2ggKHRoaXMuY29sbGVjdGlvbkFjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgIHRoaXMudHIgPSB7XG4gICAgICAgICAgdGl0bGU6ICdDT0xMRUNUSU9OLk5FV19USVRMRScsXG4gICAgICAgICAgc3VibWl0TGFiZWw6ICdDT0xMRUNUSU9OLkZPUk0uU1VCTUlUX0xBQkVMJ1xuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VkaXQnOlxuICAgICAgICB0aGlzLnRyID0ge1xuICAgICAgICAgIHRpdGxlOiAnQ09MTEVDVElPTi5FRElULlRJVExFJyxcbiAgICAgICAgICBzdWJtaXRMYWJlbDogJ0NPTExFQ1RJT04uRURJVC5TVUJNSVRfTEFCRUwnXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZHVwbGljYXRlJzpcbiAgICAgICAgdGhpcy50ciA9IHtcbiAgICAgICAgICB0aXRsZTogJ0NPTExFQ1RJT04uRFVQTElDQVRFLlRJVExFJyxcbiAgICAgICAgICBzdWJtaXRMYWJlbDogJ0NPTExFQ1RJT04uRFVQTElDQVRFLlNVQk1JVF9MQUJFTCdcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMudHIuY2xvc2UgPSAnQ09MTEVDVElPTi5GT1JNLkNMT1NFX0hPVkVSX1RJVExFJztcbiAgfVxuXG4gIHB1YmxpYyBjb2xsZWN0aW9uQWN0aW9uKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pIHtcbiAgICBzd2l0Y2ggKHRoaXMuY29sbGVjdGlvbkFjdGlvblR5cGUpIHtcbiAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgIHRoaXMuY3JlYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlZGl0JzpcbiAgICAgICAgdGhpcy5lZGl0Q29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkdXBsaWNhdGUnOlxuICAgICAgICB0aGlzLmR1cGxpY2F0ZUNvbGxlY3Rpb24oY29sbGVjdGlvbik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIC0tLS0tLS0tIEVORCBPRiBQVUJMSUMgSU5URVJGQUNFIC0tLS0tLS0tLSAvL1xuXG4gIHByaXZhdGUgY3JlYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKTogdm9pZCB7XG4gICAgY29sbGVjdGlvbi50YWdzID0gY29sbGVjdGlvbi50YWdzLnNwbGl0KC9cXHMqLFxccyovKS5maWx0ZXIoKHRhZzogc3RyaW5nKSA9PiB0YWcgIT09ICcnKTtcbiAgICB0aGlzLmNvbGxlY3Rpb25zU2VydmljZS5jcmVhdGUoY29sbGVjdGlvbikuc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4ge1xuICAgICAgdGhpcy5jb2xsZWN0aW9uU2F2ZWQuZW1pdCh7IGNvbGxlY3Rpb25JZDogY29sbGVjdGlvbi5pZCB9KTtcbiAgICAgIHRoaXMucmVmcmVzaENvbGxlY3Rpb25zKCk7XG4gICAgfSwgdGhpcy5lcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgZWRpdENvbGxlY3Rpb24oY29sbGVjdGlvblVwZGF0ZXM6IENvbGxlY3Rpb24pOiB2b2lkIHtcbiAgICBjb25zdCBiYWNrRW5kUmVhZHlDb2xsZWN0aW9uVXBkYXRlczogQ29sbGVjdGlvbiA9IHtcbiAgICAgIC4uLmNvbGxlY3Rpb25VcGRhdGVzLFxuICAgICAgdGFnczogY29sbGVjdGlvblVwZGF0ZXMudGFncy5zcGxpdCgvXFxzKixcXHMqLykuZmlsdGVyKCh0YWc6IHN0cmluZykgPT4gdGFnICE9PSAnJylcbiAgICB9O1xuXG4gICAgdGhpcy5jb2xsZWN0aW9uc1NlcnZpY2UudXBkYXRlKHRoaXMuY29sbGVjdGlvbi5pZCwgYmFja0VuZFJlYWR5Q29sbGVjdGlvblVwZGF0ZXMpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uU2F2ZWQuZW1pdCh7IGNvbGxlY3Rpb25JZDogdGhpcy5jb2xsZWN0aW9uLmlkIH0pO1xuICAgICAgICB0aGlzLmxvYWRDb2xsZWN0aW9ucygpO1xuICAgICAgICBpZiAodGhpcy5zdG9yZS5tYXRjaCh0aGlzLmNvbGxlY3Rpb24uaWQsIHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbi5pZCkpIHtcbiAgICAgICAgICB0aGlzLmdldEFjdGl2ZUNvbGxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcy5lcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgZHVwbGljYXRlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKTogdm9pZCB7XG4gICAgY29sbGVjdGlvbiA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSwgdGhpcy5jb2xsZWN0aW9uLCBjb2xsZWN0aW9uLCB7XG4gICAgICAgIHRhZ3M6IGNvbGxlY3Rpb24udGFncy5zcGxpdCgvXFxzKixcXHMqLykuZmlsdGVyKCh0YWc6IHN0cmluZykgPT4gdGFnICE9PSAnJylcbiAgICAgIH0pO1xuICAgIHRoaXMuY29sbGVjdGlvbnNTZXJ2aWNlLmR1cGxpY2F0ZShjb2xsZWN0aW9uKVxuICAgICAgLnN1YnNjcmliZSgoY29sbGVjdGlvbjogQ29sbGVjdGlvbikgPT4ge1xuICAgICAgICB0aGlzLnJlZnJlc2hDb2xsZWN0aW9ucygpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25TYXZlZC5lbWl0KHsgY29sbGVjdGlvbklkOiBjb2xsZWN0aW9uLmlkIH0pO1xuICAgICAgfSwgdGhpcy5lcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZENvbGxlY3Rpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGVjdGlvbnNTZXJ2aWNlLmxvYWQodGhpcy5kZWZhdWx0Q29sbGVjdGlvblBhcmFtcykuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIGdldEFjdGl2ZUNvbGxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5sb2FkKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBlcnJvcihlcnJvcjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvcnMgPSBlcnJvci5qc29uKCk7XG4gICAgdGhpcy5kZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVmcmVzaENvbGxlY3Rpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGVjdGlvbkNvbnRleHQucmVzZXRDb2xsZWN0aW9uT3B0aW9ucygpO1xuICAgIHRoaXMuZ2V0QWN0aXZlQ29sbGVjdGlvbigpO1xuICAgIHRoaXMubG9hZENvbGxlY3Rpb25zKCk7XG4gIH1cblxuICBwcml2YXRlIHNldEZvcm0oKTogRm9ybUZpZWxkc1tdIHtcbiAgICB0aGlzLmZpZWxkcyA9IENvbW1vbi5jbG9uZSh0aGlzLmZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzLmZvcm0uaXRlbXMubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09ICduYW1lJyAmJiB0aGlzLmNvbGxlY3Rpb24pIHtcbiAgICAgICAgaXRlbS52YWx1ZSA9IHRoaXMuY29sbGVjdGlvbi5uYW1lO1xuICAgICAgICBpZiAodGhpcy5jb2xsZWN0aW9uQWN0aW9uVHlwZSA9PT0gJ2R1cGxpY2F0ZScpIHtcbiAgICAgICAgICBpdGVtLnZhbHVlID0gYENvcHkgLSAke2l0ZW0udmFsdWV9YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gJ3RhZ3MnKSB7XG4gICAgICAgIGl0ZW0udGFncyA9ICh0aGlzLmNvbGxlY3Rpb24gJiYgdGhpcy5jb2xsZWN0aW9uLnRhZ3MpXG4gICAgICAgICAgPyB0aGlzLmNvbGxlY3Rpb24udGFncy5maWx0ZXIoKHRhZzogc3RyaW5nKSA9PiB0YWcgIT09ICcnKSA6IFtdO1xuICAgICAgICBpdGVtLnZhbHVlID0gKHRoaXMuY29sbGVjdGlvbiAmJiB0aGlzLmNvbGxlY3Rpb24udGFncylcbiAgICAgICAgICA/IHRoaXMuY29sbGVjdGlvbi50YWdzLnRvU3RyaW5nKCkgOiAnJztcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pO1xuICB9XG59XG4iXX0=

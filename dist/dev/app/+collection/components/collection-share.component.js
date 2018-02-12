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
var app_store_1 = require("../../app.store");
var CollectionShareComponent = (function () {
    function CollectionShareComponent(store) {
        this.store = store;
        this.closeRequest = new core_1.EventEmitter();
    }
    CollectionShareComponent.prototype.ngOnInit = function () {
        this.formFields = this.store.snapshotCloned(function (state) { return state.uiConfig.components.collectionSharing.config.form.items; });
    };
    Object.defineProperty(CollectionShareComponent.prototype, "collectionName", {
        get: function () {
            return this.collection.name;
        },
        enumerable: true,
        configurable: true
    });
    CollectionShareComponent.prototype.onCloseRequest = function () {
        this.closeRequest.emit();
    };
    CollectionShareComponent.prototype.onFormSubmit = function (shareParameters) {
        var _this = this;
        this.store.dispatch(function (factory) {
            return factory.sharing.emailCollectionShareLink(_this.collection.id, shareParameters, _this.reloadType);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionShareComponent.prototype, "collection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CollectionShareComponent.prototype, "reloadType", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CollectionShareComponent.prototype, "closeRequest", void 0);
    CollectionShareComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collection-share',
            templateUrl: 'collection-share.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CollectionShareComponent);
    return CollectionShareComponent;
}());
exports.CollectionShareComponent = CollectionShareComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb24tc2hhcmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXdHO0FBTXhHLDZDQUEyQztBQVUzQztJQU9FLGtDQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUp6QixpQkFBWSxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUl6QixDQUFDO0lBRWpDLDJDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQTdELENBQTZELENBQUMsQ0FBQztJQUN0SCxDQUFDO0lBRUQsc0JBQVcsb0RBQWM7YUFBekI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFTSxpREFBYyxHQUFyQjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLCtDQUFZLEdBQW5CLFVBQW9CLGVBQTBDO1FBQTlELGlCQUlDO1FBSEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPO1lBQ3pCLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxlQUFlLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQztRQUE5RixDQUE4RixDQUMvRixDQUFDO0lBQ0osQ0FBQztJQXhCUTtRQUFSLFlBQUssRUFBRTs7Z0VBQXdCO0lBQ3ZCO1FBQVIsWUFBSyxFQUFFOztnRUFBa0M7SUFDaEM7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7a0VBQTRCO0lBSHJELHdCQUF3QjtRQU5wQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVEyQixvQkFBUTtPQVB4Qix3QkFBd0IsQ0EwQnBDO0lBQUQsK0JBQUM7Q0ExQkQsQUEwQkMsSUFBQTtBQTFCWSw0REFBd0IiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbi1zaGFyZS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFzc2V0U2hhcmVQYXJhbWV0ZXJzLCBDb2xsZWN0aW9uU2hhcmVQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMsIGJvdGhNYXJrZXJzQXJlU2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQ29sbGVjdGlvblJlbG9hZFR5cGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb2xsZWN0aW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2NvbGxlY3Rpb24tc2hhcmUnLFxuICB0ZW1wbGF0ZVVybDogJ2NvbGxlY3Rpb24tc2hhcmUuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25TaGFyZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGNvbGxlY3Rpb246IENvbGxlY3Rpb247XG4gIEBJbnB1dCgpIHJlbG9hZFR5cGU6IENvbGxlY3Rpb25SZWxvYWRUeXBlO1xuICBAT3V0cHV0KCkgY2xvc2VSZXF1ZXN0OiBFdmVudEVtaXR0ZXI8bnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGZvcm1GaWVsZHM6IEZvcm1GaWVsZHNbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybUZpZWxkcyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5jb2xsZWN0aW9uU2hhcmluZy5jb25maWcuZm9ybS5pdGVtcyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNvbGxlY3Rpb25OYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5uYW1lO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvc2VSZXF1ZXN0KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VSZXF1ZXN0LmVtaXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkZvcm1TdWJtaXQoc2hhcmVQYXJhbWV0ZXJzOiBDb2xsZWN0aW9uU2hhcmVQYXJhbWV0ZXJzKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICBmYWN0b3J5LnNoYXJpbmcuZW1haWxDb2xsZWN0aW9uU2hhcmVMaW5rKHRoaXMuY29sbGVjdGlvbi5pZCwgc2hhcmVQYXJhbWV0ZXJzLCB0aGlzLnJlbG9hZFR5cGUpXG4gICAgKTtcbiAgfVxufVxuIl19

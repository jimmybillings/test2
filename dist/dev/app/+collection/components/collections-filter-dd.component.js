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
var CollectionFilterDdComponent = (function () {
    function CollectionFilterDdComponent() {
        this.filter = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.filterOptions = [];
        this.filterOptions = [
            {
                'first': {
                    'id': 0,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL',
                    'value': 'all',
                    'access': { 'accessLevel': 'all' }
                }
            },
            {
                'first': {
                    'id': 1,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.OWNER',
                    'value': 'owner',
                    'access': { 'accessLevel': 'owner' }
                },
                'second': {
                    'id': 2,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.EDITOR',
                    'value': 'editor',
                    'access': { 'accessLevel': 'editor' }
                },
                'third': {
                    'id': 3,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.VIEWER',
                    'value': 'viewer',
                    'access': { 'accessLevel': 'viewer' }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.RESEARCHER',
                    'value': 'researcher',
                    'access': { 'accessLevel': 'researcher' }
                }
            }
        ];
    }
    CollectionFilterDdComponent.prototype.closeCollectionsFiltertDd = function () {
        this.close.emit();
    };
    CollectionFilterDdComponent.prototype.onFilterResults = function (filter) {
        this.filter.emit(filter);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionFilterDdComponent.prototype, "currentFilter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CollectionFilterDdComponent.prototype, "filter", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CollectionFilterDdComponent.prototype, "close", void 0);
    CollectionFilterDdComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collections-filter-dd',
            templateUrl: 'collections-filter-dd.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], CollectionFilterDdComponent);
    return CollectionFilterDdComponent;
}());
exports.CollectionFilterDdComponent = CollectionFilterDdComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb25zLWZpbHRlci1kZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFZaEc7SUFNRTtRQUpVLFdBQU0sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM1QixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDOUIsa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFHcEMsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNuQjtnQkFDRSxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLENBQUM7b0JBQ1AsTUFBTSxFQUFFLHFDQUFxQztvQkFDN0MsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsUUFBUSxFQUFFLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRTtpQkFDbkM7YUFDRjtZQUNEO2dCQUNFLE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsdUNBQXVDO29CQUMvQyxPQUFPLEVBQUUsT0FBTztvQkFDaEIsUUFBUSxFQUFFLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRTtpQkFDckM7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU0sRUFBRSx3Q0FBd0M7b0JBQ2hELE9BQU8sRUFBRSxRQUFRO29CQUNqQixRQUFRLEVBQUUsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFO2lCQUN0QztnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLENBQUM7b0JBQ1AsTUFBTSxFQUFFLHdDQUF3QztvQkFDaEQsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLFFBQVEsRUFBRSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUU7aUJBQ3RDO2FBQ0Y7WUFDRDtnQkFDRSxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLENBQUM7b0JBQ1AsTUFBTSxFQUFFLDRDQUE0QztvQkFDcEQsT0FBTyxFQUFFLFlBQVk7b0JBQ3JCLFFBQVEsRUFBRSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUU7aUJBQzFDO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVNLCtEQUF5QixHQUFoQztRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLHFEQUFlLEdBQXRCLFVBQXVCLE1BQVc7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQXBEUTtRQUFSLFlBQUssRUFBRTs7c0VBQW9CO0lBQ2xCO1FBQVQsYUFBTSxFQUFFOzsrREFBNkI7SUFDNUI7UUFBVCxhQUFNLEVBQUU7OzhEQUE0QjtJQUgxQiwyQkFBMkI7UUFQdkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzs7T0FFVywyQkFBMkIsQ0FzRHZDO0lBQUQsa0NBQUM7Q0F0REQsQUFzREMsSUFBQTtBQXREWSxrRUFBMkIiLCJmaWxlIjoiYXBwLytjb2xsZWN0aW9uL2NvbXBvbmVudHMvY29sbGVjdGlvbnMtZmlsdGVyLWRkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCByZW5kZXJzIGEgbGlzdCBvZiBjb2xsZWN0aW9uc1xuICovXG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2NvbGxlY3Rpb25zLWZpbHRlci1kZCcsXG4gIHRlbXBsYXRlVXJsOiAnY29sbGVjdGlvbnMtZmlsdGVyLWRkLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25GaWx0ZXJEZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGN1cnJlbnRGaWx0ZXI6IGFueTtcbiAgQE91dHB1dCgpIGZpbHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgZmlsdGVyT3B0aW9uczogQXJyYXk8YW55PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsdGVyT3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDAsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5GSUxURVJfRERfTUVOVS5BTEwnLFxuICAgICAgICAgICd2YWx1ZSc6ICdhbGwnLFxuICAgICAgICAgICdhY2Nlc3MnOiB7ICdhY2Nlc3NMZXZlbCc6ICdhbGwnIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDEsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5GSUxURVJfRERfTUVOVS5PV05FUicsXG4gICAgICAgICAgJ3ZhbHVlJzogJ293bmVyJyxcbiAgICAgICAgICAnYWNjZXNzJzogeyAnYWNjZXNzTGV2ZWwnOiAnb3duZXInIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiAyLFxuICAgICAgICAgICduYW1lJzogJ0NPTExFQ1RJT04uSU5ERVguRklMVEVSX0REX01FTlUuRURJVE9SJyxcbiAgICAgICAgICAndmFsdWUnOiAnZWRpdG9yJyxcbiAgICAgICAgICAnYWNjZXNzJzogeyAnYWNjZXNzTGV2ZWwnOiAnZWRpdG9yJyB9XG4gICAgICAgIH0sXG4gICAgICAgICd0aGlyZCc6IHtcbiAgICAgICAgICAnaWQnOiAzLFxuICAgICAgICAgICduYW1lJzogJ0NPTExFQ1RJT04uSU5ERVguRklMVEVSX0REX01FTlUuVklFV0VSJyxcbiAgICAgICAgICAndmFsdWUnOiAndmlld2VyJyxcbiAgICAgICAgICAnYWNjZXNzJzogeyAnYWNjZXNzTGV2ZWwnOiAndmlld2VyJyB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICdmaXJzdCc6IHtcbiAgICAgICAgICAnaWQnOiA0LFxuICAgICAgICAgICduYW1lJzogJ0NPTExFQ1RJT04uSU5ERVguRklMVEVSX0REX01FTlUuUkVTRUFSQ0hFUicsXG4gICAgICAgICAgJ3ZhbHVlJzogJ3Jlc2VhcmNoZXInLFxuICAgICAgICAgICdhY2Nlc3MnOiB7ICdhY2Nlc3NMZXZlbCc6ICdyZXNlYXJjaGVyJyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgcHVibGljIGNsb3NlQ29sbGVjdGlvbnNGaWx0ZXJ0RGQoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZS5lbWl0KCk7XG4gIH1cblxuICBwdWJsaWMgb25GaWx0ZXJSZXN1bHRzKGZpbHRlcjogYW55KSB7XG4gICAgdGhpcy5maWx0ZXIuZW1pdChmaWx0ZXIpO1xuICB9XG59XG4iXX0=

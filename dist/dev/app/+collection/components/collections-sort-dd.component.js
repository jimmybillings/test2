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
var CollectionSortDdComponent = (function () {
    function CollectionSortDdComponent() {
        this.sort = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.sortOptions = [];
        this.sortOptions = [
            {
                'first': {
                    'id': 0,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
                    'value': 'modNewest',
                    'sort': { 's': 'lastUpdated', 'd': true }
                },
                'second': {
                    'id': 1,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_OLDEST',
                    'value': 'modOldest',
                    'sort': { 's': 'lastUpdated', 'd': false }
                }
            },
            {
                'first': {
                    'id': 2,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_NEWEST',
                    'value': 'createNewest',
                    'sort': { 's': 'createdOn', 'd': true }
                },
                'second': {
                    'id': 3,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_OLDEST',
                    'value': 'createOldest',
                    'sort': { 's': 'createdOn', 'd': false }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_ASC',
                    'value': 'alphaAsc',
                    'sort': { 's': 'name', 'd': false }
                },
                'second': {
                    'id': 5,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_DESC',
                    'value': 'alphaDesc',
                    'sort': { 's': 'name', 'd': true }
                }
            }
        ];
    }
    CollectionSortDdComponent.prototype.onSortResults = function (sortId) {
        this.sort.emit(sortId);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CollectionSortDdComponent.prototype, "currentSort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CollectionSortDdComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CollectionSortDdComponent.prototype, "close", void 0);
    CollectionSortDdComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'collections-sort-dd',
            templateUrl: 'collections-sort-dd.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [])
    ], CollectionSortDdComponent);
    return CollectionSortDdComponent;
}());
exports.CollectionSortDdComponent = CollectionSortDdComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb25zLXNvcnQtZGQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBWWhHO0lBTUU7UUFKVSxTQUFJLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzlCLGdCQUFXLEdBQWUsRUFBRSxDQUFDO1FBR2xDLElBQUksQ0FBQyxXQUFXLEdBQUc7WUFDakI7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU0sRUFBRSwrQ0FBK0M7b0JBQ3ZELE9BQU8sRUFBRSxXQUFXO29CQUNwQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7aUJBQzFDO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsK0NBQStDO29CQUN2RCxPQUFPLEVBQUUsV0FBVztvQkFDcEIsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO2lCQUMzQzthQUNGO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU0sRUFBRSxrREFBa0Q7b0JBQzFELE9BQU8sRUFBRSxjQUFjO29CQUN2QixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7aUJBQ3hDO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsa0RBQWtEO29CQUMxRCxPQUFPLEVBQUUsY0FBYztvQkFDdkIsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFO2lCQUN6QzthQUNGO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU0sRUFBRSw2Q0FBNkM7b0JBQ3JELE9BQU8sRUFBRSxVQUFVO29CQUNuQixNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7aUJBQ3BDO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQztvQkFDUCxNQUFNLEVBQUUsOENBQThDO29CQUN0RCxPQUFPLEVBQUUsV0FBVztvQkFDcEIsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO2lCQUNuQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTSxpREFBYSxHQUFwQixVQUFxQixNQUFXO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUF0RFE7UUFBUixZQUFLLEVBQUU7O2tFQUFrQjtJQUNoQjtRQUFULGFBQU0sRUFBRTs7MkRBQTJCO0lBQzFCO1FBQVQsYUFBTSxFQUFFOzs0REFBNEI7SUFIMUIseUJBQXlCO1FBUHJDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7O09BRVcseUJBQXlCLENBd0RyQztJQUFELGdDQUFDO0NBeERELEFBd0RDLElBQUE7QUF4RFksOERBQXlCIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL2NvbGxlY3Rpb25zLXNvcnQtZGQuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IHJlbmRlcnMgYSBsaXN0IG9mIGNvbGxlY3Rpb25zXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnY29sbGVjdGlvbnMtc29ydC1kZCcsXG4gIHRlbXBsYXRlVXJsOiAnY29sbGVjdGlvbnMtc29ydC1kZC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uU29ydERkQ29tcG9uZW50IHtcbiAgQElucHV0KCkgY3VycmVudFNvcnQ6IGFueTtcbiAgQE91dHB1dCgpIHNvcnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIHNvcnRPcHRpb25zOiBBcnJheTxhbnk+ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zb3J0T3B0aW9ucyA9IFtcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDAsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9NT0RfTkVXRVNUJyxcbiAgICAgICAgICAndmFsdWUnOiAnbW9kTmV3ZXN0JyxcbiAgICAgICAgICAnc29ydCc6IHsgJ3MnOiAnbGFzdFVwZGF0ZWQnLCAnZCc6IHRydWUgfVxuICAgICAgICB9LFxuICAgICAgICAnc2Vjb25kJzoge1xuICAgICAgICAgICdpZCc6IDEsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9NT0RfT0xERVNUJyxcbiAgICAgICAgICAndmFsdWUnOiAnbW9kT2xkZXN0JyxcbiAgICAgICAgICAnc29ydCc6IHsgJ3MnOiAnbGFzdFVwZGF0ZWQnLCAnZCc6IGZhbHNlIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgJ2ZpcnN0Jzoge1xuICAgICAgICAgICdpZCc6IDIsXG4gICAgICAgICAgJ25hbWUnOiAnQ09MTEVDVElPTi5JTkRFWC5TT1JUX0REX01FTlUuREFURV9DUkVBVEVfTkVXRVNUJyxcbiAgICAgICAgICAndmFsdWUnOiAnY3JlYXRlTmV3ZXN0JyxcbiAgICAgICAgICAnc29ydCc6IHsgJ3MnOiAnY3JlYXRlZE9uJywgJ2QnOiB0cnVlIH1cbiAgICAgICAgfSxcbiAgICAgICAgJ3NlY29uZCc6IHtcbiAgICAgICAgICAnaWQnOiAzLFxuICAgICAgICAgICduYW1lJzogJ0NPTExFQ1RJT04uSU5ERVguU09SVF9ERF9NRU5VLkRBVEVfQ1JFQVRFX09MREVTVCcsXG4gICAgICAgICAgJ3ZhbHVlJzogJ2NyZWF0ZU9sZGVzdCcsXG4gICAgICAgICAgJ3NvcnQnOiB7ICdzJzogJ2NyZWF0ZWRPbicsICdkJzogZmFsc2UgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAnZmlyc3QnOiB7XG4gICAgICAgICAgJ2lkJzogNCxcbiAgICAgICAgICAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLlNPUlRfRERfTUVOVS5MSVNUX0NPTExfQVNDJyxcbiAgICAgICAgICAndmFsdWUnOiAnYWxwaGFBc2MnLFxuICAgICAgICAgICdzb3J0JzogeyAncyc6ICduYW1lJywgJ2QnOiBmYWxzZSB9XG4gICAgICAgIH0sXG4gICAgICAgICdzZWNvbmQnOiB7XG4gICAgICAgICAgJ2lkJzogNSxcbiAgICAgICAgICAnbmFtZSc6ICdDT0xMRUNUSU9OLklOREVYLlNPUlRfRERfTUVOVS5MSVNUX0NPTExfREVTQycsXG4gICAgICAgICAgJ3ZhbHVlJzogJ2FscGhhRGVzYycsXG4gICAgICAgICAgJ3NvcnQnOiB7ICdzJzogJ25hbWUnLCAnZCc6IHRydWUgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBvblNvcnRSZXN1bHRzKHNvcnRJZDogYW55KSB7XG4gICAgdGhpcy5zb3J0LmVtaXQoc29ydElkKTtcbiAgfVxufVxuIl19

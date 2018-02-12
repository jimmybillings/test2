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
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var WzCollectionItemListComponent = (function () {
    function WzCollectionItemListComponent(userCan) {
        this.userCan = userCan;
        this.editCollection = new core_1.EventEmitter();
        this.showShareMembers = new core_1.EventEmitter();
        this.setActiveCollection = new core_1.EventEmitter();
        this.deleteCollection = new core_1.EventEmitter();
        this.generateCollectionLink = new core_1.EventEmitter();
        this.duplicateCollection = new core_1.EventEmitter();
        this.createShareDialog = new core_1.EventEmitter();
    }
    WzCollectionItemListComponent.prototype.selectActiveCollection = function (collectionId) {
        this.setActiveCollection.emit(collectionId);
    };
    WzCollectionItemListComponent.prototype.thumbnail = function (thumbnail) {
        return (thumbnail && thumbnail.urls && thumbnail.urls.https) ? thumbnail.urls.https : '/assets/img/tbn_missing.jpg';
    };
    WzCollectionItemListComponent.prototype.setCurrentCollection = function (collection) {
        this.currentCollection = collection;
    };
    WzCollectionItemListComponent.prototype.collectionIsShared = function (collection) {
        return !!collection.editors || !!collection.viewers ? true : false;
    };
    WzCollectionItemListComponent.prototype.edit = function (collection) {
        this.editCollection.emit(collection);
    };
    WzCollectionItemListComponent.prototype.sharedMembers = function (collection) {
        this.showShareMembers.emit(collection);
    };
    WzCollectionItemListComponent.prototype.userCanEditCollection = function (collection) {
        return this.userCan.editCollection(collection);
    };
    WzCollectionItemListComponent.prototype.collectionViewerIsOwner = function (collection) {
        return collection.userRole === 'owner';
    };
    WzCollectionItemListComponent.prototype.delete = function (collection) {
        this.deleteCollection.emit(collection);
    };
    WzCollectionItemListComponent.prototype.duplicate = function () {
        this.duplicateCollection.emit(this.currentCollection.id);
    };
    WzCollectionItemListComponent.prototype.generateLegacyLink = function () {
        this.generateCollectionLink.emit(this.currentCollection.id);
    };
    WzCollectionItemListComponent.prototype.notOwnerOf = function (collection) {
        return collection.userRole !== 'owner';
    };
    WzCollectionItemListComponent.prototype.onCreateShareDialog = function (collection) {
        this.createShareDialog.emit(collection);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "collections", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "activeCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "editCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "showShareMembers", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "setActiveCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "deleteCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "generateCollectionLink", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCollectionItemListComponent.prototype, "duplicateCollection", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzCollectionItemListComponent.prototype, "createShareDialog", void 0);
    WzCollectionItemListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-collection-item-list',
            templateUrl: 'wz.collection-item-list.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities])
    ], WzCollectionItemListComponent);
    return WzCollectionItemListComponent;
}());
exports.WzCollectionItemListComponent = WzCollectionItemListComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9jb21wb25lbnRzL3d6LmNvbGxlY3Rpb24taXRlbS1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQUdoRyxtRkFBMEU7QUFhMUU7SUFZRSx1Q0FBbUIsT0FBcUI7UUFBckIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQVQ5QixtQkFBYyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3BDLHFCQUFnQixHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3RDLHdCQUFtQixHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3pDLHFCQUFnQixHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3RDLDJCQUFzQixHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzVDLHdCQUFtQixHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3pDLHNCQUFpQixHQUE2QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUcvQixDQUFDO0lBRXRDLDhEQUFzQixHQUE3QixVQUE4QixZQUE4QjtRQUMxRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxpREFBUyxHQUFoQixVQUFpQixTQUFzQztRQUNyRCxNQUFNLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsNkJBQTZCLENBQUM7SUFDdEgsQ0FBQztJQUVNLDREQUFvQixHQUEzQixVQUE0QixVQUFzQjtRQUNoRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFTSwwREFBa0IsR0FBekIsVUFBMEIsVUFBc0I7UUFDOUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNyRSxDQUFDO0lBRU0sNENBQUksR0FBWCxVQUFZLFVBQXNCO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxxREFBYSxHQUFwQixVQUFxQixVQUFzQjtRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSw2REFBcUIsR0FBNUIsVUFBNkIsVUFBc0I7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSwrREFBdUIsR0FBOUIsVUFBK0IsVUFBc0I7UUFDbkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO0lBQ3pDLENBQUM7SUFFTSw4Q0FBTSxHQUFiLFVBQWMsVUFBc0I7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0saURBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRU0sMERBQWtCLEdBQXpCO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLGtEQUFVLEdBQWpCLFVBQWtCLFVBQXNCO1FBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQztJQUN6QyxDQUFDO0lBRU0sMkRBQW1CLEdBQTFCLFVBQTJCLFVBQXNCO1FBQy9DLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQS9EUTtRQUFSLFlBQUssRUFBRTs7c0VBQXlCO0lBQ3hCO1FBQVIsWUFBSyxFQUFFOzsyRUFBOEI7SUFDNUI7UUFBVCxhQUFNLEVBQUU7O3lFQUFxQztJQUNwQztRQUFULGFBQU0sRUFBRTs7MkVBQXVDO0lBQ3RDO1FBQVQsYUFBTSxFQUFFOzs4RUFBMEM7SUFDekM7UUFBVCxhQUFNLEVBQUU7OzJFQUF1QztJQUN0QztRQUFULGFBQU0sRUFBRTs7aUZBQTZDO0lBQzVDO1FBQVQsYUFBTSxFQUFFOzs4RUFBMEM7SUFDekM7UUFBVCxhQUFNLEVBQUU7a0NBQW9CLG1CQUFZOzRFQUFrQztJQVRoRSw2QkFBNkI7UUFYekMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FrQjRCLG1DQUFZO09BWjdCLDZCQUE2QixDQWlFekM7SUFBRCxvQ0FBQztDQWpFRCxBQWlFQyxJQUFBO0FBakVZLHNFQUE2QiIsImZpbGUiOiJhcHAvK2NvbGxlY3Rpb24vY29tcG9uZW50cy93ei5jb2xsZWN0aW9uLWl0ZW0tbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWNvbGxlY3Rpb24taXRlbS1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5jb2xsZWN0aW9uLWl0ZW0tbGlzdC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbi8qKlxuICogVGhlIFBhZ2luYXRpb24gY29tcG9uZW50IHRha2VzIGFuIGlucHV0IG9mIHRoZSBQYWdpbmF0aW9uIE9iamVjdCB0aGF0IGlzIHJldHVybmVkIHdpdGhcbiAqIGFsbCBBUEkgY2FsbHMuIEl0IG91cHV0cyBhIGdldFBhZ2UgZXZlbnQgd2l0aCB0aGUgcGFnZU51bWJlciBmb3IgdGhlIEFQSSB0byBnZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBXekNvbGxlY3Rpb25JdGVtTGlzdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbGxlY3Rpb25zOiBDb2xsZWN0aW9uO1xuICBASW5wdXQoKSBhY3RpdmVDb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICBAT3V0cHV0KCkgZWRpdENvbGxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzaG93U2hhcmVNZW1iZXJzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgc2V0QWN0aXZlQ29sbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlbGV0ZUNvbGxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBnZW5lcmF0ZUNvbGxlY3Rpb25MaW5rID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZHVwbGljYXRlQ29sbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNyZWF0ZVNoYXJlRGlhbG9nOiBFdmVudEVtaXR0ZXI8Q29sbGVjdGlvbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBjdXJyZW50Q29sbGVjdGlvbjogQ29sbGVjdGlvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXNlckNhbjogQ2FwYWJpbGl0aWVzKSB7IH1cblxuICBwdWJsaWMgc2VsZWN0QWN0aXZlQ29sbGVjdGlvbihjb2xsZWN0aW9uSWQ6IENvbGxlY3Rpb25bJ2lkJ10pIHtcbiAgICB0aGlzLnNldEFjdGl2ZUNvbGxlY3Rpb24uZW1pdChjb2xsZWN0aW9uSWQpO1xuICB9XG5cbiAgcHVibGljIHRodW1ibmFpbCh0aHVtYm5haWw6IHsgdXJsczogeyBodHRwczogc3RyaW5nIH0gfSk6IHN0cmluZyB7XG4gICAgcmV0dXJuICh0aHVtYm5haWwgJiYgdGh1bWJuYWlsLnVybHMgJiYgdGh1bWJuYWlsLnVybHMuaHR0cHMpID8gdGh1bWJuYWlsLnVybHMuaHR0cHMgOiAnL2Fzc2V0cy9pbWcvdGJuX21pc3NpbmcuanBnJztcbiAgfVxuXG4gIHB1YmxpYyBzZXRDdXJyZW50Q29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5jdXJyZW50Q29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gIH1cblxuICBwdWJsaWMgY29sbGVjdGlvbklzU2hhcmVkKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFjb2xsZWN0aW9uLmVkaXRvcnMgfHwgISFjb2xsZWN0aW9uLnZpZXdlcnMgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgZWRpdChjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5lZGl0Q29sbGVjdGlvbi5lbWl0KGNvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIHNoYXJlZE1lbWJlcnMoY29sbGVjdGlvbjogQ29sbGVjdGlvbikge1xuICAgIHRoaXMuc2hvd1NoYXJlTWVtYmVycy5lbWl0KGNvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIHVzZXJDYW5FZGl0Q29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5lZGl0Q29sbGVjdGlvbihjb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBjb2xsZWN0aW9uVmlld2VySXNPd25lcihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNvbGxlY3Rpb24udXNlclJvbGUgPT09ICdvd25lcic7XG4gIH1cblxuICBwdWJsaWMgZGVsZXRlKGNvbGxlY3Rpb246IENvbGxlY3Rpb24pOiB2b2lkIHtcbiAgICB0aGlzLmRlbGV0ZUNvbGxlY3Rpb24uZW1pdChjb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBkdXBsaWNhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5kdXBsaWNhdGVDb2xsZWN0aW9uLmVtaXQodGhpcy5jdXJyZW50Q29sbGVjdGlvbi5pZCk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVMZWdhY3lMaW5rKCk6IHZvaWQge1xuICAgIHRoaXMuZ2VuZXJhdGVDb2xsZWN0aW9uTGluay5lbWl0KHRoaXMuY3VycmVudENvbGxlY3Rpb24uaWQpO1xuICB9XG5cbiAgcHVibGljIG5vdE93bmVyT2YoY29sbGVjdGlvbjogQ29sbGVjdGlvbikge1xuICAgIHJldHVybiBjb2xsZWN0aW9uLnVzZXJSb2xlICE9PSAnb3duZXInO1xuICB9XG5cbiAgcHVibGljIG9uQ3JlYXRlU2hhcmVEaWFsb2coY29sbGVjdGlvbjogQ29sbGVjdGlvbikge1xuICAgIHRoaXMuY3JlYXRlU2hhcmVEaWFsb2cuZW1pdChjb2xsZWN0aW9uKTtcbiAgfVxufVxuIl19

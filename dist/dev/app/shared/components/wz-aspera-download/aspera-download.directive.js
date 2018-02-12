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
var aspera_service_1 = require("../../../shared/services/aspera.service");
var app_store_1 = require("../../../app.store");
var WzAsperaDownloadDirective = (function () {
    function WzAsperaDownloadDirective(asperaService, store) {
        this.asperaService = asperaService;
        this.store = store;
        this.asperaPreloaded = 'true';
        this.renditionType = null;
        this.assetId = null;
    }
    WzAsperaDownloadDirective.prototype.onClick = function ($event) {
        var _this = this;
        if (JSON.parse(this.asperaPreloaded)) {
            this.asperaService.initConnect(this.asperaSpec);
        }
        else {
            this.asperaService.getAsperaSpec(this.assetId, this.renditionType)
                .filter(function (res) { return res.asperaSpec; })
                .subscribe(function (res) {
                _this.asperaService.initConnect(res.asperaSpec);
            }, function () {
                _this.store.dispatch(function (factory) { return factory.error.handleCustomError('COMPS.NO_COMP'); });
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzAsperaDownloadDirective.prototype, "asperaSpec", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzAsperaDownloadDirective.prototype, "asperaPreloaded", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzAsperaDownloadDirective.prototype, "renditionType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], WzAsperaDownloadDirective.prototype, "assetId", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], WzAsperaDownloadDirective.prototype, "onClick", null);
    WzAsperaDownloadDirective = __decorate([
        core_1.Directive({
            selector: '[wzAsperaDownload]'
        }),
        __metadata("design:paramtypes", [aspera_service_1.AsperaService, app_store_1.AppStore])
    ], WzAsperaDownloadDirective);
    return WzAsperaDownloadDirective;
}());
exports.WzAsperaDownloadDirective = WzAsperaDownloadDirective;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1hc3BlcmEtZG93bmxvYWQvYXNwZXJhLWRvd25sb2FkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUErRDtBQUUvRCwwRUFBd0U7QUFDeEUsZ0RBQThDO0FBTTlDO0lBcUJFLG1DQUFvQixhQUE0QixFQUFVLEtBQWU7UUFBckQsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBbkJoRSxvQkFBZSxHQUFXLE1BQU0sQ0FBQztRQUNqQyxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixZQUFPLEdBQVcsSUFBSSxDQUFDO0lBaUI2QyxDQUFDO0lBZDlFLDJDQUFPLEdBQVAsVUFBUSxNQUFXO1FBRG5CLGlCQWFDO1FBWEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQy9ELE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxVQUFVLEVBQWQsQ0FBYyxDQUFDO2lCQUM3QixTQUFTLENBQUMsVUFBQyxHQUFRO2dCQUNsQixLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakQsQ0FBQyxFQUFFO2dCQUNELEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNILENBQUM7SUFsQlE7UUFBUixZQUFLLEVBQUU7O2lFQUFvQjtJQUNuQjtRQUFSLFlBQUssRUFBRTs7c0VBQWtDO0lBQ2pDO1FBQVIsWUFBSyxFQUFFOztvRUFBOEI7SUFDN0I7UUFBUixZQUFLLEVBQUU7OzhEQUF3QjtJQUdoQztRQURDLG1CQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7NERBYWpDO0lBbkJVLHlCQUF5QjtRQUpyQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO3lDQXVCbUMsOEJBQWEsRUFBaUIsb0JBQVE7T0FyQjlELHlCQUF5QixDQXNCckM7SUFBRCxnQ0FBQztDQXRCRCxBQXNCQyxJQUFBO0FBdEJZLDhEQUF5QiIsImZpbGUiOiJhcHAvc2hhcmVkL2NvbXBvbmVudHMvd3otYXNwZXJhLWRvd25sb2FkL2FzcGVyYS1kb3dubG9hZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQXNwZXJhU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hc3BlcmEuc2VydmljZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t3ekFzcGVyYURvd25sb2FkXSdcbn0pXG5cbmV4cG9ydCBjbGFzcyBXekFzcGVyYURvd25sb2FkRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgYXNwZXJhU3BlYzogc3RyaW5nO1xuICBASW5wdXQoKSBhc3BlcmFQcmVsb2FkZWQ6IHN0cmluZyA9ICd0cnVlJztcbiAgQElucHV0KCkgcmVuZGl0aW9uVHlwZTogc3RyaW5nID0gbnVsbDtcbiAgQElucHV0KCkgYXNzZXRJZDogbnVtYmVyID0gbnVsbDtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soJGV2ZW50OiBhbnkpIHtcbiAgICBpZiAoSlNPTi5wYXJzZSh0aGlzLmFzcGVyYVByZWxvYWRlZCkpIHtcbiAgICAgIHRoaXMuYXNwZXJhU2VydmljZS5pbml0Q29ubmVjdCh0aGlzLmFzcGVyYVNwZWMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzcGVyYVNlcnZpY2UuZ2V0QXNwZXJhU3BlYyh0aGlzLmFzc2V0SWQsIHRoaXMucmVuZGl0aW9uVHlwZSlcbiAgICAgICAgLmZpbHRlcihyZXMgPT4gcmVzLmFzcGVyYVNwZWMpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5hc3BlcmFTZXJ2aWNlLmluaXRDb25uZWN0KHJlcy5hc3BlcmFTcGVjKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZUN1c3RvbUVycm9yKCdDT01QUy5OT19DT01QJykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFzcGVyYVNlcnZpY2U6IEFzcGVyYVNlcnZpY2UsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cbn1cbiJdfQ==

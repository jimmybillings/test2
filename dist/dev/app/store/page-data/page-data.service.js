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
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var PageDataService = (function () {
    function PageDataService(translateService, titleService) {
        this.translateService = translateService;
        this.titleService = titleService;
    }
    PageDataService.prototype.updateTitle = function (trKey, trParams) {
        var _this = this;
        this.translateService.get(['COMPANY_NAME', trKey], trParams)
            .subscribe(function (values) {
            values[trKey] = values[trKey].replace('{{q}}', 'all');
            _this.titleService.setTitle(values['COMPANY_NAME'] + values[trKey]);
        });
    };
    PageDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_2.TranslateService, platform_browser_1.Title])
    ], PageDataService);
    return PageDataService;
}());
exports.PageDataService = PageDataService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw4REFBa0Q7QUFDbEQsc0NBQTJDO0FBQzNDLDRDQUF1RDtBQUt2RDtJQUNFLHlCQUFvQixnQkFBa0MsRUFBVSxZQUFtQjtRQUEvRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQU87SUFBSSxDQUFDO0lBRWpGLHFDQUFXLEdBQWxCLFVBQW1CLEtBQWEsRUFBRSxRQUFlO1FBQWpELGlCQU1DO1FBTEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUM7YUFDekQsU0FBUyxDQUFDLFVBQUMsTUFBbUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RELEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFUVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBRTJCLHVCQUFnQixFQUF3Qix3QkFBSztPQUR4RSxlQUFlLENBVTNCO0lBQUQsc0JBQUM7Q0FWRCxBQVVDLElBQUE7QUFWWSwwQ0FBZSIsImZpbGUiOiJhcHAvc3RvcmUvcGFnZS1kYXRhL3BhZ2UtZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYWdlRGF0YVNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRyYW5zbGF0ZVNlcnZpY2U6IFRyYW5zbGF0ZVNlcnZpY2UsIHByaXZhdGUgdGl0bGVTZXJ2aWNlOiBUaXRsZSkgeyB9XG5cbiAgcHVibGljIHVwZGF0ZVRpdGxlKHRyS2V5OiBzdHJpbmcsIHRyUGFyYW1zPzogUG9qbyk6IHZvaWQge1xuICAgIHRoaXMudHJhbnNsYXRlU2VydmljZS5nZXQoWydDT01QQU5ZX05BTUUnLCB0cktleV0sIHRyUGFyYW1zKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWVzOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgdmFsdWVzW3RyS2V5XSA9IHZhbHVlc1t0cktleV0ucmVwbGFjZSgne3txfX0nLCAnYWxsJyk7XG4gICAgICAgIHRoaXMudGl0bGVTZXJ2aWNlLnNldFRpdGxlKHZhbHVlc1snQ09NUEFOWV9OQU1FJ10gKyB2YWx1ZXNbdHJLZXldKTtcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=

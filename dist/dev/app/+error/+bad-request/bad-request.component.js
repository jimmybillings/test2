"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var error_base_1 = require("../error.base");
var BadRequestComponent = (function (_super) {
    __extends(BadRequestComponent, _super);
    function BadRequestComponent(userCan) {
        var _this = _super.call(this, userCan) || this;
        _this.userCan = userCan;
        return _this;
    }
    BadRequestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bad-request-component',
            templateUrl: './bad-request.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities])
    ], BadRequestComponent);
    return BadRequestComponent;
}(error_base_1.ErrorBase));
exports.BadRequestComponent = BadRequestComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZXJyb3IvK2JhZC1yZXF1ZXN0L2JhZC1yZXF1ZXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBbUU7QUFDbkUsbUZBQTBFO0FBQzFFLDRDQUEwQztBQVExQztJQUF5Qyx1Q0FBUztJQUNoRCw2QkFBc0IsT0FBcUI7UUFBM0MsWUFDRSxrQkFBTSxPQUFPLENBQUMsU0FDZjtRQUZxQixhQUFPLEdBQVAsT0FBTyxDQUFjOztJQUUzQyxDQUFDO0lBSFUsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxXQUFXLEVBQUUsb0JBQW9CO1lBQ2pDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBRStCLG1DQUFZO09BRGhDLG1CQUFtQixDQUkvQjtJQUFELDBCQUFDO0NBSkQsQUFJQyxDQUp3QyxzQkFBUyxHQUlqRDtBQUpZLGtEQUFtQiIsImZpbGUiOiJhcHAvK2Vycm9yLytiYWQtcmVxdWVzdC9iYWQtcmVxdWVzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRXJyb3JCYXNlIH0gZnJvbSAnLi4vZXJyb3IuYmFzZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2JhZC1yZXF1ZXN0LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYWQtcmVxdWVzdC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgQmFkUmVxdWVzdENvbXBvbmVudCBleHRlbmRzIEVycm9yQmFzZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCB1c2VyQ2FuOiBDYXBhYmlsaXRpZXMpIHtcbiAgICBzdXBlcih1c2VyQ2FuKTtcbiAgfVxufVxuIl19

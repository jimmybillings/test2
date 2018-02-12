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
var api_interface_1 = require("../interfaces/api.interface");
var api_service_1 = require("../services/api.service");
var app_store_1 = require("../../app.store");
var AsperaService = (function () {
    function AsperaService(api, store) {
        this.api = api;
        this.store = store;
    }
    AsperaService.prototype.initConnect = function (stringifiedAsperaSpec) {
        var _this = this;
        var id = Math.floor((Math.random() * 10000) + 1);
        var CONNECT_INSTALLER = '//d3gcli72yxqn2z.cloudfront.net/connect/v4';
        var asperaWeb = new AW4.Connect({
            sdkLocation: CONNECT_INSTALLER,
            minVersion: '3.6.0',
            id: 'aspera_web_transfers-' + id
        });
        var asperaInstaller = new AW4.ConnectInstaller({
            sdkLocation: CONNECT_INSTALLER
        });
        var asperaSpec = this.parse(stringifiedAsperaSpec);
        asperaWeb.addEventListener(AW4.Connect.EVENT.STATUS, function (eventType, data) {
            switch (data) {
                case AW4.Connect.STATUS.INITIALIZING:
                    asperaInstaller.showLaunching();
                    return;
                case AW4.Connect.STATUS.FAILED:
                    asperaInstaller.showDownload();
                    return;
                case AW4.Connect.STATUS.OUTDATED:
                    asperaInstaller.showUpdate();
                    return;
                case AW4.Connect.STATUS.RUNNING:
                    asperaInstaller.connected();
                    _this.handleDownload(asperaSpec, asperaWeb, id);
                    return;
                default:
                    return;
            }
        });
        asperaWeb.initSession('nodeConnect-' + id);
    };
    AsperaService.prototype.getAsperaSpec = function (assetId, renditionType) {
        return this.api.get(api_interface_1.Api.Assets, "renditionType/asperaSpec/" + assetId, { parameters: { type: renditionType } });
    };
    AsperaService.prototype.handleDownload = function (spec, asperaWeb, random) {
        spec.target_rate_kbps = 100000;
        spec.authentication = 'token';
        asperaWeb.startTransfer(spec, { 'allow_dialogs': 'yes' });
    };
    AsperaService.prototype.parse = function (stringifiedAsperaSpec) {
        var parsedSpec = JSON.parse(stringifiedAsperaSpec);
        if (parsedSpec.hasOwnProperty('transfer_specs')) {
            return parsedSpec.transfer_specs[0].transfer_spec;
        }
        return parsedSpec;
    };
    AsperaService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService, app_store_1.AppStore])
    ], AsperaService);
    return AsperaService;
}());
exports.AsperaService = AsperaService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvYXNwZXJhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQSxzQ0FBMkM7QUFDM0MsNkRBQThEO0FBRTlELHVEQUFxRDtBQUNyRCw2Q0FBMkM7QUFLM0M7SUFDRSx1QkFBb0IsR0FBZSxFQUFVLEtBQWU7UUFBeEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRTFELG1DQUFXLEdBQWxCLFVBQW1CLHFCQUE2QjtRQUFoRCxpQkFzQ0M7UUFyQ0MsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFNLGlCQUFpQixHQUFHLDRDQUE0QyxDQUFDO1FBQ3ZFLElBQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUNoQyxXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLFVBQVUsRUFBRSxPQUFPO1lBQ25CLEVBQUUsRUFBRSx1QkFBdUIsR0FBRyxFQUFFO1NBQ2pDLENBQUMsQ0FBQztRQUVILElBQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDO1lBQy9DLFdBQVcsRUFBRSxpQkFBaUI7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxVQUFVLEdBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRS9ELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FDeEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUN4QixVQUFDLFNBQWMsRUFBRSxJQUFTO1lBQ3hCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZO29CQUNsQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ2hDLE1BQU0sQ0FBQztnQkFDVCxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBQzVCLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDL0IsTUFBTSxDQUFDO2dCQUNULEtBQUssR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUTtvQkFDOUIsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUM3QixNQUFNLENBQUM7Z0JBQ1QsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO29CQUM3QixlQUFlLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDL0MsTUFBTSxDQUFDO2dCQUNUO29CQUNFLE1BQU0sQ0FBQztZQUNYLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVMLFNBQVMsQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxxQ0FBYSxHQUFwQixVQUFxQixPQUFlLEVBQUUsYUFBcUI7UUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNqQixtQkFBRyxDQUFDLE1BQU0sRUFDViw4QkFBNEIsT0FBUyxFQUNyQyxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUN4QyxDQUFDO0lBQ0osQ0FBQztJQUVPLHNDQUFjLEdBQXRCLFVBQXVCLElBQWdCLEVBQUUsU0FBYyxFQUFFLE1BQWM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUU5QixTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTyw2QkFBSyxHQUFiLFVBQWMscUJBQTZCO1FBQ3pDLElBQU0sVUFBVSxHQUE2QixJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFL0UsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUUsVUFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ3JFLENBQUM7UUFFRCxNQUFNLENBQUMsVUFBd0IsQ0FBQztJQUNsQyxDQUFDO0lBbEVVLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FFYyx3QkFBVSxFQUFpQixvQkFBUTtPQURqRCxhQUFhLENBbUV6QjtJQUFELG9CQUFDO0NBbkVELEFBbUVDLElBQUE7QUFuRVksc0NBQWEiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9hc3BlcmEuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcGksIEFwaU9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNwZXJhU3BlYywgQXNwZXJhU3BlY3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuZGVjbGFyZSB2YXIgQVc0OiBhbnk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc3BlcmFTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgaW5pdENvbm5lY3Qoc3RyaW5naWZpZWRBc3BlcmFTcGVjOiBzdHJpbmcpIHtcbiAgICBjb25zdCBpZCA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiAxMDAwMCkgKyAxKTtcbiAgICBjb25zdCBDT05ORUNUX0lOU1RBTExFUiA9ICcvL2QzZ2NsaTcyeXhxbjJ6LmNsb3VkZnJvbnQubmV0L2Nvbm5lY3QvdjQnO1xuICAgIGNvbnN0IGFzcGVyYVdlYiA9IG5ldyBBVzQuQ29ubmVjdCh7XG4gICAgICBzZGtMb2NhdGlvbjogQ09OTkVDVF9JTlNUQUxMRVIsXG4gICAgICBtaW5WZXJzaW9uOiAnMy42LjAnLFxuICAgICAgaWQ6ICdhc3BlcmFfd2ViX3RyYW5zZmVycy0nICsgaWRcbiAgICB9KTtcblxuICAgIGNvbnN0IGFzcGVyYUluc3RhbGxlciA9IG5ldyBBVzQuQ29ubmVjdEluc3RhbGxlcih7XG4gICAgICBzZGtMb2NhdGlvbjogQ09OTkVDVF9JTlNUQUxMRVJcbiAgICB9KTtcblxuICAgIGxldCBhc3BlcmFTcGVjOiBBc3BlcmFTcGVjID0gdGhpcy5wYXJzZShzdHJpbmdpZmllZEFzcGVyYVNwZWMpO1xuXG4gICAgYXNwZXJhV2ViLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBBVzQuQ29ubmVjdC5FVkVOVC5TVEFUVVMsXG4gICAgICAoZXZlbnRUeXBlOiBhbnksIGRhdGE6IGFueSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGRhdGEpIHtcbiAgICAgICAgICBjYXNlIEFXNC5Db25uZWN0LlNUQVRVUy5JTklUSUFMSVpJTkc6XG4gICAgICAgICAgICBhc3BlcmFJbnN0YWxsZXIuc2hvd0xhdW5jaGluZygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGNhc2UgQVc0LkNvbm5lY3QuU1RBVFVTLkZBSUxFRDpcbiAgICAgICAgICAgIGFzcGVyYUluc3RhbGxlci5zaG93RG93bmxvYWQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBjYXNlIEFXNC5Db25uZWN0LlNUQVRVUy5PVVREQVRFRDpcbiAgICAgICAgICAgIGFzcGVyYUluc3RhbGxlci5zaG93VXBkYXRlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgY2FzZSBBVzQuQ29ubmVjdC5TVEFUVVMuUlVOTklORzpcbiAgICAgICAgICAgIGFzcGVyYUluc3RhbGxlci5jb25uZWN0ZWQoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRG93bmxvYWQoYXNwZXJhU3BlYywgYXNwZXJhV2ViLCBpZCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBhc3BlcmFXZWIuaW5pdFNlc3Npb24oJ25vZGVDb25uZWN0LScgKyBpZCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXNwZXJhU3BlYyhhc3NldElkOiBudW1iZXIsIHJlbmRpdGlvblR5cGU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmdldChcbiAgICAgIEFwaS5Bc3NldHMsXG4gICAgICBgcmVuZGl0aW9uVHlwZS9hc3BlcmFTcGVjLyR7YXNzZXRJZH1gLFxuICAgICAgeyBwYXJhbWV0ZXJzOiB7IHR5cGU6IHJlbmRpdGlvblR5cGUgfSB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRG93bmxvYWQoc3BlYzogQXNwZXJhU3BlYywgYXNwZXJhV2ViOiBhbnksIHJhbmRvbTogbnVtYmVyKSB7XG4gICAgc3BlYy50YXJnZXRfcmF0ZV9rYnBzID0gMTAwMDAwO1xuICAgIHNwZWMuYXV0aGVudGljYXRpb24gPSAndG9rZW4nO1xuXG4gICAgYXNwZXJhV2ViLnN0YXJ0VHJhbnNmZXIoc3BlYywgeyAnYWxsb3dfZGlhbG9ncyc6ICd5ZXMnIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZShzdHJpbmdpZmllZEFzcGVyYVNwZWM6IHN0cmluZyk6IEFzcGVyYVNwZWMge1xuICAgIGNvbnN0IHBhcnNlZFNwZWM6IEFzcGVyYVNwZWMgfCBBc3BlcmFTcGVjcyA9IEpTT04ucGFyc2Uoc3RyaW5naWZpZWRBc3BlcmFTcGVjKTtcblxuICAgIGlmIChwYXJzZWRTcGVjLmhhc093blByb3BlcnR5KCd0cmFuc2Zlcl9zcGVjcycpKSB7XG4gICAgICByZXR1cm4gKHBhcnNlZFNwZWMgYXMgQXNwZXJhU3BlY3MpLnRyYW5zZmVyX3NwZWNzWzBdLnRyYW5zZmVyX3NwZWM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlZFNwZWMgYXMgQXNwZXJhU3BlYztcbiAgfVxufVxuIl19

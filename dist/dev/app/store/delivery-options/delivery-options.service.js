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
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var aspera_service_1 = require("../../shared/services/aspera.service");
var DeliveryOptionsService = (function () {
    function DeliveryOptionsService(apiService, asperaService) {
        this.apiService = apiService;
        this.asperaService = asperaService;
    }
    DeliveryOptionsService.prototype.getDeliveryOptions = function (assetId, shareKey) {
        var options = {};
        if (shareKey)
            options.overridingToken = shareKey;
        return this.apiService.get(api_interface_1.Api.Assets, "renditionType/deliveryOptions/" + assetId, options).map(this.formatDeliveryOptions);
    };
    DeliveryOptionsService.prototype.deliverAsset = function (assetId, optionId, markers) {
        var parameters = {
            region: 'AAA',
            optionId: String(optionId)
        };
        if (markers) {
            var duration = subclip_markers_1.durationFrom(markers);
            parameters = __assign({}, parameters, { startTime: String(duration.timeStart), endTime: String(duration.timeEnd) });
        }
        return this.apiService.post(api_interface_1.Api.Orders, "order/deliverAsset/" + assetId, {
            loadingIndicator: true,
            parameters: parameters
        });
    };
    DeliveryOptionsService.prototype.initializeAsperaConnection = function (asperaSpec) {
        this.asperaService.initConnect(asperaSpec);
    };
    DeliveryOptionsService.prototype.formatDeliveryOptions = function (options) {
        if (!options.list)
            return [];
        var formattedOptions = [];
        options.list.reduce(function (usedGroupIds, option) {
            var group;
            if (!option.deliveryOptionGroupId) {
                formattedOptions.push([option]);
            }
            else {
                var groupId_1 = option.deliveryOptionGroupId;
                if (!usedGroupIds.includes(groupId_1)) {
                    group = options.list
                        .filter(function (o) { return o.deliveryOptionGroupId === groupId_1; })
                        .sort(function (a, b) { return parseInt(a.deliveryOptionGroupOrder) - parseInt(b.deliveryOptionGroupOrder); });
                    formattedOptions.push(group);
                    usedGroupIds.push(groupId_1);
                }
            }
            return usedGroupIds;
        }, []);
        return formattedOptions;
    };
    DeliveryOptionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService, aspera_service_1.AsperaService])
    ], DeliveryOptionsService);
    return DeliveryOptionsService;
}());
exports.DeliveryOptionsService = DeliveryOptionsService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQTJDO0FBRTNDLGtEQUFzRDtBQUN0RCx1RUFBdUY7QUFDdkYsMkVBQWlHO0FBRWpHLHVFQUFxRTtBQVVyRTtJQUNFLGdDQUFvQixVQUE0QixFQUFVLGFBQTRCO1FBQWxFLGVBQVUsR0FBVixVQUFVLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDO0lBRXBGLG1EQUFrQixHQUF6QixVQUEwQixPQUFlLEVBQUUsUUFBaUI7UUFDMUQsSUFBSSxPQUFPLEdBQWUsRUFBRSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1FBRWpELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxtQ0FBaUMsT0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM5SCxDQUFDO0lBRU0sNkNBQVksR0FBbkIsVUFBb0IsT0FBZSxFQUFFLFFBQWdCLEVBQUUsT0FBd0I7UUFDN0UsSUFBSSxVQUFVLEdBQWtCO1lBQzlCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDM0IsQ0FBQztRQUVGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFNLFFBQVEsR0FBYSw4QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELFVBQVUsZ0JBQVEsVUFBVSxJQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFFLENBQUM7UUFDM0csQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDekIsbUJBQUcsQ0FBQyxNQUFNLEVBQ1Ysd0JBQXNCLE9BQVMsRUFDL0I7WUFDRSxnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLFVBQVUsRUFBRSxVQUFVO1NBQ3ZCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTSwyREFBMEIsR0FBakMsVUFBa0MsVUFBa0I7UUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLHNEQUFxQixHQUE3QixVQUE4QixPQUEyQjtRQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzdCLElBQUksZ0JBQWdCLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFlBQXNCLEVBQUUsTUFBc0I7WUFDakUsSUFBSSxLQUEwQixDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDbEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBTSxTQUFPLEdBQVcsTUFBTSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsU0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUk7eUJBQ2pCLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxxQkFBcUIsS0FBSyxTQUFPLEVBQW5DLENBQW1DLENBQUM7eUJBQ2hELElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUEzRSxDQUEyRSxDQUFDLENBQUM7b0JBQy9GLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDN0IsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFPLENBQUMsQ0FBQztnQkFDN0IsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3RCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNQLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBdkRVLHNCQUFzQjtRQURsQyxpQkFBVSxFQUFFO3lDQUVxQiw4QkFBZ0IsRUFBeUIsOEJBQWE7T0FEM0Usc0JBQXNCLENBd0RsQztJQUFELDZCQUFDO0NBeERELEFBd0RDLElBQUE7QUF4RFksd0RBQXNCIiwiZmlsZSI6ImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSwgQXBpUGFyYW1ldGVycywgQXBpT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMsIGR1cmF0aW9uRnJvbSwgRHVyYXRpb24gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNwZXJhU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hc3BlcmEuc2VydmljZSc7XG5pbXBvcnQge1xuICBEZWxpdmVyeU9wdGlvbixcbiAgQXBpRGVsaXZlcnlPcHRpb25zLFxuICBEZWxpdmVyeU9wdGlvbnMsXG4gIERlbGl2ZXJ5T3B0aW9uR3JvdXAsXG59IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Fzc2V0LmludGVyZmFjZSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlbGl2ZXJ5T3B0aW9uc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEZ1dHVyZUFwaVNlcnZpY2UsIHByaXZhdGUgYXNwZXJhU2VydmljZTogQXNwZXJhU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGdldERlbGl2ZXJ5T3B0aW9ucyhhc3NldElkOiBudW1iZXIsIHNoYXJlS2V5Pzogc3RyaW5nKTogT2JzZXJ2YWJsZTxEZWxpdmVyeU9wdGlvbnM+IHtcbiAgICBsZXQgb3B0aW9uczogQXBpT3B0aW9ucyA9IHt9O1xuICAgIGlmIChzaGFyZUtleSkgb3B0aW9ucy5vdmVycmlkaW5nVG9rZW4gPSBzaGFyZUtleTtcblxuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZ2V0KEFwaS5Bc3NldHMsIGByZW5kaXRpb25UeXBlL2RlbGl2ZXJ5T3B0aW9ucy8ke2Fzc2V0SWR9YCwgb3B0aW9ucykubWFwKHRoaXMuZm9ybWF0RGVsaXZlcnlPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBkZWxpdmVyQXNzZXQoYXNzZXRJZDogbnVtYmVyLCBvcHRpb25JZDogbnVtYmVyLCBtYXJrZXJzPzogU3ViY2xpcE1hcmtlcnMpOiBPYnNlcnZhYmxlPE9yZGVyPiB7XG4gICAgbGV0IHBhcmFtZXRlcnM6IEFwaVBhcmFtZXRlcnMgPSB7XG4gICAgICByZWdpb246ICdBQUEnLFxuICAgICAgb3B0aW9uSWQ6IFN0cmluZyhvcHRpb25JZClcbiAgICB9O1xuXG4gICAgaWYgKG1hcmtlcnMpIHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uOiBEdXJhdGlvbiA9IGR1cmF0aW9uRnJvbShtYXJrZXJzKTtcbiAgICAgIHBhcmFtZXRlcnMgPSB7IC4uLnBhcmFtZXRlcnMsIHN0YXJ0VGltZTogU3RyaW5nKGR1cmF0aW9uLnRpbWVTdGFydCksIGVuZFRpbWU6IFN0cmluZyhkdXJhdGlvbi50aW1lRW5kKSB9O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucG9zdChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgb3JkZXIvZGVsaXZlckFzc2V0LyR7YXNzZXRJZH1gLFxuICAgICAge1xuICAgICAgICBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlLFxuICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplQXNwZXJhQ29ubmVjdGlvbihhc3BlcmFTcGVjOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmFzcGVyYVNlcnZpY2UuaW5pdENvbm5lY3QoYXNwZXJhU3BlYyk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdERlbGl2ZXJ5T3B0aW9ucyhvcHRpb25zOiBBcGlEZWxpdmVyeU9wdGlvbnMpOiBEZWxpdmVyeU9wdGlvbnMge1xuICAgIGlmICghb3B0aW9ucy5saXN0KSByZXR1cm4gW107XG4gICAgbGV0IGZvcm1hdHRlZE9wdGlvbnM6IERlbGl2ZXJ5T3B0aW9ucyA9IFtdO1xuICAgIG9wdGlvbnMubGlzdC5yZWR1Y2UoKHVzZWRHcm91cElkczogc3RyaW5nW10sIG9wdGlvbjogRGVsaXZlcnlPcHRpb24pID0+IHtcbiAgICAgIGxldCBncm91cDogRGVsaXZlcnlPcHRpb25Hcm91cDtcbiAgICAgIGlmICghb3B0aW9uLmRlbGl2ZXJ5T3B0aW9uR3JvdXBJZCkge1xuICAgICAgICBmb3JtYXR0ZWRPcHRpb25zLnB1c2goW29wdGlvbl0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZ3JvdXBJZDogc3RyaW5nID0gb3B0aW9uLmRlbGl2ZXJ5T3B0aW9uR3JvdXBJZDtcbiAgICAgICAgaWYgKCF1c2VkR3JvdXBJZHMuaW5jbHVkZXMoZ3JvdXBJZCkpIHtcbiAgICAgICAgICBncm91cCA9IG9wdGlvbnMubGlzdFxuICAgICAgICAgICAgLmZpbHRlcihvID0+IG8uZGVsaXZlcnlPcHRpb25Hcm91cElkID09PSBncm91cElkKVxuICAgICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHBhcnNlSW50KGEuZGVsaXZlcnlPcHRpb25Hcm91cE9yZGVyKSAtIHBhcnNlSW50KGIuZGVsaXZlcnlPcHRpb25Hcm91cE9yZGVyKSk7XG4gICAgICAgICAgZm9ybWF0dGVkT3B0aW9ucy5wdXNoKGdyb3VwKTtcbiAgICAgICAgICB1c2VkR3JvdXBJZHMucHVzaChncm91cElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVzZWRHcm91cElkcztcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlZE9wdGlvbnM7XG4gIH1cbn1cbiJdfQ==

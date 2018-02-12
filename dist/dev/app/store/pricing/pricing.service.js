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
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var PricingService = (function () {
    function PricingService(apiService) {
        this.apiService = apiService;
    }
    PricingService.prototype.getPrice = function (attributes, assetId, markers) {
        var parameters = Object.assign({ region: 'AAA' }, { attributes: this.formatAttributes(attributes) }, markers ? this.formatDurationParametersFor(markers) : null);
        return this.apiService.get(api_interface_1.Api.Orders, "priceBook/price/" + assetId, { parameters: parameters }).map(function (data) { return data.price; });
    };
    PricingService.prototype.getPriceAttributes = function (priceModel) {
        priceModel = priceModel.split(' ').join('');
        return this.apiService.get(api_interface_1.Api.Orders, 'priceBook/priceAttributes', { parameters: { region: 'AAA', priceModel: priceModel } }).map(function (data) {
            data.list[0].primary = true;
            return data.list;
        });
    };
    PricingService.prototype.formatAttributes = function (attrs) {
        var formatted = [];
        for (var attr in attrs) {
            formatted.push(attr + ":" + attrs[attr]);
        }
        return formatted.join(',');
    };
    PricingService.prototype.formatDurationParametersFor = function (markers) {
        return {
            startSecond: markers.in.asMilliseconds(), endSecond: markers.out.asMilliseconds()
        };
    };
    PricingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], PricingService);
    return PricingService;
}());
exports.PricingService = PricingService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQyxrREFBc0Q7QUFHdEQsdUVBQTJFO0FBTTNFO0lBQ0Usd0JBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5QyxpQ0FBUSxHQUFmLFVBQWdCLFVBQWdCLEVBQUUsT0FBZSxFQUFFLE9BQWdEO1FBQ2pHLElBQU0sVUFBVSxHQUNkLE1BQU0sQ0FBQyxNQUFNLENBQ1gsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQ2pCLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUNqRCxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzRCxDQUFDO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsTUFBTSxFQUFFLHFCQUFtQixPQUFTLEVBQUUsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUyxJQUFLLE9BQUEsSUFBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUMsQ0FBQztJQUN0SCxDQUFDO0lBRU0sMkNBQWtCLEdBQXpCLFVBQTBCLFVBQWtCO1FBQzFDLFVBQVUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hCLG1CQUFHLENBQUMsTUFBTSxFQUNWLDJCQUEyQixFQUMzQixFQUFFLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQzFELENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyx5Q0FBZ0IsR0FBeEIsVUFBeUIsS0FBVTtRQUNqQyxJQUFJLFNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkIsU0FBUyxDQUFDLElBQUksQ0FBSSxJQUFJLFNBQUksS0FBSyxDQUFDLElBQUksQ0FBRyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTyxvREFBMkIsR0FBbkMsVUFBb0MsT0FBK0M7UUFDakYsTUFBTSxDQUFDO1lBQ0wsV0FBVyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFO1NBQ2xGLENBQUM7SUFDSixDQUFDO0lBdENVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLGNBQWMsQ0F1QzFCO0lBQUQscUJBQUM7Q0F2Q0QsQUF1Q0MsSUFBQTtBQXZDWSx3Q0FBYyIsImZpbGUiOiJhcHAvc3RvcmUvcHJpY2luZy9wcmljaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgRnV0dXJlQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgUHJpY2VBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpLCBBcGlQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQcmljaW5nU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGdldFByaWNlKGF0dHJpYnV0ZXM6IFBvam8sIGFzc2V0SWQ6IG51bWJlciwgbWFya2Vycz86IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLlN1YmNsaXBNYXJrZXJzKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBBcGlQYXJhbWV0ZXJzID1cbiAgICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHsgcmVnaW9uOiAnQUFBJyB9LFxuICAgICAgICB7IGF0dHJpYnV0ZXM6IHRoaXMuZm9ybWF0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB9LFxuICAgICAgICBtYXJrZXJzID8gdGhpcy5mb3JtYXREdXJhdGlvblBhcmFtZXRlcnNGb3IobWFya2VycykgOiBudWxsXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoQXBpLk9yZGVycywgYHByaWNlQm9vay9wcmljZS8ke2Fzc2V0SWR9YCwgeyBwYXJhbWV0ZXJzIH0pLm1hcCgoZGF0YTogYW55KSA9PiBkYXRhLnByaWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcmljZUF0dHJpYnV0ZXMocHJpY2VNb2RlbDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnJheTxQcmljZUF0dHJpYnV0ZT4+IHtcbiAgICBwcmljZU1vZGVsID0gcHJpY2VNb2RlbC5zcGxpdCgnICcpLmpvaW4oJycpO1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZ2V0KFxuICAgICAgQXBpLk9yZGVycyxcbiAgICAgICdwcmljZUJvb2svcHJpY2VBdHRyaWJ1dGVzJyxcbiAgICAgIHsgcGFyYW1ldGVyczogeyByZWdpb246ICdBQUEnLCBwcmljZU1vZGVsOiBwcmljZU1vZGVsIH0gfVxuICAgICkubWFwKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIGRhdGEubGlzdFswXS5wcmltYXJ5ID0gdHJ1ZTtcbiAgICAgIHJldHVybiBkYXRhLmxpc3Q7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdEF0dHJpYnV0ZXMoYXR0cnM6IGFueSk6IGFueSB7XG4gICAgbGV0IGZvcm1hdHRlZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGZvciAobGV0IGF0dHIgaW4gYXR0cnMpIHtcbiAgICAgIGZvcm1hdHRlZC5wdXNoKGAke2F0dHJ9OiR7YXR0cnNbYXR0cl19YCk7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWQuam9pbignLCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXREdXJhdGlvblBhcmFtZXRlcnNGb3IobWFya2VyczogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuU3ViY2xpcE1hcmtlcnMpOiBvYmplY3Qge1xuICAgIHJldHVybiB7XG4gICAgICBzdGFydFNlY29uZDogbWFya2Vycy5pbi5hc01pbGxpc2Vjb25kcygpLCBlbmRTZWNvbmQ6IG1hcmtlcnMub3V0LmFzTWlsbGlzZWNvbmRzKClcbiAgICB9O1xuICB9XG59XG4iXX0=

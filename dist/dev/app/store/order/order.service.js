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
var OrderService = (function () {
    function OrderService(apiService) {
        this.apiService = apiService;
    }
    OrderService.prototype.load = function (orderId) {
        return this.apiService.get(api_interface_1.Api.Orders, "order/" + orderId, { loadingIndicator: true }).map(this.normalize);
    };
    OrderService.prototype.normalize = function (order) {
        return __assign({}, order, { projects: order.projects.map(function (project) { return project.lineItems ? project : __assign({}, project, { lineItems: [] }); }) });
    };
    OrderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFHM0Msa0RBQXNEO0FBQ3RELHVFQUE0RDtBQUk1RDtJQUNFLHNCQUFvQixVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjtJQUFJLENBQUM7SUFFOUMsMkJBQUksR0FBWCxVQUFZLE9BQWU7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsTUFBTSxFQUFFLFdBQVMsT0FBUyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFTyxnQ0FBUyxHQUFqQixVQUFrQixLQUFZO1FBQzVCLE1BQU0sY0FDRCxLQUFLLElBQ1IsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBTSxPQUFPLElBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRSxFQUEzRCxDQUEyRCxDQUFDLElBQ3BHO0lBQ0osQ0FBQztJQVpVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLFlBQVksQ0FheEI7SUFBRCxtQkFBQztDQWJELEFBYUMsSUFBQTtBQWJZLG9DQUFZIiwiZmlsZSI6ImFwcC9zdG9yZS9vcmRlci9vcmRlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEZ1dHVyZUFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEZ1dHVyZUFwaVNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBsb2FkKG9yZGVySWQ6IG51bWJlcik6IE9ic2VydmFibGU8T3JkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmdldChBcGkuT3JkZXJzLCBgb3JkZXIvJHtvcmRlcklkfWAsIHsgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KS5tYXAodGhpcy5ub3JtYWxpemUpO1xuICB9XG5cbiAgcHJpdmF0ZSBub3JtYWxpemUob3JkZXI6IE9yZGVyKTogT3JkZXIge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5vcmRlcixcbiAgICAgIHByb2plY3RzOiBvcmRlci5wcm9qZWN0cy5tYXAocHJvamVjdCA9PiBwcm9qZWN0LmxpbmVJdGVtcyA/IHByb2plY3QgOiB7IC4uLnByb2plY3QsIGxpbmVJdGVtczogW10gfSlcbiAgICB9O1xuICB9XG59XG4iXX0=

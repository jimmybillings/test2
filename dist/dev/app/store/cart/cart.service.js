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
var common_functions_1 = require("../../shared/utilities/common.functions");
var FutureCartService = (function () {
    function FutureCartService(apiService) {
        this.apiService = apiService;
    }
    FutureCartService.prototype.load = function () {
        return this.apiService.get(api_interface_1.Api.Orders, 'cart', { loadingIndicator: true });
    };
    FutureCartService.prototype.editLineItem = function (lineItem, markers, attributes) {
        var duration = this.durationFrom(lineItem, markers);
        var newAttributes = attributes ? attributes : lineItem.attributes || [];
        var newAsset = __assign({}, lineItem.asset, duration);
        var newLineItem = __assign({}, lineItem, { attributes: newAttributes, asset: newAsset });
        return this.makeEditLineItemRequest(newLineItem);
    };
    FutureCartService.prototype.removeAsset = function (asset) {
        return this.apiService.delete(api_interface_1.Api.Orders, "cart/asset/" + asset.uuid, { loadingIndicator: true });
    };
    FutureCartService.prototype.addNote = function (note, lineItem) {
        if (lineItem.hasOwnProperty('notes') && Array.isArray(lineItem.notes)) {
            lineItem.notes[0] = { notes: [note] };
        }
        else {
            lineItem.notes = [{ notes: [note] }];
        }
        return this.makeEditLineItemRequest(lineItem);
    };
    FutureCartService.prototype.removeNoteFrom = function (lineItem) {
        var clonedLineItem = common_functions_1.Common.clone(lineItem);
        delete clonedLineItem.notes;
        return this.makeEditLineItemRequest(clonedLineItem);
    };
    FutureCartService.prototype.durationFrom = function (lineItem, markers) {
        return subclip_markers_1.bothMarkersAreSet(markers) ?
            subclip_markers_1.durationFrom(markers) : { timeStart: lineItem.asset.timeStart, timeEnd: lineItem.asset.timeEnd };
    };
    FutureCartService.prototype.makeEditLineItemRequest = function (lineItem) {
        return this.apiService.put(api_interface_1.Api.Orders, "cart/update/lineItem/" + lineItem.id, { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true });
    };
    FutureCartService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], FutureCartService);
    return FutureCartService;
}());
exports.FutureCartService = FutureCartService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jYXJ0L2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRzNDLGtEQUFzRDtBQUN0RCx1RUFBNEQ7QUFFNUQsMkVBQW9IO0FBR3BILDRFQUFpRTtBQUdqRTtJQUNFLDJCQUFvQixVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjtJQUFJLENBQUM7SUFFOUMsZ0NBQUksR0FBWDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSx3Q0FBWSxHQUFuQixVQUNFLFFBQXVCLEVBQ3ZCLE9BQXVCLEVBQ3ZCLFVBQW9DO1FBRXBDLElBQU0sUUFBUSxHQUFhLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLElBQU0sYUFBYSxHQUE2QixVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7UUFDcEcsSUFBTSxRQUFRLGdCQUFlLFFBQVEsQ0FBQyxLQUFLLEVBQUssUUFBUSxDQUFFLENBQUM7UUFFM0QsSUFBTSxXQUFXLGdCQUNaLFFBQVEsSUFDWCxVQUFVLEVBQUUsYUFBYSxFQUN6QixLQUFLLEVBQUUsUUFBUSxHQUNoQixDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsS0FBWTtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsbUJBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWMsS0FBSyxDQUFDLElBQU0sRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVNLG1DQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsUUFBdUI7UUFDbEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSwwQ0FBYyxHQUFyQixVQUFzQixRQUF1QjtRQUMzQyxJQUFJLGNBQWMsR0FBa0IseUJBQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVPLHdDQUFZLEdBQXBCLFVBQXFCLFFBQXVCLEVBQUUsT0FBdUI7UUFDbkUsTUFBTSxDQUFDLG1DQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakMsOEJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckcsQ0FBQztJQUVPLG1EQUF1QixHQUEvQixVQUFnQyxRQUF1QjtRQUNyRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hCLG1CQUFHLENBQUMsTUFBTSxFQUNWLDBCQUF3QixRQUFRLENBQUMsRUFBSSxFQUNyQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQXpEVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FFcUIsOEJBQWdCO09BRHJDLGlCQUFpQixDQTBEN0I7SUFBRCx3QkFBQztDQTFERCxBQTBEQyxJQUFBO0FBMURZLDhDQUFpQiIsImZpbGUiOiJhcHAvc3RvcmUvY2FydC9jYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgRnV0dXJlQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU3ViY2xpcE1hcmtlcnMsIER1cmF0aW9uLCBkdXJhdGlvbkZyb20sIGJvdGhNYXJrZXJzQXJlU2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFzc2V0TGluZUl0ZW0sIEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBvam8sIFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdXR1cmVDYXJ0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGxvYWQoKTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoQXBpLk9yZGVycywgJ2NhcnQnLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgZWRpdExpbmVJdGVtKFxuICAgIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtLFxuICAgIG1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzLFxuICAgIGF0dHJpYnV0ZXM6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXVxuICApOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICBjb25zdCBkdXJhdGlvbjogRHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uRnJvbShsaW5lSXRlbSwgbWFya2Vycyk7XG4gICAgY29uc3QgbmV3QXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdID0gYXR0cmlidXRlcyA/IGF0dHJpYnV0ZXMgOiBsaW5lSXRlbS5hdHRyaWJ1dGVzIHx8IFtdO1xuICAgIGNvbnN0IG5ld0Fzc2V0OiBBc3NldCA9IHsgLi4ubGluZUl0ZW0uYXNzZXQsIC4uLmR1cmF0aW9uIH07XG5cbiAgICBjb25zdCBuZXdMaW5lSXRlbSA9IHtcbiAgICAgIC4uLmxpbmVJdGVtLFxuICAgICAgYXR0cmlidXRlczogbmV3QXR0cmlidXRlcyxcbiAgICAgIGFzc2V0OiBuZXdBc3NldFxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcy5tYWtlRWRpdExpbmVJdGVtUmVxdWVzdChuZXdMaW5lSXRlbSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXNzZXQoYXNzZXQ6IEFzc2V0KTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5kZWxldGUoQXBpLk9yZGVycywgYGNhcnQvYXNzZXQvJHthc3NldC51dWlkfWAsIHsgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGROb3RlKG5vdGU6IHN0cmluZywgbGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICBpZiAobGluZUl0ZW0uaGFzT3duUHJvcGVydHkoJ25vdGVzJykgJiYgQXJyYXkuaXNBcnJheShsaW5lSXRlbS5ub3RlcykpIHtcbiAgICAgIGxpbmVJdGVtLm5vdGVzWzBdID0geyBub3RlczogW25vdGVdIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmVJdGVtLm5vdGVzID0gW3sgbm90ZXM6IFtub3RlXSB9XTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tYWtlRWRpdExpbmVJdGVtUmVxdWVzdChsaW5lSXRlbSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlTm90ZUZyb20obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICBsZXQgY2xvbmVkTGluZUl0ZW06IEFzc2V0TGluZUl0ZW0gPSBDb21tb24uY2xvbmUobGluZUl0ZW0pO1xuICAgIGRlbGV0ZSBjbG9uZWRMaW5lSXRlbS5ub3RlcztcblxuICAgIHJldHVybiB0aGlzLm1ha2VFZGl0TGluZUl0ZW1SZXF1ZXN0KGNsb25lZExpbmVJdGVtKTtcbiAgfVxuXG4gIHByaXZhdGUgZHVyYXRpb25Gcm9tKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtLCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vycyk6IER1cmF0aW9uIHtcbiAgICByZXR1cm4gYm90aE1hcmtlcnNBcmVTZXQobWFya2VycykgP1xuICAgICAgZHVyYXRpb25Gcm9tKG1hcmtlcnMpIDogeyB0aW1lU3RhcnQ6IGxpbmVJdGVtLmFzc2V0LnRpbWVTdGFydCwgdGltZUVuZDogbGluZUl0ZW0uYXNzZXQudGltZUVuZCB9O1xuICB9XG5cbiAgcHJpdmF0ZSBtYWtlRWRpdExpbmVJdGVtUmVxdWVzdChsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucHV0KFxuICAgICAgQXBpLk9yZGVycyxcbiAgICAgIGBjYXJ0L3VwZGF0ZS9saW5lSXRlbS8ke2xpbmVJdGVtLmlkfWAsXG4gICAgICB7IGJvZHk6IGxpbmVJdGVtLCBwYXJhbWV0ZXJzOiB7IHJlZ2lvbjogJ0FBQScgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKTtcbiAgfVxufVxuIl19

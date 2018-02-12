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
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.resetPricing = function () {
        return new ResetPricing();
    };
    ActionFactory.prototype.setPriceForDetails = function (price) {
        return new SetPriceForDetails(price);
    };
    ActionFactory.prototype.setPriceForDialog = function (price) {
        return new SetPriceForDialog(price);
    };
    ActionFactory.prototype.setAppliedAttributes = function (appliedAttributes) {
        return new SetAppliedAttributes(appliedAttributes);
    };
    ActionFactory.prototype.initializePricing = function (rightsReproduction, dialogOptions) {
        return new InitializePricing(rightsReproduction, dialogOptions);
    };
    ActionFactory.prototype.calculatePrice = function (selectedAttributes, assetId, subclipMarkers) {
        return new CalculatePrice(selectedAttributes, assetId, subclipMarkers);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.getAttributes = function (rightsReproduction, dialogOptions) {
        return new GetAttributes(rightsReproduction, dialogOptions);
    };
    InternalActionFactory.prototype.openDialog = function (dialogOptions) {
        return new OpenDialog(dialogOptions);
    };
    InternalActionFactory.prototype.getAttributesSuccess = function (attributes, rightsReproduction, dialogOptions) {
        return new GetAttributesSuccess(attributes, rightsReproduction, dialogOptions);
    };
    InternalActionFactory.prototype.getAttributesFailure = function (error) {
        return new GetAttributesFailure(error);
    };
    InternalActionFactory.prototype.calculatePriceSuccess = function (price) {
        return new CalculatePriceSuccess(price);
    };
    InternalActionFactory.prototype.calculatePriceFailure = function (error) {
        return new CalculatePriceFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var GetAttributes = (function () {
    function GetAttributes(rightsReproduction, dialogOptions) {
        this.rightsReproduction = rightsReproduction;
        this.dialogOptions = dialogOptions;
        this.type = GetAttributes.Type;
    }
    GetAttributes.Type = '[Pricing] Get Attributes';
    return GetAttributes;
}());
exports.GetAttributes = GetAttributes;
var GetAttributesSuccess = (function () {
    function GetAttributesSuccess(attributes, rightsReproduction, dialogOptions) {
        this.attributes = attributes;
        this.rightsReproduction = rightsReproduction;
        this.dialogOptions = dialogOptions;
        this.type = GetAttributesSuccess.Type;
    }
    GetAttributesSuccess.Type = '[Pricing] Get Attributes Success';
    return GetAttributesSuccess;
}());
exports.GetAttributesSuccess = GetAttributesSuccess;
var GetAttributesFailure = (function () {
    function GetAttributesFailure(error) {
        this.error = error;
        this.type = GetAttributesFailure.Type;
    }
    GetAttributesFailure.Type = '[Pricing] Get Attributes Failure';
    return GetAttributesFailure;
}());
exports.GetAttributesFailure = GetAttributesFailure;
var ResetPricing = (function () {
    function ResetPricing() {
        this.type = ResetPricing.Type;
    }
    ResetPricing.Type = '[Pricing] Reset Pricing';
    return ResetPricing;
}());
exports.ResetPricing = ResetPricing;
var SetPriceForDetails = (function () {
    function SetPriceForDetails(price) {
        this.price = price;
        this.type = SetPriceForDetails.Type;
    }
    SetPriceForDetails.Type = '[Pricing] Set Price For Details';
    return SetPriceForDetails;
}());
exports.SetPriceForDetails = SetPriceForDetails;
var SetPriceForDialog = (function () {
    function SetPriceForDialog(price) {
        this.price = price;
        this.type = SetPriceForDialog.Type;
    }
    SetPriceForDialog.Type = '[Pricing] Set Price For Dialog';
    return SetPriceForDialog;
}());
exports.SetPriceForDialog = SetPriceForDialog;
var SetAppliedAttributes = (function () {
    function SetAppliedAttributes(appliedAttributes) {
        this.appliedAttributes = appliedAttributes;
        this.type = SetAppliedAttributes.Type;
    }
    SetAppliedAttributes.Type = '[Pricing] Set Applied Attributes';
    return SetAppliedAttributes;
}());
exports.SetAppliedAttributes = SetAppliedAttributes;
var CalculatePrice = (function () {
    function CalculatePrice(selectedAttributes, assetId, subclipMarkers) {
        this.selectedAttributes = selectedAttributes;
        this.assetId = assetId;
        this.subclipMarkers = subclipMarkers;
        this.type = CalculatePrice.Type;
    }
    CalculatePrice.Type = '[Pricing] Calculate Price';
    return CalculatePrice;
}());
exports.CalculatePrice = CalculatePrice;
var CalculatePriceSuccess = (function () {
    function CalculatePriceSuccess(price) {
        this.price = price;
        this.type = CalculatePriceSuccess.Type;
    }
    CalculatePriceSuccess.Type = '[Pricing] Calculate Price Success';
    return CalculatePriceSuccess;
}());
exports.CalculatePriceSuccess = CalculatePriceSuccess;
var CalculatePriceFailure = (function () {
    function CalculatePriceFailure(error) {
        this.error = error;
        this.type = CalculatePriceFailure.Type;
    }
    CalculatePriceFailure.Type = '[Pricing] Calculate Price Failure';
    return CalculatePriceFailure;
}());
exports.CalculatePriceFailure = CalculatePriceFailure;
var InitializePricing = (function () {
    function InitializePricing(rightsReproduction, dialogOptions) {
        this.rightsReproduction = rightsReproduction;
        this.dialogOptions = dialogOptions;
        this.type = InitializePricing.Type;
    }
    InitializePricing.Type = '[Pricing] Initialize Pricing';
    return InitializePricing;
}());
exports.InitializePricing = InitializePricing;
var OpenDialog = (function () {
    function OpenDialog(dialogOptions) {
        this.dialogOptions = dialogOptions;
        this.type = OpenDialog.Type;
    }
    OpenDialog.Type = '[Pricing] Open Dialog';
    return OpenDialog;
}());
exports.OpenDialog = OpenDialog;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQTtJQUFBO0lBNEJBLENBQUM7SUEzQlEsb0NBQVksR0FBbkI7UUFDRSxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sMENBQWtCLEdBQXpCLFVBQTBCLEtBQWE7UUFDckMsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLHlDQUFpQixHQUF4QixVQUF5QixLQUFhO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSw0Q0FBb0IsR0FBM0IsVUFBNEIsaUJBQTJDO1FBQ3JFLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLHlDQUFpQixHQUF4QixVQUF5QixrQkFBMEIsRUFBRSxhQUFzQztRQUN6RixNQUFNLENBQUMsSUFBSSxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFDRSxrQkFBd0IsRUFDeEIsT0FBZSxFQUNmLGNBQXNEO1FBRXRELE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQTVCWSxzQ0FBYTtBQThCMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBK0JBLENBQUM7SUE5QlEsNkNBQWEsR0FBcEIsVUFDRSxrQkFBMEIsRUFDMUIsYUFBc0M7UUFFdEMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSwwQ0FBVSxH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dUIsQ0FBQztJQUd4RCxpQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGdDQUFVIiwiZmlsZSI6ImFwcC9zdG9yZS9wcmljaW5nL3ByaWNpbmcuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUHJpY2VBdHRyaWJ1dGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9qbywgU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvaW50ZXJmYWNlcy93ei5kaWFsb2cuaW50ZXJmYWNlJztcbmltcG9ydCAqIGFzIFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlIGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIHJlc2V0UHJpY2luZygpOiBSZXNldFByaWNpbmcge1xuICAgIHJldHVybiBuZXcgUmVzZXRQcmljaW5nKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJpY2VGb3JEZXRhaWxzKHByaWNlOiBudW1iZXIpOiBTZXRQcmljZUZvckRldGFpbHMge1xuICAgIHJldHVybiBuZXcgU2V0UHJpY2VGb3JEZXRhaWxzKHByaWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRQcmljZUZvckRpYWxvZyhwcmljZTogbnVtYmVyKTogU2V0UHJpY2VGb3JEaWFsb2cge1xuICAgIHJldHVybiBuZXcgU2V0UHJpY2VGb3JEaWFsb2cocHJpY2UpO1xuICB9XG5cbiAgcHVibGljIHNldEFwcGxpZWRBdHRyaWJ1dGVzKGFwcGxpZWRBdHRyaWJ1dGVzOiBTZWxlY3RlZFByaWNlQXR0cmlidXRlW10pOiBTZXRBcHBsaWVkQXR0cmlidXRlcyB7XG4gICAgcmV0dXJuIG5ldyBTZXRBcHBsaWVkQXR0cmlidXRlcyhhcHBsaWVkQXR0cmlidXRlcyk7XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGl6ZVByaWNpbmcocmlnaHRzUmVwcm9kdWN0aW9uOiBzdHJpbmcsIGRpYWxvZ09wdGlvbnM6IERlZmF1bHRDb21wb25lbnRPcHRpb25zKTogSW5pdGlhbGl6ZVByaWNpbmcge1xuICAgIHJldHVybiBuZXcgSW5pdGlhbGl6ZVByaWNpbmcocmlnaHRzUmVwcm9kdWN0aW9uLCBkaWFsb2dPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBjYWxjdWxhdGVQcmljZShcbiAgICBzZWxlY3RlZEF0dHJpYnV0ZXM6IFBvam8sXG4gICAgYXNzZXRJZDogbnVtYmVyLFxuICAgIHN1YmNsaXBNYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2Vyc1xuICApOiBDYWxjdWxhdGVQcmljZSB7XG4gICAgcmV0dXJuIG5ldyBDYWxjdWxhdGVQcmljZShzZWxlY3RlZEF0dHJpYnV0ZXMsIGFzc2V0SWQsIHN1YmNsaXBNYXJrZXJzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBnZXRBdHRyaWJ1dGVzKFxuICAgIHJpZ2h0c1JlcHJvZHVjdGlvbjogc3RyaW5nLFxuICAgIGRpYWxvZ09wdGlvbnM6IERlZmF1bHRDb21wb25lbnRPcHRpb25zXG4gICk6IEdldEF0dHJpYnV0ZXMge1xuICAgIHJldHVybiBuZXcgR2V0QXR0cmlidXRlcyhyaWdodHNSZXByb2R1Y3Rpb24sIGRpYWxvZ09wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIG9wZW5EaWFsb2coZGlhbG9nT3B0aW9uczogRGVmYXVsdENvbXBvbmVudE9wdGlvbnMpOiBPcGVuRGlhbG9nIHtcbiAgICByZXR1cm4gbmV3IE9wZW5EaWFsb2coZGlhbG9nT3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0QXR0cmlidXRlc1N1Y2Nlc3MoXG4gICAgYXR0cmlidXRlczogUHJpY2VBdHRyaWJ1dGVbXSxcbiAgICByaWdodHNSZXByb2R1Y3Rpb246IHN0cmluZyxcbiAgICBkaWFsb2dPcHRpb25zOiBEZWZhdWx0Q29tcG9uZW50T3B0aW9uc1xuICApOiBHZXRBdHRyaWJ1dGVzU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBHZXRBdHRyaWJ1dGVzU3VjY2VzcyhhdHRyaWJ1dGVzLCByaWdodHNSZXByb2R1Y3Rpb24sIGRpYWxvZ09wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGdldEF0dHJpYnV0ZXNGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogR2V0QXR0cmlidXRlc0ZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgR2V0QXR0cmlidXRlc0ZhaWx1cmUoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGNhbGN1bGF0ZVByaWNlU3VjY2VzcyhwcmljZTogbnVtYmVyKTogQ2FsY3VsYXRlUHJpY2VTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IENhbGN1bGF0ZVByaWNlU3VjY2VzcyhwcmljZSk7XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlUHJpY2VGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogQ2FsY3VsYXRlUHJpY2VGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IENhbGN1bGF0ZVByaWNlRmFpbHVyZShlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldEF0dHJpYnV0ZXMgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1ByaWNpbmddIEdldCBBdHRyaWJ1dGVzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHZXRBdHRyaWJ1dGVzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSByaWdodHNSZXByb2R1Y3Rpb246IHN0cmluZywgcHVibGljIHJlYWRvbmx5IGRpYWxvZ09wdGlvbnM6IERlZmF1bHRDb21wb25lbnRPcHRpb25zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldEF0dHJpYnV0ZXNTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tQcmljaW5nXSBHZXQgQXR0cmlidXRlcyBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHZXRBdHRyaWJ1dGVzU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXR0cmlidXRlczogUHJpY2VBdHRyaWJ1dGVbXSxcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmlnaHRzUmVwcm9kdWN0aW9uOiBzdHJpbmcsXG4gICAgcHVibGljIHJlYWRvbmx5IGRpYWxvZ09wdGlvbnM6IERlZmF1bHRDb21wb25lbnRPcHRpb25zXG4gICkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRBdHRyaWJ1dGVzRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUHJpY2luZ10gR2V0IEF0dHJpYnV0ZXMgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR2V0QXR0cmlidXRlc0ZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuXG5leHBvcnQgY2xhc3MgUmVzZXRQcmljaW5nIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tQcmljaW5nXSBSZXNldCBQcmljaW5nJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBSZXNldFByaWNpbmcuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIFNldFByaWNlRm9yRGV0YWlscyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUHJpY2luZ10gU2V0IFByaWNlIEZvciBEZXRhaWxzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRQcmljZUZvckRldGFpbHMuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHByaWNlOiBudW1iZXIpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgU2V0UHJpY2VGb3JEaWFsb2cgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1ByaWNpbmddIFNldCBQcmljZSBGb3IgRGlhbG9nJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRQcmljZUZvckRpYWxvZy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcHJpY2U6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXRBcHBsaWVkQXR0cmlidXRlcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUHJpY2luZ10gU2V0IEFwcGxpZWQgQXR0cmlidXRlcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2V0QXBwbGllZEF0dHJpYnV0ZXMuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFwcGxpZWRBdHRyaWJ1dGVzOiBTZWxlY3RlZFByaWNlQXR0cmlidXRlW10pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRlUHJpY2UgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1ByaWNpbmddIENhbGN1bGF0ZSBQcmljZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gQ2FsY3VsYXRlUHJpY2UuVHlwZTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IHNlbGVjdGVkQXR0cmlidXRlczogUG9qbyxcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXNzZXRJZDogbnVtYmVyLFxuICAgIHB1YmxpYyByZWFkb25seSBzdWJjbGlwTWFya2VyczogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuU3ViY2xpcE1hcmtlcnNcbiAgKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIENhbGN1bGF0ZVByaWNlU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUHJpY2luZ10gQ2FsY3VsYXRlIFByaWNlIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IENhbGN1bGF0ZVByaWNlU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcHJpY2U6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGVQcmljZUZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1ByaWNpbmddIENhbGN1bGF0ZSBQcmljZSBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBDYWxjdWxhdGVQcmljZUZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEluaXRpYWxpemVQcmljaW5nIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tQcmljaW5nXSBJbml0aWFsaXplIFByaWNpbmcnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEluaXRpYWxpemVQcmljaW5nLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSByaWdodHNSZXByb2R1Y3Rpb246IHN0cmluZywgcHVibGljIHJlYWRvbmx5IGRpYWxvZ09wdGlvbnM6IERlZmF1bHRDb21wb25lbnRPcHRpb25zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5EaWFsb2cgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1ByaWNpbmddIE9wZW4gRGlhbG9nJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBPcGVuRGlhbG9nLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBkaWFsb2dPcHRpb25zOiBEZWZhdWx0Q29tcG9uZW50T3B0aW9ucykgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFueSA9IEdldEF0dHJpYnV0ZXMgfCBHZXRBdHRyaWJ1dGVzU3VjY2VzcyB8IEdldEF0dHJpYnV0ZXNGYWlsdXJlIHwgUmVzZXRQcmljaW5nIHwgU2V0UHJpY2VGb3JEZXRhaWxzIHwgT3BlbkRpYWxvZyB8XG4gIFNldFByaWNlRm9yRGlhbG9nIHwgU2V0QXBwbGllZEF0dHJpYnV0ZXMgfCBDYWxjdWxhdGVQcmljZSB8IENhbGN1bGF0ZVByaWNlU3VjY2VzcyB8IENhbGN1bGF0ZVByaWNlRmFpbHVyZSB8IEluaXRpYWxpemVQcmljaW5nO1xuIl19

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
//# sourceMappingURL=pricing.actions.js.map
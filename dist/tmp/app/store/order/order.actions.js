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
    ActionFactory.prototype.load = function (orderId) {
        return new Load(orderId);
    };
    ActionFactory.prototype.loadSuccess = function (order) {
        return new LoadSuccess(order);
    };
    ActionFactory.prototype.setCheckoutState = function (checkingOut) {
        return new SetCheckoutState(checkingOut);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(orderId) {
        this.orderId = orderId;
        this.type = Load.Type;
    }
    Load.Type = '[Order] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(activeOrder) {
        this.activeOrder = activeOrder;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Order] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Order] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var SetCheckoutState = (function () {
    function SetCheckoutState(checkingOut) {
        this.checkingOut = checkingOut;
        this.type = SetCheckoutState.Type;
    }
    SetCheckoutState.Type = '[Order] Set Checkout State';
    return SetCheckoutState;
}());
exports.SetCheckoutState = SetCheckoutState;
//# sourceMappingURL=order.actions.js.map
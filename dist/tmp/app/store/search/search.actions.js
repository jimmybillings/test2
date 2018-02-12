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
    ActionFactory.prototype.loadResults = function (params) {
        return new LoadResults(params);
    };
    ActionFactory.prototype.reset = function () {
        return new Reset();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadResultsSuccess = function (results) {
        return new LoadResultsSuccess(results);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var LoadResults = (function () {
    function LoadResults(params) {
        this.params = params;
        this.type = LoadResults.Type;
    }
    LoadResults.Type = '[Search] Load Results';
    return LoadResults;
}());
exports.LoadResults = LoadResults;
var LoadResultsSuccess = (function () {
    function LoadResultsSuccess(results) {
        this.results = results;
        this.type = LoadResultsSuccess.Type;
    }
    LoadResultsSuccess.Type = '[Search] Load Results Success';
    return LoadResultsSuccess;
}());
exports.LoadResultsSuccess = LoadResultsSuccess;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Search] Reset';
    return Reset;
}());
exports.Reset = Reset;
//# sourceMappingURL=search.actions.js.map
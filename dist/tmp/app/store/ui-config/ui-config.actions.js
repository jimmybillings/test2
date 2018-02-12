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
    ActionFactory.prototype.initialize = function (siteName) {
        return new Initialize(siteName);
    };
    ActionFactory.prototype.load = function () {
        return new Load();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (config) {
        return new LoadSuccess(config);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    InternalActionFactory.prototype.initializeSuccess = function (config) {
        return new InitializeSuccess(config);
    };
    InternalActionFactory.prototype.initializeFailure = function (error) {
        return new InitializeFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load() {
        this.type = Load.Type;
    }
    Load.Type = '[Ui Config] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(config) {
        this.config = config;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Ui Config] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Ui Config] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var Initialize = (function () {
    function Initialize(siteName) {
        this.siteName = siteName;
        this.type = Initialize.Type;
    }
    Initialize.Type = '[Ui Config] Initialize';
    return Initialize;
}());
exports.Initialize = Initialize;
var InitializeSuccess = (function () {
    function InitializeSuccess(config) {
        this.config = config;
        this.type = InitializeSuccess.Type;
    }
    InitializeSuccess.Type = '[Ui Config] Initialize Success';
    return InitializeSuccess;
}());
exports.InitializeSuccess = InitializeSuccess;
var InitializeFailure = (function () {
    function InitializeFailure(error) {
        this.error = error;
        this.type = InitializeFailure.Type;
    }
    InitializeFailure.Type = '[Ui Config] Initialize Failure';
    return InitializeFailure;
}());
exports.InitializeFailure = InitializeFailure;
//# sourceMappingURL=ui-config.actions.js.map
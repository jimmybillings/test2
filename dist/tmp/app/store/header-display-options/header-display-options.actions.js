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
    ActionFactory.prototype.setHeaderPosition = function (pageVerticalOffset) {
        return new SetHeaderPosition(pageVerticalOffset);
    };
    ActionFactory.prototype.checkIfHeaderCanBeFixed = function (url) {
        return new CheckIfHeaderCanBeFixed(url);
    };
    ActionFactory.prototype.checkIfFiltersAreAvailable = function (url) {
        return new CheckIfFiltersAreAvailable(url);
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
    InternalActionFactory.prototype.disableFix = function () {
        return new DisableFix();
    };
    InternalActionFactory.prototype.enableFix = function () {
        return new EnableFix();
    };
    InternalActionFactory.prototype.fix = function () {
        return new Fix();
    };
    InternalActionFactory.prototype.unfix = function () {
        return new Unfix();
    };
    InternalActionFactory.prototype.enableFilters = function () {
        return new EnableFilters();
    };
    InternalActionFactory.prototype.disableFilters = function () {
        return new DisableFilters();
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var SetHeaderPosition = (function () {
    function SetHeaderPosition(pageVerticalOffset) {
        this.pageVerticalOffset = pageVerticalOffset;
        this.type = SetHeaderPosition.Type;
    }
    SetHeaderPosition.Type = '[Header Display Options] Set Header Position';
    return SetHeaderPosition;
}());
exports.SetHeaderPosition = SetHeaderPosition;
var CheckIfHeaderCanBeFixed = (function () {
    function CheckIfHeaderCanBeFixed(url) {
        this.url = url;
        this.type = CheckIfHeaderCanBeFixed.Type;
    }
    CheckIfHeaderCanBeFixed.Type = '[Header Display Options] Check If Header Can Be Fixed';
    return CheckIfHeaderCanBeFixed;
}());
exports.CheckIfHeaderCanBeFixed = CheckIfHeaderCanBeFixed;
var CheckIfFiltersAreAvailable = (function () {
    function CheckIfFiltersAreAvailable(url) {
        this.url = url;
        this.type = CheckIfFiltersAreAvailable.Type;
    }
    CheckIfFiltersAreAvailable.Type = '[Header Display Options] Check If Filters Are Available';
    return CheckIfFiltersAreAvailable;
}());
exports.CheckIfFiltersAreAvailable = CheckIfFiltersAreAvailable;
var DisableFix = (function () {
    function DisableFix() {
        this.type = DisableFix.Type;
    }
    DisableFix.Type = '[Header Display Options] Disable Fix';
    return DisableFix;
}());
exports.DisableFix = DisableFix;
var EnableFix = (function () {
    function EnableFix() {
        this.type = EnableFix.Type;
    }
    EnableFix.Type = '[Header Display Options] Enable Fix';
    return EnableFix;
}());
exports.EnableFix = EnableFix;
var DisableFilters = (function () {
    function DisableFilters() {
        this.type = DisableFilters.Type;
    }
    DisableFilters.Type = '[Header Display Options] Disable Filters';
    return DisableFilters;
}());
exports.DisableFilters = DisableFilters;
var EnableFilters = (function () {
    function EnableFilters() {
        this.type = EnableFilters.Type;
    }
    EnableFilters.Type = '[Header Display Options] Enable Filters';
    return EnableFilters;
}());
exports.EnableFilters = EnableFilters;
var Fix = (function () {
    function Fix() {
        this.type = Fix.Type;
    }
    Fix.Type = '[Header Display Options] Fix';
    return Fix;
}());
exports.Fix = Fix;
var Unfix = (function () {
    function Unfix() {
        this.type = Unfix.Type;
    }
    Unfix.Type = '[Header Display Options] Unfix';
    return Unfix;
}());
exports.Unfix = Unfix;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Header Display Options] Reset';
    return Reset;
}());
exports.Reset = Reset;
//# sourceMappingURL=header-display-options.actions.js.map
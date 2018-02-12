"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PendoService = (function () {
    function PendoService() {
    }
    PendoService.prototype.initialize = function (user) {
        if (typeof window.pendo === 'undefined')
            return;
        var userUniqueIdentifier = user.siteName + "-" + user.id + "-" + user.firstName.toLowerCase() + "-" + user.lastName.toLowerCase();
        var accountUniqueIdentifier = user.siteName + "-" + user.accountId;
        window.pendo.initialize({
            apiKey: '7e5da402-5d29-41b0-5579-6e149b0a28f2',
            visitor: { id: userUniqueIdentifier, email: user.emailAddress },
            account: { id: accountUniqueIdentifier }
        });
    };
    PendoService.decorators = [
        { type: core_1.Injectable },
    ];
    PendoService.ctorParameters = function () { return []; };
    return PendoService;
}());
exports.PendoService = PendoService;
//# sourceMappingURL=pendo.service.js.map
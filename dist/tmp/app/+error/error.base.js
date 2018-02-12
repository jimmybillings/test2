"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorBase = (function () {
    function ErrorBase(userCan) {
        this.userCan = userCan;
    }
    Object.defineProperty(ErrorBase.prototype, "showCartLink", {
        get: function () {
            return this.userCan.addToCart() && !this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "showCollectionsLink", {
        get: function () {
            return this.userCan.viewCollections();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorBase.prototype, "showQuotesLink", {
        get: function () {
            return this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    return ErrorBase;
}());
exports.ErrorBase = ErrorBase;
//# sourceMappingURL=error.base.js.map
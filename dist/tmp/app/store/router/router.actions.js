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
    ActionFactory.prototype.goToLogin = function () {
        return new GoToLogin();
    };
    ActionFactory.prototype.goToLoginWithRedirect = function () {
        return new GoToLoginWithRedirect();
    };
    ActionFactory.prototype.goToPageNotFound = function () {
        return new GoToPageNotFound();
    };
    ActionFactory.prototype.goToSearchAssetDetails = function (assetId, markers) {
        return new GoToSearchAssetDetails(assetId, markers);
    };
    ActionFactory.prototype.followRedirect = function () {
        return new FollowRedirect();
    };
    ActionFactory.prototype.goToQuotes = function () {
        return new GoToQuotes();
    };
    ActionFactory.prototype.goToQuoteById = function (quoteId) {
        return new GoToQuoteById(quoteId);
    };
    ActionFactory.prototype.goToActiveQuote = function () {
        return new GoToActiveQuote();
    };
    ActionFactory.prototype.goToCollection = function (collectionId, page, perPage) {
        if (page === void 0) { page = 1; }
        if (perPage === void 0) { perPage = 100; }
        return new GoToCollection(collectionId, page, perPage);
    };
    ActionFactory.prototype.goToCart = function () {
        return new GoToCart();
    };
    ActionFactory.prototype.addMarkersToUrl = function (assetId, timeStart, timeEnd) {
        return new AddMarkersToUrl(assetId, timeStart, timeEnd);
    };
    ActionFactory.prototype.goToBadRequest = function () {
        return new GoToBadRequest();
    };
    ActionFactory.prototype.goToServerError = function () {
        return new GoToServerError();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var GoToLogin = (function () {
    function GoToLogin() {
        this.type = GoToLogin.Type;
    }
    GoToLogin.Type = '[Router] Go To Login';
    return GoToLogin;
}());
exports.GoToLogin = GoToLogin;
var GoToLoginWithRedirect = (function () {
    function GoToLoginWithRedirect() {
        this.type = GoToLoginWithRedirect.Type;
    }
    GoToLoginWithRedirect.Type = '[Router] Go To Login With Redirect';
    return GoToLoginWithRedirect;
}());
exports.GoToLoginWithRedirect = GoToLoginWithRedirect;
var FollowRedirect = (function () {
    function FollowRedirect() {
        this.type = FollowRedirect.Type;
    }
    FollowRedirect.Type = '[Router] Follow Redirect';
    return FollowRedirect;
}());
exports.FollowRedirect = FollowRedirect;
var GoToPageNotFound = (function () {
    function GoToPageNotFound() {
        this.type = GoToPageNotFound.Type;
    }
    GoToPageNotFound.Type = '[Router] Go To Page Not Found';
    return GoToPageNotFound;
}());
exports.GoToPageNotFound = GoToPageNotFound;
var GoToSearchAssetDetails = (function () {
    function GoToSearchAssetDetails(assetId, markers) {
        this.assetId = assetId;
        this.markers = markers;
        this.type = GoToSearchAssetDetails.Type;
    }
    GoToSearchAssetDetails.Type = '[Router] Go To Search Asset Details';
    return GoToSearchAssetDetails;
}());
exports.GoToSearchAssetDetails = GoToSearchAssetDetails;
var GoToQuotes = (function () {
    function GoToQuotes() {
        this.type = GoToQuotes.Type;
    }
    GoToQuotes.Type = '[Router] Go To Quotes';
    return GoToQuotes;
}());
exports.GoToQuotes = GoToQuotes;
var GoToQuoteById = (function () {
    function GoToQuoteById(quoteId) {
        this.quoteId = quoteId;
        this.type = GoToQuoteById.Type;
    }
    GoToQuoteById.Type = '[Router] Go To Quote By ID';
    return GoToQuoteById;
}());
exports.GoToQuoteById = GoToQuoteById;
var GoToCollection = (function () {
    function GoToCollection(collectionId, page, perPage) {
        this.collectionId = collectionId;
        this.page = page;
        this.perPage = perPage;
        this.type = GoToCollection.Type;
    }
    GoToCollection.Type = '[Router] Go To Collection';
    return GoToCollection;
}());
exports.GoToCollection = GoToCollection;
var GoToActiveQuote = (function () {
    function GoToActiveQuote() {
        this.type = GoToActiveQuote.Type;
    }
    GoToActiveQuote.Type = '[Router] Go To Active Quote';
    return GoToActiveQuote;
}());
exports.GoToActiveQuote = GoToActiveQuote;
var GoToCart = (function () {
    function GoToCart() {
        this.type = GoToCart.Type;
    }
    GoToCart.Type = '[Router] Go To Cart';
    return GoToCart;
}());
exports.GoToCart = GoToCart;
var AddMarkersToUrl = (function () {
    function AddMarkersToUrl(assetId, timeStart, timeEnd) {
        this.assetId = assetId;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
        this.type = AddMarkersToUrl.Type;
    }
    AddMarkersToUrl.Type = '[Router] Add Markers To Url';
    return AddMarkersToUrl;
}());
exports.AddMarkersToUrl = AddMarkersToUrl;
var GoToBadRequest = (function () {
    function GoToBadRequest() {
        this.type = GoToBadRequest.Type;
    }
    GoToBadRequest.Type = '[Router] Go To Bad Request';
    return GoToBadRequest;
}());
exports.GoToBadRequest = GoToBadRequest;
var GoToServerError = (function () {
    function GoToServerError() {
        this.type = GoToServerError.Type;
    }
    GoToServerError.Type = '[Router] Go To Server Error';
    return GoToServerError;
}());
exports.GoToServerError = GoToServerError;
//# sourceMappingURL=router.actions.js.map
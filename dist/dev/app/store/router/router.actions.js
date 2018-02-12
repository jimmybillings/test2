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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9yb3V0ZXIvcm91dGVyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7SUFBQTtJQW9EQSxDQUFDO0lBbkRRLGlDQUFTLEdBQWhCO1FBQ0UsTUFBTSxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLDZDQUFxQixHQUE1QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLHdDQUFnQixHQUF2QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVNLDhDQUFzQixHQUE3QixVQUE4QixPQUFlLEVBQUUsT0FBd0I7UUFDckUsTUFBTSxDQUFDLElBQUksc0JBQXNCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxzQ0FBYyxHQUFyQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLGNBQWMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxrQ0FBVSxHQUFqQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSxxQ0FBYSxHQUFwQixVQUFxQixPQUFlO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sdUNBQWUsR0FBdEI7UUFDRSxNQUFNLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU0sc0NBQWMsR0FBckIsVUFBc0IsWUFBb0IsRUFBRSxJQUFnQixFQUFFLE9BQXFCO1FBQXZDLHFCQUFBLEVBQUEsUUFBZ0I7UUFBRSx3QkFBQSxFQUFBLGFBQXFCO1FBQ2pGLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxnQ0FBUSxHQUFmO1FBQ0UsTUFBTSxDQUFD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QUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBRndCLGFBQUksR0FBRyxxQkFBcUIsQ0FBQztJQUV0RCxlQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksNEJBQVE7QUFLckI7SUFHRSx5QkFBNEIsT0FBZSxFQUFrQixTQUFpQixFQUFrQixPQUFlO1FBQW5GLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBa0IsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFrQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRC9GLFNBQUksR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDO0lBQ3VFLENBQUM7SUFGN0Ysb0JBQUksR0FBRyw2QkFBNkIsQ0FBQztJQUc5RCxzQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDBDQUFlO0FBTTVCO0lBQUE7UUFFa0IsU0FBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUM7SUFDN0MsQ0FBQztJQUZ3QixtQkFBSSxHQUFHLDRCQUE0QixDQUFDO0lBRTdELHFCQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksd0NBQWM7QUFLM0I7SUFBQTtRQUVrQixTQUFJLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRndCLG9CQUFJLEdBQUcsNkJBQTZCLENBQUM7SUFFOUQsc0JBQUM7Q0FIRCxBQUdDLElBQUE7QUFIWSwwQ0FBZSIsImZpbGUiOiJhcHAvc3RvcmUvcm91dGVyL3JvdXRlci5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGdvVG9Mb2dpbigpOiBHb1RvTG9naW4ge1xuICAgIHJldHVybiBuZXcgR29Ub0xvZ2luKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0xvZ2luV2l0aFJlZGlyZWN0KCk6IEdvVG9Mb2dpbldpdGhSZWRpcmVjdCB7XG4gICAgcmV0dXJuIG5ldyBHb1RvTG9naW5XaXRoUmVkaXJlY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvUGFnZU5vdEZvdW5kKCk6IEdvVG9QYWdlTm90Rm91bmQge1xuICAgIHJldHVybiBuZXcgR29Ub1BhZ2VOb3RGb3VuZCgpO1xuICB9XG5cbiAgcHVibGljIGdvVG9TZWFyY2hBc3NldERldGFpbHMoYXNzZXRJZDogbnVtYmVyLCBtYXJrZXJzPzogU3ViY2xpcE1hcmtlcnMpOiBHb1RvU2VhcmNoQXNzZXREZXRhaWxzIHtcbiAgICByZXR1cm4gbmV3IEdvVG9TZWFyY2hBc3NldERldGFpbHMoYXNzZXRJZCwgbWFya2Vycyk7XG4gIH1cblxuICBwdWJsaWMgZm9sbG93UmVkaXJlY3QoKTogRm9sbG93UmVkaXJlY3Qge1xuICAgIHJldHVybiBuZXcgRm9sbG93UmVkaXJlY3QoKTtcbiAgfVxuXG4gIHB1YmxpYyBnb1RvUXVvdGVzKCk6IEdvVG9RdW90ZXMge1xuICAgIHJldHVybiBuZXcgR29Ub1F1b3RlcygpO1xuICB9XG5cbiAgcHVibGljIGdvVG9RdW90ZUJ5SWQocXVvdGVJZDogbnVtYmVyKTogR29Ub1F1b3RlQnlJZCB7XG4gICAgcmV0dXJuIG5ldyBHb1RvUXVvdGVCeUlkKHF1b3RlSWQpO1xuICB9XG5cbiAgcHVibGljIGdvVG9BY3RpdmVRdW90ZSgpOiBHb1RvQWN0aXZlUXVvdGUge1xuICAgIHJldHVybiBuZXcgR29Ub0FjdGl2ZVF1b3RlKCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NvbGxlY3Rpb24oY29sbGVjdGlvbklkOiBudW1iZXIsIHBhZ2U6IG51bWJlciA9IDEsIHBlclBhZ2U6IG51bWJlciA9IDEwMCk6IEdvVG9Db2xsZWN0aW9uIHtcbiAgICByZXR1cm4gbmV3IEdvVG9Db2xsZWN0aW9uKGNvbGxlY3Rpb25JZCwgcGFnZSwgcGVyUGFnZSk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0NhcnQoKTogR29Ub0NhcnQge1xuICAgIHJldHVybiBuZXcgR29Ub0NhcnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRNYXJrZXJzVG9VcmwoYXNzZXRJZDogbnVtYmVyLCB0aW1lU3RhcnQ6IG51bWJlciwgdGltZUVuZDogbnVtYmVyKTogQWRkTWFya2Vyc1RvVXJsIHtcbiAgICByZXR1cm4gbmV3IEFkZE1hcmtlcnNUb1VybChhc3NldElkLCB0aW1lU3RhcnQsIHRpbWVFbmQpO1xuICB9XG5cbiAgcHVibGljIGdvVG9CYWRSZXF1ZXN0KCk6IEdvVG9CYWRSZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IEdvVG9CYWRSZXF1ZXN0KCk7XG4gIH1cblxuICBwdWJsaWMgZ29Ub1NlcnZlckVycm9yKCk6IEdvVG9TZXJ2ZXJFcnJvciB7XG4gICAgcmV0dXJuIG5ldyBHb1RvU2VydmVyRXJyb3IoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7IH1cblxuZXhwb3J0IGNsYXNzIEdvVG9Mb2dpbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUm91dGVyXSBHbyBUbyBMb2dpbic7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR29Ub0xvZ2luLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBHb1RvTG9naW5XaXRoUmVkaXJlY3QgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1JvdXRlcl0gR28gVG8gTG9naW4gV2l0aCBSZWRpcmVjdCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR29Ub0xvZ2luV2l0aFJlZGlyZWN0LlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBGb2xsb3dSZWRpcmVjdCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUm91dGVyXSBGb2xsb3cgUmVkaXJlY3QnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEZvbGxvd1JlZGlyZWN0LlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBHb1RvUGFnZU5vdEZvdW5kIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIFBhZ2UgTm90IEZvdW5kJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHb1RvUGFnZU5vdEZvdW5kLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBHb1RvU2VhcmNoQXNzZXREZXRhaWxzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIFNlYXJjaCBBc3NldCBEZXRhaWxzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHb1RvU2VhcmNoQXNzZXREZXRhaWxzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhc3NldElkOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBtYXJrZXJzOiBTdWJjbGlwTWFya2VycykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHb1RvUXVvdGVzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIFF1b3Rlcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR29Ub1F1b3Rlcy5UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgR29Ub1F1b3RlQnlJZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUm91dGVyXSBHbyBUbyBRdW90ZSBCeSBJRCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR29Ub1F1b3RlQnlJZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcXVvdGVJZDogbnVtYmVyKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEdvVG9Db2xsZWN0aW9uIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIENvbGxlY3Rpb24nO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEdvVG9Db2xsZWN0aW9uLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb2xsZWN0aW9uSWQ6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IHBhZ2U6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IHBlclBhZ2U6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHb1RvQWN0aXZlUXVvdGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1JvdXRlcl0gR28gVG8gQWN0aXZlIFF1b3RlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHb1RvQWN0aXZlUXVvdGUuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEdvVG9DYXJ0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIENhcnQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEdvVG9DYXJ0LlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRNYXJrZXJzVG9VcmwgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1JvdXRlcl0gQWRkIE1hcmtlcnMgVG8gVXJsJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGRNYXJrZXJzVG9VcmwuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFzc2V0SWQ6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IHRpbWVTdGFydDogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgdGltZUVuZDogbnVtYmVyKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEdvVG9CYWRSZXF1ZXN0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIEJhZCBSZXF1ZXN0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHb1RvQmFkUmVxdWVzdC5UeXBlO1xufVxuXG5leHBvcnQgY2xhc3MgR29Ub1NlcnZlckVycm9yIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tSb3V0ZXJdIEdvIFRvIFNlcnZlciBFcnJvcic7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR29Ub1NlcnZlckVycm9yLlR5cGU7XG59XG4iXX0=

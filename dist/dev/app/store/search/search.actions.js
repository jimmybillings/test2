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
    InternalActionFactory.prototype.loadResultsFailure = function (error) {
        return new LoadResultsFailure(error);
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
var LoadResultsFailure = (function () {
    function LoadResultsFailure(error) {
        this.error = error;
        this.type = LoadResultsFailure.Type;
    }
    LoadResultsFailure.Type = '[Search] Load Results Failure';
    return LoadResultsFailure;
}());
exports.LoadResultsFailure = LoadResultsFailure;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Search] Reset';
    return Reset;
}());
exports.Reset = Reset;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBSUE7SUFBQTtJQVFBLENBQUM7SUFQUSxtQ0FBVyxHQUFsQixVQUFtQixNQUFvQjtRQUNyQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLDZCQUFLLEdBQVo7UUFDRSxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLHNDQUFhO0FBVTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQVFBLENBQUM7SUFQUSxrREFBa0IsR0FBekIsVUFBMEIsT0FBc0I7UUFDOUMsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLGtEQUFrQixHQUF6QixVQUEwQixLQUF1QjtRQUMvQyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSMEMsYUFBYSxHQVF2RDtBQVJZLHNEQUFxQjtBQVVsQztJQUdFLHFCQUE0QixNQUFvQjtRQUFwQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBRGhDLFNBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ1ksQ0FBQztJQUY5QixnQkFBSSxHQUFHLHVCQUF1QixDQUFDO0lBR3hELGtCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksa0NBQVc7QUFNeEI7SUFHRSw0QkFBNEIsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQURsQyxTQUFJLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO0lBQ08sQ0FBQztJQUZoQyx1QkFBSSxHQUFHLCtCQUErQixDQUFDO0lBR2hFLHlCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksZ0RBQWtCO0FBTS9CO0lBR0UsNEJBQTRCLEtBQXVCO1FBQXZCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBRG5DLFNBQUksR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7SUFDUSxDQUFDO0lBRmpDLHVCQUFJLEdBQUcsK0JBQStCLENBQUM7SUFHaEUseUJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxnREFBa0I7QUFNL0I7SUFBQTtRQUVrQixTQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDO0lBRndCLFVBQUksR0FBRyxnQkFBZ0IsQ0FBQztJQUVqRCxZQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0JBQUsiLCJmaWxlIjoiYXBwL3N0b3JlL3NlYXJjaC9zZWFyY2guYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFNlYXJjaFBhcmFtcywgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3NlYXJjaC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkUmVzdWx0cyhwYXJhbXM6IFNlYXJjaFBhcmFtcyk6IExvYWRSZXN1bHRzIHtcbiAgICByZXR1cm4gbmV3IExvYWRSZXN1bHRzKHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogUmVzZXQge1xuICAgIHJldHVybiBuZXcgUmVzZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkUmVzdWx0c1N1Y2Nlc3MocmVzdWx0czogU2VhcmNoUmVzdWx0cyk6IExvYWRSZXN1bHRzU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkUmVzdWx0c1N1Y2Nlc3MocmVzdWx0cyk7XG4gIH1cblxuICBwdWJsaWMgbG9hZFJlc3VsdHNGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZFJlc3VsdHNGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IExvYWRSZXN1bHRzRmFpbHVyZShlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRSZXN1bHRzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tTZWFyY2hdIExvYWQgUmVzdWx0cyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFJlc3VsdHMuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHBhcmFtczogU2VhcmNoUGFyYW1zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRSZXN1bHRzU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU2VhcmNoXSBMb2FkIFJlc3VsdHMgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFJlc3VsdHNTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSByZXN1bHRzOiBTZWFyY2hSZXN1bHRzKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRSZXN1bHRzRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU2VhcmNoXSBMb2FkIFJlc3VsdHMgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFJlc3VsdHNGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNldCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU2VhcmNoXSBSZXNldCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVzZXQuVHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gTG9hZFJlc3VsdHMgfCBMb2FkUmVzdWx0c1N1Y2Nlc3MgfCBSZXNldCB8IExvYWRSZXN1bHRzRmFpbHVyZTtcbiJdfQ==

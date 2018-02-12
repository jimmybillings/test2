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
    ActionFactory.prototype.load = function (quoteId) {
        return new Load(quoteId);
    };
    ActionFactory.prototype.loadSuccess = function (quote) {
        return new LoadSuccess(quote);
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
    function Load(quoteId) {
        this.quoteId = quoteId;
        this.type = Load.Type;
    }
    Load.Type = '[Quote Show] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(quote) {
        this.quote = quote;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Quote Show] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Quote Show] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQTtJQUFBO0lBU0EsQ0FBQztJQVJRLDRCQUFJLEdBQVgsVUFBWSxPQUFlO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBR00sbUNBQVcsR0FBbEIsVUFBbUIsS0FBWTtRQUM3QixNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FUQSxBQVNDLElBQUE7QUFUWSxzQ0FBYTtBQVcxQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFJQSxDQUFDO0lBSFEsMkNBQVcsR0FBbEIsVUFBbUIsS0FBdUI7UUFDeEMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDSCw0QkFBQztBQUFELENBSkEsQUFJQyxDQUowQyxhQUFhLEdBSXZEO0FBSlksc0RBQXFCO0FBTWxDO0lBR0UsY0FBNEIsT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFEM0IsU0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDYyxDQUFDO0lBRnpCLFNBQUksR0FBRyxtQkFBbUIsQ0FBQztJQUdwRCxXQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksb0JBQUk7QUFNakI7SUFHRSxxQkFBNEIsS0FBWTtRQUFaLFVBQUssR0FBTCxLQUFLLENBQU87UUFEeEIsU0FBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDSSxDQUFDO0lBRnRCLGdCQUFJLEdBQUcsMkJBQTJCLENBQUM7SUFHNUQsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVztBQU14QjtJQUdFLHFCQUE0QixLQUF1QjtRQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQURuQyxTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNlLENBQUM7SUFGakMsZ0JBQUksR0FBRywyQkFBMkIsQ0FBQztJQUc1RCxrQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGtDQUFXIiwiZmlsZSI6ImFwcC9zdG9yZS9xdW90ZS1zaG93L3F1b3RlLXNob3cuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgUXVvdGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkKHF1b3RlSWQ6IG51bWJlcik6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZChxdW90ZUlkKTtcbiAgfVxuXG4gIC8vIE1vdmUgdGhpcyB0byBpbnRlcm5hbCBhY3Rpb24gZmFjdG9yeSB3aGVuIHF1b3RlIGlzIGZ1bGx5IFwiZWZmZWN0ZWRcIlxuICBwdWJsaWMgbG9hZFN1Y2Nlc3MocXVvdGU6IFF1b3RlKTogTG9hZFN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgTG9hZFN1Y2Nlc3MocXVvdGUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgTG9hZEZhaWx1cmUoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tRdW90ZSBTaG93XSBMb2FkJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBxdW90ZUlkOiBudW1iZXIpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1F1b3RlIFNob3ddIExvYWQgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHF1b3RlOiBRdW90ZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUXVvdGUgU2hvd10gTG9hZCBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBMb2FkIHwgTG9hZFN1Y2Nlc3MgfCBMb2FkRmFpbHVyZTtcbiJdfQ==
